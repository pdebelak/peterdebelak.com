---
title: Routing with Rails and Angular
description: A brief guide to routing with Rails and AngularJS
---

<p>There are a lot of great blog posts about setting up an app with <a href="http://rubyonrails.org/">Rails</a> as the back-end and <a href="https://angularjs.org/">AngularJS</a> as the front-end. You can find some <a href="http://www.intridea.com/blog/2014/9/25/how-to-set-up-angular-with-rails">here</a>, <a href="http://angular-rails.com/bootstrap.html">here</a>, or <a href="https://www.honeybadger.io/blog/2013/12/11/beginners-guide-to-angular-js-rails">here</a>. When it comes to routing, though, the best approach is unclear.

<p>If you are using <a href="https://docs.angularjs.org/api/ngRoute">ngRoute</a> (and you really should be to allow deep linking on your Angular app) your server should be able to handle requests like <code>/blog/posts/1</code> and show the appropriate blog post. You can easily do this by just routing all requests to your main index page and let Angular handle the routing. But what urls should Angular use to fetch the post from the server? You could namespace all of the server responses like <code>/api/blog/posts/1</code> but that doesn't really make sense. What you really want is to respond to <code>.html</code> requests by displaying the single-page Angular html and to respond to <code>.json</code> requests with the appropriate resource as json.
<p class="lead">Rails makes this easy!</p>
<p>As anyone who has generated scaffolding with Rails know, it is easy to craft a different response whether it is <code>.html</code> or <code>.json</code>. Your controllers frequently look like:
{% highlight ruby %}
def show
  @post = Post.find(params[:id])
  respond_to do |format|
    format.html # render the html view
    format.json # render the json view
  end
end
{% endhighlight %}
<p>So, if I have my home page at <code>static_pages#home</code> I might write:</p>
{% highlight ruby %}
respond_to do |format|
  format.html { render 'static_pages/home' }
  format.json # rendering the show.json.erb file
end
{% endhighlight %}
<p>Now you don't have to try to redirect all requests in your <code>config/routes</code> file or do anything crazy to properly respond to deep links.</p>
<p>This works fine, but I don't usually feel it necessary to create the <code>.json.erb</code> file for simple models and it also gets quite repetitive to have the same <code>respond_to</code> block in every controller action that takes a get request. Instead, I find that declaring a custom method in your <code>ApplicationController</code> that handles it for you:</p>
{% highlight ruby %}
def ng_respond(response_for_json)
  respond_to do |format|
    format.html { render 'static_pages/home' }
    format.json { render json: response_for_json.to_json }
  end
end
{% endhighlight %}
<p>That way you can create controller actions like this:</p>
{% highlight ruby %}
def show
  @post = Post.find(params[:id])
  ng_respond(@post)
end
{% endhighlight %}
<p>I hope this helps you with routing in your Rails/Angular apps. Leave any tips you might have in the comments.
