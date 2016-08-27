---
title: New Heroku Pricing
description: A brief discussion of Heroku's 2015 price changes and how they affect small sites
tags:
  - Business
  - Meta
---

[Heroku's new pricing](https://blog.heroku.com/archives/2015/5/7/new-dyno-types-public-beta)
introduces much better pricing for anyone who has been paying for Heroku's
services, but introduces a huge change for people wanting to host their apps
for free &mdash; required downtime. Now all free apps have to sleep for 6 hours in
every 24 hour period.

What they are actually doing is making their free tier better for people who
use it in the way that they want &mdash; to get an app up and running in a
production environment for testing. They now give you a free web and worker
dyno so you can set up [sidekiq](http://sidekiq.org/) at no cost while you are developing the app.
Previously, if you wanted to use a second dyno at all you almost certainly
had to pay some money.

Once users like this are ready to go into prime time they can either go through the
hassle of switching to a different hosting service like Amazon, or they can
just pay Heroku some money every month for more dynos that are always live.
Clearly, this is what Heroku wants.

Unfortunately, I wasn't using the free tier of Heroku to test out an app in
development. I just wanted a single web dyno that, if pinged once an hour, was
up all the time to host my personal website. I had no plans of ever giving
Heroku any money, so it really makes no sense to give me free hosting. My
best option with Heroku would be to pay $7 a month to get a site that is always
up, and that is more than I'm willing to spend at the moment.

So, Heroku did very well. They are now giving free hosting to the people using
the service in the way that they want and stopping giving free hosting to
people who, like me, have no intention of ever paying.

As a result, I've switched this site's technology (again). Now I'm using [jekyll](http://jekyllrb.com/)
and hosting for free on [github](https://pages.github.com/). Which is great!
