---
title: Chaining Calls in Ruby
description: It is really convenient to be able to chain calls together in ruby to create readable code, but when you need custom behavior it can be hard to figure out how to make it happen. Peter tells of some code he wrote recently to solve this problem.
tags:
  - Ruby
---

Chaining method calls in Ruby can lead to some very easy-to-follow and readable
code. `array.select { |item| item > 7 }.map(&:to_s)` almost reads like a
sentence. "Give me the elements that are greater than 7 as strings." When you
want to call complicated methods on an array, though, you often need to
choose between putting complicated logic inside blocks, leading to a large
method, or just passing the array around between methods instead of chaining the
method calls, which makes the code somewhat harder to follow.

I found myself in just such a situation recently and wanted to share my
solution. I was trying to determine all of the items in an array that were the
"best" according to a variety of criteria. For example, I wanted all the items
of the lowest price whose sellers had really high feedback scores, but if none of the
sellers had really high feedback scores then just good feedback scores were
okay. The same idea with sellers who ship their items quickly. I didn't want to
litter my code with conditionals though.
