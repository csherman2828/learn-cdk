import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
} from 'aws-cdk-lib/pipelines';

import { DeployStage } from './DeployStage';

import { StackProps, Stage } from 'aws-cdk-lib';
import { Construct } from 'constructs';

type LearnCDKPipelineProps = StackProps;

export class Pipeline extends Stage {
  constructor(scope: Construct, id: string, props: LearnCDKPipelineProps) {
    super(scope, id, props);

    const codestarConnectionsArn = 'arn:aws:codestar-connections:us-east-1:056680897227:connection/1092aa7c-8e87-4a40-8ee2-44083cf91cc9';

    const source = CodePipelineSource.connection(
      'csherman2828/learn-cdk',
      'master',
      {
        connectionArn: codestarConnectionsArn,
      }
    );

    const buildCommands = [
      'npm i',
      'cdk synth',
    ]

    const synth = new CodeBuildStep('Build', {
      input: source,
      commands: buildCommands,
    });

    const pipeline = new CodePipeline(scope, 'LearnCDKPipelineProps', {
      synth,
    });

    const deployment = new DeployStage(scope, `${name}Stage`, props);
    pipeline.addStage(deployment);

    pipeline.buildPipeline();
  }
}