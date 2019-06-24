#!/bin/bash

./build.py
git add build/main.json
git add snips/*
git commit -m "new snip"
git push
