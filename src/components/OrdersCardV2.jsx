import ListItem from "../Sections/Orders.V2/ListItems";
import CloseBtn from "./CloseBtn";

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
  return (
    <div
      className="col-xl-2 col-lg-3 mx-1 my-2"
      style={{ backgroundColor: "lightblue", borderRadius: "20px", position: "relative", minHeight: "200px", paddingBottom: "2em" }}
    >
      <div className="card-body" style={{ position: "relative" }}>
        <CloseBtn onDoubleClick={() => onDelete(id)} />
        <div className="header">
          <h5 className="card-title">{id} - {order.customer.customerName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{order.customer.phone}</h6>
          <h6 className="card-subtitle mb-2 text-muted">{`$${order.total} - ${order.paymentType}`}</h6>
          <h6 className="card-subtitle mb-2 text-muted">{`${order.date}`}</h6>
        </div>
          <ListItem list={order.order} /> 
      </div>
      <button 
          style={{
            position: "absolute", right: "0.5em", bottom : "0.5em"
          }}
          onDoubleClick={() => onComplete(id, order)} className="btn text-primary">Complete</button>
        
    </div>
  );
}

export default OrderCardV2;
