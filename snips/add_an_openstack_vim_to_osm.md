# Add an Openstack VIM to OSM

```
osm vim-create --name openstack --user USERNAME --password PASSWORD --auth_url http://controller:5000/v3 --tenant PROJECT_NAME --account_type openstack \
--config='{security_groups: default, keypair: mykeypair4ssh, insecure: True, use_existing_flavors : True, management_network_name : provider}'
```

Check it with `osm vim-list`

Since OSM runs in containers, you need to add an entry to the `/etc/hosts` file of the `ro` container, pointing to the Openstack controller node.

Edit `/etc/osm/docker/docker-compose.yaml`

```
  ro:
    ... (omitted) ...
    extra_hosts:
      controller: 10.0.0.10

```


TAGS : openstack osm mano hosts docker
DATE : 25 06 2019