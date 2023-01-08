import Header from "../../components/Header";
import {FaUndoAlt} from "react-icons/fa";
import {AiOutlineCheckCircle} from "react-icons/ai";
import {BiDownload} from "react-icons/bi";
import { useEffect, useState } from "react";
import MenuTable from "./MenuTable";
import OrderTable from "./OrderTable";

function Orders(props) {
    const [date, setDate] = useState(new Date().toLocaleDateString('en-us'))
    const [total, setTotal] = useState(0);
    
    return ( 
        <>
            <div className="row">
                <div className="col-8">
                    <Header title='Orders'/>
                </div>
                <div className="col-4">
                    <div className="d-flex justify-content-between">
                        <button className="mt-4 btn">Undo <FaUndoAlt/></button>
                        <button className="mt-4 btn">Complete <AiOutlineCheckCircle/></button>
                        <button className="mt-4 btn">Save to local <BiDownload/></button>
                    </div>
                    
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <MenuTable/>
                </div>

                <div className="col-6 ">
                    <div className="d-flex justify-content-center">
                        <h2 className="h2">Completed Orders Today</h2>
                    </div>
                    <h3 className="d-flex justify-content-between"><span>Date:{date}</span> <span>Total:${total}</span></h3>
                    <OrderTable/>
                

                </div>
            </div>
        </>
     );
}

export default Orders;