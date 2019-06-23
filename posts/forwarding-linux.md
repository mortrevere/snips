# Turn on forwarding on linux

```
sysctl -w net.ipv4.ip_forward=1
```

This will allow the linux box to stop discarding packets that does not match any of its ip adresses

TAGS : network linux forwarding ipv4
DATE : 23 06 2018
