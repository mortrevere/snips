# Remove a compute node from an Openstack cluster

On the compute node : 

```
apt autoremove -y nova-*
apt autoremove -y neutron-*
```

On the controller node : 

```
openstack compute service list
openstack network agent list

openstack compute service delete <ID>
openstack network agent delete <ID>
```


TAGS : openstack remove compute
DATE : 02 07 2019