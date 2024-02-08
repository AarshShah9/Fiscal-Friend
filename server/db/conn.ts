import mongoose, {Connection} from 'mongoose';

// Assuming MONGO_URI is a string, adjust as necessary for your environment
let MONGO_URI: string = process.env.ATLAS_URI as string;

MONGO_URI="mongodb+srv://allaccess:8lbtpYuPmMAAzOmj@fiscalfriendfirst.envrqpu.mongodb.net/?retryWrites=true&w=majority"

let connectionInstance: mongoose.Connection | null = null;

export const connectToDatabase  = async(): Promise<Connection> =>  {
    if (connectionInstance) {
        console.log('Using existing database connection');
        return connectionInstance;
    }

    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database Connected Successfully');
        connectionInstance = mongoose.connection;
        return connectionInstance;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
}
