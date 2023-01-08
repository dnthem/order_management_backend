import { useEffect, useState } from "react";
import { GetDataBaseContext } from "../../App";
import OrderCard from "../../components/OrderCard";
import indexedDBController from "../../indexedDB/indexedDB";

const STORE = 'Orders'

function OrderTable(props) {
    const {db} = GetDataBaseContext();
    const [itemKeys, setItemKeys] = useState([]);
    const [itemNames, setItemNames] = useState([]);
    const [prices, setItemPrices] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [totals, setItemTotals] = useState([]);


    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await indexedDBController.getARecord(db, STORE, new Date().toLocaleDateString('en-us'));
                setItemKeys(res.ItemKeys);
                setItemNames(res.ItemNames);
                setItemPrices(res.Prices);
                setQuantities(res.Quantities);
                setItemTotals(res.Totals);
            } catch (error) {
                console.log(error)
            }
        }
        getOrder();
    }, [])

    const renderOrders = () => {
        return itemKeys.map((val, idx) => 
            <OrderCard 
                key={val} 
                Title={itemNames[idx]}
                Price={prices[idx]}
                Quantity={quantities[idx]}
                Total={totals[idx]}
            />
        )
    }
    return ( 
        <>
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
               {renderOrders()}
            </tbody>
        </table>
        </>
        
     );
}

export default OrderTable;