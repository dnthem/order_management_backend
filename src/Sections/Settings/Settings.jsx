import Header from "../../components/Header";
import {RiSettings5Line} from 'react-icons/ri'
import { GetDataBaseContext } from "../../App";
import { useEffect, useState } from "react";
import indexedDBController from "../../indexedDB/indexedDB";
import DownloadSection from "./Download/DownloadSection";
import UploadSection from "./Upload/UploadSection";
import DeleteSection from "./Delete/DeleteSection";
function Settings(props) {
    const {db} = GetDataBaseContext();
    const [allData, setAllData] = useState(null);
    const [menu, setMenu] = useState(null);
    const [income, setIncome] = useState(null);
    const [orders, setOrders] = useState(null);

    useEffect (() => {
        const getAllData  = async () => {
            // Can't not convert Photo
            const menu = await indexedDBController.getAllDataFromStore(db, 'Menu').map(e =>{ delete e.Photo; return e});
            const income = await indexedDBController.getAllDataFromStore(db, 'Income');
            const orders = await indexedDBController.getAllDataFromStore(db, 'Orders');
            setAllData({Menu:menu, Income: income, Orders: orders});
            setMenu(menu);
            setIncome(income);
            setOrders(orders);
        }
        getAllData();
    }, [])
    return ( 
        <>
        <div className="row">
            <Header icon={<RiSettings5Line/>} title='Settings'/>
            <aside>
                This section allows you to save all data into a file and transfer it to different device
            </aside>
        </div>
        <div className="row">
            <DownloadSection allData={allData} orders={orders} menu={menu} income={income}/>

            <UploadSection/>

            <DeleteSection/>
        </div>
        
        </>
     );
}

export default Settings;