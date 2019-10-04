#!/usr/bin/env bash
set -e
IFS='|'
help_output () {
    echo "usage: amplify-push <--environment|-e <name>> <--import|-i>"
    echo "  --environment  The name of the Amplify environment to use"
    echo "  --import  Optional import flag to import existing env"
    exit 1
}

init_env () {
    ENV=$1
    AMPLIFY=$2
    PROVIDERS=$3
    CODEGEN=$4
    AWSCONFIG=$5
    FRONTEND=$6

  if [[ ${IS_IMPORT} = true ]];
  then
      echo "# Start initializing Amplify environment: ${ENV}"
      STACKINFO="$(~/.yarn/bin amplify  env get --json --name ${ENV})"
      echo "STACKINFO="${STACKINFO}
      echo "# Importing Amplify environment: ${ENV} (amplify env import)"
      ~/.yarn/bin amplify env import --name ${ENV} --config "${STACKINFO}" --awsInfo ${AWSCONFIG} --frontend $FRONTEND --yes;
      echo "# Initializing existing Amplify environment: ${ENV} (amplify init)"
      ~/.yarn/bin amplify init --amplify ${AMPLIFY} --providers ${PROVIDERS} --codegen ${CODEGEN} --yes;
      echo "# Environment ${ENV} details:"
      ~/.yarn/bin amplify env get --name ${ENV}
  else
      echo "# Initializing new Amplify environment: ${ENV} (amplify init)"
      ~/.yarn/bin amplify init --amplify ${AMPLIFY} --providers ${PROVIDERS} --codegen ${CODEGEN} --frontend $FRONTEND --yes;
      echo "# Environment ${ENV} details:"
      ~/.yarn/bin amplify env get --name ${ENV}
  fi


    echo "# Done initializing Amplify environment: ${ENV}"
}

ENV=""
IS_IMPORT=false
POSITIONAL=()
while [[ $# -gt 0 ]]
do
    key="$1"
    case ${key} in
        -e|--environment)
            ENV=$2
            shift
            ;;
        -r|--region)
            REGION=$2
            shift
            ;;
        -i|--import)
            IS_IMPORT=true
            shift
            ;;
        *)
            POSITIONAL+=("$1")
            shift
            ;;
    esac
done

set -- "${POSITIONAL[@]}"

# if no provided environment name, use default env variable, then user override
if [[ ${ENV} = "" ]];
then
    ENV=${AWS_BRANCH}
fi
if [[ ${USER_BRANCH} != "" ]];
then
    ENV=${USER_BRANCH}
fi

# Check valid environment name
if [[ -z ${ENV} || "${ENV}" =~ [^a-zA-Z0-9\-]+ ]] ; then help_output ; fi

AWSCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"amplify\",\
\"region\":\"ap-southeast-2\"\
}"

AMPLIFY="{\
\"projectName\":\"amplifypoc\",\
\"envName\":\"${ENV}\",\
\"defaultEditor\":\"code\"\
}"

PROVIDERS="{\
\"awscloudformation\":${AWSCONFIG}\
}"

CODEGEN="{\
\"generateCode\":false,\
\"generateDocs\":false\
}"

REACTCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"build\",\
\"BuildCommand\":\"yarn build\",\
\"StartCommand\":\"yarn start\"\
}"

FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"react\",\
\"config\":$REACTCONFIG\
}"



init_env ${ENV} ${AMPLIFY} ${PROVIDERS} ${CODEGEN} ${AWSCONFIG} ${FRONTEND}
