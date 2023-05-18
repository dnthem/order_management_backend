import { useState, useEffect } from "react";
import { GetDataBaseContext } from "../App";
import indexedDBController from "../indexedDB/indexedDB";

/**
 * Get all records from an object store with a particular value index
 * @param {string} store - the name of the object store
 * @param {string} index - the name of the index
 * @param {string} keyPath - the keyPath of the index
 * @returns [data, updateData] - the data from the object store and a function to update the data in the object store
 * 
 */
export function useData({ store, index, keyPath }) {
  const [data, setData] = useState([]);
  const { db } = GetDataBaseContext();

  useEffect(() => {
    async function getData() {
      try {
        const response = await indexedDBController.getListOfRecords(db, store, index, keyPath);

        setData(response);
      } catch (error) {
        alert(error);
      }
    }
    getData();
  }, [store, index]);

  /**
   * Update data in the object store
   * @param {string} type - add, update, delete
   * @param {string} indexField - the field that is used as the index
   * @param {Object} newVal - the new value to be added or updated
   * @param {string} keyPath - the keyPath of the record to be deleted
   * @returns the new ID of the record added
   * @throws error if the type is invalid
   */
  async function updateData ({ type, indexField, newVal = null, keyPath = "",  }) {
    let newData = [...data];
    let newID = -1;
    try {
      switch (type) {
        case "add":
          const res = await indexedDBController.addData(db, store, newVal);
          newData.push({
            ...newVal, [indexField]: res
          });
          newID = res;
          break;
        case "update":
          await indexedDBController.updateARecord(db, store, newVal);
          newData = newData.map((item) =>item[indexField] === newVal[indexField] ? newVal : item)
          break;
        case "delete":
          await indexedDBController.deleteARecord(db, store, keyPath);
          newData = newData.filter((item) => item[indexField] !== keyPath);
          break;
        default:
          throw new Error("Invalid type");
      }
      setData(newData);
    } catch (error) {
      alert(error);
    } finally {
      return newID;
    }
  };

  return [data, updateData];
}


