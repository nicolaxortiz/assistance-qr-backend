import { dateOptions } from "../functions/dateOptions.js";
import assistance from "../models/assistance.js";

export const assistanceController = {
  save: async (req, res) => {
    const { teacherId } = req.body;

    try {
      const newAssistance = await new assistance({
        teacherId,
      }).save();

      return res.status(200).send({
        status: 200,
        message: "Asistencia registrada correctamente",
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "Error en el servidor: inténtelo nuevamente ",
      });
    }
  },

  getAll: async (req, res) => {
    try {
      let query = await assistance.find({}).sort({ timeStamp: "asc" });

      if (query.length === 0) {
        return res.status(404).send({
          status: 404,
          message: "No se encontraron asistencias para listar",
        });
      }

      return res.status(200).send({
        status: 200,
        assistances: query,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "Error en el servidor: " + error,
      });
    }
  },

  getByDay: async (req, res) => {
    const day = new Date().toLocaleDateString(process.env.LOCALEZONE, {
      timeZone: process.env.TIMEZONE,
    });

    try {
      const query = await assistance
        .find({ date: { $regex: `^${day}` } })
        .sort({ timeStamp: "asc" })
        .populate("teacherId");

      if (query.length === 0) {
        return res.status(404).send({
          status: 404,
          message: "No se encontraron asistencias para listar",
        });
      }

      return res.status(200).send({
        status: 200,
        assistances: query,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "Inténtelo nuevamente",
      });
    }
  },

  getByDayAndId: async (req, res) => {
    const { id } = req.params;
    const day = new Date().toLocaleDateString(process.env.LOCALEZONE, {
      timeZone: process.env.TIMEZONE,
    });

    try {
      const query = await assistance
        .findOne({ teacherId: id, date: { $regex: `^${day}` } })
        .populate("teacherId");

      if (!query) {
        return res.status(404).send({
          status: 404,
          message: "No se encontraron asistencias para listar",
        });
      }

      return res.status(200).send({
        status: 200,
        message: "El docente ya tiene registrada su asistencia",
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "Inténtelo nuevamente",
      });
    }
  },

  deleteByDay: async (req, res) => {
    const day = new Date().toLocaleDateString(process.env.LOCALEZONE, {
      timeZone: process.env.TIMEZONE,
    });

    try {
      const query = await assistance.deleteMany({
        date: { $regex: `^${day}` },
      });

      if (query.deletedCount === 0) {
        return res.status(404).send({
          status: 404,
          message: "No se encontraron asistencias para eliminar",
        });
      }

      return res.status(200).send({
        status: 200,
        message: "Asistencias eliminadas correctamente",
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "Error en el servidor: " + error,
      });
    }
  },
};
