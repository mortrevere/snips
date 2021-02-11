# List of DNS servers

## OpenDNS

```
208.67.220.220
208.67.222.222
```

## Google

```
8.8.8.8
8.8.4.4
```

## Adding them to your system

### resolvconf

Edit `/etc/resolvconf/resolv.conf.d/base`

```
nameserver 208.67.220.220
nameserver 208.67.222.222
```

### Verify operation

```
nslookup google.com | grep Server
```


TAGS : dns server google opendns
DATE : 24 06 2019