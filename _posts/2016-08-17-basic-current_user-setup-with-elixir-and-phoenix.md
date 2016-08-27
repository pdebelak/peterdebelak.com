---
title: Basic Current User Setup with Elixir and Phoenix
description: Like many rails devs, Peter has been exploring elixir and the phoenix framework. Here, he explains how to set the current user in a way that is easier to test.
tags:
  - Elixir
  - Phoenix
---

Like many rails developers, I've been dabbling with [elixir](http://elixir-lang.org/) and the [phoenix framework](http://www.phoenixframework.org/). While phoenix is clearly a lot like rails, it's always an adjustment to learn a new framework and it is certainly an adjustment for me to get used to the [functional programming](https://en.wikipedia.org/wiki/Functional_programming) paradigm coming from ruby.

One major philosophical difference between elixir and ruby is the attitude towards mocks and stubs. As elixir creator José Valim [said](https://twitter.com/josevalim/status/641617411242913792):

> I will fight against mocks, stubs and YAML in Elixir with all my... friendliness and energy to promote proper education on those topics.

This was a struggle for me since I was used to stubbing the `current_user` method in my rails controller tests to fake a user being logged in. I initially did `Plug.Conn.put_session(:user_id, id)` to store a user's id in the session. This worked great, but was hard to use in tests because you can't do `put_session` on a connection in controller tests without first making a request in the test. This slows things down for no real benefit.

I found [this extremely helpful post](http://work.stevegrossi.com/2016/06/02/testing-current-user-in-a-phoenix-app-the-easy-way/) that explains a ways to assign the current user to the connection directly in order to make testing easier. It doesn't actually explain how to do this in the production code, though, since just assigning a current user to the connection doesn't actually persist it to the session so the user won't be logged in on subsequent requests. After some thinking I came up with a solution so I thought I'd write it down here to hopefully help myself in the future and other people learning elixir and/or phoenix.

I have a module that handles session stuff called `UserSession`:

{% highlight elixir %}
defmodule App.UserSession do
  def login_user(conn, user) do
    conn
    |> Plug.Conn.put_session(:user_id, user.id)
    |> Plug.Conn.assign(:current_user, user)
  end

  def logout(conn) do
    conn
    |> Plug.Conn.delete_session(:user_id)
    |> Plug.Conn.assign(:current_user, nil)
  end

  def current_user(conn) do
    conn.assigns[:current_user] || load_current_user(conn)
  end

  defp load_current_user(conn) do
    id = Plug.Conn.get_session(conn, :user_id)
    if id do
      user = App.Repo.get!(App.User, id)
      login_user(conn, user)
    end
  end
end
{% endhighlight %}

What I'm doing here is storing the current user's id in the session as well as assigning the user to the connection. When calling the `current_user` function if the connection does not already have a `current_user` assigned, I look up the user from the id stored in the session and assign that user to the session. This means that multiple calls to `current_user` won't do a database lookup, but will just find it already assigned to the connection.

I added the following code to the `test/support/conn_case.ex` file inside the `quote do` block:

{% highlight elixir %}
defp with_current_user(conn, user) do
  conn
  |> assign(:current_user, user)
end
{% endhighlight %}

This allows me to write tests assuming a user is logged in that start like:

{% highlight elixir %}
user = create_user # assuming you have some function that creates a user
conn
|> with_current_user(user)
|> get(some_path(conn, :get))
{% endhighlight %}

I hope this helps you write phoenix apps with less onerous test setup! If you have better solutions please let me know in the comments.
