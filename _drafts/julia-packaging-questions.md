---
title: Julia Packaging Questions
description: Peter is using Julia a bit and feels very much confused by packaging.
tags:
  - Julia
---

I've just started using [julia](https://julialang.org) for work and I
feel like I'm fundamentally missing something about how packaging is
supposed to work.

If you aren't familiar, take a look at [the docs for
`Pkg`](https://julialang.github.io/Pkg.jl/v1/). It talks about how
julia's packaging system is conceptually similar to `virtualenv` or
`bundler`, which wonderful and from my currently understanding is
_mostly_ true, but with some very serious holes.

<h2 class="lead">Installing dependencies for a project</h2>

The docs say this about using `Pkg`:

> Pkg comes with its own REPL mode, which can be entered from the
> Julia REPL by pressing ]. To get back to the Julia REPL press
> backspace or ^C.

This is very true, but then all the following documentation explains
how to use `Pkg` from the repl, with absolutely no indication of how
you would run this in a non-interactive manner, for example, on a
production system with packages being installed as part of a deploy
script or in a docker container.

From what I can tell, the equivalent to bundler's `bundle install` is
to run something like:

```shell
$ julia -e "using Pkg; Pkg.activate(\".\"); Pkg.instantiate()"
```

This feels like a bizarre hack, but the docs strongly imply that all
interaction with `Pkg` is expected to happen in the repl.

<h2 class="lead">Running code with dependencies available</h2>

Okay, so now you've figured out how to install your dependencies and
you'd like to run some code!

Again, since all the documentation assumes you are using the repl, you
are on your own to figure out how to do this.

From what I can tell, all top level scripts needs to have the
following code at the top:

{% highlight julia %}
# myscript.pl
using Pkg
Pkg.activate(".") # or whatever path makes sense

# my code
{% endhighlight %}

Then you can do `jula myscript.pl` and your dependencies will be
available. I can't seem to find any equivalent to bundler's `bundle
exec` which indicates that the appropriate dependencies should be
available to the following command.

<h2 class="lead">Understanding how to use Julia</h2>

Because of this, I really wonder if julia is meant to be a repl-only
programming language, much like Emacs lisp is only _really_ meant to
be run inside the Emacs editor. This means that you _can_ run it
outside its intended environment but no one is going to put any effort
into making it a nice experience.

I expect there to be something like `julia pkg instantiate` and `julia
pkg run myscript.jl` so you can actually _use_ `Pkg` without resorting
to weird hacks or excessive boilerplate.

Is there? Am I just missing it?
