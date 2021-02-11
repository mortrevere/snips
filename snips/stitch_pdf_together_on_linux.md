# Stitch PDF together on Linux

Many options for PDF manipulation exists, but only a few keeps hyperlinks working when merging PDF together. `pdftk` is one of them, get it : 

```
apt install pdftk
```

Use it : 

```
pdftk file1.pdf file2.pdf cat output out.pdf
```

Hyperlinks should work, page format is kept (landscape/portrait page mix)


Apparently it was deprecated from Ubuntu 18.04 because of a dependency ... but you can still wrap it in some executable `pdftk` file somewhere in your `PATH`, using Docker : 

```bash
#!/bin/bash

echo "FROM ubuntu:16.04
RUN apt-get update && \
    apt-get install -y pdftk && \
    rm -rf /var/lib/apt/lists/*" | docker build -t local/local/ubuntu_pdftk - 2>&1 > /dev/null

# Run the pdftk as current user
set -eu
docker run --name pdftk -it --user $(id -u):$(id -g) --rm -v "$PWD:/workdir$PWD" -w "/workdir$PWD" local/local/ubuntu_pdftk pdftk "$@"
```

Not ideal but it works at least.


TAGS : pdftk pdf stitch merge concat
DATE : 28 06 2019