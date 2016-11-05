---
title: Testing Phoenix Views
description: Phoenix views are a great place to pull logic out of your templates, but they can be confusing to test due to the way Phoenix generates html. Peter explains how to test them properly.
tags:
  - Elixir
  - Phoenix
---

One of the things that immediately appealed to me about Phoenix coming from
Rails was the way it handled views instead of Rails' helpers. Once I started
creating functions in my views that returned html, however, I was instantly
confused about how to test them.

I was making a function in my LayoutView that rendered a link for a site's
navigation. It included some css framework boilerplate stuff and would also add
the `is-active` class if the current path matched the link's path. I wanted to
write a test like this:

{% highlight elixir %}
# the LayoutView
defmodule MyApp.LayoutView do
  use MyApp.Web, :view

  def nav_link(%{request_path: request_path}, text, path) do
    link text, to: path, class: nav_link_class(request_path, path)
  end

  defp nav_link_class(path, path), do: "nav-item is-active"
  defp nav_link_class(_, _), do: "nav-item"
end

# the tests
defmodule MyApp.LayoutViewTest do
  use MyApp.ConnCase, async: true

  alias MyApp.LayoutView

  test "nav_link is not active when not on that page" do
    link = LayoutView.nav_link(%{request_path: "/other_path"}, "Link text", "/path")
    refute String.match? link, ~r/is-active/
  end

  test "nav_link is active when on that page" do
    link = LayoutView.nav_link(%{request_path: "/path"}, "Link text", "/path")
    assert String.match? link, ~r/is-active/
  end
end
{% endhighlight %}

If you try to run these tests, though, you will be surprised. The reason is that
the `link` function does not return a string. Instead, it will return something
like:

{% highlight elixir %}
{:safe, [60, "a", " class=\"nav-item\" href=\"/path\"", 62, "Link text", 60, 47, "a", 62]}
{% endhighlight %}

This is a tuple marked as `:safe` (meaning it has already been html escaped)
with the second element being an IO list. You can read about why it is an IO
list instead of a string in [this interesting post by Big Nerd
Ranch](https://www.bignerdranch.com/blog/elixir-and-io-lists-part-2-io-lists-in-phoenix/).

So, how should this be tested? You could try to match on the IO list, but I
think it is a lot easier to reason about tests against an html string. I looked
through the tests for [Phoenix.HTML on
github](https://github.com/phoenixframework/phoenix_html) and came across the
`Phoenix.HTML.safe_to_string/1` function. This takes a tuple with `:safe` as its
first element and an IO list as its second one and returns a string of html.
This is exactly what we were hoping for. Use that in your tests and they will
work as expected:

{% highlight elixir %}
defmodule MyApp.LayoutViewTest do
  use MyApp.ConnCase, async: true

  alias MyApp.LayoutView
  import Phoenix.HTML, only: [safe_to_string: 1]

  test "nav_link is not active when not on that page" do
    link = LayoutView.nav_link(%{request_path: "/other_path"}, "Link text", "/path")
    |> safe_to_string()
    refute String.match? link, ~r/is-active/
  end

  test "nav_link is active when on that page" do
    link = LayoutView.nav_link(%{request_path: "/path"}, "Link text", "/path")
    |> safe_to_string()
    assert String.match? link, ~r/is-active/
  end
end
{% endhighlight %}

I hope this helps you write tests for your views in Phoenix apps. I can tell you
from experience that if you let too much of your view code go untested (or let a
bunch of logic sneak into your templates) you will be scared to make sweeping
changes to your view-related code &mdash; so get testing!
