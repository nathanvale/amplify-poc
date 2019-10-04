#!/usr/bin/env bash
set -e
IFS='|'

if [ -e $HOME/.aws ];
then
echo 'aws credentials already installed globally, skipping'
else
mkdir -p ~/.aws/
cat <<EOF > ~/.aws/credentials
[amplify]
aws_access_key_id=$AWS_ACCESS_KEY_ID
aws_secret_access_key=$AWS_SECRET_ACCESS_KEY
EOF

cat <<EOF > ~/.aws/config
[profile amplify]
region=ap-southeast-2
EOF
fi


