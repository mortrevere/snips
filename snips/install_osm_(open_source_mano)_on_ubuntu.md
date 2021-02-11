# Install OSM (Open Source MANO) on Ubuntu

```
wget https://osm-download.etsi.org/ftp/osm-6.0-six/install_osm.sh
chmod +x install_osm.sh
./install_osm.sh 2>&1 | tee osm_install_log.txt # -t X.X.X can be added as a parameter to install a specific release tag
newgrp docker
```



The instanciated docker stack is called `osm` and described in `/etc/osm/docker/docker-compose.yaml`. It can be brought up or down with : 

```
#RUN
docker stack deploy -c /etc/osm/docker/docker-compose.yaml osm

#TEARDOWN
docker stack rm osm
```

## Additional tools

OSM can be setup with an ELK stack, Grafana and vim-emu.

```
./install_osm.sh --elk_stack --pm_stack --vimemu
```




TAGS : osm install orchestration mano network docker
DATE : 02 07 2019