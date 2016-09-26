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
`[Stream.resource](http://elixir-lang.org/docs/stable/elixir/Stream.html#resource/3)`.
It's signature is `(start_fun, next_fun, after_fun)` and it outputs a stream.
This signature can be confusing so let me explain. Most of the meat of
`Stream.resource` is in the `next_fun` so
