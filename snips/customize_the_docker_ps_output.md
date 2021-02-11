# Customize the docker ps output


```
docker ps --format 'table {{.Names}}\t{{.Image}}'
docker ps --format 'table {{.Names}}\\t{{.Image}}\\t{{.RunningFor}} ago\\t{{.Status}}\\t{{.Command}}'
```

Remove `table` keyword to make it easily parsable. This can be set as the default in `~/.docker/config.json` under the `psFormat` attribute.


TAGS : docker ps custom
DATE : 24 06 2019