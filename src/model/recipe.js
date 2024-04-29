import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  recipename: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    enum: ["None", "American", "Chinese", "German", "Indian"],
    default: "None",
  },
  course: {
    type: String,
    enum: ["None", "Appetizer", "Side Dish", "Snack"],
    default: "None",
  },
  prep_time: {
    type: String,
  },
  cook_time: {
    type: String,
  },
  servings: {
    type: Number,
  },

  description: {
    type: String,
  },
  ingredients: {
    type: Array,
  },
  steps: {
    type: Array,
  },
  user: {
    userid: { type: String },
    username: { type: String },
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

export const Recipe = mongoose.model("recipes", recipeSchema);
