import ListItem from "./ListItems";

/**
 * @param {object} order - order object
 * @param {function} onRemove
 * @param {function} onComplete
 * @param {function} onEdit
 * @returns
 * @description
 * This component is used to display an order card
  */
function OrderCardV2({id, order, onDelete, onComplete, onEdit }) {
  const orderList = [
    ["Chicken", 2],
    ["Beef", 1],
    ["Pork", 1],
    ["Shrimp", 1],
    ["Tofu", 1],
    ["Vegetables", 1],
    ["Egg", 1],
    ["Rice", 1],
    ["Noodles", 1],
  ];
  return (
    <div
      className="col-xl-2 col-lg-3 mx-1 my-2"
      style={{ backgroundColor: "lightblue", borderRadius: "20px", position: "relative", minHeight: "200px", paddingBottom: "2em" }}
    >
      <div className="card-body" style={{ position: "relative" }}>
        <button onClick={() => onDelete(id)}
          className="btn rounded-circle btn-outline-primary"
          style={{ position: "absolute", right: "0", top: ".5em", color: "white", backgroundColor: "black", fontWeight: "bold"}}
        >
          X
        </button>
        <div className="header">
          <h5 className="card-title">{id} - {order.userID}</h5>
          <h6 className="card-subtitle mb-2 text-muted">913-215-4632</h6>
          <h6 className="card-subtitle mb-2 text-muted">{`$${order.total} - ${order.paymentType}`}</h6>
          <h6 className="card-subtitle mb-2 text-muted">{`${order.date}`}</h6>
        </div>

        
          <ListItem list={order.order} /> 

        
          
      </div>
      <button 
          style={{
            position: "absolute", right: "0.5em", bottom : "0.5em"
          }}
          onClick={() => onComplete(id)} className="btn text-primary">Complete</button>
        
    </div>
  );
}

export default OrderCardV2;
