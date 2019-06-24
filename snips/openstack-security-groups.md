# Add rule to an Openstack security group

Example to allow ICMP and SSH on the `default` security group  

```
openstack security group rule create --proto icmp default
openstack security group rule create --proto tcp --dst-port 22 default
```

TAGS : openstack security group ssh icmp
DATE : 24 06 2019
