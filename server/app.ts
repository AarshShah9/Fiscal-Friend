import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Configure environment variables (for tests)
require('dotenv').config({ path: '../.env' });

// Route imports
import authRoutes from './routes/auth.routes';
import budgeetRoutes from './routes/budget.routes';
import expenseRoutes from './routes/expense.routes';
import incomeRoutes from './routes/income.routes';

const app: Application = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:4000", "http://localhost:3000", "http://localhost"],
    methods: ["GET", "POST", "PUT", "DELETE"],
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
app.use('/budget', budgeetRoutes);
app.use('/expense', expenseRoutes);
app.use('/income', incomeRoutes);

export default app;