import ListItem from "./ListItems";
import CloseBtn from "../../../components/CloseBtn";

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
      data-test-id="order-card"
      className="col-xl-2 col-lg-3 mx-1 my-2 overflow-hidden position-relative"
      style={{ backgroundColor: "lightblue", borderRadius: "20px", width: "fit-content", height: "fit-content", minWidth: "2", minHeight: "18em"} }
    >
      <div className="card-body" style={{ position: "relative", paddingBottom: '2.5em'}}>
        <CloseBtn dataTestId="delete-order-btn" onDoubleClick={() => onDelete(id)} />
        <div className="header">
          <h5 className="card-title">{id} - {order.customer.customerName}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{order.customer.phone}</h6>
          <h6 className="card-subtitle mb-2 text-muted">{`$${order.total} - ${order.paymentType}`}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Order Date: {`${order.orderDate}`}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Deliver Date: {`${order.deliverDate}`}</h6>
          <h6 className="card-subtitle mb-2 text-muted">{`${order.notes}`}</h6>
        </div>
        <ListItem list={order.cart} /> 
      </div>
      <div className="position-absolute end-0 bottom-0">
      <div className="d-flex justify-content-end">

        <button data-test-id="order-edit-btn"  onClick={() => onEdit(order)} className="btn text-muted" title="Edit order">Edit</button>
        <button data-test-id="order-complete-btn" onDoubleClick={() => onComplete(id, order)} className="btn text-primary">Complete</button>
        </div>
        </div>
    </div>
  );
}

export default OrderCardV2;
