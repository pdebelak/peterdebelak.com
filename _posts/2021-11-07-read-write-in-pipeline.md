---
title: Reading and Writing from the Terminal in a Shell Pipeline
description: When piping stdin and stdout in a shell script, it can be confusing to still read and write from the terminal.
tags:
  - shell
---

When writing a shell script that might be used in a pipeline, it can
be useful to bypass the rerouting of `stdin` and `stdout` to still
interact directly with the user on the terminal. Let's take a simple
script that lets you pick one of the lines from stdin by number and
then prints it to stdout.

Our first, not working, attempt looks like this:

{% highlight shell %}
#!/bin/sh
# select.sh

while read -r line; do
  if [ -z "$lines" ]; then
    lines="$line"
  else
    lines="$lines\n$line"
  fi
  echo "$line"
done
printf "Line number> "
read -r selection
line_num=0
echo $lines | while read -r line; do
  line_num=$(( line_num + 1 ))
  if [ "$line_num" -eq "$selection" ]; then
    echo "$line"
  fi
done
{% endhighlight %}

If you try and run this script you'll notice you're never prompted for
input.

{% highlight shell %}
$ echo '1 2 3
> 4 5 6
> 7 8 9' | sh select.sh
Line number> select.sh: 17: [: Illegal number:
# more output
{% endhighlight %}

The trick is to explicitly read input from `/dev/tty` by redirecting
`stdin` when doing `read`:

{% highlight shell %}
#!/bin/sh
# select.sh

while read -r line; do
  if [ -z "$lines" ]; then
    lines="$line"
  else
    lines="$lines\n$line"
  fi
  echo "$line"
done
printf "Line number> "
read -r selection </dev/tty
line_num=0
echo $lines | while read -r line; do
  line_num=$(( line_num + 1 ))
  if [ "$line_num" -eq "$selection" ]; then
    echo "$line"
  fi
done
{% endhighlight %}

This works great now:

{% highlight shell %}
$ echo '1 2 3
4 5 6
7 8 9' | sh Projects/select.sh
1 2 3
4 5 6
7 8 9
Line number> 2
4 5 6
{% endhighlight %}

But that isn't actually that useful. You probably want to pipe that
into another command:

{% highlight shell %}
$ echo '1 2 3
4 5 6
7 8 9' | sh Projects/select.sh | wc

{% endhighlight %}

When you run it, though, it just hangs with no output. That's because
all the echos are now going to the pipe instead of to the terminal!
You can use `stderr` (aka file descriptor 2) for this:

{% highlight shell %}
#!/bin/sh
# select.sh

while read -r line; do
  if [ -z "$lines" ]; then
    lines="$line"
  else
    lines="$lines\n$line"
  fi
  echo "$line"
done >&2
printf "Line number> " >&2
read -r selection </dev/tty
line_num=0
echo $lines | while read -r line; do
  line_num=$(( line_num + 1 ))
  if [ "$line_num" -eq "$selection" ]; then
    echo "$line"
  fi
done
{% endhighlight %}

Now when you run it, it behaves as expected:

{% highlight shell %}
$ echo '1 2 3
4 5 6
7 8 9' | sh Projects/select.sh | wc
1 2 3
4 5 6
7 8 9
Line number> 2
      1       3       6
{% endhighlight %}

Hopefully you'll find this helpful when you do some shell scripting.
