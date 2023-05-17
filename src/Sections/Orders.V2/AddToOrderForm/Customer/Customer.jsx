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
        <div className="col-4 border-end position-relative overflow-auto h-100">
            <div className="section-title position-sticky top-0 bg-white" style={{zIndex: '9999'}}>
                <h2 className="w-100 text-center">Customer Infomation</h2>

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
                    <div className="summary ">
                            <div className="">Number of Item: {numberOfItem}</div>
                            <div className="">Total: ${total}</div>
                            <div className="">Payment type: 
                                <select className="border-0 bg-transparent" value={props.paymentType} onChange={(e) => props.setPaymentType(e.target.value)}>
                                    <option value="Cash">Cash</option>
                                    <option value="Zelle">Zelle</option>
                                    <option value="Venmo">Venmo</option>
                                </select>
                            </div>
                            <div className="">
                                <div>Notes:</div>
                                <textarea className="w-100" style={{resize: 'none'}} value={props.notes} onChange={(e) => props.setNotes(e.target.value)}></textarea>
                            </div>
                    </div>
                
                    
                </div>
                <div className="section-title">
                        <h2 className="h2 pb-2">Cart</h2>

                    </div>
            </div>

            
            <div className="cart mb-3 py-2 ">
                <CustomerOrderList order={order} 
                    removeOrder={props.removeOrder}
                    updateQuantity={props.updateQuantity}
                />
            </div>
        </div>
     );
}

export default Customer;