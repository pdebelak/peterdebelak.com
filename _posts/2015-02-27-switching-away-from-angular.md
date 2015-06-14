---
title: Switching Away from Angular
---

As I've spent more time working with Rails, I've realized that, even without
Angular, a Rails site is capable of being fully-interactive, ajax-powered
fun-times machine. I know what you're thinking: "Duh! That's true of everything
from plain `html` to `php`!" Okay, yes, that's true. But with Rails you can do
it without really having to translate between server-side and javascript. Here's
what I mean:

<p class="lead">Unobtrusive Javascript</p>

Using jQuery for a ajax-heavy site is truly obtrusive to your experience to a
developer. Every time you type `event.preventDefault()` you are saying, "Don't
do the thing that I wrote code for, do something else that requires more code!"
Angular makes this better with its `ng-click`s and `ng-submit`s, but you still
have to spend time formulating a `json` response, and then translating that
response into html in your javascript.

With unobtrusive javascript, you can respond with a `js.erb` file that just
inserts a partial you already wrote for the initial `html` response, so your
total new code is adding `format.js` to your controller and
`$('selector').html('<%= j render partial: "a partial" %>')`. Obviously it
can be more complicated than that, but it usually isn't.

<p class="lead">Degrading Gracefully</p>

Honestly, I don't think degrading gracefully when javascript is not enabled is
very important, but if I can do it while writing less code than Angular I see
that as a win. It is comforting to know that if my grandma accidentally turned
javascript off in her browser she can still use my site just fine.

<p class="lead">My conclusion</p>

So I removed Angular from this site. I know it doesn't really matter to users,
but for me it's made life easier. Since there is less code to write, I'm more
likely to add new features. For example, I've already updated the site to use
`markdown` instead of `html`, which has made writing posts faster and more fun!

I still think Angular is great and will continue to use it for projects, but I
think when it comes to Rails, I'll keep using unobtrusive javascript until I
have a real reason not to.
