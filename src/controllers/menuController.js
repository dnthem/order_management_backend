import { Menu } from "../db/models/index.js";
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
const MenuController = {
  // add a new menu item
  post_create_menuItem: [
    body('title').isLength({ min: 1 }).trim().escape().withMessage('title must be at least 1 characters'),
    body('price').isNumeric().withMessage('Price must be a number'),
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const newMenuItem = new Menu({
        userID: req.user._id,
        title: req.body.title,
        price: req.body.price
      });
      await newMenuItem.save();
      res.status(201).send(newMenuItem);
    })
  ],

  // update a menu item
  patch_update_menuItem: [
    // body('title').isLength({ min: 1 }).trim().escape().withMessage('title must be at least 1 characters').exists(),
    // body('price').isNumeric().withMessage('Price must be a number'),
    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { id } = req.params;
      const updatedMenuItem = await Menu.findByIdAndUpdate
        (id
          , req.body
          , { new: true }
        );
      res.status(200).json(updatedMenuItem);
    })
  ],

  // delete a menu item
  delete_menuItem: asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Menu.findByIdAndDelete(id);
    res.status(204).send();
  }),

  // get all menu items
  get_all_menuItems: asyncHandler(async (req, res) => {
    const menuItems = await Menu.find({ userID: req.user._id });
    res.status(200).send(menuItems);
  }),

  // get a menu item
  get_a_menuItem: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const menuItem = await Menu.findOne({ userID: req.user._id, _id: id });
    res.status(200).send(menuItem);
  }),

}

export default MenuController;