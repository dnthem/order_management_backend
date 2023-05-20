import Header from "../../components/Header";
import {RiSettings5Line} from 'react-icons/ri'
import { GetDataBaseContext } from "../../App";
import { useEffect, useState } from "react";
import indexedDBController from "../../indexedDB/indexedDB";
import DownloadSection from "./Download/DownloadSection";
import UploadSection from "./Upload/UploadSection";
import DeleteSection from "./Delete/DeleteSection";
import { useData } from "../../customHooks/useData";
function Settings(props) {
    const [menu, ] = useData({
        store:'Menu',
        index:'id',
        keyPath: '',
    })

    const [orders, ] = useData({
        store:'OrdersV2',
        index:'orderID',
        keyPath: '',
    })

    const [customers, ] = useData({
        store:'Customers',
        index:'customerID',
        keyPath: '',
    })

    const [income,] = useData({
        store:'Income',
        index:'Date',
        keyPath: '',
    })

    return ( 
        <>
        <div className="row">
            <Header icon={<RiSettings5Line/>} title='Settings'/>
            <aside>
                This section allows you to save all data into a file and transfer it to different device
            </aside>
        </div>
        <div className="row">
            <DownloadSection orders={orders} menu={menu} income={income} customers={customers}/>

            <UploadSection/>

            <DeleteSection/>
        </div>
        
        </>
     );
}

export default Settings;