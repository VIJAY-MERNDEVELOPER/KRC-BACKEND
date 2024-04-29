import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 12,
  },
  role: {
    type: String,
    default: "user",
  },
});

/* 
creates a Mongoose model named User, 
which corresponds to the "users" collection in your MongoDB database,
 and enforces the schema defined by userSchema
 */

export const User = mongoose.model("users", userSchema);
