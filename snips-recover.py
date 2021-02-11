import json
import base64
from datetime import datetime
import time

built = ""
with open('build/main.json') as build:
    built = json.load(build)['snips']

for snip in built:
    tags = snip["tags"]
    content = snip["md"]
    ts = snip["date"]
    content_clear = base64.b64decode(content).decode("utf-8")
    title = ""

    for line in content_clear.split("\n"):
        if not title and line.startswith("# "):
            title = line[2:].replace(" ", "_").replace("/", "-").lower() + ".md"
    full = content_clear + "\nTAGS : " + " ".join(tags) + "\nDATE : " + time.strftime("%d %m %Y", time.localtime(int(ts)))
    print(full)
    with open("snips/" + title, "w+") as f:
        f.write(full)
    print("-----------------------------")
