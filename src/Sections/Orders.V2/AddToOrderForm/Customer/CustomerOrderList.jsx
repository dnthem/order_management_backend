import CustomerOrderCard from "./CustomerOrderCard";

function CustomerOrderList(props) {
    const cart = props.cart;
    return ( 
        <ul className="list-group">
            {cart.map((item) => 
                <CustomerOrderCard key={item.id} item={item} 
                    removeOrder={props.removeOrder}
                    updateQuantity={props.updateQuantity}
                /> 
                )}
        </ul>
     );
}

export default CustomerOrderList;