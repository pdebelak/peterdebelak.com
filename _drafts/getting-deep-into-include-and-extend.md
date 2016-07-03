---
title: Getting Deep into Ruby's Include and Extend
description: There are a lot of shortcuts to understanding include and extend in ruby, but it can help to really understand how it all works. Peter explains.
---

When learning ruby people usually explain `include` and `extend` as follows. Use include if you want to add instance methods:

    module DoIt
      def do_it
        "I'm doing it!"
      end
    end

    class Doer
      include DoIt
    end

    doer = Doer.new
    doer.do_it # => "I'm doing it!"

And use extend if you want to add class method:

    module DoIt
      def do_it
        "I'm doing it!"
      end
    end

    class Doer
      extend DoIt
    end

    Doer.do_it # => "I'm doing it!"

While these code examples work, they don't really explain what is going on. A better way to understand the difference is that `extend` is used to add a module's methods to a specific instance while `include` is like copying and pasting the code from the module into the place where you call it.

To clarify, in the first example above using `include`, it is as if the `def do_it` code from the module `DoIt` was inside the class `Doer` as a regular `def`. That means it is applied to instances of the `Doer` class. In the `extend` example, on the other hand, the methods are added to the instance of the class `Class`, in this case the `Doer` class. That means the methods are added to the class itself.

Similarly, if you have an instance of a class, you can call extend on it to apply a module to that class only:

    module DoIt
      def do_it
        "I'm doing it!"
      end
    end

    class Doer
    end

    doer = Doer.new
    doer.extend(DoIt)
    doer.do_it #=> "I'm doing it!"
    Doer.new.do_id # raises NoMethodError

That means you can use `extend` to methods to an instance of a class, the exact opposite of how people usually explain `extend` working. You can also use `include` to add class methods like so:

    module DoIt
      def do_it
        "I'm doing it!"
      end
    end

    class Doer
      class << self
        include DoIt
      end
    end

    Doer.do_it #=> "I'm doing it!"

You can even do something similar to use `include` to add methods to a single instance of a class:

    module DoIt
      def do_it
        "I'm doing it!"
      end
    end

    class Doer
    end

    doer = Doer.new
    class << doer
      include DoIt
    end
    doer.do_it #=> "I'm doing it!"
    Doer.new.do_it # raises NoMethodError

So you can see that `extend` and `include` have nothing really to do with whether instance or class methods are added to a class, but more how those methods are applied.

How is any of this useful? Besides being a lot (A LOT) of fun, this can frequently be helpful knowledge when dealing with a DSL, usually in a gem. Recently I needed to edit some code in a rails codebase that used a DSL to generate a sitemap. Most of the code appeared in a block and for some reason all of the rails url helpers were available, but not some custom url-related helpers we'd defined in other rails helpers. We determined that the DSL was most likely using some sort of `instance_eval`-based magic so we were able to use `extend` inside the block to get the other helper methods we needed.

I hope you found this closer look at `include` and `extend` illuminating or interesting and can use it next time you need to deal with some overly metaprogrammed ruby code.
