import mongoose from 'mongoose';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

export const connectToDatabase = async (mongodbUri: string): Promise<void> => {
  try {
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.error('MongoDB connection failed.', error);
    throw error;
  }
};
