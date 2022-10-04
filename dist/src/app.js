import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { router } from './routes/notes.js';
const app = express();
// ----------------------------------------------------------------
app.use(cors());
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/notes', router);
app.set('json spaces', 2);
//-----------------------------------------------------------------
//----------------------------------------------------------------
export { app };
