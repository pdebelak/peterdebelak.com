---
title: Finding Python Package Hashes Via the API
description: A description of how to find all package hashes for a python package version for use in fully repeatable python builds.
tags:
  - Python
  - Pip
---

In a [previous post](/blog/repeatable-python-builds-with-pip/), I
discussed how to do repeatable python builds. I also mentioned it was
too much of a hassle to check dependency hashes at install time.
According to [the pip
documentation](https://pip.pypa.io/en/stable/topics/repeatable-installs/#hash-checking)
on the subject, hash checking does the following:

> This protects against a compromise of PyPI or the HTTPS certificate
> chain. It also guards against a package changing without its version
> number changing (on indexes that allow this).

For the most part, I'm not _too_ concerned about these things, but
while researching this I was very confused about how difficult to use
the [`pip hash` command](https://pip.pypa.io/en/stable/cli/pip_hash/)
is. `pip hash` requires you to have already downloaded a dependency
using `pip download` and it only gives you a single hash for the exact
dependency file you downloaded. That means you can't easily use it to
generate a single `requirements.txt` or `constraints.txt` file that
will work on different architectures or operating systems since each
could have a different hash, especially for packages written in c or
fortran. The way to deal with this is to provide multiple allowed
`--hash` arguments to `pip install`, but there doesn't seem to be an
easy way to automate this using `pip` directly.

I was curious about this, so I did a little digging and discovered
that there is a convenient way to find all the hashes for a given
package version using the [pip json
api](https://warehouse.pypa.io/api-reference/json.html).

For any given package version, you can hit
`https://pypi.org/pypi/$package/$version/json` and get a response that
includes the `sha256` hash of each wheel or tarball available via
pypi. The hashes are inside the various `releases` keys in the json
response under `digests` then `sha256`. Using this information it's
straightforward to generate a `--hash=sha256:$mysha` for each of those
to generate a fully hashed `requirements.txt` that works across
operating systems and architectures.

Given this, I might re-think how much of a hassle doing hash-checking
is.
