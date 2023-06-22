
/* Order */
export function convertOrderToAPI(order) {
  const output = structuredClone(order);
  delete output.orderID;
  output._id = order.orderID;
  output.customer = output.customer.customerID;
  output.cart = output.cart.map(item => ({
    item: item.id,
    quantity: item.quantity,
  }));
  return output;
}

export function convertAPItoOrder(APIOrder) {
  const output = structuredClone(APIOrder);
  delete output._id;
  output.orderID = APIOrder._id;
  output.customer = {
    customerID: APIOrder.customer._id,
    customerName: APIOrder.customer.customerName,
    phone: APIOrder.customer.phone
  }
  output.cart= APIOrder.cart.map(item => ({
    id: item.item._id,
    name: item.item.Title,
    price: item.item.Price,
    quantity: item.quantity
  }))
  return output;
}

/* Menu */

export function convertMenuToAPI(menu) {
  const output = structuredClone(menu);
  output._id = output.id;
  delete output.id;
  return output;
}

export function convertAPItoMenu(APIMenu) {
  const output = structuredClone(APIMenu);
  output.id = APIMenu._id;
  delete output._id;
  return output;
}

/* Customer */

export function convertCustomerToAPI(customer) {
  const output = structuredClone(customer);
  output._id = output.customerID;
  delete output.customerID;
  return output;
}

export function convertAPItoCustomer(APICustomer) {
  const output = structuredClone(APICustomer);
  output.customerID = APICustomer._id;
  delete output._id;
  return output;
}


/* income */

export function convertIncomeToAPI(income) {
  const output = structuredClone(income);
  output._id = output.Date;
  delete output.id;
  return output;
}

export function convertAPItoIncome(APIIncome) {
  const output = structuredClone(APIIncome);
  output.Date = APIIncome._id;
  delete output._id;
  return output;
}

/* income up to date */

export function convertIncomeUpToDateToAPI(incomeUpToDate) {
  const output = structuredClone(incomeUpToDate);
  output._id = output.id;
  delete output.id;
  return output;
}

export function convertAPItoIncomeUpToDate(APIIncomeUpToDate) {
  const output = structuredClone(APIIncomeUpToDate);
  output.id = APIIncomeUpToDate._id;
  delete output._id;
  return output;
}


export function convertToAPI({ store, data }) {
  switch (store.toLowerCase()) {
    case 'orders':
      return convertOrderToAPI(data);
    case 'menu':
      return convertMenuToAPI(data);
    case 'customers':
      return convertCustomerToAPI(data);
    case 'income':
      return convertIncomeToAPI(data);
    case 'incomeuptodate':
      return convertIncomeUpToDateToAPI(data);
    default:
      return data;
  }

}

export function convertFromAPI({ store, data }) {
  switch (store.toLowerCase()) {
    case 'orders':
      return convertAPItoOrder(data);
    case 'menu':
      return convertAPItoMenu(data);
    case 'customers':
      return convertAPItoCustomer(data);
    case 'income':
      return convertAPItoIncome(data);
    case 'incomeuptodate':
      return convertAPItoIncomeUpToDate(data);
    default:
      return data;
  }
}

