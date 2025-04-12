import { Schema, model } from "mongoose";

const classSchema = new Schema(
  {
    block: { type: Schema.Types.ObjectId, ref: "Block", required: true },
    code: { type: String, required: true },
    fullCode: { type: String, required: true, unique: true },
    isAvailable: { type: Boolean, default: true },
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  },
  { timestamps: true }
);

classSchema.set("toJSON", { virtuals: true });
classSchema.set("toObject", { virtuals: true });

const Class = model("Class", classSchema);
export default Class;

// import { Schema, model } from "mongoose";

// const classSchema = new Schema({
//   //ref: 'Block' in the Class schema's goal is to relate this classes doc to blocks docs.
//   block: { type: Schema.Type.ObjectId, ref: "Block", required: true },
//   code: { type: String, required: true },
//   fullCode: { type: String, required: true, unique: true },
//   isAvailable: { type: Boolean, default: true },
//   bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
// });

// const Class = model("Class", classSchema);
// export default Class;
// // This code defines a Mongoose schema and model for a Class entity.
