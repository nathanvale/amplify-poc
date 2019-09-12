Install yarn

```
curl -o- -L https://yarnpkg.com/install.sh | bash
yarn config set prefix ~/.yarn
```

add

```
export PATH="$(yarn global bin):$PATH"
```
To your .bashrc or .bashprofile and then restart your terminal.
```
yarn install
yarn global add @aws-amplify/cli@3.0.0 --prefix ~/.yarn
export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""
./scripts/write_aws_creds_file.sh 
```


