import Block from "../models/class.js";
import createHttpError from "http-errors";
import Classes from "../models/class.js";

export async function getAllClasses(req, res, next) {
  try {
    const classes = await Classes.find().populate("block", "code");
    if (!classes) return next(createHttpError(404, "Classes not found"));
    return res.json(classes);
  } catch (error) {
    next(createHttpError(404, "error message"));
  }
}

export async function getClassesById(req, res, next) {
  const { id } = req.params;
  if (!id) return next(createHttpError(404, "class id is required"));
  try {
    const classes = await Classes.findById(id).populate("block", "code");
    if (!classes) return next(createHttpError(404, "class not found"));
    return res.json(classes);
  } catch (error) {
    next(error);
  }
}
