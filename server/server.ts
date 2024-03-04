import express, { Request, Response, Application } from 'express';
import { connectToDatabase } from './db/conn';
const cookieParser = require("cookie-parser");
require('dotenv').config({ path: "../.env"});

// import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

import http from 'http';
import { Connection } from 'mongoose';

require('dotenv').config({ path: '../.env' });
import { env, validateEnv } from './env';

try {
  // Validates the Env file
  validateEnv(process.env);
} catch (error) {
  throw new Error('Failed to validate environment variables' + error);
}

const app: Application = express();
const PORT: number = parseInt(env.PORT as string, 10) || 4000;

app.use(cookieParser());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server!!');
});

app.use('/auth', authRoutes);

app.get('/test', (req: Request, res: Response) => {
  res.send({ message: 'Test Endpoint' });
});

let server: http.Server;
let mongoClient: Connection;

if (require.main === module) {
  (async () => {
    try {
      mongoClient = await connectToDatabase(process.env.ATLAS_URI!);
      server = app.listen(PORT, () => {
        console.log(`Server is live at http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to connect to the database:', error);
    }
  })();
}

export default app;
export { server, mongoClient };




