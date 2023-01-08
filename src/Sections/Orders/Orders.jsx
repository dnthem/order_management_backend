import Header from "../../components/Header";
import ItemCardV2 from "../../components/ItemCard_v2";
import {FaUndoAlt} from "react-icons/fa";
import {AiOutlineCheckCircle} from "react-icons/ai";
import {BiDownload} from "react-icons/bi";
import { useEffect, useState } from "react";
import { GetDataBaseContext } from "../../App";
import indexedDBController from "../../indexedDB/indexedDB";
import OrderItemCard from "../../components/OrderItemCard";
import OrderCard from "../../components/OrderCard";

const STORE_MENU = 'Menu';
const STORE_ORDERS = 'Orders';

function Orders(props) {
    const {db} = GetDataBaseContext();
    const [menu, setMenu] = useState([]);
    const [orders, setOrders] = useState();
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date().toLocaleDateString('en-us'));
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const getMenu = async () => {
          setLoading(true);
          try {
            const retrievedMenu = await indexedDBController.getAllDataFromStore(
              db,
              STORE_MENU
            );
            setMenu(retrievedMenu);
            const retrievedOrders = await indexedDBController.getARecord(db, STORE_ORDERS, date);
            setOrders(retrievedOrders.ItemKeys.map((val, idx) => 
            <OrderCard key={val} 
            Title={retrievedOrders.ItemNames[idx]}
            Price={retrievedOrders.Prices[idx]} 
            Quantity={retrievedOrders.Quantity[idx]}
            Total = {retrievedOrders.Totals[idx]}/>
            ));
            setTotal(retrievedOrders.Totals.reduce((acc, curr) => acc + curr,0));
            
          } catch (error) {
            console.error(error.message);
          }
          setLoading(false);
        };
        getMenu();
      }, []);
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
                <div className="col-6 overflow-hidden">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th></th><th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading? <tr><td>'Loading...'</td></tr>:''}
                            {menu.map(e => <OrderItemCard key={e.id} cardID={e.id} Title={e.Title} Price={e.Price} Photo={e.Photo}/>)}
                        </tbody>
                    </table>
                </div>
                <div className="col-6 overflow-scroll h-75">
                    <h2 className="h2">Completed Orders Today</h2>
                    <h3>Date:{date}</h3> <h3>Total:${total}</h3>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Item Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    {console.log(orders.ItemNames)}
                    </tbody>
                    </table>

                </div>
            </div>
        </>
     );
}

export default Orders;