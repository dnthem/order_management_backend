import { dateFormat } from "./dateFormat";

export function orderFormater({
    customer,
    cart, 
    paymentType = "", 
    notes = "", 
    orderID = -1,
    orderDate,
    deliverDate
}) {
    
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const result = {
        orderDate: dateFormat(orderDate),
        deliverDate: dateFormat(deliverDate),
        customer: {
            customerID: customer.customerID,
            customerName: customer.customerName,
            phone: customer.phone,
        },
        cart,
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