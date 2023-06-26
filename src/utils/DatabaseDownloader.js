import { API_URL } from "../constants";
import indexedDBController from "../indexedDB/indexedDB";
import { convertFromAPI } from "./apiDataConverter";
import fetchAPI from "./fetchAPI";

export default async function databaseDownloader({ db, store }) {
  try {
    const data = await fetchAPI.get(API_URL + "/" + store);
    if (data.error) {
      throw data.error;
    }

    // convert data to indexedDB format
    const convertedData = convertFromAPI({
      store,
      data
    });

    await indexedDBController.addListDataToStore(db, store, convertedData);
  } catch (error) {
    alert("Error: " + error);
  }
}
