---
title: Tappety Tap Tap Tap Tap - Object#tap in Ruby
description: An explanation of the Object#tap method in Ruby and why you should use it
---

There are a number of features that were added to Ruby in versions 1.9 or later
that don't seem to be in wide use for some reason. One that I have a fondness
for is the `tap` method.

The `tap` method was added to the `Object` class in Ruby 1.9. All it does is
yield `self` to a block and then return `self`.

Here's a simple example:

{% highlight ruby %}
Object.new.tap do |object|
  puts object
end
# returns the object
{% endhighlight %}

Doesn't that seem useful? Not really? Okay. Well, according to [the docs](http://ruby-doc.org/core-1.9.3/Object.html#method-i-tap)
the method is meant to "tap into" a method chain, in the same way you'd tap
into a rich vein of silver. Let's see if we can find the silver here.

Imagine you need to create an object, call one of its methods, and then return
it.

{% highlight ruby %}
Hat.new(type: :bowler).tap do |hat|
  hat.tip
end
{% endhighlight %}

We're getting closer.

What if you need to construct a string in a complicated way?

{% highlight ruby %}
"".tap do |string|
  string << "Hello " if hello
  string << "Sir " if should_sir?
  string << "I'm writing to you"
  string << " about #{about}" if about
  string << "."
end
{% endhighlight %}

That's so much better than the `string = ""; string << "X" if something` alternative
that ends with `string` at the end to make sure you return it. `tap` takes care
of that for you.

The biggest benefit I've found of using `tap` is that it makes it easy to create
a variable with limited scope. This can be very useful in Rails views, especially
if you use decorators to add view-related methods to an object.

Take this haml:

{% highlight ruby %}
- decorated_post = PostDecorator.new(@post)
%h1= decorated_post.decorated_title
%p= decorated_post.decorated_body
{% endhighlight %}

That's all fine, but if you are in a situation where you want to use two different
decorators in the same view, you might have something like this:


{% highlight ruby %}
- readably_decorated_post = ReadablePostDecorator.new(@post)
%h1= readably_decorated_post.decorated_title
%p= readably_decorated_post.decorated_body

- sortably_decorated_post = SortablePostDecorator.new(@post)
= link_to sortably_decorated_post.next_post
{% endhighlight %}

It can be hard to keep track of where a variable might be used and how. Also,
those variable names are long to differentiate from themselves from each
other. Try this instead:

{% highlight ruby %}
- ReadablePostDecorator.new(@post).tap do |decorated_post|
  %h1= decorated_post.decorated_title
  %p= decorated_post.decorated_body

- SortablePostDecorator.new(@post).tap do |decorated_post|
  = link_to decorated_post.next_post
{% endhighlight %}

I find that more readable and you have a good idea of the start and end of the
scope of the variables.

I hope this encourages you to bring out `Object#tap` for a little spin the next
chance you get.
