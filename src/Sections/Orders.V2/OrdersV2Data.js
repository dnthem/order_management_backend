import { useState, useEffect } from "react";
import { GetDataBaseContext } from "../../App";
import indexedDBController from "../../indexedDB/indexedDB";

export function useData({ store, index, keyPath }) {
    const [data, setData] = useState([]);
    const {db} = GetDataBaseContext();

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
    }
    , [store, index]);
    return data;
}