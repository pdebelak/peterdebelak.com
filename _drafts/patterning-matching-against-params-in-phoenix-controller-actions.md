---
title: Pattern Matching Against Params in Phoenix Controller Actions
description: Controller actions that do different things depending on which optional params are passed can get messy quickly in Rails. In Phoenix, however, you can you the power of pattern matching to keep simple controller actions that depend on their params.
tags:
  - Elixir
  - Phoenix
---

In controller actions you frequently want to call different code depending on if
a certain param was passed. For example, you might want to either execute a
search if a search param was passed, or just return all of a certain model
otherwise. In Rails, it might look like this:

{% highlight ruby %}
class PostController < ApplicationController
  def index
    if params[:search].present?
      @posts = Post.search(params[:search])
    else
      @posts = Post.all
    end
  end
end
{% endhighlight %}

This isn't too bad, but it can get out of hand quickly if anything even slightly
more complicated is going on.

Phoenix offers a better way, however. Since controller actions in Phoenix are
just regular functions, you can use pattern matching to call different versions
of a function depending on what params are present. Here is what the searching
example might look like in Phoenix:

{% highlight elixir %}
defmodule MyApp.PostController do
  use MyApp.Web, :controller
  alias MyApp.Post

  def index(conn, %{"search" => search}) do
    posts = Post.search(search) |> Repo.all
    render conn, "index.html", posts: posts
  end
  def index(conn, _params) do
    posts = Post |> Repo.all
    render conn, "index.html", posts: posts
  end
end
{% endhighlight %}

I used something like this recently when I wanted a page that showed all posts,
but also one that showed all posts for a certain user.

Here were my routes:

{% highlight elixir %}
# web/router.ex
scope "/", MyApp do
  pipe_through :browser # Use the default browser stack

  resources "/posts", PostController, only: [:index]
  resources "/users", UserController, only: [] do
    resources "/posts", PostController, only: [:index]
  end
end
{% endhighlight %}

So I had both `/posts` and `/users/:id/posts` going to the same controller, and
calling the `index` action. In Rails I would probably avoid this structure
because it would be too complicated. In Phoenix, though, I just set up my
controller like this:

{% highlight elixir %}
defmodule MyApp.PostController do
  use MyApp.Web, :controller

  def index(conn, %{"user_id" => user_id}) do
    posts = Post.for_user_id(user_id) |> Repo.all
    render conn, "index.html", posts: posts
  end
  def index(conn, _params) do
    posts = Post |> Repo.allh
    render conn, "index.html", posts: posts
  end
end
{% endhighlight %}

I hope this helps you remember to take advantage of pattern matching in your
Phoenix controllers, and really anywhere in your Elixir code.
