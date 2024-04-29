import express, { query } from "express";

import {
  createRecipe,
  deleteRecipe,
  editRecipe,
  getRecipe,
  getRecipeByUser,
  getRecipeById,
} from "../controller/recipe.js";
import { model, Mongoose } from "mongoose";
import { adminAuth, auth, validateToken } from "../middleware/auth.js";

const router = express.Router();

// adding Recipe with Recipename ingredients and steps

router.post("/setrecipe", async (req, res) => {
  try {
    const {
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
      createdOn,
    } = req.body;

    await createRecipe(
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
      createdOn
    );
    res.status(201).send({ message: "Recipe Added " });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
});

// get all Recipe

router.get("/all", async (req, res) => {
  try {
    const recipe = await getRecipe();
    res.status(201).send({ message: "data received", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
});

// get  Recipe by userId

router.get("/myrecipe/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await getRecipeByUser(id);

    res.status(200).send({ message: "data received successfully", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
});

//get recipe by user
router.get("/allrecipe", async (req, res) => {
  try {
    const { user } = req.query;

    const recipe = await getRecipe(user);
    res.status(200).send({ message: "data received successfully", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await getRecipeById(id);
    if (recipe) {
      return res.status(200).send({ message: "Recipe Fetched", recipe });
    }

    return res.status(400).send({ message: "Recipe not available" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Internal Server Error" });
  }
});

//modify recipe by user
router.put("/edit/:id", validateToken, auth, async (req, res) => {
  try {
    const { id } = await req.params;

    const bodyData = await req.body;
    const [isReceipeAvailable] = await getRecipeById(id);

    if (isReceipeAvailable) {
      const recipe = await editRecipe(id, bodyData);
      return res.status(201).send({
        message: `${isReceipeAvailable.recipename} Recipe Updated Successfully`,
        recipe,
      });
    }
    res.status(404).send({ message: "recipe not available" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
});

//modify recipe by user
router.delete("/delete/:id", validateToken, auth, async (req, res) => {
  try {
    const { id } = await req.params;
    const [isReceipeAvailable] = await getRecipeById(id);

    if (isReceipeAvailable) {
      const deleteData = await deleteRecipe(id);
      res.status(200).send({
        message: `${isReceipeAvailable.recipename} Recipe Deleted Successfully`,
      });
      return;
    }
    res.status(404).send({ message: "recipe not available" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
});

export const recipeRoutes = router;
