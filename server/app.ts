import express, { Application, Request, Response } from 'express';
const cookieParser = require('cookie-parser');

// Configure environment variables (for tests)
require('dotenv').config({ path: '../.env' });

// Route imports
import authRoutes from './routes/auth.routes';

const app: Application = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());

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