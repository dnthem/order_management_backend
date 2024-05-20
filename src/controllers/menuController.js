import { Menu } from  "../db/models/index.js";

const MenuController = {
  // add a new menu item
  async addMenuItem(req, res) {
    try {
      const newItem = new Menu(req.body);
      await newItem.save();
      res.status(201).send(newItem);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // update a menu item
  async updateMenuItem(req, res) {
    try {
      const { id } = req.params;
      await Menu.findByIdAndUpdate
        (id
          , req.body
          , { new: true }
        );
      res.status(200).send({ message: "Updated" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // delete a menu item
  async deleteMenuItem(req, res) {
    try {
      const { id } = req.params;
      await Menu.findByIdAndDelete(id);
      res.status(200).send({ message: "Deleted" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // get all menu items
  async getAllMenuItems(req, res) {
    try {
      const menuItems = await Menu.find({
        userID: req.user._id
      });
      res.status(200).send(menuItems);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  // get a menu item
  async getMenuItem(req, res) {
    try {
      const { id } = req.params;
      const menuItem = await Menu.findById(id);
      res.status(200).send(menuItem);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

}

export default MenuController;