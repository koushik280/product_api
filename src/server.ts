import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { connectDb } from "./config/db";
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`server is runnig port ${PORT}`);
  });
};

startServer();
