import { useState } from "react";
import OrderCard from "../../components/OrderCard";

function OrderTable(props) {
    
    const renderOrders = () => {
        return props.order['ItemKeys'].map((val, idx) => 
            <OrderCard 
                key={val} 
                Title={props.order.ItemNames[idx]}
                Price={props.order.Prices[idx]}
                Quantity={props.order.Quantities[idx]}
                Total={props.order.Totals[idx]}
                recentChange={props.recentChange === val?true:false}
                setRecentChange={props.setRecentChange}
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
                {!props.order? <tr><td>No orders for today yet</td></tr>:renderOrders()}
               
            </tbody>
        </table>
        </>
        
     );
}

export default OrderTable;