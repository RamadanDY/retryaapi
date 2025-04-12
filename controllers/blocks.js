import Blocks from "../models/block.js";
import classes from "../models/class.js";
import bookings from "../models/bookings.js";
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

export async function getBlocks(req, res, next) {
  try {
    const blocks = await Blocks.find()
      .populate({
        path: "classes",
      })
      // is changes the data into asscending(1) or descending(-1) order
      .sort({ code: 1 });
    return res.json(blocks);
  } catch (error) {
    res.send(error);
  }
}

export async function getBlockClasses(req, res, next) {
  // we get the id from  the params that the user sends
  // cause the id is added to the http route so we retrieve it from there
  const { id } = req.params;

  if (!id) return next(createHttpError(400, "Block id is required"));
  try {
    const block = await Blocks.findById(id)
      .populate({
        path: "classes",
        populate: [
          { path: "block", select: "code" },
          {
            path: "bookings",
            select: "timeRange course level representativeId",
          },
        ],
      })
      .sort({ code: 1 });

    if (!block) return next(createHttpError(404, "Block not found"));

    return res.json(block.classes);
  } catch (error) {
    console.trace(error);
    next(error);
  }
}

export async function getBlockById(req, res, next) {
  const { id } = req.params;
  if (!id)
    return next(
      createHttpError(404, "couldnt  find the block with this kinda ID")
    );
  try {
    const block = await Blocks.findById(id).populate({
      path: "classes",
      select: "code fullCode isAvailable",
    });
    if (!block) return next(createHttpError(404, "cannof find block"));
    return res.json(block);
  } catch (error) {
    next(error);
  }
}
