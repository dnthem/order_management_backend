import UserController from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export { router };