import mongoose, { mongo, Schema } from "mongoose";

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  document: {
    type: Number,
    required: true,
    unique: true,
  },
  createdAt: {
    type: String,
    default: () =>
      new Date().toLocaleString(process.env.LOCALEZONE, {
        timeZone: process.env.TIMEZONE,
      }),
  },
});

export default mongoose.model("Teacher", teacherSchema);
