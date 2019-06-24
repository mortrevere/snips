# Openstack flavors

Flavors are VMs default in terms of 'hardware' made available to them. 

## Create a flavor

```
openstack flavor create --id 0 --vcpus 1 --ram 64 --disk 1 m1.nano
```

Note : the RAM parameter is in Mb and the disk parameter is in Gb

## List flavors

```
openstack flavor list
```

## Delete flavor

```
openstack flavor delete FLAVOR_ID
```

TAGS : openstack flavor
DATE : 24 06 2019
