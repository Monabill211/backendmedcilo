import mongoose from "mongoose";

const massegaSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  massega: {
    type: String,
  },
},
{ timestamps: true }
);

export default mongoose.model("massega", massegaSchema);