import { useState } from "react";
import { GetDataBaseContext } from "../../App";
import DownloadBtn from "../../components/Downloadbtn";
import Header from "../../components/Header";
import indexedDBController from "../../indexedDB/indexedDB";
import convertReadable from "../Orders/FormatFile";
import OrderTable from "../Orders/OrderTable";
import {FaHistory} from 'react-icons/fa';
function History(props) {
    const [order, setOrder] = useState(null);
    const [date, setDate] = useState('');
    const [total, setTotal] = useState(0);
    const {db} = GetDataBaseContext();

    const handleOnDateChange = async (e) => {
        // The conversion below will lose 1 day, thus adding a whole day to it => 8.64e+7 ms = 1 day
        const date = new Date(e.target.valueAsNumber + 8.64e+7).toLocaleDateString('en-us');
        try {
            const data = await indexedDBController.getARecord(db, 'Orders', date);
            setOrder(data);
            setDate(date);
            if (typeof data === 'undefined')
                setTotal(0);
            else
                setTotal(data.Totals.reduce((acc, curr) => acc + curr, 0));
        } catch(error) {
            alert('Error: ' + error);
        }
    }
    return ( 
        <>
         <div className="row">
            <div className="col">
                <Header icon={<FaHistory/>} title="History"/>
            </div>
            <div className="col">
                <div className="d-flex justify-content-center">
                    <DownloadBtn data={order} contentFormat={convertReadable} fileName='Order_Date' disabled={typeof order === 'undefined'? true:false}/>
                </div>
            </div>
            
        </div>
    
        <div className="container-lg ">
            <div className="d-flex justify-content-center my-2">
                        <h2 className="h2">Completed Orders </h2>
            </div>
            <div className="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                        <label className="mx-2">Select Date: </label>
                        <input onChange={handleOnDateChange} type="date" style={{outline: 'none', border: '#c7c7c7 solid 1px', backgroundColor: 'transparent', borderRadius: '5px 5px 5px 5px ', width: '10em', height: '2em'}} />
                </div>
                <div>Total: ${total}</div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <OrderTable order={order} recentChange={() => {}} setRecentChange={() => {}}/>
            </div>
        </div>
        </>
       
     );
}

export default History;