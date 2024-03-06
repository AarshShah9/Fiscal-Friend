import { connectToDatabase } from './db/conn';
import http from 'http';
import { Connection } from 'mongoose';
import { env, validateEnv } from './env';
import app from './app';


// Environment variable validation
require('dotenv').config({ path: '../.env' });
try {
  validateEnv(process.env);
} catch (error) {
  throw new Error('Failed to validate environment variables' + error);
}



const PORT: number = parseInt(env.PORT as string, 10) || 4000;

let server: http.Server;
let mongoClient: Connection;

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




