import mongoose, { Connection } from 'mongoose';

let connectionInstance: mongoose.Connection | null = null;

export const connectToDatabase = async (
  connectionString: string
): Promise<Connection> => {
  if (connectionInstance) {
    console.log('Using existing database connection');
    return connectionInstance;
  }

  try {
    await mongoose.connect(connectionString);
    console.log('Database Connected Successfully');
    connectionInstance = mongoose.connection;
    return connectionInstance;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};
