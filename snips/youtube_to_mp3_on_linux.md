# Youtube to MP3 on Linux

Get `youtude-dl`

```
apt install youtube-dl
youtube-dl -U #update it to support the latest youtube player
```

Then it's as simple as : 

```
youtube-dl "https://www.youtube.com/watch?v=dQw4w9WgXcQ" -x --no-mtime --audio-format mp3 --audio-quality 0 -o "./%(title)s.%(ext)s"
```

## Make it an alias

### bash

For bash, add to `.bashrc` :

```
ytdl() {
    youtube-dl "https://www.youtube.com/watch?v=$1" -x --no-mtime --audio-format mp3 --audio-quality 0 -o "./%(title)s.%(ext)s"
}
```

and sourcei it : `. ~/.bashrc`

### zsh

Add to your `.zshrc` : 

```
alias ytdl='f() { youtube-dl "https://www.youtube.com/watch?v=$1" -x --no-mtime --audio-format mp3 --audio-quality 0 -o "./%(title)s.%(ext)s" };f'
```

and source it : `source ~/.zshrc`

### Usage

Now you can do : 

```
ytdl dQw4w9WgXcQ
```

that parameter being the video's ID, found in the youtube URL after the **watch?v=**.
The file name automatically matches the title of the video, and the audio quality is the best available.
The mp3 is saved in the current directory.



TAGS : cli youtube youtube-dl mp3 download music
DATE : 25 06 2019