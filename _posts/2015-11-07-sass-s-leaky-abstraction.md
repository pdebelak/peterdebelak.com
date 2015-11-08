---
title: Sass's Leaky Abstraction
description: While sass makes maintaining css much easier, it still requires a knowledge of how it is compiled to use it effectively
---

Sass is an excellent tool for keeping css more concise and readable. It creates an abstraction on top of css allowing you to write other code that is then compiled to css.

[All abstractions are leaky abstractions](http://www.joelonsoftware.com/articles/LeakyAbstractions.html), however. I've been trying to up my front-end game lately and that has meant working on my sass skills. Recently, while learning more about the differences between `extend` and `include`, I've learned that sass doesn't totally shield you from knowing how it is compiled since that knowledge is part of why you might choose one or the other.

First, let's see how they are used.

<p class="lead">Include</p>

Sass uses `mixin`s for including. Like this:

    @mixin text() {
      font-size: 12px;
      font-weight: 400;
    }

    .normal {
      @include text();
    }

    p {
      @include text();
    }

<p class="lead">Extend</p>

Extend is sort of like inheritence:

    .normal {
      font-size: 12px;
      font-weight: 400;
    }

    p {
      @extend .normal;
    }

You can also use placeholders (sort of like classes that don't actually get used) with extend. That looks like this:

    %text {
      font-size: 12px;
      font-weight: 400;
    }

    .normal {
      @extend %text;
    }

    p {
      @extend %text;
    }

Now, these look essentially the same, right? But for some reason you can pass arguments to a `@mixin` and you can't use `@extend` inside a media query. Why is that? What is the difference between these almost identical ideas?

The answer is that the difference doesn't really have anything to do with sass. The difference is in how they are rendered as css.

Include is like copy-pasting. This sass:

    @mixin text() {
      font-size: 12px;
      font-weight: 400;
    }

    .normal {
      @include text();
    }

    p {
      @include text();
    }

Turns into this css:

    .normal {
      font-size: 12px;
      font-weight: 400;
    }

    p {
      font-size: 12px;
      font-weight: 400;
    }

So if you use an argument to a mixin sass can easily use that argument to generate the output since it is only used for that one selector.

Extend, on the other hand, works very differently. This sass:

    %text {
      font-size: 12px;
      font-weight: 400;
    }

    .normal {
      @extend %text;
    }

    p {
      @extend %text;
    }

Turns into this css:

    .normal, p {
      font-size: 12px;
      font-weight: 400;
    }

Since the css is only in one place, it can't take arguments (it always needs to be the same) and it can't appear in media queries. This makes the generated css much smaller, however.

So, learning when to use these sass features requires you to forget about sass's abstractions and start thinking about the css. The general rule for sass is to use `@extend` unless you need one of the features that it doesn't support since it generates slightly smaller stylesheets than using all `@mixin`s.

Sass is an excellent tool, just make sure you spend some time thinking about the generated css since sass doesn't let you forget it!
