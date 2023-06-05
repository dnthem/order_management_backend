import { useData } from "../../customHooks/useData";
import Header from "../../components/Header";
import { STORES } from "../../indexedDB/indexedDB";
import CustomerTable from "../../components/CustomerTable";
import {AiOutlineUser} from 'react-icons/ai';
import UserInfoForm from "../Orders.V2/UserInfoForm";
import useToggle from "../../customHooks/useToggle";
import { useDeferredValue, useState } from "react";
function Customers(props) {
    const [customers, setCustomers] = useData({
        store: STORES.CUSTOMERS.name,
        index: STORES.CUSTOMERS.keyPath,
        keyPath: null
    });

    const [query, setQuery] = useState("");
    const deferredQuery = useDeferredValue(query);
    const [addFormToggle, setAddFormToggle] = useToggle(false);
    const [sortedBy, setSortedBy] = useState("registerationDate");
    const isStale = query !== deferredQuery;

    const handleSortBy = (sortBy) => {
        setSortedBy(sortBy);
    }

    const filteredCustomers = customers.filter((customer) => {
        return customer.customerName.toLowerCase().includes(deferredQuery.toLowerCase());
    });

    const sortedCustomers = filteredCustomers.sort((a, b) => {
        if (a[sortedBy] < b[sortedBy]) {
            return 1;
        }
        if (a[sortedBy] > b[sortedBy]) {
            return -1;
        }   
        return 0;
    });

    const deleteCustomer = async (id) => {
        await setCustomers({
            type: "delete",
            indexField: STORES.CUSTOMERS.keyPath,
            keyPath: id,
        });
    }

    const updateCustomer = (id, newVal) => {
        setCustomers({
            type: "update",
            indexField: STORES.CUSTOMERS.keyPath,
            newVal: { ...newVal, [STORES.CUSTOMERS.keyPath]: id },
        });
    }


    return ( 
        <>
            {
                addFormToggle && 
                <UserInfoForm
                    setCustomers={setCustomers}
                    customers={customers}
                    onAddCustomerSubmit={() => setAddFormToggle(false)}
                    showForm={setAddFormToggle}
                />
            }
            <div className="row">
                <div className="col-sm-12 col-md-4">
                    <Header title="Customers"
                    icon={<AiOutlineUser/>}
                    />
                </div>

                <div className="col-sm-12 col-md-8">
                    <div className="d-flex justify-content-evenly mt-4">
                        <button aria-label="add-new-customer-btn" className="btn text-primary" onClick={setAddFormToggle}>Add Customer</button>
                        
                        <div className="input-group " style={{width: "15em"}}>
                        <input type="text" className="form-control" placeholder="Search customer" aria-label="customer-search-input" value={query} onChange={(e) => setQuery(e.target.value)}/>
                        <label className="input-group-text" id="basic-addon2">Search</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="d-flex input-group justify-content-end mt-4">
                    <label htmlFor="sort-by" className="form-label me-2 mt-2">Sort By</label>
                    <select className="form-select" aria-label="Sort by" onChange={(e) => handleSortBy(e.target.value)} style={{maxWidth: 'fit-content'}}>
                        <option value="registerationDate">Registeration Date</option>
                        <option value="customerName">Customer Name</option>
                        <option value="phone">Phone Number</option>
                        <option value="orderCount">Total Orders</option>
                        <option value="totalSpent">Total Spent</option>
                        <option value="lastPurchase">Last Purchase</option>
                    </select>
                </div>
            </div>

            <div className="row" 
                style={{
                    opacity: isStale ?"0.5" : "1",
                    transition: isStale ?  'opacity 0.2s 0.2s linear' : 'opacity 0s 0s linear',
                }}
            >
                <CustomerTable 
                    sortedCustomers={sortedCustomers}
                    deleteCustomer={deleteCustomer}
                    updateCustomer={updateCustomer}
                />
                
            </div>
        </>
     );
}

export default Customers;