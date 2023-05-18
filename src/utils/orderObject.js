class Order {
    constructor({ order, deliveryDate, orderDate, orderId, status, customer, total, paymentType, notes}) {
        this.order = [];
        this.deliveryDate = null;
        this.orderDate = null;
        this.orderId = null;
        this.status = false;
        this.customer = null;
        this.total = 0;
        this.paymentType = '';
        this.notes = '';
    }
    
    addProduct(product) {
        this.order.push(product);
    }
}