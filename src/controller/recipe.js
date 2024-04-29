import { Recipe } from "../model/recipe.js";

async function createRecipe(
  recipename,
  cuisine,
  course,
  prep_time,
  cook_time,
  servings,
  description,
  ingredients,
  steps,
  user
) {
  return await Recipe.create({
    recipename,
    cuisine,
    course,
    prep_time,
    cook_time,
    servings,
    description,
    ingredients,
    steps,
    user,
  });
}

async function getRecipe() {
  return await Recipe.find({});
}

async function getRecipeByUser(userid) {
  return await Recipe.find({ "user.userid": userid });
}

async function getRecipeById(id) {
  return await Recipe.find({ _id: id });
}

async function editRecipe(id, bodyData) {
  return await Recipe.updateOne({ _id: id }, { ...bodyData });
}

async function deleteRecipe(id) {
  return await Recipe.deleteOne({ _id: id });
}

export {
  createRecipe,
  getRecipe,
  getRecipeById,
  getRecipeByUser,
  editRecipe,
  deleteRecipe,
};
