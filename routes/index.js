import express from "express";
import { authenticateToken } from "../utils/jwt.js";
import {
  Menu,
  Customers,
  Income,
  Incomeuptodate,
  Orders,
} from "../db/mongodb.js";
import { capitalize } from "../utils/utils.js";

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
      console.log(`get ${req.params.store}`);

      const store = req.params.store;
      if (!Object.keys(db).includes(store))
        return res.status(404).send({ message: `${store} Not Found` });
      const data = await db[store].find({
        $and: [
          {
            userID: req.user._id,
          }
        ],
      }, {
        userID: 0,
        __v: 0
      });
      if (data) {
        const result = data.map((item) => item.toJSON());
        console.log(result);
        res.send(result);
      } else {
        res.status(404).send({ error: `Not Found` });
      }
    } catch (error) {
      console.log(error.message)
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
      const data = await db[store].find({
        $and: [{ userID: req.user._id }, { _id: Id }],
      }, {
        userID: 0,
        __v: 0
      });
      if (!data)
        return res.status(404).send({ error: `Item Not Found` });
      
      
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
    console.log(`create new ${req.params.store}`);
    const store = req.params.store;
    try {
      if (Object.keys(db).includes(store)) {
        console.log('user ID: ', req.user._id);
        const  newData = new db[store]({userID: req.user._id});
        
        updateBasedOnStore(store, newData, req.body);
        console.log("Create new data in store ", store, " with data \n", newData);
        await newData.save();
        res.status(201).send(newData);
      } else {
        res.status(404).send({ error: `${store} Not Found` });
      }
    } catch (error) {
      console.log('post error: ' + error.message)
      res.status(500).send({ error: error.message });
    }
    
  } 
);

router.put(
  "/:store/:id",
  authenticateToken,
  capStoreMiddleWare,
  async (req, res) => {
    try {
      console.log(`update ${req.params.store} with id ${req.params.id}`);
      console.log('/-----------------------------------/');
      const store = req.params.store;
      const Id = req.params.id;
      if (Object.keys(db).includes(store)) {
        const data = await db[store].findOne({
          $and: [{ userID: req.user._id }, { _id: Id }],
        });
        if (data) {
          // update with payload
          updateBasedOnStore(store, data, req.body);
          await data.save();
          // send 200 - ok
          res.status(200).send(data);
        } else {
          // add new
          const newData = await db[store].create(JSON.parse(req.body));
  
          // send 201 - created
          res.status(201).send(newData);
        }
      } else {
        res.status(404).send({ error: `${store} Not Found` });
      }
    } catch (error) {
      console.log('put error: ' + error.message)
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
        res.status(200).send({ message: "Deleted"});
      } else {
        res.status(404).send({ error: `${store} Not Found` });
      }
    } catch (error) {
      console.log(error.message)
      res.status(500).send({ error: error.message });
    }
    
  }
);

if (process.env.NODE_ENV !== "production") {
  router.delete("/DeleteAll",
    authenticateToken,
    async (req, res) => {
    // delete all data of the user in all stores
    try {
      await Menu.deleteMany({ userID: req.user._id });
      await Customers.deleteMany({ userID: req.user._id });
      await Income.deleteMany({ userID: req.user._id });
      await Incomeuptodate.deleteMany({ userID: req.user._id });
      await Orders.deleteMany({ userID: req.user._id });
      res.status(200).send("Deleted");
    } catch(error) {
      console.log(error.message)
      res.status(500).send({ error: error.message });
    }
  });
}

function updateBasedOnStore(store, obj, body) {
  switch (store) {
    case "Menu":
      obj.Title = body.Title ?? obj.Title;
      obj.Count = body.Count ?? obj.Count;
      obj.Price = body.Price ?? obj.Price;
      obj.Description = body.Description ?? obj.Description;
      obj.Image = body.image ?? obj.Image;
      obj.Hidden = body.Hidden ?? obj.Hidden;
      break;
    case "Orders":
      obj.status = body.status ?? obj.status;
      obj.cart = body.cart ?? obj.cart;
      obj.customer = body.customer ?? obj.customer;
      obj.total = body.total ?? obj.total;
      obj.notes = body.notes ?? obj.notes;
      obj.nthOrderOfDay = body.nthOrderOfDay ?? obj.nthOrderOfDay;
      obj.comletedTime = body.comletedTime ?? obj.comletedTime;
      obj.paymentType = body.paymentType ?? obj.paymentType;
      obj.promotion = body.promotion ?? obj.promotion;
      obj.deliverDate = body.deliverDate ?? obj.deliverDate;
      obj.orderDate = body.orderDate ?? obj.orderDate;

      break;
    case "Customers":
      obj.customerName = body.customerName ?? obj.customerName;
      obj.phone = body.phone ?? obj.phone;
      obj.orderCount = body.orderCount ?? obj.orderCount;
      obj.totalSpent = body.totalSpent ?? obj.totalSpent;
      obj.registerationDate = body.registerationDate ?? obj.registerationDate;
      obj.lastPurchase = body.lastPurchase ?? obj.lastPurchase;
      break;
    case "Income":
      obj.Date = body.Date ?? obj.Date;
      obj.Total = body.Total ?? obj.Total;
      break;

    case "Incomeuptodate":
      obj.Date = body.Date ?? obj.Date;
      obj.Total = body.Total ?? obj.Total;
      obj.UpdatedTime = body.UpdatedTime ?? obj.UpdatedTime;

    default:
      break;
  }
}

function capStoreMiddleWare(req, _, next) {
  req.params.store = capitalize(req.params.store);
  next();
}

export { router };
