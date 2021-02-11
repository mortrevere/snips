# SSH into ephemeral machines

When working with virtualization, under [mininet](http://mininet.org/), [vim-emu](https://osm.etsi.org/wikipub/index.php/VIM_emulator), [containernet](https://github.com/containernet/containernet), openstack, or any VIM, you may SSH into instances. Those machine fingerprints changes all the time, and you'll get : 

```
↳ ssh cirros@10.190.101.214
The authenticity of host '10.190.101.214 (10.190.101.214)' can't be established.
RSA key fingerprint is 1f:23:e5:34:8d:b0:94:70:d1:1b:c6:c4:5a:47:13:5e.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '10.190.101.214' (RSA) to the list of known hosts.
$
```

If you are unlucky, you may even hit an IP address that was once taken by another machine which you ssh'd into, and get a security error requiring you to copy/paste another command to actually allow the connection : **painful**.
 
To fix it : 

## bash/zsh

```
alias cssh='ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null'
```

## Usage

```
↳ cssh cirros@10.190.101.174
Warning: Permanently added '10.190.101.174' (ECDSA) to the list of known hosts.
$ 
```

That *list of known hosts* is usually `~/.ssh/known_hosts` but using `cssh` it uses `/dev/null` so you won't ever get bothered by it again.


TAGS : ssh linux alias vm
DATE : 26 06 2019