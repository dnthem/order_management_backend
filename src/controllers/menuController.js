import { Menu } from "../db/models/index.js";
import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

const MenuController = {

  /**
   * Create a menu item
   * Route: POST /menu
   * @param {string} title - menu item title
   * @param {number} price - menu item price
   * @returns {object} - new menu item
   */
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

  /**
   * Update a menu item
   * Route: PATCH /menu/:id
   * @param {string} title - menu item title
   * @param {number} price - menu item price
   * @returns {object} - updated menu item
   */
  patch_update_menuItem: [
    body('title').isLength({ min: 1 }).trim().escape().withMessage('title must be at least 1 characters').exists(),
    body('price').isNumeric().withMessage('Price must be a number'),
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

  /**
   * Delete a menu item
   * Route: DELETE /menu/:id
   * @param {string} id - menu item ID
   * @returns {} - status 204
   */
  delete_menuItem: asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Menu.findByIdAndDelete(id);
    res.status(204).send();
  }),

  /**
   * Get all menu items
   * Route: GET /menu
   * @returns {object} - list of menu items
   */
  get_all_menuItems: asyncHandler(async (req, res) => {
    const menuItems = await Menu.find({ userID: req.user._id });
    res.status(200).send(menuItems);
  }),

  /**
   * Get a menu item
   * Route: GET /menu/:id
   * @param {string} id - menu item ID
   * @returns {object} - menu item
   */
  get_a_menuItem: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const menuItem = await Menu.findOne({ userID: req.user._id, _id: id });
    res.status(200).send(menuItem);
  }),

}

export default MenuController;