#!/bin/bash

# create empty dirs not sent over by rsync
mkdir -p ./data/postgresql

# reclaim all dirs as user
chown ubuntu:ubuntu -R .
