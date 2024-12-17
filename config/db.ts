import mongoose from 'mongoose';
import { ENV_VARS } from './env';

interface IError{
    message : string
}

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log('mongodb connected:', connect.connection.host);
  } catch (error: IError) {
    console.error('Error connecting to mongo: ', error.message);
    
  }
};
