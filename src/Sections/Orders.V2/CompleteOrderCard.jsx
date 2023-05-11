function CompleteOrderCard({ order, index }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-start">
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          {index + 1}. {order.customer.customerName}
        </div>
        {order.customer.phone} - {order.paymentType}
      </div>
      <span className="badge bg-primary rounded-pill">${order.total}</span>
    </li>
  );
}

export default CompleteOrderCard;
