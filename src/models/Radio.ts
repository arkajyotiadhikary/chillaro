import { Schema, model } from "mongoose";

const radioSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export default model("Radio", radioSchema);
