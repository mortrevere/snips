# Full docker cleanup

Delete all networks, volume, containers and cache from Docker : 

```
docker system prune -f --volumes
```

Note : you might want to remove that `--volumes` flag if you want to keep your data around ...

TAGS : oneliner docker delete prune cleanup
DATE : 24 06 2019
