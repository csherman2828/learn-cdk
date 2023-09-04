#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import LearnCdkPipeline from '../lib/pipeline';

const app = new cdk.App();
new LearnCdkPipeline(app, 'LearnCdkStack', {});