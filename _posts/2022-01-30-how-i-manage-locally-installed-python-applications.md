---
title: How I Manage Locally Installed Python Applications
description: |
  A rundown of how I manage locally installed python applications in a single
  virtual environment.
tags:
  - Python
  - Pip
  - Shell
---

The two main approaches I've seen for installing applications written
in python that aren't packaged by your system package manager are
using `pip install --user` and [`pipx`](https://pypa.github.io/pipx/),
but I use a slightly different approach that I want to share.

My goals are:

1. Don't pollute the global python environment (doing `pip install
   --user` does this for your user)
2. Be relatively efficient (`pipx` is mostly fine, but it does create
   a virtual python environment for each application, which seems a
   little unnecessary)
3. It should be understandable (to me, at least)
4. It should work (obviously)

Given these requirements, I came up with a scheme to install the
applications in a single virtual environment and then symlink them
into my path. This can fail #4 above (and not work) in cases where an
application has overly specific or odd requirements that conflict, but
I don't currently run into that issue.

Here's how it works. First, I make a virtual environment inside
`~/.local/share`:

{% highlight shell %}
share_dir="$HOME/.local/share"
mkdir -p "$share_dir"
venv_dir="$share_dir/venv"
python3 -m venv "$venv_dir"
"$venv_dir/bin/pip" install --upgrade pip wheel setuptools
{% endhighlight %}

Then, I install the packages (I actually track their versions using
the techniques outlined in [the post about repeatable builds with
pip](/repeatable-python-builds-with-pip/), but here I'm just showing
installing whatever the latest versions are):

{% highlight shell %}
"$venv_dir/bin/pip" black flake8 isort mypy 'python-lsp-server[all]' sqlfluff
{% endhighlight %}

Finally, I symlink the packages from the virtual environment into my
path:

{% highlight shell %}
for bin in black flake8 isort mypy pylsp sqlfluff; do
  ln -sf "$venv_dir/bin/$bin" "$HOME/.local/bin/$bin"
done
{% endhighlight %}

This installs the applications into my path without actually
installing the packages into any globally available python location. I
can easily use the same technique to install packages with different
version of python or with conflicting version requirements by making
more virtual environments.
