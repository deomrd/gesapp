import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { router }  from './routes/routes';


const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/gesapp', (req: Request, res: Response) => {
  res.send('Le serveur est bien demarré');
});


app.use(router);

export default app;