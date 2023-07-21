import express from "express";
import { authenticateToken, capitalize, displayHttpInfo } from "../utils/index.js";
import {
  Menu,
  Customers,
  Income,
  Incomeuptodate,
  Orders,
} from "../db/mongodb.js";

const db = {
  Menu,
  Customers,
  Income,
  Incomeuptodate,
  Orders,
};
const router = express.Router();

router.get(
  "/:store",
  authenticateToken,
  capStoreMiddleWare,
  async (req, res) => {
    try {
      const store = req.params.store;
      if (!Object.keys(db).includes(store)) {
        displayHttpInfo("GET", `${store}`, 404);
        return res.status(404).send({ message: `${store} Not Found` });
      }
      const data = await db[store].find(
        {
          $and: [
            {
              userID: req.user._id,
            },
          ],
        },
        {
          userID: 0,
          __v: 0,
        }
      );
      if (data) {
        const result = data.map((item) => item.toJSON());
        displayHttpInfo("GET", `${store}`, 200);
        res.send(result);
      } else {
        displayHttpInfo("GET", `${store}`, 404);
        res.status(404).send({ error: `Not Found` });
      }
    } catch (error) {
      displayHttpInfo("GET", `${store}`, 500);
      res.status(500).send({ error: error.message });
    }
  }
);

router.get(
  "/:store/:id",
  authenticateToken,
  capStoreMiddleWare,
  async (req, res) => {
    console.log(`get one from ${req.params.store} with id ${req.params.id}`);
    const store = req.params.store;
    const Id = req.params.id;
    try {
      const data = await db[store].find(
        {
          $and: [{ userID: req.user._id }, { _id: Id }],
        },
        {
          userID: 0,
          __v: 0,
        }
      );
      if (!data) {
        displayHttpInfo("GET", `${store}/${Id}`, 404);
        return res.status(404).send({ error: `Item Not Found` });
      }
      displayHttpInfo("GET", `${store}/${Id}`, 200);
      res.send(data);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

router.post(
  "/:store",
  authenticateToken,
  capStoreMiddleWare,
  async (req, res) => {
    const store = req.params.store;
    try {
      if (store in db) {
        console.log("user ID: ", req.user._id);
        // const newData = new db[store]({ userID: req.user._id });

        // updateBasedOnStore(store, newData, req.body);
        const newData = await db[store].addEntry(req.body, req.user._id);
        await newData.save();
        displayHttpInfo("POST", `${store}`, 201);
        res.status(201).send(newData);
      } else {
        displayHttpInfo("POST", `${store}`, 404);
        res.status(404).send({ error: `${store} Not Found` });
      }
    } catch (error) {
      displayHttpInfo("POST", `${store}`, 500);
      res.status(500).send({ error: error.message });
    }
  }
);

router.put(
  "/:store/:id",
  authenticateToken,
  capStoreMiddleWare,
  async (req, res) => {
    const store = req.params.store;
    const Id = req.params.id;
    try {
      if (store in db) {
        await db[store].customUpdate(req.body, Id, req.user._id);

        displayHttpInfo("PUT", `${store}/${Id}`, 200);
        res.status(200).send({ message: "Updated" });
      } else {
        displayHttpInfo("PUT", `${store}/${Id}`, 404);
        res.status(404).send({ error: `${store} Not Found` });
      }
    } catch (error) {
      displayHttpInfo("PUT", `${store}/${Id}`, 500);
      res.status(500).send({ error: error.message });
    }
  }
);

router.delete(
  "/:store/:id",
  authenticateToken,
  capStoreMiddleWare,
  async (req, res) => {
    try {
      console.log(`delete ${req.params.store} with id ${req.params.id}`);
      const store = req.params.store;
      const Id = req.params.id;
      if (Object.keys(db).includes(store)) {
        await db[store].deleteOne({
          $and: [{ userID: req.user._id }, { _id: Id }],
        });

        // send 200 - ok
        displayHttpInfo("DELETE", `${store}/${Id}`, 200);
        res.status(200).send({ message: "Deleted" });
      } else {
        displayHttpInfo("DELETE", `${store}/${Id}`, 404);
        res.status(404).send({ error: `${store} Not Found` });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: error.message });
    }
  }
);

if (process.env.NODE_ENV !== "production") {
  router.delete("/DeleteAll", authenticateToken, async (req, res) => {
    // delete all data of the user in all stores
    try {
      await Menu.deleteMany({ userID: req.user._id });
      await Customers.deleteMany({ userID: req.user._id });
      await Income.deleteMany({ userID: req.user._id });
      await Incomeuptodate.deleteMany({ userID: req.user._id });
      await Orders.deleteMany({ userID: req.user._id });
      displayHttpInfo("DELETE", `DeleteAll`, 200);
      res.status(200).send("Deleted");
    } catch (error) {
      console.log(error.message);
      displayHttpInfo("DELETE", `DeleteAll`, 500);
      res.status(500).send({ error: error.message });
    }
  });
}

function capStoreMiddleWare(req, _, next) {
  req.params.store = capitalize(req.params.store);
  next();
}

export { router };
