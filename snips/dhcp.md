# DHCP tools on Linux

## Get a new lease

```
dhclient eth0
#or try renewing the current one
dhclient -r eth0
```

## Watch DHCP traffic

Using tcpdump :

```
tcpdump -vnes0 -i wlan0 port 67 or port 68
```

and a shorter, handy tool being `dhcpdump`

```
dhcpdump -i eth0
```

## DHCP sequence

- DISCOVER: broadcast discovery
- OFFER: The server offers the DHCP information to the client
- REQUEST: The client requests validation of the DHCP information
- ACK:

DATE : 24 06 2019
TAGS : dhcp tcpdump network linux
