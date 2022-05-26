import { join } from 'path';
import 'express-async-errors';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import startDb from './database/config';
import router from './routes';
import { errorHandler, notFound } from './middlewares/errors';

dotenv.config();

startDb();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.use(compression());
app.use(cookieParser());

app.use('/api', router);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);

export default app;
