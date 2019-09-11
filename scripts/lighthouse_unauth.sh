MAX_BUNDLE_SIZE_KB="$(node -p 'require("./package.json").lighthouse.maxBundleSizeKb')" \
JS_BUNDLE_REGEX="$(node -p 'require("./package.json").lighthouse.jsBundleRegex')" \
lighthouse $TEST_URL \
  --config-path=./lighthouse-config/custom-config.js \
  --port=9222 \
  --chrome-flags=\"--headless\" \
  --output-path=./reports/anonymous-"$(echo -n $CIRCLE_SHELL_ENV | md5sum | awk '{print $1}')" \
  --output=json \
  --output=html