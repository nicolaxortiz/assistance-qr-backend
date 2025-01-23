import teacher from "../models/teacher.js";
import mongoose from "mongoose";

export const teacherController = {
  save: async (req, res) => {
    const { name, lastName, document } = req.body;

    try {
      const newTeacher = await new teacher({
        name,
        lastName,
        document,
      }).save();

      return res.status(200).send({
        status: 200,
        message: "Docente registrado correctamente",
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "Error en el servidor: " + error,
      });
    }
  },

  getAll: async (req, res) => {
    try {
      let query = await teacher.find({}).sort({ createdAt: "desc" });

      if (query.length === 0) {
        return res.status(404).send({
          status: 404,
          message: "No se encontraron docentes para listar",
        });
      }

      return res.status(200).send({
        status: 200,
        teachers: query,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        message: "Error en el servidor",
      });
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;

    if (mongoose.Types.ObjectId.isValid(id)) {
      try {
        let query = await teacher.findById(id);

        if (!query) {
          return res.status(404).send({
            status: 404,
            message: "No se encontró el docente",
          });
        }

        return res.status(200).send({
          status: 200,
          teacher: query,
        });
      } catch (error) {
        return res.status(500).send({
          status: 500,
          message: "Error en el servidor " + error,
        });
      }
    } else {
      return res.status(404).send({
        status: 404,
        message: "No se encontró el docente",
      });
    }
  },
};
