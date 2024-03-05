import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Configure environment variables (for tests)
require('dotenv').config({ path: '../.env' });

// Route imports
import authRoutes from './routes/auth.routes';

const app: Application = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // adjust this to match your React app's URL
  credentials: true, // allow the server to accept cookies
};
app.use(cors(corsOptions));

// Test routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server!!');
});

app.get('/test', (req: Request, res: Response) => {
  res.send({ message: 'Test Endpoint' });
});

// Routing
app.use('/auth', authRoutes);

export default app;