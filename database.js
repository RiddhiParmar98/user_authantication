import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
class Database {
  constructor() {
    // this.connect();
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB")
    } catch (error) {
      console.log('Error While connecting to Database :', error);
    }
  }
}
export default Database;