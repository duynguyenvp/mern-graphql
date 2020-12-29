import { model, Schema } from "mongoose";

const todoSchema = new Schema({
  job: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  }
});

export default model("Todo", todoSchema);
