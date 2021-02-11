# List the N largest files on Linux

To recursively get the 50 largest files in the current directory : 

```
find . -type f -printf "%s\t%p\n" | sort -n | tail -n 50
```

## Alias

### bash

```
alias big='find . -type f -printf "%s\t%p\n" | sort -n | tail -n $1'
```

### zsh

```
alias big='f() { find . -type f -printf "%s\t%p\n" | sort -n | tail -n $1 };f'
```

### Usage

```
big 50
```

Very useful on those SSD-only laptops that get filled too fast.


TAGS : linux oneliner files find big alias
DATE : 25 06 2019