import express from "express";
import mongoose from "mongoose";
import { teacherRouter } from "./src/routes/teacher.js";
import { connectDB } from "./src/config/db.js";
import { assistanceRouter } from "./src/routes/assistance.js";

const db = connectDB();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api/teacher", teacherRouter);
app.use("/api/assistance", assistanceRouter);

app.listen(port, () => {
  console.log("servidor funcionando en el puerto " + port);
});
