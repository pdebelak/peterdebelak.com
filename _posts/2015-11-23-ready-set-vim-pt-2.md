---
title: Ready, Set, Vim! Part 2 - Movement
description: Getting started with vim can be daunting. Peter guides you through small steps that won't overwhelm you. This edition covers basic movement.
---

[Now that you know how to move between normal and insert modes](/blog/ready-set-vim-pt-1/) it's time to actually *do* something in normal mode. We'll start with the basic commands used to move around a file.

<p class="lead">Your new arrow keys</p>

One of the things vim enthusiasts love most about vim is that it keeps your hands on the home row as much as possible. One of the tricks to this are the basic "arrow" keys of vim: `h`, `j`, `k`, and `l`. You'll notice that those keys are all in a row, under your right hand. In normal mode in vim `h` moves the cursor to the left, `j` moves it down, `k` moves it up, and `l` moves it to the right.

`h` and `l` are pretty obvious since those are the keys to the far left and right of the "arrow" keys. `j` and `k` are a little less intuitive. I don't have a mnemonic device and, honestly, if you were to ask me point blank which of those keys moves up and which moves down I'd have a hard time telling you. In practice, though, you'll quickly be hitting the `j` key to move down and the `k` key to move up without thinking about it, to the point where you'll want every application to use those shortcuts (did you know that gmail uses them already?).

When you are first practicing these movement keys, you'll frequently find yourself slipping into using the arrow keys. That's fine. Just try to use `h`, `j`, `k`, and `l` whenever you remember and quickly your hands will gravitate towards using them since they are already right under your hand!

<p class="lead">Searching around</p>

Moving your cursor one line or character at a time will quickly get cumbersome in a big file. The other movement keys we will be learning today are `/` and `?`. They used for searching inside a file. Type `/` and some characters to perform a search forward in a file (i.e. `/test` and then `enter` to move to the next instance of the characters "test" in that file) and use `?` to do the same search but backwards (towards the top of the file). The pattern of using one key to move forward and `shift` plus that key to move backwards will come up again in vim.

<h2 class="lead">What you know so far:</h2>

    i # enter insert mode
    esc # return to normal mode
    h # move left
    j # move down
    k # move up
    l # move right
    / # search forward in file
    ? # search backwards

Using these shortcuts in normal mode, you'll already find that you can spend a lot more time with your hands on the letters of the keyboard, right where they belong, and away from those cumbersome arrow keys. Practice these commands until they become natural. Try to search at every opportunity. Sometimes I find myself searching to find something just a few words away because it can often be the fastest way to get there.

Next time we'll learn some more movement commands that are line specific, but in the meantime: Get vimming!
