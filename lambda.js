import  serverlessExpress from '@vendia/serverless-express'
import {app} from './src/app.js';
exports.handler = serverlessExpress({ app })