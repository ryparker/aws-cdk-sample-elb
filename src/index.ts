import { App, Stack, RemovalPolicy } from '@aws-cdk/core';
import { Bucket, BlockPublicAccess } from '@aws-cdk/aws-s3';
import { ApplicationLoadBalancer } from '@aws-cdk/aws-elasticloadbalancingv2';
import { Vpc } from '@aws-cdk/aws-ec2';

const app = new App();
const stack = new Stack(app, 'Issue16673', {
  env: {
    account: '495634646531',
    region: 'us-east-1',
  }
});

const bucket = new Bucket(stack, 'Bucket', {
  bucketName: 'issue-16673-test-bucket',
  blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
  removalPolicy: RemovalPolicy.DESTROY,
  autoDeleteObjects: true
});

const alb = new ApplicationLoadBalancer(stack, "Alb", {
  vpc: Vpc.fromLookup(stack, 'Vpc', { isDefault: true }),
});
alb.logAccessLogs(bucket);
