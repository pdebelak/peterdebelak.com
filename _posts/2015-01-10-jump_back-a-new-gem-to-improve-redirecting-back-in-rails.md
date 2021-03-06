---
title: jump_back - a new gem to improve redirecting back in Rails
description: An introduction to a new gem that improves redirecting back in Rails
tags:
  - Ruby
  - Rails
  - Meta
---

<p>Have you ever encounter encountered errors when running <code>redirect_to :back</code> in Rails and had to write a work around? What about saving a user's location on your site before redirecting them to your log in form so you can return them to what they were doing?</p>

<p>I've just released a gem, <code>jump_back</code>, that takes care of all of that for you with <code>redirect_back</code>, <code>save_referer</code>, and <code>return_to_referer</code> methods available in all your controllers. Check out the details in the Github README <a href="https://github.com/pdebelak/jump_back">here</a>.</p>
<p>If you have any ideas/feedback about <code>jump_back</code> you can leave a comment in here or, even better, open an issue on Github.</p>
<p>I hope you find it useful!</p>
