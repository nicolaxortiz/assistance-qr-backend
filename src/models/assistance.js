import mongoose, { Schema } from "mongoose";
import { dateOptions } from "../functions/dateOptions.js";

const assistanceSchema = new Schema({
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  date: {
    type: String,
    default: () =>
      new Date().toLocaleString(process.env.LOCALEZONE, {
        timeZone: process.env.TIMEZONE,
      }),
  },
  timeStamp: {
    type: Number,
    default: () =>
      dateOptions.toTimeStamp(
        new Date().toLocaleString(process.env.LOCALEZONE, {
          timeZone: process.env.TIMEZONE,
        })
      ),
  },
});

export default mongoose.model("Assistance", assistanceSchema);
