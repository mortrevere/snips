# Cleanup Openstack

After automating instanciations on Openstack (via an orchestrator or plain API calls) you may want to cleanup servers, floating ips, ports and networks.

```
openstack server list -c ID -f value | xargs -n1 openstack server delete
openstack floating ip list | awk '$2 && $2 != "ID" {print $2}' | xargs openstack floating ip delete
openstack port list | awk '$2 && $2 != "ID" {print $2}' | xargs openstack port delete
openstack network list | grep -Ev 'provider|selfservice' | awk '$2 && $2 != "ID" {print $2}' | xargs openstack network delete
```

This spares the `provider` and `selfservice` networks that are basis of the default Openstack network setup.

TAGS : openstack cleanup server floating ip network
DATE : 24 06 2019
