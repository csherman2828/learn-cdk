import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
} from 'aws-cdk-lib/pipelines';

import DeployStage from './DeployStage';

import { Construct } from 'constructs';

type LearnCdkPipelineProps = {};

export default function createLearnCdkPipeline(scope: Construct, id: string, props: LearnCdkPipelineProps) {

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
      'npm run test',
      'npx cdk synth',
    ];

    const synth = new CodeBuildStep('Build', {
      input: source,
      commands: buildCommands,
    });

    const pipeline = new CodePipeline(scope, 'LearnCDKPipeline', {
      synth,
    });

    const deployment = new DeployStage(scope, `DeployLearnCdk`, {});
    pipeline.addStage(deployment);

    pipeline.buildPipeline();

    return pipeline;
}