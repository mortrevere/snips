# Openstack RC file

The Openstack CLI client uses environement variables to load credentials on every call.

For the current release, Stein :

```
export OS_USERNAME=admin
export OS_PASSWORD=xxxxxxxxxxx
export OS_AUTH_URL=http://controller:5000/v3

export OS_PROJECT_NAME=admin
export OS_IDENTITY_API_VERSION=3
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_DOMAIN_NAME=Default
```

Source it to use it : 

```
. admin-openrc
```

Openstack CLI commands should work now.

TAGS : openstack cli openrc rc credentials keystone
DATE : 24 06 2019


