---
title: Waiting for Docker in a Shell Script
description: Peter shows how to write a script that starts a docker container and then executes commands that assume that docker container is up and running.
tags:
  - Shell
---

At [Reverb](https://reverb.com/) we've been using [docker](https://www.docker.com/) more and more. As part of this I've had to update my getting to work start-up script to start a docker container, wait for the container to be up, and then execute some commands.

Unlike my [vagrant-based start-up script](/blog/tmux-scripting/) that could execute `vagrant up` and wait for the command to complete, I'll be running the `docker-compose-up` command and leaving that running in a tmux pane while working. This means that my previous tip of asking tmux to wait for the command to complete would not work because the command doesn't actually ever complete.

Luckily, my coworker showed me a trick to check if the docker container is up and available.

{% highlight bash %}
docker-compose up
until docker-compose exec psql -c "select 1" > /dev/null 2>&1; do sleep 2; done
# other commands
{% endhighlight %}

What this does is start the docker container, and then repeatly trying to run `select 1` against the postgres database inside the container. The command is meaningless (and the output is directed to `/dev/null` so I don't see a bunch of error text) but if it successfully completes it means that the database is up and running inside the docker container and other commands that assume the container is running can be run.

I hope this little trick is helpful to someone in writing some shell scripts that involve docker.
