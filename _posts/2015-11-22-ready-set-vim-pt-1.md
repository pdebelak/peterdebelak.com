---
title: Ready, Set, Vim! Part 1 - Modal Editing
description: Getting started with vim can be daunting. Peter guides you through small steps that won't overwhelm you. We start with modal editing.
---

Programmers who don't use either [vim](http://www.vim.org/) or [emacs](https://www.gnu.org/software/emacs/) secretly wonder if they are missing out one some sort of text editor nirvana. Well, they aren't. But I *do* think vim and emacs are better than the other editors I've tried. Not to mention all the cred you get for using an old school text editor! Since no one wants to use [ed](https://en.wikipedia.org/wiki/Ed_(text_editor)) in their daily life you are left with only vim and emacs as your old school options.

While [I've tried out emacs](/blog/trying-out-emacs/), I haven't used it enough to tell anyone how to get started. Since I use vim every day, though, I thought it'd be helpful to set out the step-by-step program to learning vim I wish I had when I was starting. Most people will tell you to start with the excellent `vimtutor` (you can type that in the terminal to get a vim tutorial), but I think it gives you too much to remember too fast when you are an absolute beginner.

<h2 class="lead">Installing vim</h2>

The first thing you need to do is install vim. Assuming you are coming from a non-terminal-based editor, I think you should start with a GUI version of vim such as [mvim](https://github.com/b4winckler/macvim) for macs and gvim for linux (probably just `apt-get/yum install gvim`?). Using a GUI vim means that you can use your mouse and copying and pasting like you are used to from other editors. You'll probably stop using your mouse at some point, but it doesn't make sense to worry about that as a first step.

<h2 class="lead">Modal editing</h2>

The first thing to learn as a vim user is the key to what people love and hate about vim - modal editing.

Modal editing just means that your keystrokes mean different things to vim depending on what mode you are in. The main modes you will use are normal-mode, insert-mode, visual-mode, and command-line-mode. Right now don't worry about all of those. We'll just be learning about normal-mode and insert-mode. Insert-mode is the mode that other editors are in all the time. When you type a letter that letter appears on the screen. Normal-mode is the secret to vim's power since typing letters doesn't cause them to appear in the text, but instead executes vim commands. Some day you'll be turning `a_constant` into `A_CONSTANT` by typing `viwU`, but that's for the future. Normal mode is the scary mode you've hear about that causes people to open vim and not be able to type in anything.

Don't be scared, though! I'll ease you into normal mode. At first I expect you'll move around using the arrow keys and mouse just like you are used to.

A big concern people have when hearing about vim is that they won't know what mode they are. Like, "Am I in normal mode? Insert? Visual? I won't know what my typing will do!" That doesn't really happen in real life, though, because of what we are going to learn in this lesson. That lesson is: **you should always be in normal mode unless you are actually typing in text.**

So, this is the first thing you will do when using vim: When you are ready to enter text, type `i` to enter insert-mode. As soon as you have finished typing that text immediately press `esc` to return to normal mode. That's it. The only other things you might need to know are `:w` to save and `:q` to quit, but in GUI vims you should be able to do `ctrl/cmd+s` to save and `ctrl/cmd+q` to quit (`cmd` being for macs and `ctrl` for linux).

<h2 class="lead">What you know so far:</h2>

{% highlight bash %}
i # enter insert mode
esc # return to normal mode
{% endhighlight %}

I know what you are thinking, "That is stupid. I'm just typing more because of vim's weird modes. I'll just stay in insert mode all the time." Okay, I understand that it is stupid *right now*, but if you get in this habit everything afterwards will be much easier and you'll never be confused about what mode you are in.

Next time we'll learn about moving the cursor the vim way, but in the meantime: Get vimming!
