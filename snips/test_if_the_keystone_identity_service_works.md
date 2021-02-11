# Test if the keystone identity service works

Keystone handles authentication accross the whole openstack cluster and is the first service to install and check.

## Can you reach it ?

```
curl -s http://controller:5000/
```

## Are your credentials right ?

```
openstack --os-auth-url http://controller:5000/v3 --os-project-domain-name default --os-user-domain-name default --os-project-name PROJECT --os-username USERNAME token issue
```

> ***Note*** : *password is prompted interactively*
## Reload it

Keystone is a simple python app served through apache, so :

```
service apache2 restart
```


TAGS : openstack keystone test check
DATE : 24 06 2019