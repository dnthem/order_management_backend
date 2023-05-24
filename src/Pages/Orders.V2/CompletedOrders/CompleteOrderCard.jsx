function CompleteOrderCard({ order }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          {order.orderID + 1}. {order.customer.customerName}
        </div>
        Completed at: {order.completedTime}
        <br/>
        Phone: {order.customer.phone}
        <br/>
        {order.paymentType}
        <br/>
        Notes: {order.notes}
      </div>
      <span className="badge bg-primary rounded-pill">${order.total}</span>
    </li>
  );
}

export default CompleteOrderCard;
