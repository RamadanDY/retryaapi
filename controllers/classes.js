import Block from "../models/class.js";
import createHttpError from "http-errors";
import Classes from "../models/class.js";
export async function createClasses(req, res, next) {
  const { blockId, code } = req.body;

  if (!blockId || !code) {
    return next(
      createHttpError(400, "Missing required fields: classId, blockId, code")
    );
  }

  try {
    const block = await Block.findById(blockId);
    if (!block) return next(createHttpError(404, "Block not found"));

    const class_ = new Classes({
      block: blockId,
      code,
      fullCode: `${block.code} ${code}`,
    });

    await class_.save();
    block.classes.push(class_._id);
    await block.save();
    return res.status(201).json(class_);
  } catch (error) {
    console.trace(error);
    next(error);
  }
}

// export async function createClasses(req, res, next) {
//   // lets create classes
//   // the req.body is an object that conatains the data that we get from the client side
//   // we extract the data from the req body
//   // the clients sends an object that contains the blockid and the code
//   // simply lets extract the data that the user send to the server side after filling the forms
//   const { blockId, code } = req.body;
//   // if either block of code is missing throw this error 400
//   if (!blockId || !code)
//     return next(
//       createHttpError(400, "missing required fields: blockId code classId")
//     );

//   try {
//     const block = Block.findById(blockId);
//     if (!block) return next(createHttpError(400, "Block not found"));
//     // this is to save the block ids alongside the new class that we create so that they stay linked to their various blocks
//     // note that this only creates a one way relationship ie from class to block
//     const class_ = new Classes({
//       block: blockId,
//       code,
//       fullCode: `${block.code} ${code}`,
//     });
//     await class_.save();

//     // lets create a relationshi with the block to class in the sense that when we create a class the id of that class is added
//     // to the list of ids in the block db
//     await block.save();
//     block.classes.push(class_._id);
//     return res.status(201).json(class_);
//   } catch (error) {
//     console.trace(error);
//     next(error);
//   }
// }

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
      select: "id",
    });
    res.json(classBooking.bookings);
  } catch (error) {
    next(error);
  }
}
