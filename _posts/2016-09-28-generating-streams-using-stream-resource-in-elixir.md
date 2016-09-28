---
title: Generating a stream using Stream.resource in Elixir
description: Stream.resource is a powerful function that can be a bit confusing to use. Peter guides you through some examples to get you started.
tags:
  - Elixir
---

[Streams](http://elixir-lang.org/docs/stable/elixir/Stream.html) in Elixir are
lazy enumerables. You can create a series of transformations that aren't
actually run until you either call `Stream.run(stream)` or an `Enum` function
on it. This means a stream is a powerful interface to pass to calling code since
they can not only add additional stream transformations but can easily control
when the stream is evaluated.

The most flexible way to generate a stream is using
[`Stream.resource`](http://elixir-lang.org/docs/stable/elixir/Stream.html#resource/3).
Its signature is `(start_fun, next_fun, after_fun)` and it outputs a stream.
This signature can be confusing so let me explain. Most of the meat of
`Stream.resource` is in the `next_fun` so let's start by talking about that.

`next_fun` takes what the docs call "acc" (meaning accumulator) and should
return a tuple containing the next element in the stream (which should
inexplicably be a single element in a list) and the accumulator to be passed to
the next call of `next_fun`. We'll see some examples of `next_fun` in a bit.

`start_fun` is a function that takes no arguments and should return the
accumulator for the first call of `next_fun`.

`after_fun` is a function that is called once the stream is done. It is meant to
clean up any open resources (for example closing an open file that was being
used in the stream).

Let's look at some examples. First, we can create a stream that will produce
each prime number, from two to infinity:

{% highlight elixir %}
defmodule Primes do
  def primes do
    Stream.resource(
      fn -> [] end,
      &next_prime/1,
      fn (primes) -> primes end
    )
  end

  defp next_prime([]), do: {[2], [2]}
  defp next_prime(primes) do
    next = List.last(primes) + 1
    next_prime(next, primes)
  end
  defp next_prime(num, primes) do
    if is_prime?(num, primes) do
      {[num], primes ++ [num]}
    else
      next_prime(num + 1, primes)
    end
  end

  defp is_prime?(num, primes) do
    !Enum.find(primes, fn (prime) -> rem(num, prime) == 0 end)
  end
end
{% endhighlight %}

The `start_fun` just sets up an empty list as the accumulator and the
`after_fun` does nothing (since we have nothing to clean up). The `next_fun` is
extracted as `next_prime` to take better advantage of pattern matching.

First off, if we have nothing in the accumulator, it just returns `{[2], [2]}`
which gives `2` as the first element and sets `[2]` as the accumulator. We don't
set `[2]` as the accumulator in the `start_fun` because then `2` won't be
returned as the first prime.

If we have elements in the accumulator, we keep adding `1` to the last prime
we've found until we find a number that isn't divisible by any of the previous
primes. That means it is a prime number so we return it plus add it to the
accumulator as an additional prime.

This can be used like this:

{% highlight elixir %}
iex(1)> Primes.primes |> Enum.take(3)
[2, 3, 5]
iex(2)> Primes.primes |> Enum.at(99)
541
{% endhighlight %}

I think calling the second value returned by `next_fun` the "accumulator"
is misleading, though. Let's look at another example:

{% highlight elixir %}
defmodule Fibonacci do
  def fibonaccis do
    Stream.resource(
      fn -> [] end,
      &next_fibonacci/1,
      fn (fibs) -> fibs end
    )
  end

  defp next_fibonacci([]), do: {[0], [0]}
  defp next_fibonacci([0]), do: {[1], [0, 1]}
  defp next_fibonacci([first, second]) do
    next = first + second
    {[next], [second, next]}
  end
end
{% endhighlight %}

The `next_fibonacci` function only returns the previous two fibonacci
numbers as the "accumulator" because those are the only two that are needed to
calculate the next one. I think it might be better to think of the "accumulator"
as the context of previously generated results, regardless of whether it
accumulates or not.

Generating an infinite number of fibonacci numbers or primes is all well and good, but how can we
actually use `Stream.resource` to do something real?

Take a look at an asynchronous map module I use in a project of mine:

{% highlight elixir %}
defmodule AsyncMap do
  def async_map(list, long_running_function) do
    list |>
    Enum.map(&async_single(&1, long_running_function)) |>
    length() |>
    stream_responses()
  end

  defp async_single(item, long_running_function) do
    pid = self()
    Task.start_link(fn -> send(pid, long_running_function.(item)) end)
    item
  end

  defp stream_responses(count) do
    Stream.resource(
      fn -> 0 end,
      fn (processed) ->
        if processed >= count do
          {:halt, processed}
        else
          receive do
            response -> {[response], processed + 1}
          end
        end
      end,
      fn (values) -> values end
    )
  end
end
{% endhighlight %}

This module exposes an `async_map` function that is meant to work like
`Enum.map` but to run the function passed to map asynchronously in parallel. It
then sends each item to the stream as its command finishes so the whole list is
processed in the amount of time it takes for the slowest one to finish. I use it
to make many http requests at once.

One thing to note is that instead of returning `{[next], acc}` from `next_fun`
returning `{:halt, acc}` indicates the end of the stream.

The basic logic is to use `spawn_link` to start a long running process for each
item in the list that will `send` the result back to this process. Then, it
starts a stream that waits to `receive` a message from those long running
processes. Once it has received as many messages as there were items in the list
it ends the stream. Here the "accumulator" is just a count of the number of
messages that have been received so far.

I hope this description of using `Stream.resource` helps demystify creating
streams in your Elixir apps.
