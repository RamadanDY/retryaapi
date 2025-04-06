import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const configstring = process.env.MONGODB_URL;

mongoose
  .connect(configstring)
  .then(() => {
    console.log("✅ Database has been connected");
  })
  .catch((err) => {
    console.error("❌ Database couldn't be connected", err);
  });
