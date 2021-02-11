# Using netcat

netcat is a simple TCP client that acts very much as a swiss army knife :

## Connect somewhere

```
nc towel.blinkenlights.nl 23
```

## Test connection to somewhere

Sometime you just a want a returning test for a given host and port

```
nc -vz google.com 80
```

## Echo server

A very simple TCP test to reach a given port is to have an application listening on it. Netcat can bind to a port and act as a server.

```
nc -kl 7777
```

`-k` keeps the socket listening on the port after a client disconnects


TAGS : netcat linux ip tcp server test
DATE : 24 06 2019