---
title: "The Basics: N+1 Queries"
description: So much of programming is learning the jargon programmers use. Learn what an N+1 query is, how to identify them in your code, and how to avoid generating them.
---

*The basics is a new series where I explain a basic programming concept or term for new computer programmers or those who need a refresher.*

Imagine that you are a waiter in a diner. You are serving a group of 10 people at a single table. One of them asks for a refill, so you walk to the back of the restaurant, refill their drink, and return to the table. As you deliver the drink another person at the table realizes they need a refill too, so you go through the same steps. Again, upon returning to the table another person wants a refill so you find yourself spending all your time walking back and forth from the table to the back of the restaurant, each time carrying only a single drink. After a while you realize you should ask the whole table "Does anyone else need a refill?" before going to the back. This way you can carry and fill multiple drinks and the same time reducing the amount of time you need to spend walking back and forth.

An N+1 query is when you do this same thing to your database. Lets see an example from a typical rails app:

    # app/models/user.rb
    class User < ActiveRecord::Base
      has_one :address
    end

    # app/models/address.rb
    class Address < ActiveRecord::Base
      belongs_to :user
    end

    # app/controllers/users_controller.rb
    class UsersController < ApplicationController
      def index
        @users = User.all
      end
    end

    # app/views/users/index.erb
    <ul>
      <% @users.each do |user| %>
      <li>
        <%= user.name %>
        <%= user.address.street_name %>
      </li>
      <% end %>
    <ul>

Everything looks great, you are looping through the users in the system and displaying their name and stree name. The problem, though, is that you are performing N+1 queries.

The "1" in N+1 is for `User.all`. You have to look up the users to display the page, so there is nothing wrong with that as you look up all the users at once. The problem comes from the "N" which means you are doing a database query for each user's address separately (you do "N" lookups for "N" addresses). As a waiter the solution to this problem was to get all the refill requests at the same time, and the solution is the same here. Update your controller as follows:

    # app/controllers/users_controller.rb
    class UsersController < ApplicationController
      def index
        @users = User.includes(:address).all
      end
    end

This causes Rails to look up all the addresses at once so you go from N+1 queries to 1+1 queries (more commonly known as 2 queries). Regardless of the technology you are using, you should look for N+1 queries and eliminate them by looking up all the records you will need as a group instead of individually.

I hope this little explanation will help you understand what other programmers are talking about when they say "N+1" and will also help you avoid this common mistake.
