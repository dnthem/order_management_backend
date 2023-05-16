import React, { useMemo, useState } from 'react';
import CustomerOrderList from './CustomerOrderList';
function Customer(props) {
    const customer = props.customer;
    const customerName = customer.customerName;
    const phone = customer.phone;
    const order = props.order??[]; 
    

    const numberOfItem = order.reduce((total, item) => total + item.quantity, 0);
    const total = order.reduce((total, item) => total + item.quantity * item.price, 0);
    return ( 
        <div className="col-4 border-end position-relative overflow-auto" style={{height: "100%"}} >
            <div className="section-title text-center">
                <h2>Customer Infomation</h2>
            </div>

            <div>
                
                <div className="user-info d-flex justify-content-between flex-wrap">
                    <div className="">
                        <label htmlFor="customerName">Customer Name: </label>
                        <input type="text" className="border-0 bg-transparent" id="customerName" disabled={true} value={customerName} />
                       
                    </div>
                    <div className="">
                        <label htmlFor="phone" className="">Phone:</label>
                        <input type="text" className="border-0 bg-transparent" id="phone" value={phone} disabled={true} />
                    </div>
                </div>
                <div className="summary">
                        <div className="dull">Number of Item: {numberOfItem}</div>
                        <div className="dull">Total: ${total}</div>
                        <div className="dull">Payment type: Cash</div>
                </div>
                <div className="cart mb-3 py-2 ">
                    <div className="section-title text-center d-flex d-row justify-content-between align-items-center">
                        <h2 className="h2 pb-2">Cart</h2>
                        <span className=""></span>
                    </div>
                    <div className="row overflow-auto" style={{height: "65dvh"}}>
                        <CustomerOrderList order={order} 
                            removeOrder={props.removeOrder}
                            updateQuantity={props.updateQuantity}
                        />
                    </div>
                </div>
                
            </div>
        </div>
     );
}

export default Customer;