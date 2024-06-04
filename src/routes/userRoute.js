import UserController from "../controllers/userController.js";
import express from "express";

const router = express.Router();

// preflight: check if the user is authenticated
router.get('/', UserController.get_preflight);
router.post('/login', UserController.post_login);
router.post('/signup', UserController.post_create_user);



export { router };