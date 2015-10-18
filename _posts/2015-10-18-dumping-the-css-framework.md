---
title: Dumping the CSS Framework
description: While a css framework like Bootstrap has a lot of benefits for getting started, in the long run you are better off just getting the css you actually use.
---

At my old job the first step of most projects was to add [bootstrap](http://getbootstrap.com) css and start styling some html based on a photoshop design. The photoshop images would even have a grid across them divided into 12 columns, just like bootstrap. While this was a great way to make mobile-friendly websites quickly (which our clients wanted) it had a few downsides.

1. We were loading a lot of css and javascript we didn't need.
2. A lot of our designs were based on bootstrap conventions, regardless of what a particular site needed.
3. I never learned how to do a lot things with css on my own, since bootstrap normally handled it. This meant I had a hard time overriding certain behaviors.

With all of that in mind, I found the best thing to do is to completely get rid of the framework altogether. You can still look at how bootstrap does things if you get stuck, since it is all open source. Once I dumped the framework I found myself much more confident making changes while having significantly smaller css sheets, no need for jQuery (which boostrap's js depends on), and more fun!

I think it is good to get some practice using a css framework so you can see how people much better at css do things, but once you have a general idea what you are doing going without the framework is better and more satisfying.
