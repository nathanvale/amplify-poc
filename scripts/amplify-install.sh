#!/usr/bin/env bash
set -e
IFS='|'

if [ -e $HOME/.yarn/bin/amplify ];
then
    echo 'amplify already installed globally, skipping'
else
    yarn global add @aws-amplify/cli@^3.0.0 --prefix ~/.yarn
fi