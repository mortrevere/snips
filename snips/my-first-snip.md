# Your first snip 

This is the first snip of your repo, feel free to change it to something useful and share it **on your own snips repo**, via GitHub

This is a simple markdown file, which *supports* **every** ***kind*** `of` ~~styling~~ 

```
that you could think of.
```

If you don't really know markdown, [look it up](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

Note : As an extra you get a little bit of auto formatting using prefixes like "Note : "

## Purpose

A snip is a useful piece of computer-related information, written in a short and direct way.
They are useful for every learning or confirmed computer artist that may need a way to write stuff down and come back to it later. 

Practical examples of that would be Linux oneliners, shell pipelines, snippets of code, references on network configuration ... and all that stuff that you should only google and debug once.

## Publishing

Once you are done writing your first snip, you can publish it on GitHub.
This is done by building your snips list (all the .md files in the snips/ directory, where this very file is) into a single file.
This file is your *snips build*, that you and everyone can access using the snips client.


To do the actual build :

```
./build-publish.sh
```

This script tries to push it automatically on your snips GitHub repo.

Note : The reference point for your build is then https://raw.githubusercontent.com/<YOUR USERNAME>/<YOUR SNIPS REPO>/master/build/main.json

## Metadata

The only thing that you must add to your snips is tags describing its content. Like that : 

TAGS : tutorial snips

That makes them searchable with great accuracy.
You may add a date too, if you want some kind of ordering on the front page of snips.

DATE : 24 06 2019 2

That last number is to order different snips posted on the same day.
Those tags can be put anywhere as long as they are on a single line like this example.



Feel free to erase and write over me, it's my purpose :(
Or you could keep me as a template !
