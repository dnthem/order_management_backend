import { API_URL } from '../constants';
import indexedDBController from '../indexedDB/indexedDB';
import fetchAPI from './fetchAPI';

export default async function databaseDownloader({db , store }) {
  try {
    const data = await fetchAPI.get(API_URL + '/' + store);

    await indexedDBController.addListDataToStore(db, store, data);
  }catch(error) {
    alert ('Error: ' + error);
}
}
