# Setup a ping tunnel to escape network filtering

ICMP is a rich protocol that we only use for pinging hosts amongst them. However, ICMP packets can carry a payload, and thus serve as a transport protocol for any other protocol, like TCP.

Setting up such a tunnel just requires a server pingable from your client.

## Get ptunnel

The [current page](https://stuff.mit.edu/afs/sipb/user/golem/tmp/ptunnel-0.61.orig/web/) for ptunnel was last updated in 2005 and some links are broken.
However, you can still `apt install ptunnel` or get [ptunnel-ng](https://github.com/lnslbrty/ptunnel-ng) which should work the same.
`ptunnel` got two updates between now and 2005, in 2009 and 2011 and is pretty reliable. The latest source code is hosted [here](http://freshmeat.sourceforge.net/projects/ptunnel/).

## Server side

```
ptunnel -dp 22 -m 16 -chroot -x supersecrettoken
```

## Client side

```
ptunnel -p server.com -lp 8000 -da server.com -dp 22 -c eth0 -x supersecrettoken
```

This creates a point to point tunnel from `localhost:8000` to `server.com:22`.

From there you can ssh into the remote server :

```
ssh user@localhost -p 8000
```

or create a whole SOCKS proxy on that SSH-over-ICMP tunnel :

```
ssh user@localhost -2Nf -p 8000 -D 8080
```

Then you can escape most firewall filtering and access the web without even having to authenticate on the captive portal of your AP.



TAGS : ping ip firewall tunnel
DATE : 24 06 2019