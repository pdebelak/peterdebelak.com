---
title: "The Basics: Migrating Production Schemas"
description: When moving from toy apps with fake data to production apps with real data that can't be lost, it can be hard to know how to adjust your database schema. Peter explains a few simple steps to make it happen seamlessly.
tags:
  - Ruby
  - Rails
  - Databases
  - The Basics
---

*The basics is a series where I explain a basic programming concept or term for new computer programmers or those who need a refresher.*

When you start learning programming you are building toy apps or just apps for yourself and it is easy to get in the habit of dropping your entire database and starting from scratch every time you need to change the database schema. Once you are working with real user's data, though, it's no longer an option to lose all of your data every time you change your mind about the proper structure for the database.

Your only options are to always get the database schema design perfect the first time (impossible!) or to have a strategy for rearranging a database table's columns without losing anything, ideally without downtime. Obviously the second option is the only real one. Even if you always make the right decisions about the database, new information or feature requests might make you want to change it.

The steps needed to change the database schema without losing data or having downtime are pretty much always the same. Each of these code-change steps should be followed by a deploy.

1. Create a new column and start writing to it.
2. Backfill old data to have the right value in the new column.
3. Start reading from the new column.

Let's look at an example. Here's a simple Rails blog app with posts and comments:

{% highlight ruby %}
# app/models/post.rb
class Post < ActiveRecord::Base
  has_many :comments
end

# app/models/comment.rb
class Comment < ActiveRecord::Base
  belongs_to :post
end

# app/controller/comments_controller.rb
class CommentsController < ApplicationController
  def create
    post = Post.find(params[:post_id])
    post.comments.create!(comment_params)
    redirect_to post_path(post)
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end

# db/schema.rb
# some stuff
create_table "comments" do |t|
  t.integer "post_id"
  # various other fields
end

create_table "posts" do |t|
  # various fields
end
# more stuff
{% endhighlight %}

Now a new requirement comes in to allow users to comment on other comments in addition to posts. This means that comments need a [polymorphic association](http://guides.rubyonrails.org/association_basics.html#polymorphic-associations) to both comments and posts. The `post_id` field will no longer cut it because you'll need a `commentable_type` and `commentable_id` column on the comments table.

Step 1 looks like this:

{% highlight ruby %}
# app/models/post.rb - no change
class Post < ActiveRecord::Base
  has_many :comments
end

# app/models/comment.rb
class Comment < ActiveRecord::Base
  belongs_to :post
  belongs_to :commentable, polymorphic: true
  has_many :comments, as: :commentable
end

# app/controller/comments_controller.rb
class CommentsController < ApplicationController
  def create
    post = Post.find(params[:post_id])
    if params[:comment_id]
      commentable = Comment.find(params[:comment_id])
    else
      commentable = post
    end
    commentable.comments.create!(comment_params(commentable))
    redirect_to post_path(post)
  end

  private

  def comment_params(commentable)
    comment_params = params.require(:comment).permit(:body)
    comment_params.merge(commentable: commentable).permit!
  end
end

# db/schema.rb
# some stuff
create_table "comments" do |t|
  t.integer "post_id"
  t.string "commentable_type"
  t.integer "commentable_id"
  # various other fields
end

create_table "posts" do |t| # no change
  # various fields
end
# more stuff
{% endhighlight %}

Here we add the new fields to comment and start writing to them by setting a comments `commentable`. I just add some more logic to the `CommentsController` to handle the fact that the comment might be on a comment or post (as an aside, this code in the `CommentsController` is pretty bad and should probably be moved into its own class). At this point the code should be deployed to production.

Step 2 is a backfill:

{% highlight ruby %}
# in a migration
Comment.where(commentable_id: nil).find_each do |comment|
  comment.update!(commentable: comment.post)
end
{% endhighlight %}

Once this backfill is run in production we are ready to start reading from that new column in the `Post` class:

{% highlight ruby %}
# app/models/post.rb - no change
class Post < ActiveRecord::Base
  has_many :comments, as: :commentable
end

# app/models/comment.rb
class Comment < ActiveRecord::Base
  belongs_to :commentable, polymorphic: true
  has_many :comments, as: :commentable
end
{% endhighlight %}

Once this is deployed the `post_id` column can be deleted as it is no longer needed. While this is certainly more steps than just dropping the database and starting over, it isn't too bad to do things this way and avoid losing any data or having any downtime. I hope you found this helpful and are not scared to refactor your database schema the same way you refactor your code.
