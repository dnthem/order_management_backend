import { useState } from "react";
import { GetDataBaseContext } from "../../App";
import Header from "../../components/Header";
import indexedDBController from "../../indexedDB/indexedDB";
import OrderTable from "../Orders/OrderTable";

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
            <Header title="History"/>
        </div>
        <div className="row">
            <div className="d-flex justify-content-center align-items-center">
                <label htmlFor="inputDate">Select Date: </label>
                <input onChange={handleOnDateChange} type="date" name="inputDate" id="inputDate" style={{outline: 'none', border: 'black solid 1px', backgroundColor: 'transparent'}} />
            </div>
        </div>
        <div className="row">
            <div className="d-flex justify-content-center">
                        <h2 className="h2">Completed Today Orders </h2>
            </div>
            <h3 className="d-flex justify-content-between">
                <span>Date: {date}</span> <span>Total: ${total}</span>
            </h3>
            <div className="d-flex justify-content-center align-items-center">
                <OrderTable order={order} recentChange={() => {}} setRecentChange={() => {}}/>
            </div>
        </div>
        </>
       
     );
}

export default History;