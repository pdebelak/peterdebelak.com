---
title: Repeatable Python Builds with Pip
description: A brief rundown of how to do repeatable python builds with only pip.
tags:
  - Python
  - Pip
---

While there are several tools like
[pipenv](https://pypi.org/project/pipenv/) and
[poetry](https://python-poetry.org/) for managing python dependencies
and doing repeatable builds (meaning being able to reliably install
all the same dependencies on a different computer at install time),
installing a dependencies to manage your dependencies always rubs me
the wrong way (like, how do you manage _that_ dependency?). So, I want
to give a brief rundown of how I manage dependencies with `pip` alone
to do repeatable builds.

The simplest and most common way to do this is to just pin all
dependencies from your virtualenv in your `requirements.txt` file:

{% highlight shell %}
python3 -m venv .venv
. .venv/bin/activate
pip install requests pandas
pip freeze >requirements.txt
{% endhighlight %}

At the time of writing, this will give a `requirements.txt` file
looking like this:

```
certifi==2021.10.8
charset-normalizer==2.0.10
idna==3.3
numpy==1.22.1
pandas==1.4.0
python-dateutil==2.8.2
pytz==2021.3
requests==2.27.1
six==1.16.0
urllib3==1.26.8
```

Then, you can do a repeatable build with the same versions of
everything by running:

{% highlight shell %}
pip install -r requirements.txt
{% endhighlight %}

This works great, but has a big downside when it comes time to upgrade
your dependencies. Unlike with `pipenv` or `poetry`, you aren't
tracking what your actual dependencies are. Instead, you have a single
file that just lists your dependencies along with your dependencies'
dependencies so it's hard to know what you actually need.

The solution is to use a [`constraints.txt`
file](https://pip.pypa.io/en/stable/cli/pip_install/#cmdoption-c) in
addition to the `requirements.txt` file to separate versions from
dependencies. Using one looks like this:

{% highlight shell %}
python3 -m venv .venv
. .venv/bin/activate
echo 'requests
pandas' >requirements.txt
pip install -r requirements.txt
pip freeze >constraints.txt
{% endhighlight %}

This will give you a `requirements.txt` file like this:

```
requests
pandas
```

And a `constraints.txt` file like this:

```
certifi==2021.10.8
charset-normalizer==2.0.10
idna==3.3
numpy==1.22.1
pandas==1.4.0
python-dateutil==2.8.2
pytz==2021.3
requests==2.27.1
six==1.16.0
urllib3==1.26.8
```

Then, you can do a repeatable build with the same versions of
everything by running:

{% highlight shell %}
pip install -r requirements.txt -c constraints.txt
{% endhighlight %}

This seems mostly the same, but now you have a `requirements.txt` file
that lists your actual requirements, along with a separate file
(`constraints.txt`) that tracks the exact versions of everything for
repeatable builds. This is actually much more like how other tools
work with a separate lockfile to track versions.

The power of this approach comes when it's time to change the versions
of things installed. In a few months time, you can run:

{% highlight shell %}
pip install --upgrade -r requirements.txt
pip freeze >constraints.txt
pip install -r requirements.txt -c constraints.txt
{% endhighlight %}

And that will update all packages to the latest version. You could
also just update one package at a time in a similar way. Running the
full install with the `constraints.txt` at the end will confirm that
`pip` didn't accidentally install incompatible versions.

The one thing this approach doesn't give you is the full safety of
dependency hashing (although you can do that with the [`pip hash`
command](pip install -r requirements.txt -c constraints.txt), I don't
because it's too much of a hassle), but I think this gives you most of
the benefits of using `pipenv` or `poetry` with a lot less friction.

If you're currently not doing repeatable builds or pinning everything
in your `requirements.txt` file, I hope this will make your life
better and help you upgrade your dependencies with less fear.
