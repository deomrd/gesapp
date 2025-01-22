import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { router }  from './routes/routes';


const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.get('/gesapp', (req: Request, res: Response) => {
  res.send('Le serveur est bien demarré');
});



app.use(router);

export default app;