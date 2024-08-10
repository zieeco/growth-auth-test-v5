import mongoose, { Error as MongooseError } from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new MongooseError(
    'Invalid/Missing environment variable: "MONGODB_URI"',
  );
}

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI, {});

    if (connection.readyState === 1) {
      console.log('MongoDB connected successfully');
    } else {
      throw new MongooseError('MongoDB connection not ready');
    }
  } catch (error: unknown) {
    console.error(
      `Error connecting to MongoDB: ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
    process.exit(1);
  }
};

export default connectDB;
