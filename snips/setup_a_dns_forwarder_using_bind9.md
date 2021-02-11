# Setup a DNS forwarder using bind9

Install bind9 :

```
apt install bind9
nano /etc/bind/named.conf.options
```

```
acl authorized {
        10.0.0.0/24;
        localhost;
};

options {
        directory "/var/cache/bind";

        recursion yes;
        allow-query { authorized; };

        forwarders {
                8.8.8.8;
                8.8.4.4;
        };
        forward only;

        dnssec-validation auto;

        auth-nxdomain no;    # conform to RFC1035
        listen-on-v6 { any; };
};
```

```
named-checkconf
service bind9 restart
tail -f /var/log/syslog
```

Done ! Check it using `nslookup google.fr <ip of your new DNS forwarder>`




TAGS : dns forwarder bind9 named
DATE : 09 07 2019