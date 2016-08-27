---
title: Intermediate Recursion - Fibonacci Sequence with Memoization
description: An intermediate guide to recursion in programming, using memoization
tags:
  - Javascript
  - The Basics
---

<p>After <a href="/blog/recursion-basics-adding-numbers-in-an-array-with-javascript">my last post</a> where I described some recursion basics with JavaScript, I thought it would be fun to get into a slightly more advanced topic: <a href="http://en.wikipedia.org/wiki/Memoization">Memoization</a>.</p>

<p>You can read that article, but the basic concept of memoization is not repeating calculations if you've already found the answer. The example used there is finding factorials (<code>5! = 5 * 4 * 3 * 2 * 1</code>), but that only works if you call the function multiple times in your program. I want to talk about those rare cases where memoization comes in handy within the function itself.</p>
<p class="lead">Fibonacci Sequence</p>
<p>You've probably heard about this sequence before - it's the one followed by pine cones and the golden ratio. It starts <code>0, 1, 1, 2, 3, 5, 8, 13...</code> where each number is the sum of the two previous numbers.</p>
<p>Based on that description, you can probably guess if we wanted to calculate the <code>nth</code> fibonacci number, recursion would come in handy. The first pass looks like this in JavaScript:</p>
{% highlight js %}
function fibonacci(positiveInteger) {
    if (positiveInteger === 1) {
        return 1;
    } else if (positiveInteger === 0) {
        return 0;
    } else {
        return fibonacci(positiveInteger - 2) + fibonacci(positiveInteger - 1);
    }
}
{% endhighlight %}
<p>Makes sense? You build in some automatic returns for <code>0</code> and <code>1</code> and then it works as expected with the answer being the sum of the two previous fibonacci numbers.</p>
<p class="lead">The problem</p>
<p>It works great! The problem, though, lies in trying to calculate larger numbers. Running <a href="http://nodejs.org/">node</a> in the terminal on my Chromebook starts getting slow around <code>fibonacci(30)</code> and <code>fibonacci(100)</code> appears to completely crash my terminal. I suspect it would stop running at some point, but I don't want to wait all day.</p>
<p class="lead">The solution - Memoization</p>
<p>As you probably guessed, we can use memoization to improve this behavior. How? Each time we calculate a fibonacci number using the above function, we were calculating all the fibonacci numbers down to <code>0</code>. This involves a <em>lot</em> of repeated calculations. Let's try to remember all the fibonacci numbers we've calculated and pass them into the recursive calls.</p>
{% highlight js %}
function fibonacci(positiveInteger, foundFibonaccis) {
    if (typeof(foundFibonaccis) === 'undefined') {
        var found = { 0: 0, 1: 1 };
    } else {
        var found = foundFibonaccis;
    }
    if (typeof(found[positiveInteger]) !== 'undefined') {
        return found[positiveInteger];
    } else {
        found[positiveInteger] = fibonacci(positiveInteger - 2, found) + fibonacci(positiveInteger - 1, found);
    }
    return found[positiveInteger];
}
{% endhighlight %}
<p>Now we are storing each calculated number in an object and passing it into future recursive calls. If nothing is passed in, I set the object to <code>{ 0: 0, 1: 1 }</code> much like I supplied the answers for <code>0</code> and <code>1</code> in the first function.</p>
<p>Does that improve the performance? Oh yeah! On my Chromebook I now get the answer for <code>fibonacci(1000)</code> almost instantly. In fact, I get the answer up to <code>fibonacci(1476)</code> right away and the only reason I can't calculate higher fibonacci numbers is that JavaScript can't handle it and starts returning <code>Infinity</code>.</p>
<p>I hope you found this mini introduction to memoization helpful. If you've found other areas where memoization would be helpful sound off in the comments!</p>
