#! /usr/bin/python3

import glob
import time
import datetime
import json
import base64
import os
import sys

posts_files = sorted(glob.glob("./snips/*.md"))
posts = []
built = []

if not os.path.exists('build'):
    os.makedirs('build')

with open('build/main.json') as build:
    built = json.load(build)['snips']

class MDPreprocessor():
    def __init__(self, filename):
        self.tags = []
        self.md = ''
        self.date = ''
        self.filename = filename
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
        if len(self.tags) == 0:
            print('\n>> ERR : missing TAGS for {}, ignoring the whole snip.\n'.format(self.filename))
            return False
        elif self.date == '':
            today = datetime.datetime.today()
            today_readable = today.strftime('%d %m %Y')
            today_timestamp = time.mktime(datetime.datetime.strptime(today_readable, "%d %m %Y").timetuple())
            self.date = today_timestamp;
            print('>> WARN : Missing DATE for {}, assuming today ({})'.format(self.filename, today_readable))

        self.md = base64.b64encode(self.md.encode('utf-8')).decode('utf-8')
        return {'md' : self.md, 'tags' : self.tags, 'date' : self.date}

    def json(self):
        return json.dumps(self.render())

for post_file in posts_files:
    with open(post_file) as h:
        processor = MDPreprocessor(post_file)
        for line in h:
            processor.inline(line)
        snip_object = processor.render()
        if snip_object != False: posts.append(snip_object)

###

class CLIParser():
    def __init__(self, argv):
        self.args = argv
        self.run();

    def getArg(self, index):
        return self.args[index] if len(self.args) > index else False

    def run(self):
        a = self.getArg(1)
        if a == 'list':
            self.cmd_list()
        if a == 'build':
            self.cmd_build()
        if a == 'publish':
            self.cmd_publish()

    def cmd_publish(self):
        git = os.popen('git add build/main.json && git commit -m "new snip" && git push').read()
        print(git)
        remote_url = os.popen('git config --get remote.origin.url').read().split('/')
        if "git@github.com" in remote_url[0]: #SSH remote
            github_user = remote_url[0].split(":")[-1]
            repo_name = remote_url[1].split('.')[0]
        else:
            github_user = remote_url[3]
            repo_name = remote_url[4].split('.')[0]
        branch = os.popen('git rev-parse --abbrev-ref HEAD').read()
        remote_url = 'https://raw.githubusercontent.com/' + '/'.join([github_user,repo_name,branch]).strip() + '/build/main.json'
        print('>> Published @ ' + remote_url)
    def cmd_build(self):
        with open('build/main.json','w') as h:
            h.write(json.dumps({'snips' : posts }))
            print('>> done building {} snips'.format(len(posts)))
        if self.getArg(2) == 'publish':
            self.cmd_publish()
        else:
            while True:
                try:
                    prompt = input(">> Push to your snips build on GitHub ? [Y/n] : ")
                    return self.cmd_publish() if prompt in ('', 'y', 'Y') else False;
                except KeyboardInterrupt:
                    sys.exit()

    def cmd_list(self):
        printable_posts = []
        max_title_width = 0
        has_unbuilt = False
        all_md = [p['md'] for p in built]

        for index, post in enumerate(posts):
            date = datetime.datetime.utcfromtimestamp(post['date']).strftime('%d-%m-%Y')
            md = base64.b64decode(post['md'].encode('utf-8')).decode('utf-8');
            title = md.strip().split('\n')[0][1:].strip()
            max_title_width = len(title) if len(title) > max_title_width else max_title_width
            pub = 'no '
            if post['md'] in all_md:
                pub = 'yes'
            else:
                has_unbuilt = True
            printable_posts += [{'id' : str(index), 'date' : date, 'title' : title, 'pub' : pub}]

        print('+' + '-'*5 + '+' + '-'*12 + '+' + '-'*7 + '+' + '-'*(max_title_width+2) + '+')
        print('| ID  | DATE       | BUILT | TITLE' + ' '*(max_title_width-4) + '|')
        print('+' + '-'*5 + '+' + '-'*12 + '+' + '-'*7 + '+' + '-'*(max_title_width+2) + '+')
        for post in printable_posts:
            print('| ' + '{0:>3}'.format(post['id']) + ' | ' + post['date'] + ' |  ' + post['pub'] + '  | ', end='')
            print('{0: <{width}}'.format(post['title'], width=max_title_width) + ' |')
        print('+' + '-'*5 + '+' + '-'*12 + '+' + '-'*7 + '+' + '-'*(max_title_width+2) + '+')
        if has_unbuilt:
             while True:
                try:
                    prompt = input(">> You have unbuilt snips, build them ? [Y/n] : ")
                    return self.cmd_build() if prompt in ('', 'y', 'Y') else False;
                except KeyboardInterrupt:
                    sys.exit()
            #print('>> You have some snips not included in your current build. Use : \n\t ./snips.py build \n>> to build.')



CLIParser(sys.argv);



