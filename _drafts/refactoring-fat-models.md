---
title: Refactoring Fat Models
description: Fat models, skinny controllers is out of fashion in the rails world in favor of many smaller use case classes, but fat models don't happen all at once. Peter shows how to trim the fat out of your models step by step.
---

While you still hear "fat models, skinny controllers" from [time to time](https://www.sitepoint.com/10-ruby-on-rails-best-practices/), but people have generally caught on that [not all code needs to be in a model or controller](http://blog.joncairns.com/2013/04/fat-model-skinny-controller-is-a-load-of-rubbish/). Fat models don't happen all at once, though. I find that you add a method here and a method there until you realize that one of your models is well over 200 lines and has many methods with not much to do with one another. Here's how I approach this problem.

<h2 class="lead">1. Look at the private methods</h2>

Assuming you factor shared code between public methods into private methods on your model, they are the best place to find related methods. Do you have two or more public methods using the same private method? Those methods could likely become the public interface for their own focused class. Also, if you have one public method using multiple private methods, it's possible that method is so complicated it could be the lone private method in a use case class.

Let's say we have two public methods that share a private method like this:

{% highlight ruby %}
class User < ActiveRecord::Base
  # many methods
  def subscription_active?
    most_recent_subscription.active? if has_subscription?
  end

  def subscription_expiration_date
    most_recent_subscription.expiration_date if has_subscription?
  end

  private

  def has_subscription?
    subscriptions.any?
  end

  def most_recent_subscription
    subscriptions.order(expiration_date: :desc) # this should be a named scope on `Subscription`, but it is here for example purposes
  end

  # many methods
end
{% endhighlight %}

The `subscription_active?` and `subscription_expiration_date` methods are prime candidates to get refactored into their own class.

<h2 class="lead>2. Create a new class and call it from the old one</h2>

In this example I would make a new class like so:

{% highlight ruby %}
class UserSubscriptions
  delegate :subscriptions, to: :@user

  def initialize(user)
    @user = user
  end

  def subscription_active?
    most_recent_subscription.active? if has_subscription?
  end

  def subscription_expiration_date
    most_recent_subscription.expiration_date if has_subscription?
  end

  private

  def has_subscription?
    subscriptions.any?
  end

  def most_recent_subscription
    subscriptions.order(expiration_date: :desc)
  end
end
{% endhighlight %}

Then I would make the `User` model look like this:

{% highlight ruby %}
class User < ActiveRecord::Base
  # many methods

  delegate :subscription_active?, :subscription_expiration_date, to: :user_subscriptions

  private

  def user_subscriptions
    UserSubscriptions.new(self)
  end

  # many methods
end
{% endhighlight %}

At this point, make sure your tests all still pass. Then, move the tests for these methods from the `User` model to tests for the `UserSubscriptions` class. Make sure they still pass.

At this point, depending on the size of your code base and the number of callers of these two methods, you may end up stopping here.
