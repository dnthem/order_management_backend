import { dateFormat } from "./dateFormat";

export function orderFormater({
    nthOrderOfDay,
    customer,
    cart, 
    paymentType = "", 
    notes = "", 
    orderID = -1,
    orderDate,
    deliverDate,
    promotion
}) {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0) - Math.abs(Number(promotion));
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
        promotion,
        nthOrderOfDay
    }

    if(orderID !== -1) {
        result['orderID'] = orderID;
    }
    return result;
}