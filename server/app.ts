import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Configure environment variables (for tests)
require('dotenv').config({ path: '../.env' });

// Route imports
import authRoutes from './routes/auth.routes';
import savingsRoutes from './routes/savings.routes';
import budgeetRoutes from './routes/budget.routes';
import expenseRoutes from './routes/expense.routes';
import incomeRoutes from './routes/income.routes';
import stockRoutes from './routes/stock.routes';
import transactionRoutes from './routes/transaction.routes';

const app: Application = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: [
      'http://localhost:4000',
      'http://localhost:3000',
      'http://localhost',
      'https://fiscal-friend.vercel.app',
      'https://fiscal-friend-git-aarsh-fix-aws-aarshshah9.vercel.app',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Test routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server!!');
});

app.get('/test', (req: Request, res: Response) => {
  res.send({ message: 'Test Endpoint' });
});

// Routing
app.use('/auth', authRoutes);
app.use('/savings', savingsRoutes);
app.use('/budget', budgeetRoutes);
app.use('/expense', expenseRoutes);
app.use('/income', incomeRoutes);
app.use('/stock', stockRoutes);
app.use('/transaction', transactionRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: error.message });
});

export default app;
