#!/usr/bin/env bash

error() {
    echo -e "\033[0;31m$1\033[0m"
}

success() {
    echo -e "\033[0;32m${1}\033[0m"
}

warn() {
    echo -e "\033[0;33m${1}\033[0m"
}

RemotePath='/home/forge/test.wedevs.com/test'
Server="forge@54.237.143.44"
Files="dist nuxt.config.js package.json package-lock.json"
Pm2Name="nuxt-example"
KeepRelease=2

Time=$(date +%Y%m%d%H%M)
Current="$RemotePath/current"
Releases="$RemotePath/releases"
Latest="$Releases/$Time"

warn "Building app"
npm run build

warn "Creating folder in server: $Latest"
ssh $Server "mkdir -p $Latest"

warn "Copying files"
rsync -avrP $Files "$Server:$Latest" > /dev/null 2>&1

warn "Updating symlink and restarting PM2"

# Run command on the server
ssh $Server "
cd $RemotePath
ln -sfn releases/$Time current
cd current
npm install > /dev/null 2>&1

# restarting pm2
pm2 stop $Pm2Name --silent && pm2 delete $Pm2Name --silent
cd $Current && pm2 start npm --name $Pm2Name -- start

# deleting last releases
(ls -rd $Releases*|head -n $KeepRelease;ls -d $Releases*)|sort|uniq -u|xargs rm -rf
"

success "Done!"
