import { assistanceController } from "../controllers/assistance.js";
import e from "express";

export const assistanceRouter = e.Router();

assistanceRouter.post("/save", assistanceController.save);
assistanceRouter.get("/getAll", assistanceController.getAll);
assistanceRouter.get("/getByDay", assistanceController.getByDay);
assistanceRouter.get("/getByDayAndId/:id", assistanceController.getByDayAndId);
assistanceRouter.delete("/deleteByDay", assistanceController.deleteByDay);
