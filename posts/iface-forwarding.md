# Set up IP forwarding on a Linux host

In cases where you need a machine to act as a gateway to other parts of the network, setting up the right rules in `iptables` is needed.

```
iptables -A FORWARD -o wlan0 -j ACCEPT
iptables -A FORWARD -i wlan0 -j ACCEPT
iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
```

This will only work if IP forwarding is on system-wide. Check and set with :

```
sysctl net.ipv4.ip_forward
sysctl -w net.ipv4.ip_forward=1
```

This works for all kinds of interfaces so you can do nice stuff like VM NAT on host networks and VPN NAT, as : 

```
sudo iptables -A FORWARD -o vboxnet0 -j ACCEPT
sudo iptables -A FORWARD -i vboxnet0 -j ACCEPT
sudo iptables -t nat -A POSTROUTING -o tun0 -j MASQUERADE
```

Now your VMs traffic can be forwarded through a OpenVPN interface. Postrouting to multiple interface is possible too, the deciding factor being the host's routing table (`route -n`)

TAGS : ip forward forwarding routing route nat
DATE : 23 06 2019
