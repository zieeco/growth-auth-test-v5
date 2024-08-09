import mongoose, { Error as MongooseError } from 'mongoose';

const {MONGO_URI} = process.env;

if (!MONGO_URI) {
	throw new MongooseError('Invalid environment variable');
}

const connectDB = async (): Promise<boolean> => {
	try {
		const {connection} = await mongoose.connect(MONGO_URI, {});
		if (connection.readyState === 1) {
			console.log('MongoDB connected successfully');
			return true;
		} else {
			throw new MongooseError('MongoDB connection not ready');
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error connecting to MongoDB: ${error.message}`);
		} else {
			console.error('An unknown error occurred while connecting to MongoDB');
		}
		process.exit(1);
		return Promise.reject(error);
	}
};

export default connectDB;
