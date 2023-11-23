import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/users/user.routes';
const app: Application = express();

// Parser
app.use(cors());
app.use(express.json());

// All Routes
app.use('api', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to User Management Application!');
});

export default app;
