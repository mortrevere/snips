# Reload all base Openstack services

## Controller node

When configuring of fixing an Openstack installation, reloading completely the services living on the *controller node* is handy.

```
service rabbitmq-server restart
service memcached restart
service etcd restart
service mysql restart

service nova-api restart
service nova-scheduler restart
service nova-conductor restart
service nova-novncproxy restart

service neutron-server restart
service neutron-linuxbridge-agent restart
service neutron-dhcp-agent restart
service neutron-metadata-agent restart
service neutron-l3-agent restart
```

The last neutron-xxx services may not live on the controller node depending on your cluster setup.

## Compute/Network node

```
service nova-compute restart
service neutron-linuxbridge-agent restart
```


TAGS : openstack network controller service dhcp agent linux bridge
DATE : 24 06 2019