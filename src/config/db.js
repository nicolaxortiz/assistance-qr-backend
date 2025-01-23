import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

export async function connectDB() {
  mongoose.Promise = global.Promise;

  try {
    await mongoose.connect(url);
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.log(error);
  }
}
