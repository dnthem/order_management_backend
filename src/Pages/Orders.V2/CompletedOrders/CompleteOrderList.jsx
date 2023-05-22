import CompleteOrderCard from "./CompleteOrderCard";
function CompleteOrderList({orders}) {
    return ( 
        <ul className="list-group position-relative overflow-auto" style={{height: "75dvh"}}>
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