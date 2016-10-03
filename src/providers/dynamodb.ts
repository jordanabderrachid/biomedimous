import {DynamoDB} from 'aws-sdk';

const DYNAMODB_REGION = 'eu-west-1';
const DYNAMODB_VERSION = '2012-08-10';

let instance: DynamoDB.DocumentClient | undefined;

function createInstance(): DynamoDB.DocumentClient {
  return new DynamoDB.DocumentClient({
    apiVersion: DYNAMODB_VERSION,
    region: DYNAMODB_REGION
  });
}

function getInstance(): DynamoDB.DocumentClient {
  if (!instance) {
    instance = createInstance();
  }

  return instance;
}

export default getInstance();
