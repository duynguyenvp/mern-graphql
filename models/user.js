import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

export default model("User", userSchema);
