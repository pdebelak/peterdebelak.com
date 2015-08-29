---
title: Managing Configuration on Multiple Machines
description: Some tips on keeping configuration the same across multiple computers.
---

Well, my experiment with emacs ended when I realized that getting the shell to work properly wasn't going to happen unless I was willing to put some serious work in. It just didn't seem worth it. So, I'm back to vim.

As I said [before](/blog/posts/trying-out-emacs), I use [yadr](https://github.com/skwp/dotfiles) for my vim and zsh configuration. Lately, though, I've been trying to add some tmux excitement to my normal workflows and so I needed to add some additional tmux-based keybindings. Yadr has a way to do this without needing to fork it - by using a `~/.zsh.after` directory with additional configuration. The problem with this, though, is that I needed to remember to update my config on both my personal and work computers whenever I made a change.

Clearly this was not exceptable. I needed to DRY up my life!

So, what I created a repo on github with my configuration files. The issue with this, of course, is that you need a way to clone the repo, but then put the files in the correct place (I also have a `~/.gitconfig.user` file in there, for instance, so I can't just clone everything into `~/.zsh.after`) without having to remember where to put what. So I made a basic bash script that I run whenever I pull that symlinks the files into the correct place. Then, to keep my configuration files in sync, all I need to do is commit any changes, push it up to github, and then pull those changes down onto my other computer.

You can see the repo [here](https://github.com/pdebelak/env) if you want to get an idea of what is involved. I hope you find this technique helpful!
