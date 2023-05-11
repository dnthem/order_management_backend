import CompleteOrderCard from "./CompleteOrderCard";
function CompleteOrderList({orders}) {
    return ( 
        <ul class="list-group">
            {
                orders.map((order, index) => {
                    return <CompleteOrderCard 
                    key={index} 
                    order={order}
                    index={index}
                    />
                }).reverse()
            }
        </ul>
     );
}

export default CompleteOrderList;