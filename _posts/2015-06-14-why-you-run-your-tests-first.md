---
title: Why You Run Your Tests First
description: Why you should always run your tests first and see them fail during test-driven development
---

When first learning test-driven-development, there are a lot of things about it
that seem stupid and arbitrary. After working with it a while, though, you
start to see that at least some of the rules make a lot of sense. The phrase
most associated with TDD is "red, green, refactor". Now, when I was first
learning about TDD the green and refactor steps made a lot of sense, but why
do I need to do the red step? I *know* the test will fail, because I haven't
written the code yet!

Now I understand, though, so I wanted to share what I learned with future
doubters.

<p class="lead">You only <em>think</em> you know what the bug is</p>

When fixing bugs in a large project at work, I usually have an exception that
occurred in production with details in [honeybadger](https://github.com/honeybadger-io/honeybadger-ruby).
I usually read the trace from the exception and think through where the problem
might be. I then tend to have a very good idea of how to solve the issue.

The only way I *know* I'm fixing the issue, though, is to write a test that
replicates the problem. Frequently I'll write the test and, by running it, discover that it
doesn't actually cause the same exception I expected it to, or that it doesn't cause
any exception at all! If I wrote the test, changed the code, and then ran the
test I'd think that the bug was fixed. By running the test first I verify that
I'm fixing the thing I think I am.

The same idea applies to writing new features. If you run your tests first,
you can verify that you are getting the error you expect to get. When you write
a test like this:

{% highlight ruby %}
specify { Thing.new.do_thing.should == "hello" }
{% endhighlight %}

And your current code is:

{% highlight ruby %}
class Thing
  def do_thing
  end
end
{% endhighlight %}

You run the test to see `expected "doing a thing", got nil`. This means that
the rest of your code is working as you expect, and your planned code will make
the test pass. Without running the test, you might write your code, then
discover that you mistyped the method name, or that your method is returning
something unexpected. Until you get the failure you want, you don't really
understand your code.

I hope that helps explain why the seemingly stupid step of running a test you
know will fail is actually helpful.
