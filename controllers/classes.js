import Block from "../models/class.js";
import createHttpError from "http-errors";
import Classes from "../models/class.js";

export async function getAllClasses(req, res, next) {
  try {
    const classes = await Classes.find().populate("block", "code");
    if (!classes) return next(createHttpError(404, "Classes not found"));
    res.json(classes);
  } catch (error) {
    next(createHttpError(404, "error message"));
  }
}
