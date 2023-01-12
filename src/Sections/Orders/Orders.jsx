import Header from "../../components/Header";
import {FaUndoAlt} from "react-icons/fa";
import {AiOutlineCheckCircle} from "react-icons/ai";

import {FiSave} from "react-icons/fi";
import { useEffect, useState } from "react";
import MenuTable from "./MenuTable";
import OrderTable from "./OrderTable";
import indexedDBController from "../../indexedDB/indexedDB";
import { GetDataBaseContext } from "../../App";
import convertReadable from "./FormatFile";
import DownloadBtn from "../../components/Downloadbtn";

// Helper function
function updateOrder(order, item) {
    let resOrder = {...order};
    const idx = resOrder.ItemKeys.findIndex(e => e === item.id);
    if (idx >= 0) {
        resOrder.Quantities[idx]++;
        resOrder.Totals[idx] += resOrder.Prices[idx];
    } else {
        resOrder.ItemKeys.push(item.id);
        resOrder.ItemNames.push(item.Title);
        resOrder.Prices.push(item.Price);
        resOrder.Quantities.push(1);
        resOrder.Totals.push(item.Price);
    }
    
    return resOrder
}

// Helper function
function undoOrder(order, item) {
    let resOrder = {...order};
    const idx = resOrder.ItemKeys.findIndex(e => e === item.id);
    if (--resOrder.Quantities[idx] === 0) {
        resOrder.ItemKeys.splice(idx ,1);
        resOrder.ItemNames.splice(idx, 1);
        resOrder.Prices.splice(idx,1);
        resOrder.Quantities.splice(idx,1);
        resOrder.Totals.splice(idx,1);
    } else {
        resOrder.Totals[idx] -= item.Price;
    }
    return resOrder;
}

// Helper function
function updateCounter(db, order, menu) {
    menu.forEach(item => {
        const idx = order.ItemKeys.findIndex(e => e === item.id);
        item.Count += order.Quantities[idx];
        indexedDBController.updateARecord(db, 'Menu', item)
    })
}

function Orders(props) {
    const {db} = GetDataBaseContext()
    const [date, setDate] = useState(new Date().toLocaleDateString('en-us'))
    const [total, setTotal] = useState(0);
    const [undoStack, setUndoStack] = useState([]);
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState(
        {
            Date: new Date().toLocaleDateString('en-us'),
            ItemKeys: [],
            ItemNames: [],
            Prices: [],
            Quantities: [],
            Totals: [],
            IsComplete: false
        }
    );
    const [recentChange, setRecentChange] = useState(-1); // store the key

    const selectOrder = (key) => {
        const item =  menu.find(e => e.id === key)
        const newOrder = updateOrder(order, item)
        setUndoStack([...undoStack, item]);
        setRecentChange(key);
        setOrder(newOrder);
        setTotal(newOrder.Totals.reduce((acc, curr) => acc + curr, 0))
    }

    const handleUndo = () => {
        const item = undoStack.pop();
        
        const newOrder = undoOrder(order, item);
        setOrder(newOrder);
        setRecentChange(item.id);
        setUndoStack(undoStack);
        setTotal(total - item.Price);
    }

    const handleSave = async () => {
        if (order.IsComplete) { alert('Order is marked as completed, cannot perform any further actions'); return;}
        try {
            await indexedDBController.updateARecord(db, 'Orders', order)
            alert ('Update order successful')
            
            setUndoStack([]);
        } catch (error) {
            alert (error)
        }
    }

    const handleComplete = async () => {
        if (order.IsComplete) { alert('Order is marked as completed, cannot perform any further actions'); return;}
        if (!(confirm('Are you sure to complete today order? This action cannot be undone?'))) return;
        try {
            await indexedDBController.updateARecord(db, 'Orders', {...order, IsComplete: true})
            await indexedDBController.updateARecord(db, 'Income', {Date: date, Income: total})
            updateCounter(db, order, menu);
            setOrder({...order, IsComplete: true})
            alert('Completed')
        } catch (error) {
            alert(error);
        }
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
                <div className="col-md-8 col-sm-12">
                    <Header title='Orders'/>
                </div>
                <div className="col-md-4 col-sm-12">
                    <div className="d-flex justify-content-between">
                        <button className="mt-4 btn" onClick={handleSave}>Save <FiSave/></button>
                        <button className="mt-4 btn" onClick={handleUndo}  disabled={undoStack.length===0? true:false}>Undo <FaUndoAlt/></button>
                        <button className="mt-4 btn" onClick={handleComplete}>Complete <AiOutlineCheckCircle/></button>
                        <DownloadBtn data={order} fileName='Order_Date_' contentFormat={convertReadable}/>
                    </div>
                    
                </div>
            </div>
            <div className="row h-80">
                <div className="col-md-6 col-sm-12">
                    <div style={{overflow:'auto', height: '75vh'}}>
                    <MenuTable menu={menu} select={selectOrder}/>
                    </div>
                    
                </div>

                <div className="col-md-6 col-sm-12 ">
                    <div className="d-flex justify-content-center">
                        <h2 className="h2">Completed Today Orders </h2>
                    </div>
                    {order.IsComplete && <aside className="text-danger">NOTE: Order has been marked as completed (view only), DO NOT add more orders</aside>}
                    <h3 className="d-flex justify-content-between"><span>Date: {date}</span> <span>Total: ${total}</span></h3>
                    <div style={{overflow:'auto', height: '80vh'}}>
                        
                        
                        <OrderTable order={order} recentChange={recentChange} setRecentChange={setRecentChange}/>
                    </div>
                    
                </div>
            </div>
        </>
     );
}

export default Orders;