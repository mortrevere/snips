# Kill processes based on their instanciation args

Sometimes `kill` or `killall` are not enough for your terminating needs.

This oneliner allows you to kill processes based on their instanciation arguments, which is useful to kill interpreter-based processes like Python or bash scripts *en masse*.

```
ps -ef | grep -v grep | grep 'myscript.py' | awk '{print $2}' | xargs kill -15
```

Check it with `ps aux | grep 'myscript.py'`

DATE : 24 06 2019 4
TAGS : oneliner linux kill ps
