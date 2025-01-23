import { teacherController } from "../controllers/teacher.js";
import e from "express";

export const teacherRouter = e.Router();

teacherRouter.post("/save", teacherController.save);
teacherRouter.get("/getAll", teacherController.getAll);
teacherRouter.get("/getById/:id", teacherController.getById);
