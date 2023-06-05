import {FaRegTrashAlt, FaEdit} from 'react-icons/fa';
function CustomerTable({sortedCustomers, deleteCustomer, updateCustomer}) {
    const customers = sortedCustomers;

    function edit(id) {
        updateCustomer
        // call back
    }

    return ( 
        <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Registeration Date</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Total Orders</th>
                        <th scope="col">Total Spent</th>
                        <th scope="col">Last purchase</th>
                    </tr>
                </thead>
                <tbody data-test-id="customer-table-body">
                    {
                        customers.map(customer => (
                            <tr
                             data-test-id="customer-info"
                             key={customer.customerID}>
                                <td>{customer.registerationDate}</td>
                                <td>{customer.customerName}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.orderCount}</td>
                                <td>{Intl.NumberFormat('en-us',{style: 'currency', currency: 'USD'}).format(customer.totalSpent)}</td>
                                <td>{customer.lastPurchase}</td>
                                { deleteCustomer && updateCustomer &&
                                    <td>
                                        <button className="btn" aria-label='edit-customer' onClick={() => edit(customer.customerID)}><FaEdit/></button>

                                        <button className="btn" aria-label='remove-customer' onClick={async () => await deleteCustomer(customer.customerID)}><FaRegTrashAlt/></button>
                                    </td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
     );
}

export default CustomerTable;