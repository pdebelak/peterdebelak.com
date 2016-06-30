---
title: Recursion Basics - Adding Numbers in an Array with Javascript
description: A basic guide to recursion in programming
---

<p>Recursion can be confusing, especially for people new to programming. I thought I'd post a very simple example here to help beginners.</p>

<p class="lead">The problem</p>
<p>Let's say you want to add all the numbers in an array without using a loop. (Why can't you use a loop? Because.) If you knew beforehand the number of items in the array you could write:</p>
<pre><code>
function addArray(arrayOfNums) {
    return arrayOfNums[0] + arrayOfNums[1];
}
</code></pre>
<p>That would work great for arrays with only 2 numbers. You could write out as many <code>arrayOfNums[x] +</code> as you wanted, but what if you needed to add an array with hundreds of numbers? Enter recursion. Try this:</p>
<pre><code>
function addArray(arrayOfNums) {
    return arrayOfNums.shift() + addArray(arrayOfNums);
}
</code></pre>
<p>What is happening there? <code>arrayOfNums.shift()</code> removes the first item in an array and returns that item, so you are basically asking your code to add the first number in the array to the sum (using the <code>addArray</code> function) of the remaining items in the array. The function keeps calling itself using progressively smaller arrays until it has added all the numbers together. That is the magic of recursion.</p>
<p>So we're all set? Unfortunately, no. Give it a try and you'll get an infinite loop! You need to set a condition upon which the recursion will end and the function will exit.</p>
<p>In this case, it makes sense to just return <code>0</code> if the array is empty because the sum of an empty array should be 0.</p>
<pre><code>
function addArray(arrayOfNums) {
    if (arrayOfNums.length === 0) { return 0; }
    return arrayOfNums.shift() + addArray(arrayOfNums);
}
</code></pre>
<p>Now if you run this code you will get the expected results! I hope this can help a beginner get the hang of recursion.</p>
