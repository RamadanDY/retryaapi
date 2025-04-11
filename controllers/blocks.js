import Blocks from "../models/block.js";
import createHttpError from "http-errors";

export async function createBlock(req, res, next) {
  const { code } = req.body;
  console.log(code);
  if (!code) return next(createHttpError(400, "missing data field")); // Fixed
  try {
    const block = new Blocks({ code });
    await block.save();
    return res.status(201).json(block);
  } catch (error) {
    console.log(error);
    next(error);
  }

  res.send("hello ");
}

export async function getAllBlocks(req, res, next) {
  try {
    const getAllBlock = await Blocks.find();
    if (!getAllBlock || getAllBlock.length === 0) {
      return next(createHttpError(404, "couldn't find the blocks")); // Fixed
    }
    res.json({ getAllBlock });
  } catch (error) {
    console.log(error);
    next(error);
  }
  res.send("herroooo");
}

export async function getAllClasses(req, res, next) {
  const { id } = req.params;
  if (!id) return next(createHttpError(400, "Block ID not found"));
  try {
    const allClasses = await Blocks.findById(id)
      // lets add the populate mongoose method here
      .populate({});
    if (!allClasses) return next(createHttpError(404, "Block not found"));
    return res.json(allClasses.block);
  } catch (error) {}
}
