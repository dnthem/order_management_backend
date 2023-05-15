import CompleteOrderCard from "./CompleteOrderCard";
function CompleteOrderList({orders}) {
    return ( 
        <ul className="list-group">
            {
                orders.map((order, index) => {
                    return <CompleteOrderCard 
                    key={index} 
                    order={order}
                    index={index}
                    />
                })
            }
        </ul>
     );
}

export default CompleteOrderList;