function Customer(props) {
    const customerName = 'Customer Name';
    const phone = '999-999-9999';
    const order = [
        {id: 1, name: 'Item A', price: 11, quantity: 1},
        {id: 2, name: 'Item B', price: 5, quantity: 2},
        {id: 3, name: 'Item C', price: 4, quantity: 3},
    ];
    return ( 
        <div className="col-4 border-end h-100">
            <div className="section-title text-center" style={{position: 'relative'}}>
                <h2>Customer Infomation</h2>
            </div>
            <form className="Body">
                <div className="mb-3">
                    <label htmlFor="customerName" className="form-label">Customer Name</label>
                    <input type="text" className="form-control" id="customerName"  value={customerName} aria-describedby="customerName" disabled={true} />
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="phone" value={phone}aria-describedby="customerPhone" disabled={true} />
                </div>
                <div className="mb-3">
                    Cart
                    <ul className="list-group ">
                        {order.map((item) => (
                            <li className="list-group-item" key={item.id}>
                                {item.name} - ${item.price} - 
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <select className="form-select" aria-label="Default select example">
                                    {
                                        [...Array(20).keys()].map((i) => {
                                            if (i === item.quantity) 
                                                return (<option key={i} value={i} selected>{i}</option>)
                                            else 
                                                return (<option key={i}  value={i}>{i}</option>)
                                        })
                                    }
                                </select>
                            </li>
                        ))}
                    </ul>

                </div>
            </form>
        </div>
     );
}

export default Customer;