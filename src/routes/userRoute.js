import UserController from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.post('/login', UserController.post_login);
router.post('/signup', UserController.post_create_user);

export { router };