---
title: Requiring Sign In in Phoenix
description: Peter has been coming to the Phoenix framework from Rails, so he has to relearn how to accomplish certain tasks that he repeatedly has to do in Rails. Today he discusses how to require a user for certain controller actions.
tags:
  - Elixir
  - Phoenix
---

I talked earlier about [creating and using a `current_user` in Phoenix](/blog/basic-current_user-setup-with-elixir-and-phoenix/),
but I didn't explain
how to require a `current_user` for certain controller actions. In Rails I would
use a `before_filter` (or I guess now `before_action`). I wasn't sure how to do
this in Phoenix, though.

There are two things to figure out:

1. What is the equivalent of `before_action` in Phoenix?
2. How should I share that code in all of my controllers?

<h2 class="lead">Use a plug when you would use a <code>before_filter</code></h2>

You can read [the documentation for
plugs](http://www.phoenixframework.org/docs/understanding-plug) for more
details, but the general idea would be something like:

{% highlight elixir %}
defmodule App.SomeController do
  use App.Web, :controller

  plug :require_user when action in [:new, :create]

  # actions go here
end
{% endhighlight %}

This would run the `require_user` function before the `new` and `create` action,
just like you would do with a `before_action` in Rails.

<h2 class="lead">Put code in web.ex to share it with all controllers</h2>

In Rails you can add methods to `ApplicationController` and, since all your other
controllers inherit from it, they will also have the same methods. As such, you
define general methods like `require_user` there so you can use them everywhere.

Elixir is not object oriented so you cannot use inheritance. Instead, there are
a series of macros inside the `App.Web` module that get run for various types of
modules. For example, the code inside the `controller` function gets put into
any module where you write `use App.Web, :controller`. As such, you can add code
to that function and all your controllers will "inherit" it.

<h2 class="lead">What should the <code>require_user</code> function look like?</h2>

Currently, I have a module like this:

{% highlight elixir %}
defmodule App.RequireUser do
  def require_user(conn, _) do
    if App.UserSession.current_user?(conn) do
      conn
    else
      conn |>
      Phoenix.Controller.put_flash(:error, "You must be signed in to view that page.") |>
      Phoenix.Controller.redirect(to: "/") |>
      Plug.Conn.halt
    end
  end
end
{% endhighlight %}

The general way it works is: if there is a current user, it just returns the
`conn` without changing anything. This means the controller action will happen
as normal. If there isn't a user signed in, I add an error message to the flash,
redirect to the home page, and then `halt` the connection so no further code is
run. Depending on your app, you may just want to return a `403` status code and
not redirect or do something totally different.

Then, I add `import App.RequireUser` to the `quote do` block inside the
`controller` function in `App.Web` so all the controllers have access to it. I
could also just `import App.RequireUser` in each controller that needs it, but
all my controllers need it so it makes sense to do it in a single place for me.

I hope this further helps you dealing with the concept of `current_user` in your
Phoenix applications.
