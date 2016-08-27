---
title: Private Attr Readers in Ruby - The Best Thing Ever
description: Keep your instance variables hidden, but changeable, with private attr_readers
tags:
  - Ruby
---

Private `attr_reader`s are great and you should use them. When I start writing a class my skeleton usually looks like this:

{% highlight ruby %}
class AwesomeClass
  def initialize(sweet:, keyword:, arguments:)
    @sweet = sweet
    @keyword = keyword
    @arguments = arguments
  end

  private

  attr_reader :sweet, :keyword, :arguments
end
{% endhighlight %}

If I need to make something public I always can, but by immediately starting with private `attr_reader`s I start by hiding my instance variables behind a method. This hiding is not only from other classes (because they are private), but also from the rest of the class since the other methods aren't directly accessing the instance variables. This way, if I need to add some more logic to a instance-variable related method, the code change is very easy.

{% highlight ruby %}
class AwesomeClass
  def initialize(sweet:, keyword:, arguments:)
    @sweet = sweet
    @keyword = keyword
    @arguments = arguments
  end

  private

  attr_reader :sweet, :arguments

  def keyword
    KeywordManager.new(@keyword)
  end
end
{% endhighlight %}

Give this approach a try and I think you'll find yourself doing it automatically from now on.
