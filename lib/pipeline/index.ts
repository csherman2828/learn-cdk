import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { 
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource } from 'aws-cdk-lib/pipelines';

import DeployStage from './DeployStage';

type LearnCdkPipelineProps = StackProps;

export default class LearnCdkPipeline extends Stack {
  source: CodePipelineSource;
  synth: CodeBuildStep;
  cdkPipeline: CodePipeline;

  constructor(scope: Construct, id: string, props: LearnCdkPipelineProps) {
    super(scope, id, props);

    this.acquireSource();
    this.setUpCodeBuildScripts();
    this.createPipeline();
  }

  acquireSource() {
    const codestarConnectionsArn = 'arn:aws:codestar-connections:us-east-1:056680897227:connection/1092aa7c-8e87-4a40-8ee2-44083cf91cc9';

    this.source = CodePipelineSource.connection(
      'csherman2828/learn-cdk',
      'master',
      {
        actionName: 'learn-cdk',
        connectionArn: codestarConnectionsArn,
      }
    );
  }

  setUpCodeBuildScripts() {
    const buildCommands = [
      'npm i',
      'npm run test',
      'npx cdk synth',
    ];

    this.synth = new CodeBuildStep('Build', {
      input: this.source,
      commands: buildCommands,
    });
  }

  createPipeline() {
    this.cdkPipeline = new CodePipeline(this, 'LearnCdkPipeline', {
      synth: this.synth,
      pipelineName: 'LearnCdkPipeline',
    });

    const deployment = new DeployStage(this, `DeployLearnCdk`, {});
    this.cdkPipeline.addStage(deployment);

    const deployment2 = new DeployStage(this, `DeployLearnCdk2`, {});
    this.cdkPipeline.addStage(deployment);

    this.cdkPipeline.buildPipeline();

    
  }
}
