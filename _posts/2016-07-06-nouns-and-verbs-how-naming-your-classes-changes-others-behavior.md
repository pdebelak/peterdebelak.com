---
title: "Nouns and Verbs: How Naming Your Classes Determines Effects Other's Behavior"
description: What you name a class makes a big difference in how people will add methods to it in the future.
image: /images/name-tags.png
---

Recently I was reading [a blog post](http://arlobelshee.com/naming-is-a-process-part-4-honest-to-honest-and-complete/) by Arlo Belshee about naming that gave a good insight into how naming effects what methods other programmers will add to a class:

> If you want a thing to collect functionality and grow, name it by what it is. If you want it to split and shrink, name it by what it does.

This is fundamentally about class names that are classes vs. verbs. Take a noun class name like `User`. What methods should go on that class? Potentially anything related to users in you app. It might be the Rails/ActiveRecord expectation of `.save` and `.find`, methods related to authenticating a password, or methods related to whether the user has paid his invoice yet. Depending on how core the concept of a "user" is to your app this can lead to the [single responsibility principle](http://c2.com/cgi/wiki?SingleResponsibilityPrinciple) going straight out the window. Naming the `User` class by what it is collects functionality.

![Name tags](/images/name-tags.png)

On the other hand, you have class names that are verbs. If you have some system for charging invoices to users you could have a class called `InvoiceUser`. What methods would be on that class? Probably just a method called `invoice`. If you had to check if a user had been invoiced or whether their invoice has been paid, you would be inclined to define a new verb-based class to do this for you. Naming a class by what it does resists adding functionality. This is great for classes with a single responsibility but it can lead to [primitive obsession](http://c2.com/cgi/wiki?PrimitiveObsession) since there isn't a clear place to collect common functionality between various invoice-and-user-related classes.

One way out of this is with a role. Think about the noun-based class name `InvoiceableUser`. Ignoring the fact that "invoiceable" isn't really a word, this is a class that collects multiple pieces of functionality (unlike the verb-based class names), but resists being a dumping ground for totally unrelated functionality the way a generic noun (`User`) does.

None of these ways of naming classes is the "right" way. It really depends on your application what name is appropriate for a class. If users don't have very much behavior in your code, maybe "everything related to users" is a reasonable single responsibility. If invoicing a user is relatively complicated, it makes a lot of sense to have an `InvoiceUser` class to encapsulate the process while resisting gaining any other functionality. The role-based noun approach is a good one to keep in your back pocket for situations where your needs are somewhere in between.
