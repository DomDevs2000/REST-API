import dotenv from 'dotenv';
import sls from 'serverless-http'
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { router } from './routes/notes.js';
const app = express();

// ----------------------------------------------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/notes', router);
app.get('/', (req, res) => {
    res.send('Welcome to my Node.js CRUD REST API Project, please refer to the documentation at https://github.com/DomDevs2000/REST-API#readme');
})
app.set('json spaces', 2);
//-----------------------------------------------------------------

//----------------------------------------------------------------
export const server = sls(app)
export {app} ;
