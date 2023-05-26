import { dateFormat } from "./dateFormat";

/**
 * Convert orders data to A readable format for text file
 * @param {object} data orders data
 * data = {
 * customer: { customerName: string, phone: string },
 * cart: [{ name: string, price: number, quantity: number, id: number }],
 * orderDate: string,
 * deliverDate: string
 * completedTime: string
 * total: number
 * paymentType: string
 * notes:
 * status: boolean
 * }
 */
export function downloadOrderFormat(data) {
    let document = `\t\t\tOrder Date: ${dateFormat()} \n` + data.map((order) => {
        return  `
        Customer: ${order.customer.customerName} \t Phone:  ${order.customer.phone}\n
        Order date: \t\t Deliver date: \t Completed time: \n
        ${order.orderDate} \t\t ${order.deliverDate} \t ${order.completedTime} \n
        Total: $${order.total} \t\t Payment type: ${order.paymentType} \n 
        Status: ${order.status? 'completed':'pending'} \n 
        Notes: ${order.notes}\n
        Item name: \t\t Price: \t Quantity: \t Total: \n
        ${order.cart.map((item) => {
            return `
            ${item.name} \t\t $${item.price} \t\t ${item.quantity} \t\t $${item.price * item.quantity} \n
            `;
        }).join('')}
        ------------------------------------------ \n
        `
    }).join('\n');
    return document;
}