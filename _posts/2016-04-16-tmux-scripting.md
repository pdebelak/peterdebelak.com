---
title: Tmux Scripting
description: It can sometimes be fun and useful to write tmux scripts that get everything you need running at once. Peter gives you some tips on how to write scripts for tmux.
---

If you use [tmux](https://tmux.github.io/) in your terminal you probably have a default set-up you use. For example, I always have the same windows open with the same names split up in the same way at [work](https://reverb.com), so I decided I might as well make a script to avoid all that manual work each time.

The easiest way to do this is with a bash script. The basic trick is to start a tmux session detached and then send it signals. Here's a very basic script to start a tmux session named `vim` with vim running in it and then attach:

{% highlight bash %}
#!/bin/bash

tmux new -s vim -d
tmux send-keys -t vim 'vim' C-m
tmux attach -t vim
{% endhighlight %}

The first line of this script (after the shebang bash line) says to make a new tmux session named `vim` but don't attach to it. The second line sends the text `vim` to the target session `vim` then hits enter (represented by `C-m`). That will cause vim to start in the opened tmux session. Finally, we attach to the session `vim`. Simple, right?

Let's see an example with more windows and splits:

{% highlight bash %}
#!/bin/bash

tmux new -s work -d
tmux rename-window -t work vim
tmux send-keys -t work 'vim' C-m

tmux new-window -t work
tmux rename-window -t work server
tmux send-keys -t work './bin/rails s' C-m
tmux split-window -v -t work
tmux send-keys -t work './bin/sidekiq' C-m
tmux select-window -t work:1
tmux attach -t work
{% endhighlight %}

This script is a little more complicated. First we start a new session called `work` and remain detached. Then we rename the window to `vim`. Then we start vim in that window. Next, we open a new window, rename it `server` and send the command `./bin/rails s` to it (this generally starts the web server in a rails project). Next, we split the window and send `./bin/sidekiq` to that split. Finally, we select window number 1 (I have my tmux windows start numbering at 1, but your might start at 0) and attach to the tmux session.

Some things to know that might help you:

1. When you open a new window to split, your cursor is assumed to be in that pane for when you use `send-keys`. You generally want to send the keys to your current pane before splitting or opening a new window.
2. If you don't like to have your windows split into even-size panes there are ways to specify the size, but I find they can have wildly different effects if you use the same script on computers with different size monitors. As a result, I don't worry about resizing panes in the script.
3. You can put the name of your session in a variable (i.e. `SESSION=work; tmux new -s $SESSION -d`) so you can easily rename it in the future.

I think you can see how these scripts are starting to get useful. I had a problem, though. At my job we run a lot of our development stuff in a [vagrant](https://www.vagrantup.com/) vm. So I wanted to start vagrant, and then run several commands that depend on vagrant having successfully started. Vagrant takes a while to start, however, so I needed to find a way to wait for a single command to complete before proceeding. Luckily, tmux can help us here.

{% highlight bash %}
#!/bin/bash

tmux new -s work -d
tmux send-keys -t work 'vagrant up; tmux wait-for -S vagrant-up' C-m\; wait-for vagrant-up
... other commands
{% endhighlight %}

The second line of this script does exactly what we need. The way it works is this: `tmux send-keys` sends a command to tmux and doesn't care what happens as a result. After the `send-keys` command, though, we say `wait-for vagrant-up`, which means the script will wait until a `wait-for` command with the arbitrary name `vagrant-up` is sent from the tmux session. The way you send this command is `tmux wait-for -S vagrant up`, so our tmux session is actually sending that back to us after the `vagrant up` command has completed. Since the `wait-for` command has been sent, the script can continue with other commands that can assume vagrant is running.

I hope you have fun writing your own tmux scripts!
