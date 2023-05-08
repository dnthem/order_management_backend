import { useState, useEffect } from "react";
import { GetDataBaseContext } from "../../App";
import indexedDBController from "../../indexedDB/indexedDB";

let sampleData = [
  {
    orderID: 1,
    userID: 1,
    date: "4/26/2023",
    order: [
      ["Item A", 1],
      ["Item B", 2],
      ["Item C", 3],
    ],
    total: 150.25,
    paymentType: "Credit Card",
    notes: "Delivery address: 123 Main St, Anytown, USA",
    status: true, // true = complete, false = pending
  },
  {
    orderID: 2,
    userID: 2,
    date: "4/26/2023",
    order: [
      ["Item D", 2],
      ["Item E", 2],
    ],
    total: 75.5,
    paymentType: "PayPal",
    notes: "",
    status: false,
  },
  {
    orderID: 3,
    userID: 3,
    date: new Date().toLocaleDateString("en-us"),
    order: [
      ["Item F", 2],
      ["Item G", 2],
      ["Item H", 2],
      ["Item I", 2],
    ],
    total: 225.75,
    paymentType: "Cash on Delivery",
    notes: "Please call before delivery",
    status: true,
  },
  {
    orderID: 4,
    userID: 4,
    date: new Date().toLocaleDateString("en-us"),
    order: [
      ["Product K", 2],
      ["Product L", 2],
      ["Product M", 2],
    ],
    total: 95.75,
    paymentType: "Credit Card",
    notes: "Please include a free sample",
    status: true,
  },
  {
    orderID: 5,
    userID: 5,
    date: new Date().toLocaleDateString("en-us"),
    order: [["Product N", 1]],
    total: 15.0,
    paymentType: "PayPal",
    notes: "",
    status: false,
  },
  {
    orderID: 6,
    userID: 6,
    date: new Date().toLocaleDateString("en-us"),
    order: [
      ["Product O", 2],
      ["Product P", 1],
      ["Product Q", 2],
      ["Product R", 3],
    ],
    total: 175.25,
    paymentType: "Credit Card",
    notes: "Please call before delivery",
    status: true,
  },
  {
    orderID: 7,
    userID: 2,
    date: new Date().toLocaleDateString("en-us"),
    order: [
      ["Product S", 4],
      ["Product T", 1],
    ],
    total: 60.0,
    paymentType: "Cash on Delivery",
    notes: "",
    status: false,
  },
  {
    orderID: 8,
    userID: 1,
    date: new Date().toLocaleDateString("en-us"),
    order: [
      ["Product U", 2],
      ["Product V", 2],
      ["Product W", 1],
    ],
    total: 120.75,
    paymentType: "Credit Card",
    notes: "Please deliver after 5pm",
    status: true,
  },
];

/**
 * Get all records from an object store with a particular value index
 * @param {} store
 * @param {*} index
 * @param {*} keyPath
 * @returns list of records with the same value of the index
 */
export function useData({ store, index, keyPath }) {
  const [data, setData] = useState([]);
  const { db } = GetDataBaseContext();

  useEffect(() => {
    async function getData() {
      try {
        const response = sampleData;
        //await indexedDBController.getListOfRecords(db, store, index, keyPath);

        setData(response);
      } catch (error) {
        alert(error);
      }
    }
    getData();
  }, [store, index]);

  const updateData = async ({ type, newVal = null, keyPath = "" }) => {
    let newData = [...data];
    try {
      switch (type) {
        case "add":
          //await indexedDBController.addData(db, store, newVal);

          break;
        case "update":
          //await indexedDBController.updateARecord(db, store, newVal);
          newData = newData.map((item) =>
            item["orderID"] === keyPath ? { ...item, status: true } : item
          );
          break;
        case "delete":
          //await indexedDBController.deleteARecord(db, store, keyPath);
          newData = newData.filter((item) => item["orderID"] !== keyPath);
          break;
        default:
          throw new Error("Invalid type");
      }
      setData(newData);
    } catch (error) {
      alert(error);
    }
  };

  return [data, updateData];
}
