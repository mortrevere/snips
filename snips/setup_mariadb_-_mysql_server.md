# Setup MariaDB / MySQL server

## Packages

```
apt install mariadb-server
```

## Configuration

Edit `/etc/mysql/mariadb.conf.d/99-myconf.cnf`

```
[mysqld]
bind-address = 192.168.0.10

default-storage-engine = innodb
innodb_file_per_table = on
max_connections = 4096
collation-server = utf8_general_ci
character-set-server = utf8
```

```
service mysql restart
mysql_secure_installation
```

This last command guides you through the creation of the root credentials and first database.


TAGS : mysql server setup mariadb sql ubuntu
DATE : 24 06 2019