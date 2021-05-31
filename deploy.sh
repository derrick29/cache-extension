cd my-extension
chmod +x index.js
npm install
cd ..

# chmod +x opt/extensions/my-api-dev-hello
chmod +x extensions/my-extension
# rm -rf extension.zip
zip -r a extension.zip my-extension
zip -r a extension.zip extensions

# aws lambda publish-layer-version \
#  --layer-name "my-api-dev-hello" \
#  --region "us-east-1" \
#  --zip-file  "fileb://extension.zip"

# aws lambda invoke \
#  --function-name "my-api-dev-hello" \
#  --payload '{"payload": "hello"}' /tmp/invoke-result \
#  --cli-binary-format raw-in-base64-out \
#  --log-type Tail