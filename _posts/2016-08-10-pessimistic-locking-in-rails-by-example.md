---
title: Pessimistic Locking in Rails by Example
description: Locking is one of the most powerful tools in a developers chest to ensure data consistency, but it the documentation can be confusing. Peter guides you through how to use it properly with examples.
---

[Database locking](https://en.wikipedia.org/wiki/Lock_(database)) is a powerful feature of databases that can help prevent two people from modifying a resource in conflicting ways. Optimistic locking is when multiple users are allowed to read the same resource at the same time, but if more than one of them tries to modify that resource, the database prevents it. Pessimistic locking, which is the locking we are going to talk about today, actually prevents others from even reading it while it is locked.

After reading over that paragraph, I am confused so I assume you are too. I think it is much easier to learn with examples. Let's take a look at some common use cases for pessimistic locking and how you can use it.

First, imagine you have a counter on a record that you need to increment. You might initially write code like this:

{% highlight ruby %}
record = Record.find(1)
record.counter += 1
record.save!
{% endhighlight %}

This seems fine, but imagine if two users try to do this at the same time. They should each increase the value of `counter` by `1` for a total increase of `2`, but since they both read the value and increment it at the same time, they will only collectively add `1` to the `counter` leading to inaccurate data. This is a classic [race condition](https://en.wikipedia.org/wiki/Race_condition). Instead, you should ensure that only one user updates the record at a time with locking like so:

{% highlight ruby %}
record = Record.find(1)
record.with_lock do
  record.counter += 1
  record.save!
end
{% endhighlight %}

What `with_lock` does is a few things. First, it starts a [database transaction](https://en.wikipedia.org/wiki/Database_transaction). Second, it acquires a pessimistic database lock. Once the lock is acquired the record is reloaded in memory so the values on the record match those in the locked database row. The lock will prevent others from reading or writing to that row and anyone else trying to acquire a lock will have to wait for the lock to be released. This means that in our earlier example one of the two users would acquire the lock and increment the counter. The lock would be released at the end of the `with_lock` block and the other user would acquire the lock. Rails would refresh the data on the record so the `counter` reflects changes made by the first user and the record is now updated correctly.

Next, imagine you are making several changes and are already using a transaction. For example, maybe you are finding a user, updating her subscription, and updating her account balance to pay for that subscription:

{% highlight ruby %}
ActiveRecord::Base.transaction do
  user = User.find(user_id)
  subscription = user.subscriptions.find(subscription_id)
  account = user.account
  account.balance -= subscription.amount
  subscription.renew!
  account.save!
end
{% endhighlight %}

Now, if the user tries to update two subscriptions at the same time they might use the power of the race condition to only pay once. If we are going to subtract from the account balance like this we clearly want to use pessimistic locking. Since we are already in a transaction, though, we don't need to use `with_lock` and can instead do `lock!`:

{% highlight ruby %}
ActiveRecord::Base.transaction do
  user = User.find(user_id)
  subscription = user.subscriptions.find(subscription_id)
  account = user.account
  account.lock!
  account.balance -= subscription.amount
  subscription.renew!
  account.save!
end
{% endhighlight %}

This works very similarly to the `with_lock` method with two exceptions. First, it just acquires the lock at the time of calling and then releases it whenever the surrounding transaction completes rather than managing its own transaction internally. Second, it does absolutely nothing if not called inside of a transaction. To repeat, *don't use `lock!` outside of a transaction!* Besides that, though, it will ensure the same type of data integrity that the `with_lock` method does.

Finally, maybe you have a table of discount codes that you give to each person who signs up for a newsletter. Each code starts out as `available` but when it is given to a user it becomes `assigned`. You might have code like this:

{% highlight ruby %}
user = User.find(user_id)
discount_code = DiscountCode.next_available_code
discount_code.user = user
discount_code.state = "assigned"
discount_code.save!
{% endhighlight %}

Our old friend the race condition returns with the possibility of two users getting the same discount code which could lead to havoc in your application. You need to ensure that each discount code is only assigned to one user. Pessimistic locking to the rescue:

{% highlight ruby %}
user = User.find(user_id)
attach_discount_code(user)

def attach_discount_code(user)
  discount_code = DiscountCode.next_available_code
  code = discount_code.with_lock do
    if discount_code.state == "available"
      discount_code.user = user
      discount_code.state = "assigned"
      discount_code.save!
    end
  end
  if code.present?
    code
  else
    attach_discount_code(user)
  end
end
{% endhighlight %}

This code is more complicated than our previous examples so it needs some explanation. Unlike the previous examples, in this case if we get a discount code that is locked by another user and then later released to us (because in this case once we acquire the lock it is no longer `available` even though we asked for the `next_available_code`) we need to get a new record. For this reason, we use recursion. It works like this: First, get the next available discount code. Second, acquire a lock on that discount code. Once the lock is acquired, check the state. If the discount code is still available, proceed as normal and assign it to that user. If it isn't, then another person acquired a lock on this code first and another code should be acquired (hence the recursive method call).

I hope this helps you identify places where locking would help in your applications and help you understand how to use it.
