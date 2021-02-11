# Persistently add a folder to PATH on Linux

Edit `~/.profile` :

```
PATH="$PATH:/your/new/path"
```

This takes the current value of `PATH` and adds `:/your/new/path` at the end.

For it to take effect instantly, source it : 

```
. ~/.profile
```

You can now use commands that exists in the new folder without specifying their path.


TAGS : linux cli path env
DATE : 26 06 2019