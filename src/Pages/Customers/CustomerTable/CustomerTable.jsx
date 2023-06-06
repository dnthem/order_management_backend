
import CustomerTableRow from './CustomerTableRow';
function CustomerTable({sortedCustomers, deleteCustomer, updateCustomer}) {
    const customers = sortedCustomers;

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
                            <CustomerTableRow
                                key={customer.customerID}
                                customer={customer}
                                deleteCustomer={deleteCustomer}
                                updateCustomer={updateCustomer}
                            />
                        ))
                    }
                </tbody>
            </table>
     );
}

export default CustomerTable;