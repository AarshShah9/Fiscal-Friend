import express, { Request, Response, Application } from 'express';
import { connectToDatabase } from './db/conn';
const cookieParser = require("cookie-parser");
require('dotenv').config({ path: "../.env"});

// import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 4000;

(async () => {
  try {
    await connectToDatabase(process.env.ATLAS_URI!);
    console.log('Database connection established, starting server...');
    app.listen(PORT, () => {
      console.log(`Server is live at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
})();

app.use(cookieParser());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server!!');
});

// app.use('/api/user', userRoutes);
app.use('/auth', authRoutes);


