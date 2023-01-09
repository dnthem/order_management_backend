import Header from "../../components/Header";
import {FaUndoAlt} from "react-icons/fa";
import {AiOutlineCheckCircle} from "react-icons/ai";
import {BiDownload} from "react-icons/bi";
import { useEffect, useState } from "react";
import MenuTable from "./MenuTable";
import OrderTable from "./OrderTable";
import indexedDBController from "../../indexedDB/indexedDB";
import { GetDataBaseContext } from "../../App";


function updateOrder(order, newItem) {
    let resOrder = {...order};
    const idx = resOrder.ItemKeys.findIndex(e => e === newItem.id);
    if (idx >= 0) {
        resOrder.Quantities[idx]++;
        resOrder.Totals[idx] += resOrder.Prices[idx];
    } else {
        resOrder.ItemKeys.push(newItem.id);
        resOrder.ItemNames.push(newItem.Title);
        resOrder.Prices.push(newItem.Price);
        resOrder.Quantities.push(1);
        resOrder.Totals.push(newItem.Price);
    }
    
    return resOrder
}

function Orders(props) {
    const {db} = GetDataBaseContext()
    const [date, setDate] = useState(new Date().toLocaleDateString('en-us'))
    const [total, setTotal] = useState(0);
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState(
        {
            date: new Date().toLocaleDateString('en-us'),
            ItemKeys: [],
            ItemNames: [],
            Prices: [],
            Quantities: [],
            Totals: []
        }
    );

    const selectOrder = (key) => {
        // Add item to orders
        console.log(key)
        // update order
        const newOrder = updateOrder(order, menu.find(e => e.id === key))
        setOrder(newOrder);
        setTotal(newOrder.Totals.reduce((acc, curr) => acc + curr, 0))
    }
    
    useEffect(() => {
        const getMenuOrderStores = async () => {
            try {
                const menuStore = await indexedDBController.getAllDataFromStore(db, 'Menu');
                setMenu(menuStore);

                const orderStore = await indexedDBController.getARecord(db, 'Orders', new Date().toLocaleDateString('en-us'));
                if (!orderStore) return;
                setOrder(orderStore);
                setTotal(orderStore.Totals.reduce((acc, curr) => acc + curr, 0))
            } catch (error) {
                console.log(error);
            }
        }
        getMenuOrderStores();
    }, [])
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
                    <MenuTable menu={menu} select={selectOrder}/>
                </div>

                <div className="col-6 ">
                    <div className="d-flex justify-content-center">
                        <h2 className="h2">Completed Orders Today</h2>
                    </div>
                    <h3 className="d-flex justify-content-between"><span>Date: {date}</span> <span>Total: ${total}</span></h3>
                    <OrderTable order={order}/>
                </div>
            </div>
        </>
     );
}

export default Orders;