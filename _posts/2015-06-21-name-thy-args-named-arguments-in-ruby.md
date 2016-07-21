---
title: Name Thy Args - Named Arguments in Ruby
description: There are many benefits of using named arguments in Ruby
---

Just like [last time](/blog/tappety-tap-tap-tap-object-tap-in-ruby/),
where I wrote about the underused `Object#tap` method, I want to talk about
a relatively new and underutilized feature in Ruby. Today it is named arguments.

Starting in Ruby 2.0, you could give your arguments names like so:

{% highlight ruby %}
def method(argument: "default")
  argument.length
end
{% endhighlight %}

This was nice, but since you were forced to provide a default value it wasn't
always super useful. Starting in Ruby 2.1, though, the requirement for a default
was dropped so now you can write:

{% highlight ruby %}
def method(argument:)
  argument.length
end
{% endhighlight %}

Why is this so great? It provides documentation when a method is called. Have
you ever run across a method call like `do_thing(user, false)` in
an existing codebase? Don't you immediately have to look up the `do_thing`
method to figure out what that `false` means? What if, instead, you saw
`do_thing(user: user, async: false)`? Now you don't need to lookup
the code for that method since it is clear what the `false` means.

Another benefit is that the order doesn't matter. `do_thing(async: false, user: user)`
works just as well. Just last week I spent almost an hour figuring out why a
test wasn't passing before I realized I had some positional arguments in the
wrong order. Named arguments avoid that.

The name of the arguments can also give reminders about what type the arguments
should be. If you are supposed to pass a user id to the method, `do_thing(user, false)`
is a much easier mistake to make than `do_thing(user_id: user, async: false)`.
It is immediately obvious that it should be `do_thing(user_id: user.id, async: false)`.

Finally, Ruby is much more helpful about what is wrong when you forget a named
argument than positional arguments. If you try `do_thing(user)` you
get an error like `ArgumentError: wrong number of arguments (1 for 2)`. Then
you have to look at the method definition to see what you forgot. With named
arguments if you try `do_thing(user: user)`, you get an error like
`ArgumentError: missing keyword: async`, which is much more informative.

The only downsides to named arguments are that they make your method calls a
little more verbose, and that it makes any gems or libraries you create not as
backwards compatible. I think the verbosity is worth it, though, and I think
once Rails 5 comes out and people have to switch to Ruby 2.2 to use it, backwards
compatibility won't be such a big issue. In a private codebase, of course, you
don't have to worry about compatibility with old Rubies, so there is no downside
there.

I encourage you to use named arguments as much as possible. I think you'll see
the benefits right away!
