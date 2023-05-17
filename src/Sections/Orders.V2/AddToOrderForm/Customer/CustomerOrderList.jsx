import CustomerOrderCard from "./CustomerOrderCard";

function CustomerOrderList(props) {
    const order = props.order;
    return ( 
        <ul className="list-group">
            {order.map((item) => 
                <CustomerOrderCard key={item.id} item={item} 
                    removeOrder={props.removeOrder}
                    updateQuantity={props.updateQuantity}
                /> 
                )}
        </ul>
     );
}

export default CustomerOrderList;