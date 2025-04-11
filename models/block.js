import { Schema, model } from "mongoose";

const blockSchema = new Schema({
  //unique: true ensures no two blocks can have the same code
  code: { type: String, required: true, unique: true },
  // This is important because it sets up the relationship between Blocks and Classes.
  // the ref property is used to reference the Class model.
  // This means that each block can be associated with multiple classes.
  // The type property is set to ObjectId, which is the type used by MongoDB for references.
  // The ref property is set to "Class", which is the name of the Class model.
  // This means that each block can be associated with multiple classes.
  classes: [{ type: Schema.Types.ObjectID, ref: "Class" }],
});

const Block = model("Block", blockSchema);
export default Block;
