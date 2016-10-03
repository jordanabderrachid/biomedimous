import * as aws from 'aws-sdk';

let instance: aws.DynamoDB.DocumentClient | undefined;

function createInstance(): aws.DynamoDB.DocumentClient {
  return new aws.DynamoDB.DocumentClient();
}

function getInstance(): aws.DynamoDB.DocumentClient {
  if (!instance) {
    instance = createInstance();
  }

  return instance;
}

export default getInstance();
