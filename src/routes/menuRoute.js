import express from "express";
import MenuController from "../controllers/menuController.js";


const router = express.Router();

router.get("/", MenuController.get_all_menuItems);
router.get("/:id", MenuController.get_a_menuItem);
router.post("/", MenuController.post_create_menuItem);
router.patch("/:id", MenuController.patch_update_menuItem);
router.delete("/:id", MenuController.delete_menuItem);

export { router };

