
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

export function convertAPItoIndexDB(APIOrder) {
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
  output._id = output.id;
  delete output.id;
  return output;
}

export function convertAPItoIncome(APIIncome) {
  const output = structuredClone(APIIncome);
  output.id = APIIncome._id;
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


export function covertToAPI({ type, data }) {
  switch (type) {
    case 'order':
      return convertOrderToAPI(data);
    case 'menu':
      return convertMenuToAPI(data);
    case 'customer':
      return convertCustomerToAPI(data);
    case 'income':
      return convertIncomeToAPI(data);
    case 'incomeUpToDate':
      return convertIncomeUpToDateToAPI(data);
    default:
      return data;
  }

}

export function convertFromAPI({ type, data }) {
  switch (type) {
    case 'order':
      return convertAPItoIndexDB(data);
    case 'menu':
      return convertAPItoMenu(data);
    case 'customer':
      return convertAPItoCustomer(data);
    case 'income':
      return convertAPItoIncome(data);
    case 'incomeUpToDate':
      return convertAPItoIncomeUpToDate(data);
    default:
      return data;
  }
}

