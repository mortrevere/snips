# Add Openstack VM image


## Cirros 4.0

```
wget http://download.cirros-cloud.net/0.4.0/cirros-0.4.0-x86_64-disk.img
openstack image create --file="./cirros-0.4.0-x86_64-disk.img" --container-format=bare --disk-format=qcow2 cirros040
```

Credentials are `cirros/gocubsgo`


TAGS : openstack cirros vm
DATE : 25 06 2019