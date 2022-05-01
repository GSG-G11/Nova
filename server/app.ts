import { join } from 'path';
import 'express-async-errors';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
<<<<<<< HEAD
import { authRouter } from './routes';
=======
import startDb from './database/config';
import { errorHandler, notFound } from './middlewares/errors';
>>>>>>> 2c3a4cd776be5b5024b87c3485e776297a3742a9

dotenv.config();

startDb();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(cookieParser());

app.use('/api', authRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.use(notFound);
app.use(errorHandler);
export default app;
