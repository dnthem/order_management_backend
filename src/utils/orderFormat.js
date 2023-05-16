import { dateFormat } from "./dateFormat";

export function orderFormater({customer, order, paymentType = "", notes = ""}) {
    const total = order.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return {
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
}