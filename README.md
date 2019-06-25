# snips
Searchable GitHub/Markdown based snippeting blog.

This is a an agregator of *'snips'*, that are little bits of computer-related information.
*Snips* are built by people writing small markdown files and hosting them on github. A very simple static builder can then be run on their repo, where they can host a static build of their *snips* collection.

The Snips web app can then be run by any client and allows searching over the whole aggregated *snip* database.

This was initially aimed at taking notes on every bit of useful information you come accross while coding or working with Linux, because you may need to come back to it.

[Try it](https://mortrevere.github.io/snips/) on GitHub Pages

## Roll your own

Any GitHub repo can become part of the *snip* database. The only condition is to have a valid build up on it.
To do that :

```
git clone https://github.com/mortrevere/snips.git
cd snips
./build.py
```

This builds a JSON file under the `build/` dir, which then become the reference point for your *snip* repo. You can then host it (for free) on GitHub or wherever you see fit if you have a public CORS-compatible domain.

**Snips are stored into the** `snips/` **dir as simple markdown files.**

They however carry additionnal features like date and tags embedding which allow for better searching. This is cleaned up by the build process and moved as metadata in the final build file.

## Adding snips

Adding a new *snip* is then very simple : save your note as a `.md` under the `snips/` dir, and :

```
./snips.py build publish
```

Which is a shortcut for :

```
./snips.py build
git add build/main.json
git add snips/*
git commit -m "new snip"
git push
```

Available commands for `snips.py` are :

```
./snips.py list
./snips.py build
./snips.py publish

./snips.py build publish
```

Your build file is now updated on the repo and everyone can browse that new *snip*

### TODO

- snip client hotlinking
- add `snips.py remove <id>` to remove a snip from the build
- ~~Multi source implementation~~
- ~~Add author on each snip~~
