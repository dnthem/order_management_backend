import Header from "../../components/Header";
import {AiOutlineCheckCircle, AiOutlineShoppingCart, AiOutlinePlusCircle} from "react-icons/ai";
import DownloadBtn from "../../components/Downloadbtn";
import { useData } from "./OrdersV2Data";
import OrderCardV2 from "../../components/OrdersCardV2";

function OrdersV2(props) {
    const ordersV2 = useData({
        store: 'OrdersV2', 
        index: 'date', 
        keyPath: new Date().toLocaleDateString("en-us")
    });
    console.log(ordersV2);
    return ( 
        <>
            <div className="row">
                <div className="col-md-8 col-sm-12">
                        <Header icon={<AiOutlineShoppingCart/>} 
                        title={"Orders - " + new Date().toLocaleDateString("en-us")}/>
                </div>

                <div className="col-md-4 col-sm-12">
                    <div className="d-flex justify-content-between">
                        <button className="mt-4 btn fw-bold text-primary" title="Add new order">New order <AiOutlinePlusCircle/></button>
                        <button className="mt-4 btn" title="Click here when complete today order">Complete <AiOutlineCheckCircle/></button>
                        <DownloadBtn data={null} fileName='Order_Date_' contentFormat={null}/>
                    </div>
                    
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 col-sm-12 d-flex flex-column align-items-center" style={{backgroundColor : "lightblue"}}>
                    <div className="section-title ">
                        <h2>Completed Orders
                        
                        </h2>
                        <aside className="text-muted">Total: $100</aside>
                    </div>
                    <div className="section-content">
                        <li>
                            Them Dang - 91234567 - $20
                        </li>
                        <li>Them Dang - 91234567 - $20</li>
                        <li>Them Dang - 91234567 - $20</li>
                    </div>
                    
                </div>

                <div className="col-md-9 px-2 col-sm-12 d-flex flex-column align-items-center " style={{backgroundColor : "lightgreen"}}>
                    <div className="section-title ">
                        <h2>Pending Orders</h2>
                    </div>
                    <div className="section-content row" style={{backgroundColor : "violet"}}>
                        <OrderCardV2/>
                        <OrderCardV2/>
                        <OrderCardV2/>
                        <OrderCardV2/>
                    </div>
                </div>
            </div>
        </>
     );
}

export default OrdersV2;