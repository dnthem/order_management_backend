import sampleData from './sampleData'

const indexedDBController = {};

/**
 * Creates indexedDB and return a db reference
 * @param {string} dbName Data name
 * @param {Number} version 
 * @returns indexedDB reference
 */
indexedDBController.createDB = function (dbName, version = undefined) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, version);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const menu = db.createObjectStore("Menu", { keyPath: "id", autoIncrement: true });
      const order = db.createObjectStore("Orders", { keyPath: "Date" });
      const income = db.createObjectStore("Income", { keyPath: "Date" });
      
      // sampleData['Menu'].forEach(e => menu.add(e))
      // sampleData['Orders'].forEach(e => order.add(e))
      // sampleData['Income'].forEach(e => income.add(e))
    };
    request.onerror = (event) => reject(event.error);

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
};

/**
 * Adds data to a particular object store
 * @param {indexedDBRef} db db reference
 * @param {string} store object store
 * @param {any} data data needed to be store to object store
 * @returns true if successful otherwise error message
 */
indexedDBController.addData = function (db, store, data) {
  return new Promise((res, rej) => {
    const trans = db.transaction(store, 'readwrite')
    const objStore = trans.objectStore(store);
    const request = objStore.add(data);
    request.onsuccess = function (e) {
      console.log('Added new data to ' + store + ' successful')
      res(e.target.result)
    }

    request.onerror = function (e) {
      console.log('Failed to add new data')
      rej(e.target.error)
    }
  })
}

/**
 * Retrieves all records from an object store
 * @param {indexedDBRef} db db reference
 * @param {string} store object store
 * @returns Return all data from a store
 */
indexedDBController.getAllDataFromStore = function (db, store) {
  return new Promise((res, rej) => {
    const trans = db.transaction(store, 'readwrite')
    const objStore = trans.objectStore(store);
    const request = objStore.getAll();
    request.onsuccess = function (event) {
      console.log('Successfully retreived all data')
      res(event.target.result)
    }
    request.onerror = (event) => {
      console.log('failed to retreive all data')
      rej(event.target.error);
    }
  })
}

indexedDBController.getARecord = function (db, store, keyPath) {
  return new Promise((res, rej) => {
      const trans = db.transaction(store, 'readonly');
      const objStore = trans.objectStore(store);
      const request = objStore.get(keyPath);
      request.onsuccess = function (event) {
          console.log('Successfully retreived ' + store)
          res(event.target.result)
      }
      request.onerror = (event) => {
        console.log('failed to retreive ' + store)
        rej(event.target.error);
      }
    })
}

indexedDBController.deleteARecord = function (db, store, keyPath) {
  return new Promise((res, rej) => {
    const trans = db.transaction(store, 'readwrite');
    const objStore = trans.objectStore(store);
    const request = objStore.delete(keyPath);
    request.onsuccess = function (event) {
        console.log('Successfully deleted the ' + store)
        res(true)
    }
    request.onerror = (event) => {
      console.log('failed to delete the ' + store)
      rej(event.target.error);
    }
  })
}

indexedDBController.deleteAllRecord = function (db, store) {
  return new Promise((res, rej) => {
    const trans = db.transaction(store, 'readwrite');
    const objStore = trans.objectStore(store);
    const request = objStore.clear();
    request.onsuccess = function (event) {
        console.log('Successfully deleted all records ' + store)
        res(true)
    }
    request.onerror = (event) => {
      console.log('failed to delete all records ' + store)
      rej(event.target.error);
    }
  })
}



indexedDBController.updateARecord = function (db, store, newVal) {
    return new Promise((res, rej) => {
        const trans = db.transaction(store, 'readwrite');
        const objStore = trans.objectStore(store);
        const request = objStore.put(newVal);
        request.onsuccess = function (event) {
            console.log('Successfully update the ' + store)
            res(true)
        }
        request.onerror = (event) => {
          console.log('failed to update the ' + store)
          rej(event.target.error);
        }
      })
}

export default indexedDBController;