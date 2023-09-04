import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline } from 'aws-cdk-lib/pipelines';
import createLearnCdkPipeline from './createLearnCdkPipeline';


export default class LearnCdkPipeline extends Stack {
  pipeline: CodePipeline;

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    this.pipeline = createLearnCdkPipeline(
      this,
      'LearnCdkPipeline',
      {}
    );
  }
}
