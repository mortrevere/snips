# Correct routing with two interfaces reaching the same subnet

In the case where you have two interfaces that can reach the same subnet, you can get connectivity troubles.
Imagine having two IP addresses, as 10.0.0.10 and 192.168.0.10. Both interfaces can be routed via a gateway to a third subnet, like 10.10.10.0/24. 

So when you get an incoming packet from 10.10.10.0/24 for your 192.168.0.10 IP, the routing table may end up replying through the other interface, bearing 10.0.0.10 as a source IP.
Adding a simple return route using `ip route` does not allow you to specify the interface depending on its origin IP. 

The solution lies in routing tables : 

```
echo 200 ps0 >> /etc/iproute2/rt_tables
ip rule add from 192.168.0.10 table ps0
ip route add default via 192.168.0.254 dev eth1 table ps0
```

Where `eth1` is the interface through which the packet should go out, `.10` being your host ip and `.254` being the gateway to use for the outgoing packet.
The first line adds a new routing table to your system. Linux kernel supports up to 252 (4 being reserved) additional routing tables and they can be listed with :

```
cat /etc/iproute2/rt_tables
```

TAGS : linux routing ip interfaces
DATE : 24 06 2019 2


