import React, { useRef } from 'react';
function Customer(props) {
    const firstChild = useRef(null);
    const customerName = 'Customer Name';
    const phone = '999-999-9999';
    const order = [
        {id: 1, name: 'item Aasdsdaasdasd', price: 11, quantity: 1},
        {id: 2, name: 'Item Basdsd', price: 5, quantity: 2},
        {id: 3, name: 'Item Casdd', price: 4, quantity: 3},
        {id: 4, name: 'Item Dasd', price: 3, quantity: 4},
        {id: 1, name: 'item Aasdsdaasdasd', price: 11, quantity: 1},
        {id: 2, name: 'Item Basdsd', price: 5, quantity: 2},
        {id: 3, name: 'Item Casdd', price: 4, quantity: 3},
        {id: 4, name: 'Item Dasd', price: 3, quantity: 4},
        {id: 1, name: 'item Aasdsdaasdasd', price: 11, quantity: 1},
        {id: 2, name: 'Item Basdsd', price: 5, quantity: 2},
        {id: 3, name: 'Item Casdd', price: 4, quantity: 3},
        {id: 4, name: 'Item Dasd', price: 3, quantity: 4},
    ];

    return ( 
        <div className="col-4 border-end position-relative overflow-auto" style={{height: "100%"}} >
            <div className="section-title text-center">
                <h2>Customer Infomation</h2>
            </div>
            <div className="" style={{}} >
                
                <div className="user-info">
                    <div className="row ">
                        <label for="colFormLabelSm" className="col-auto col-form-label col-form-label-sm">Customer Name: </label>
                        <div className="col-auto">
                            <input type="text" className="form-control border-0 bg-transparent" id="colFormLabelSm" disabled={true} value={customerName} />
                        </div>
                    </div>
                    <div className="row ">
                        <label htmlFor="phone" className="col-auto col-form-label col-form-label-sm">Phone:</label>
                        <div className="col-auto">
                            <input type="text" className=" form-control border-0 bg-transparent" id="phone" value={phone} disabled={true} />
                        </div>
                    </div>
                </div>
                <div className="summary">
                        <div className="dull">Number of Item: 10</div>
                        <div className="dull">Payment type: Cash</div>
                        
                </div>
                <div className="cart mb-3 py-2 ">
                    <div className="section-title text-center d-flex d-row justify-content-between align-items-center">
                        <h2 className="h2 pb-2">Cart</h2>
                        <span className="">Total: $100</span>
                    </div>
                    <div className="row overflow-auto" style={{height: "65dvh"}}>
                        <ul className="list-group"  >
                            {order.map((item) => (
                                <li className="list-group-item" key={item.id}>
                                    <div className="d-flex justify-content-between align-items-center">
                                    <span style={{width: "10ch",
                                whiteSpace: "nowrap",
                                overflow: "auto",
                                }}>{item.name}</span>
                                    <span>${item.price}</span>
                                    <div className="btn-group d-flex align-items-center">
                                        <label htmlFor="quantity" className="form-label">Quantity</label>
                                        <select className="" >
                                            {
                                                [...Array(20).keys()].map((i) => {
                                                    if (i === item.quantity) 
                                                        return (<option key={i} value={i} selected>{i}</option>)
                                                    else 
                                                        return (<option key={i}  value={i}>{i}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <button type="button" className="btn btn-danger btn-sm">Remove</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
     );
}

export default Customer;