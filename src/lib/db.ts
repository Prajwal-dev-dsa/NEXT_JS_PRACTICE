import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("Please provide MONGO_URI in the environment variables");
}

let cache = global.mongoose;

if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (cache.conn) {
    return cache.conn;
  }
  if (!cache.promise) {
    cache.promise = connect(MONGO_URI).then((mongoose) => mongoose.connection);
  }
  try {
    cache.conn = await cache.promise;
  } catch (error) {
    console.log("Mongoose connection error", error);
  }
  return cache.conn;
}
