#! /usr/bin/python

import glob
import time
import datetime
import json
import base64
import os

posts_files = glob.glob("./snips/*.md")

class MDPreprocessor():
    def __init__(self):
        self.tags = []
        self.md = ''
        self.date = ''
        pass

    def inline(self, line):
        chunks = line.strip().split(' ')
        if chunks[0] == 'TAGS':
            self.tags = chunks[2:]
        elif chunks[0] == 'DATE':
            offset = int(chunks[5]) if len(chunks) > 5 else 0
            self.date = time.mktime(datetime.datetime.strptime(line[7:17].strip(), "%d %m %Y").timetuple()) + offset
        elif ''.join(chunks[0:2]) == 'Note:':
            self.md += '> ***Note*** : *' + line[7:].strip() + '*'
        else:
            self.md += line

    def render(self):
        self.md = base64.b64encode(self.md.encode('utf-8')).decode('utf-8')
        return {'md' : self.md, 'tags' : self.tags, 'date' : self.date}

    def json(self):
        return json.dumps(self.render())

posts = []

for post_file in posts_files:
    with open(post_file) as h:
        processor = MDPreprocessor()
        for line in h:
            processor.inline(line)
        posts.append(processor.render())

if not os.path.exists('build'):
    os.makedirs('build')
        
with open('build/main.json','w') as h:
    h.write(json.dumps({'snips' : posts }))
