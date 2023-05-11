import { useState, useEffect } from "react";
import { GetDataBaseContext } from "../../App";
import indexedDBController from "../../indexedDB/indexedDB";

let sampleData = [
  {
    "orderID": 1,
    "customer": {
      "customerID": 1,
      "customerName": "John Doe",
      "phone": "123-456-7890"
    },
    "date": "4/26/2023",
    "order": [
      ["Item A", 1],
      ["Item B", 2],
      ["Item C", 3]
    ],
    "total": 150.25,
    "paymentType": "Credit Card",
    "notes": "Delivery address: 123 Main St, Anytown, USA",
    "status": false
  },
  {
    "orderID": 2,
    "customer": {
      "customerID": 2,
      "customerName": "Jane Smith",
      "phone": "555-123-4567"
    },
    "date": "5/1/2023",
    "order": [
      ["Item A", 2],
      ["Item C", 1],
      ["Item D", 4]
    ],
    "total": 225.75,
    "paymentType": "PayPal",
    "notes": "Delivery address: 456 Oak St, Anytown, USA",
    "status": false
  },
  {
    "orderID": 3,
    "customer": {
      "customerID": 3,
      "customerName": "Bob Johnson",
      "phone": "555-555-1212"
    },
    "date": "5/5/2023",
    "order": [
      ["Item B", 3],
      ["Item C", 2],
      ["Item E", 2],
      ["Item C", 2],
      ["Item C", 2],
    ],
    "total": 175.50,
    "paymentType": "Credit Card",
    "notes": "Delivery address: 789 Maple St, Anytown, USA",
    "status": false
  }
]


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
