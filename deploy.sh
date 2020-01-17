# Warning: the rsync destination should NOT be `~` or any directory that has something important in it.
# This is because we are using the `--delete` flag,
# which wipes out extraneous files that were not part of this rsync.
# I accidentally wiped out the `~/.ssh` directory once, and it prevented me from ssh back into the server.
rsync -avlhz --delete --stats --progress --exclude-from 'rsync-excludes.txt' ./ ubuntu@lightsail:~/apps/augustus