---
title: How to Search and Change Text with Javascript
description: It's easy to search and change a string in javascript, but it can be confusing to change text on a whole html page without affecting any bound javascript or non-text html.
---

Replacing text in javascript is easy, just use [replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) (i.e. `'wat'.replace('a', 'ha'); //=> 'what'`). Sometimes, though, you want to do a search and replace on text in a whole html document that includes html tags and things that aren't just text. I had to do that recently and found it wasn't as obvious as I first thought.

Let's say I wanted to replace all occurrences of `hats` with `rats`. Simple enough.

My first thought was to do something like this:

{% highlight js %}
function hatsToRats() {
  var html = document.innerHTML;
  var newHtml = html.replace(/hats/, 'rats');
  document.innerHTML = newHtml;
}
{% endhighlight %}

This has a few problems. First, it changes all occurrences of `hats` to `rats`, even those inside html tag properties to `<a href="mysite.com/hats">hats</a>` becomes `<a href="mysite.com/rats">rats</a>`. Ideally, I would want `<a href="mysite.com/hats">rats</a>` so the link isn't broken. The other problem is that if there were any javascript events bound to elements on the page, I've just replaced all the elements so those events will no longer be bound. I wanted this function to be independent of any other javascript so it shouldn't know about what events it might need to rebind after running.

I wasn't sure what to do so I did a little searching and came across [Phrogz's stackoverflow answer](http://stackoverflow.com/a/10730777/3945932) to a related question that explained `document.createTreeWalker` as a solution. This gives us access to each text node in the document like so:

{% highlight js %}
function hatsToRats() {
  var html = document.querySelector('html');
  var walker = document.createTreeWalker(html, NodeFilter.SHOW_TEXT);
  var node;
  while (node = walker.nextNode()) {
    node.nodeValue = node.nodeValue.replace(/hats/, 'rats')
  }
}
{% endhighlight %}

What this does is finds all text nodes inside the `html` tag on the document and replaces its value with the newly hats/rats-swapped text. This won't affect binding on any element on the page (even if you crazily have an event bound to a text node) and leaves tag attributes (like the aforementioned `href`) alone.

Hopefully this article saves you some time if you ever need to do some html find and replacing!
