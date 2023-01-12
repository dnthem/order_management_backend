import Header from "../../components/Header";
import {RiSettings5Line} from 'react-icons/ri'
import DownloadBtn from "../../components/Downloadbtn";
import { GetDataBaseContext } from "../../App";
import { useEffect, useState } from "react";
import indexedDBController from "../../indexedDB/indexedDB";
function Settings(props) {
    const {db} = GetDataBaseContext();
    const [data, setData] = useState(null);

    const handleOnClick = async () => {
        const shareData = {
            title: 'Snapshot_of_data_' + new Date().toLocaleDateString('en-us'),
            text: JSON.stringify(data)
        }
        try {
            await navigator.share(shareData);
           alert('File shared successfully');
          } catch (err) {
            alert(`Error: ${err}`);
          }
    }

    useEffect (() => {
        const getAllData  = async () => {
            const menu = await indexedDBController.getAllDataFromStore(db, 'Menu');
            const income = await indexedDBController.getAllDataFromStore(db, 'Income');
            const orders = await indexedDBController.getAllDataFromStore(db, 'Orders');
            setData({Menu: menu, Income: income, Orders: orders});
        }
        getAllData();
    }, [])
    return ( 
        <>
        <div className="row">
            <Header icon={<RiSettings5Line/>} title='Settings'/>
        </div>
        <div className="row my-4">
            Download all your data
            <DownloadBtn data={JSON.stringify(data)} contentFormat={null} fileName='All_Data_'/>
        </div>
        <div className="row">
            <span>Share your data <button onClick={handleOnClick} className="btn nav-link">click here</button></span>
        </div>
        </>
     );
}

export default Settings;