---
title: Scoped Finds with Ecto
description: Peter continues to find out how to apply basic Rails idioms in the world of Elixir and Phoenix. Today he shows how to perform scoped database finds.
tags:
  - Elixir
  - Phoenix
  - Ecto
---

I've written before about [setting up a `current_user` in
Phoenix](/blog/basic-current_user-setup-with-elixir-and-phoenix/) and [requiring
that user in your controller action](/blog/requiring-a-user-in-phoenix/). Today
I'll be talking about scoped finds.

<h2 class="lead">What is a scoped find?</h2>

In the Rails world, a scoped find looks like this:

{% highlight ruby %}
def edit
  @post = current_user.posts.find(params[:id])
end
{% endhighlight %}

This is a useful security technique that either finds a post that belongs to the
currently signed in user or raises an `ActiveRecord::RecordNotFound` error
(which Rails turns into a 404). Doing finds like this prevents unauthorized
access without a bunch of boilerplate authorization code.

<h2 class="lead">How can I do a scoped find in Ecto?</h2>

Since Elixir isn't object oriented, you can't do `current_user.posts.find`,
but you can do something similar. The Phoenix generation tasks use
[`Repo.get!`](https://hexdocs.pm/ecto/Ecto.Repo.html#c:get!/3) which works
similarly to Active Record's `find`. For those times when you need to more than
an id lookup, Ecto also has
[`Repo.get_by!`](https://hexdocs.pm/ecto/Ecto.Repo.html#c:get_by/3) which is
works like `get!` but with additional parameters.

It could be used liked this for the same functionality as the Rails/Ruby code above:

{% highlight elixir %}
def edit(conn, %{"id" => id}) do
  post = Repo.get_by!(Post, id: id, user_id: current_user(conn).id)
  render(conn, "edit.html", post: post)
end
{% endhighlight %}

This will either find a record or raise an `Ecto.NoResultsError` (which Phoenix
will turn into a 404).

I hope this helps you perform scoped finds when working on your Phoenix apps.
