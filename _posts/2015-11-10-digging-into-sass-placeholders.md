---
title: Digging Into Sass Placeholders
description: Example use of Sass placeholders are usually extremely simple. See a little bit more of why you might use them over traditional Sass extensions.
---

Most examples of how to use placeholders in Sass are very simplistic and don't really show why you might want to use them beyond some programmer-y sense of obligatory correctness. You usually see something like this:

    %blue {
      color: blue;
    }

    .blue {
      @extend %blue;
    }

Which compiles to:

    .blue {
      color: blue;
    }

That's obviously not super useful, so I was wondering what placeholders are *really* for. Turns out you can use placeholders as part of more complex selectors, and then those get passed down to the extending selector.

That probably doesn't really make sense, so let's use an example:

    p%blue {
      color: blue;
    }

    .blue {
    @extend %blue;
    }

Compiles to:

    p.blue {
      color: blue;
    }

*Now* we're starting to see the use.

You can even have multiple selectors using the same placeholder.

    div%blue {
      color: white;
      background-color: blue;
    }

    p%blue {
      color: blue;
    }

    .blue {
      @extend %blue;
    }

    p.text-blue {
      @extend %blue;
    }

Compiles to:

    div.blue {
      color:white;
      background-color:blue;
    }

    p.blue, p.text-blue {
      color:blue;
    }

That definitely seems useful now. I hope this encourages you to be a little more interesting when using placeholders!
