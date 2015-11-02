---
title: Complex ActiveRecord Queries Pt. II - Greatest N Per Group
description: How to find the greatest item in a group in ActiveRecord and Rails
---

<p>It is time again to get ridiculous with ActiveRecord. <a href="/blog/complex-activerecord-queries-with-includes">Last time</a> I talked about dealing with <code>includes</code> and sorting. Today I'll talk about an issue I had with sorting by a <code>one-to-many</code> relationship.</p>

<p class="lead">The situation</p>
<ul>
<li><code>User</code>s have many <code>Subscription</code>s</li>
<li>A <code>User</code>'s end date (when they are no longer active) is based on the <code>expiration_date</code> of the <em>last</em> <code>Subscription</code> that user has</li>
<li>You want to order the <code>User</code>s by end date</li>
</ul>
<p>Okay! Great! Should be easy. You want to write this:</p>
<pre>
User.joins(:subscriptions).order('subscriptions.expiration_date ASC')
</pre>
<p class="lead">The problem</p>
<p>It doesn't work. Of course.</p>
<p>Why? Because if a <code>User</code> has more than one <code>Subscription</code> which one should be used for ordering? That code doesn't really make sense.</p>
<p>After some googling around I discovered that there's a name for this problem - greatest n per group. (By the way, isn't it annoying when it would be so easy to find the answer to something if you only knew the name? It's like the old joke about not being able to look up something in the dictionary to see how it's spelled unless you know how it's spelled.) In this case we want to find the latest (instead of greatest) <code>Subscription</code> in each group of <code>Subscription</code>s owned by each <code>User</code>. I found <a href="http://spin.atomicobject.com/2012/09/21/using-activerecord-to-abstract-greatest-n-per-group-queries/">this excellent blog post</a> showing how to solve that problem in ActiveRecord.</p>
<p>After spending time trying to grok the post (it is confusing!) I produced this:</p>
<pre>
User.joins(:subscriptions).joins('LEFT OUTER JOIN subscriptions sp ON (subscriptions.expiration_date < sp.expiration_date and subscriptions.user_id = sp.user_id)').where('sp.id IS NULL').order('subscriptions.expiration_date ASC')
</pre>
<p>So simple! <code>sp</code> is an arbitrary name representing the <code>Subscription</code> that is later than the one represented by <code>subscriptions</code>. You keep searching until <code>sp.id IS NULL</code>, meaning that <code>subscriptions</code> represents the latest <code>Subscription</code> for that <code>User</code>.</p>
<p>As I'm sure you predicted, this doesn't work either. Postgres immediately complains that you can't order by something you aren't selecting (why didn't it complain in the first case? I don't know, ActiveRecord).</p>
<p>Okay! We'll just select that too:</p>
<pre>
User.joins(:subscriptions).select('users.*, subscriptions.expiration_date').joins('LEFT OUTER JOIN subscriptions sp ON (subscriptions.expiration_date < sp.expiration_date and subscriptions.user_id = sp.user_id)').where('sp.id IS NULL').order('subscriptions.expiration_date ASC')
</pre>
<p>Another beautiful ActiveRecord query. Just as a note, I really like ActiveRecord because it makes 99% of all the queries you do beautiful and semantic. Unfortunately, that other 1% is out there to get you.</p>
<p>I hope this helps someone trying to fight with ActiveRecord to sort by a single instance in a <code>has_many</code> relationship!</p>
