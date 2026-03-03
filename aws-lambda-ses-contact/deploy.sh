#!/bin/bash

# Configuration
ROLE_NAME="InitiumWebContactLambdaRole"
FUNCTION_NAME="InitiumWebContactHandler"
API_NAME="InitiumWebContactAPI"
REGION="us-east-1"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

echo "AWS Account ID: $ACCOUNT_ID"

echo "1. Creating IAM Role..."
aws iam create-role --role-name $ROLE_NAME --assume-role-policy-document file://trust-policy.json > /dev/null 2>&1 || echo "Role already exists"

echo "2. Attaching Policy to Role..."
aws iam put-role-policy --role-name $ROLE_NAME --policy-name InitiumWebSESPolicy --policy-document file://role-policy.json

echo "Waiting 10 seconds for IAM Role propagation..."
sleep 10

echo "3. Packaging Lambda Function..."
zip -r function.zip index.mjs > /dev/null

echo "4. Creating Lambda Function..."
aws lambda create-function \
    --function-name $FUNCTION_NAME \
    --runtime nodejs18.x \
    --role arn:aws:iam::$ACCOUNT_ID:role/$ROLE_NAME \
    --handler index.handler \
    --zip-file fileb://function.zip > /dev/null 2>&1 || aws lambda update-function-code --function-name $FUNCTION_NAME --zip-file fileb://function.zip > /dev/null 2>&1

echo "Waiting 5 seconds for Lambda function propagation..."
sleep 5

echo "5. Creating HTTP API Gateway..."
API_ID=$(aws apigatewayv2 create-api --name $API_NAME --protocol-type HTTP --cors-configuration AllowOrigins="*",AllowMethods="POST,OPTIONS",AllowHeaders="Content-Type" --query ApiId --output text)
echo "API ID: $API_ID"

echo "6. Creating Integration..."
INTEGRATION_ID=$(aws apigatewayv2 create-integration \
    --api-id $API_ID \
    --integration-type AWS_PROXY \
    --integration-uri arn:aws:lambda:$REGION:$ACCOUNT_ID:function:$FUNCTION_NAME \
    --payload-format-version 2.0 \
    --query IntegrationId --output text)
echo "Integration ID: $INTEGRATION_ID"

echo "7. Creating Routes..."
aws apigatewayv2 create-route --api-id $API_ID --route-key "POST /contact" --target integrations/$INTEGRATION_ID > /dev/null
aws apigatewayv2 create-route --api-id $API_ID --route-key "OPTIONS /contact" --target integrations/$INTEGRATION_ID > /dev/null

echo "8. Adding Lambda Permissions..."
aws lambda add-permission \
    --function-name $FUNCTION_NAME \
    --statement-id apigateway-invoke-contact \
    --action lambda:InvokeFunction \
    --principal apigateway.amazonaws.com \
    --source-arn "arn:aws:execute-api:$REGION:$ACCOUNT_ID:$API_ID/*/*/contact" > /dev/null 2>&1 || echo "Permission already exists"

echo "9. Deploying API Gateway (Default Stage)..."
aws apigatewayv2 create-stage --api-id $API_ID --stage-name \$default --auto-deploy > /dev/null 2>&1 || echo "Stage already exists"

echo "------------------------------------------------------"
echo "API Endpoint:"
echo "https://${API_ID}.execute-api.${REGION}.amazonaws.com/contact"
echo "------------------------------------------------------"
