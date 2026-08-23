import mongoose from "mongoose"; 
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.DB_URI as string,
      {
        dbName:"mega"
      }
    );

    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);

  } catch (err) {
    console.log("MongoDB connection ERROR", err);
    process.exit(1);
  }
};

export default connectDB;