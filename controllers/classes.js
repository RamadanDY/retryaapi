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
    const class_ = await Classes.findById(id).populate("block", "code");
    if (!class_) return next(createHttpError(404, "class not found"));
    return res.json(class_);
  } catch (error) {
    next(error);
  }
}

export async function getClassBookings(req, res, next) {
  const { id } = req.params;
  if (!id) return next(createHttpError(400, "cannot find the id"));

  try {
    const classBooking = await Classes.findById(id).populate({
      path: "bookings",
    });
    res.json(classBooking.bookings);
  } catch (error) {
    next(error);
  }
}
