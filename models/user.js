import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
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
