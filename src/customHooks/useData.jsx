import { useState, useEffect } from "react";
import { GetDataBaseContext } from "../App";
import indexedDBController from "../indexedDB/indexedDB";

/**
 * Get all records from an object store with a particular value index
 * @param {string} store - the name of the object store
 * @param {string} index - the name of the index
 * @param {string} keyPath - the value of the index, if null, then all records are returned
 * @returns [data, updateData] - the data from the object store and a function to update the data in the object store
 * 
 */
export function useData({ store, index, keyPath, version = 1, limit= 1 }) {
  const [data, setData] = useState([]);
  const { db } = GetDataBaseContext();

  useEffect(() => {
    async function getData() {
      try {
        if (version === 1)
          var response = await indexedDBController.getListOfRecords(db, store, index, keyPath);
        else
          var response = await indexedDBController.getLimitRecords(db, store, index, limit);

        setData(response);
      } catch (error) {
        alert(error);
      }
    }
    getData();
  }, [store, index]);

  /**
   * Update data in the object store
   * @param {string} type - add, update, delete, getlimit
   * @param {string} indexField - the field that is used as the index
   * @param {Object} newVal - the new value to be added or updated
   * @param {string} keyPath - the keyPath of the record to be deleted
   * @param {number} limit - the number of records to be returned
   * @returns the new ID of the record added
   * @throws error if the type is invalid
   */
  async function updateData ({ type, indexField, newVal = null, keyPath = "", limit }) {
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
          if (newData.length === 0) {
            newData.push(newVal);
            break;
          }
          newData = newData.map((item) =>item[indexField] === newVal[indexField] ? newVal : item)
          break;
        case "delete":
          await indexedDBController.deleteARecord(db, store, keyPath);
          newData = newData.filter((item) => item[indexField] !== keyPath);
          break;

        case "getlimit":
          const response = await indexedDBController.getLimitRecords(db, store, index, limit);
          newData = response;
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


