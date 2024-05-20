import express from "express";
import MenuController from "../controllers/menuController.js";


const router = express.Router();

router.get("/", MenuController.getAllMenuItems);
router.get("/:id", MenuController.getMenuItem);
router.post("/", MenuController.addMenuItem);
router.put("/:id", MenuController.updateMenuItem);
router.delete("/:id", MenuController.deleteMenuItem);


export { router };

