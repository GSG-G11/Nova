import {join} from 'path';
import 'express-async-errors';
import dotenv from 'dotenv';
import express, {Application, Request, Response} from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import {notFoundError, errorHandler} from './errors';
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(compression());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.use(notFoundError);
app.use(errorHandler);
export default app;
