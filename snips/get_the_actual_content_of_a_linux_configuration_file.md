# Get the actual content of a Linux configuration file

Configuration files, usually bearing a `.conf` or similar extension, are usually shipped with lots of commented line to describe the available parameters.

Openstack is a perfect example for that, where every service uses generated [INI](https://en.wikipedia.org/wiki/INI_file) files that can be very long (11743 lines for `nova.conf` on the Stein release)

To get the actual configuration described in this kind of file, here is a useful oneliner :

```
cat /etc/neutron/neutron.conf | egrep -v "#|^$"
```

- `-v` performs a reverse search (exclude everything that is matched)
- `#` is used for comment lines
- `^$` is the selector for an empty line

So you can get an overview of what is happening in that file.
It works for virtually every config file : 

```
cat /etc/ssh/sshd_config | egrep -v "#|^$"
```


TAGS : cli oneliner openstack neutron nova config file grep
DATE : 26 06 2019