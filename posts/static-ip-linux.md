# How to set up a static ip on Linux

## /etc/network/interfaces

Used by a lot of debian based systems and others.

```
auto eth0
iface eth0 inet static
address 192.168.0.10
gateway 192.168.0.1
dns-nameservers 8.8.8.8 8.8.4.4
```

## [netplan](https://netplan.io/) (Ubuntu 18.04+)

Edit `/etc/netplan/99-config.yaml`

```
network:
  version: 2
  renderer: networkd
  ethernets:
    eth0:
      addresses:
        - 192.168.0.10/24
      gateway4: 192.168.0.1
      nameservers:
          addresses: [8.8.8.8, 8.8.4.4]

```

```
netplan apply
```

## Verify operation

```
ip a
```

DATE : 24 06 2019
TAGS : ip linux static netplan interfaces network ipv4
