# How to send MIDI sysex messages on Linux and program a DX7

## Get banks

See [All the web patches collection](http://bobbyblues.recup.ch/yamaha_dx7/dx7_patches.html) ([zip hotlink](http://bobbyblues.recup.ch/yamaha_dx7/patches/DX7_AllTheWeb.zip))

## List available MIDI interfaces

```
amidi -l
```

## Send the bank file

```
amidi -p hw:2,0,0 -s dx7bank.syx
```

> ***Note*** : *individual patches (.sysex) don't work*


TAGS : music dx7 volca fm midi oneliner
DATE : 23 06 2019