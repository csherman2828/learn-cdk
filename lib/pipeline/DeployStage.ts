import { Construct } from 'constructs';
import { StackProps, Stage } from 'aws-cdk-lib';
import { LearnCdkStack } from '../learn-cdk-stack';

type LearnCdkStackProps = StackProps;

export class DeployStage extends Stage {
  constructor(scope: Construct, id: string, props: LearnCdkStackProps) {
    super(scope, id, props);

    const stack = new LearnCdkStack(this, 'LearnCdkStack', props);
  }
}
