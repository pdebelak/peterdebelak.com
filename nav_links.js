  var allLinks = [
    "http://pdebelak.github.io/blog/posts/week1_favoritewebsites.html",
    "http://pdebelak.github.io/blog/posts/week2_technical.html",
    "http://pdebelak.github.io/blog/posts/week3_technical.html",
    "http://pdebelak.github.io/blog/posts/week4_technical.html",
    "http://pdebelak.github.io/blog/posts/week5_technical.html",
    "http://pdebelak.github.io/blog/posts/week6_technical.html",
    "http://pdebelak.github.io/blog/posts/week7_technical.html",
    "http://pdebelak.github.io/blog/posts/week8_technical.html",
    "http://pdebelak.github.io/blog/posts/week2_cultural_blog.html",
    "http://pdebelak.github.io/blog/posts/week3_cultural_blog.html",
    "http://pdebelak.github.io/blog/posts/week4_cultural_blog.html",
    "http://pdebelak.github.io/blog/posts/week5_cultural_blog.html",
    "http://pdebelak.github.io/blog/posts/week6_cultural_blog.html",
    "http://pdebelak.github.io/blog/posts/week7_cultural_blog.html",
    "http://pdebelak.github.io/blog/posts/week8_cultural_blog.html"];
  var culturalLinks = [
    "http://pdebelak.github.io/blog/posts/week2_cultural_blog.html",
    "http://pdebelak.github.io/blog/posts/week3_cultural_blog.html",
    "http://pdebelak.github.io/blog/posts/week4_cultural_blog.html",
    "http://pdebelak.github.io/blog/posts/week5_cultural_blog.html",
    "http://pdebelak.github.io/blog/posts/week6_cultural_blog.html",
    "http://pdebelak.github.io/blog/posts/week7_cultural_blog.html",
    "http://pdebelak.github.io/blog/posts/week8_cultural_blog.html"]; 
  var techLinks = [
    "http://pdebelak.github.io/blog/posts/week1_favoritewebsites.html",
    "http://pdebelak.github.io/blog/posts/week2_technical.html",
    "http://pdebelak.github.io/blog/posts/week3_technical.html",
    "http://pdebelak.github.io/blog/posts/week4_technical.html",
    "http://pdebelak.github.io/blog/posts/week5_technical.html",
    "http://pdebelak.github.io/blog/posts/week6_technical.html",
    "http://pdebelak.github.io/blog/posts/week7_technical.html",
    "http://pdebelak.github.io/blog/posts/week8_technical.html"];
  var randomLink = document.getElementById("random");
  randomLink.onclick = function() {
    window.location = allLinks[Math.floor(Math.random()*allLinks.length)]];
  }
  function nextTech() {
    if (location.href == techLinks[-1]) {
      window.location = techLinks[-1];
    }
    else {
      window.location = techLinks[indexOf(location.href + 1)];
    }
  }
  function prevTech() {
    if (location.href == techLinks[0]) {
      window.location = techLinks[0];
    }
    else {
      window.location = techLinks[indexOf(location.href - 1)];
    }
  }
  var prevCultural = document.getElementById("prevCultural");
  prevCultural.onclick = function() {
    if (location.href == culturalLinks[0]) {
      window.location = culturalLinks[0];
    }
    else {
      window.location = culturalLinks[indexOf(location.href + 1)];
    }
  }
  var nextCultural = document.getElementById("nextCultural");
  nextCultural.onclick = function() {
    if (location.href == culturalLinks[-1]) {
      window.location = culturalLinks[-1];
    }
    else {
      window.location = culturalLinks[indexOf(location.href + 1)];
    }
  }
