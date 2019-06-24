# Get your CPU temp on Linux

```
cat /sys/class/thermal/thermal_zone*/temp | awk '{ total += $1 } END { print total/(1000*NR) }'
```

No external tool needed !

TAGS : cpu temp oneliner awk
DATE : 24 06 2019 4
