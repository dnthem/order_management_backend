import { dateFormat } from "./dateFormat";

export function orderFormater({
    customer,
    order, 
    paymentType = "", 
    notes = "", 
    orderID = -1,
    orderDate,
    deliverDate
}) {
    
    const total = order.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const result = {
        orderDate: dateFormat(orderDate),
        deliverDate: dateFormat(deliverDate),
        customer: {
            customerID: customer.customerId,
            customerName: customer.customerName,
            phone: customer.phone,
        },
        order,
        date: dateFormat(),
        total,
        paymentType,
        notes,
        status: false,
    }

    if(orderID !== -1) {
        result['orderID'] = orderID;
    }
    return result;
}