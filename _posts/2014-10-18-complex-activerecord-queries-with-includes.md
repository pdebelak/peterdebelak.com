---
title: Complex ActiveRecord Queries with Includes
description: A guide to a very complicated ActiveRecord query from a Rails app
---
<p>ActiveRecord's way of separating Ruby developers from writing SQL is fantastic, but sometimes its behavior can be a little surprising. I ran into some ActiveRecord-related trouble recently and wanted to share the solution.</p>

<p class="lead">The situation</p>
<p>I had a model, let's call it <code>DateRange</code> that represents a range of dates (amazing, right?). Each date range could have many <code>TakenDate</code>s representing a range of dates that fall within its parent date range and are no longer available.</p>
<p class="lead">The problem</p>
<p>Let's say I'm trying to find out if a given range of dates is not taken within an existing <code>DateRange</code>. That means that it falls within a given range and has not been taken by a <code>TakenDate</code>. So I want to do a query that returns all <code>DateRange</code>s and associated <code>TakenDate</code>s if they exist. Great! ActiveRecord has an <code>includes</code> method just for this. So I wrote a query like so:</p>
<pre><code>
DateRange.includes(:taken_dates)
  .where('date_ranges.start_date >= ? AND date_ranges.end_date <= ?',
          some_date, some_other_date)
  .where.not('(taken_dates.start_date >= :start_date AND taken_dates.start_date <= :end_date) OR (taken_date.end_date >= :start_date AND taken_date.end_date <= :end_date)',
          start_date: some_date, end_date: some_other_date)
</code></pre>
<p>I know that is bewildering, but given two dates, it tries to find a <code>DateRange</code> that it falls within that doesn't have a conflicting <code>TakenDate</code>. It doesn't work, however. Why? Because it never returns any <code>DateRange</code> without any <code>TakenDate</code>s. I was surprised about that, because I assumed the <code>where.not</code> call would happily return any <code>DateRange</code>s without <code>TakenDate</code>s.</p>
<p>For a while I was stymied at how I could do this with a single query. It would be possible to do two different queries and combine them, but that would be slower and would not leave me with an ActiveRecord collection.</p>
<p class="lead">The solution</p>
<pre><code>
DateRange.includes(:taken_dates)
  .where('date_ranges.start_date >= ? AND date_ranges.end_date <= ?',
          some_date, some_other_date)
  .where('taken_dates.id IS NULL OR NOT (taken_dates.start_date >= :start_date AND taken_dates.start_date <= :end_date) OR (taken_date.end_date >= :start_date AND taken_date.end_date <= :end_date)',
          start_date: some_date, end_date: some_other_date)
</code></pre>
<p>That is one ugly query, but the key is specifying <code>taken_date.is IS NULL OR</code> some condition. This returns everything without an association while still allowing you to do a query based on the association if it exists!</p>
<p>I don't doubt that there is a better way to tackle this problem (feel free to let me know in the comments!), but I think it is good to know some tricks for those corner cases where ActiveRecord doesn't make your life easy.</p>
