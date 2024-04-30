import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./src/model/db.js";
import { userRoutes } from "./src/routes/user.js";
import { recipeRoutes } from "./src/routes/recipe.js";

dotenv.config();
const app = express();

app.use(cors());
// credentials: true,
// methods: ["GET", "POST", "PUT", "DELETE"],
// allowedHeaders: ["Content-Type"],

// { credentials: true, origin: "https://krc-frontend.onrender.com/" }
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const PORT = process.env.PORT;
dbConnection();

app.use("/api/user", userRoutes);
app.use("/api/recipe", recipeRoutes);

app.listen(PORT, () => console.log(`Server listening to PORT: ${PORT}`));
