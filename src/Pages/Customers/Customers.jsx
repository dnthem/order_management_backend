import { useData } from "../../customHooks/useData";
import Header from "../../components/Header";
import { STORES } from "../../indexedDB/indexedDB";
import CustomerTable from "../Dashboard/CustomerTable";
import {AiOutlineUser} from 'react-icons/ai';
import UserInfoForm from "../Orders.V2/UserInfoForm";
import useToggle from "../Orders.V2/customHooks/useToggle";
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
    const filteredCustomers = customers.filter((customer) => {
        return customer.customerName.toLowerCase().includes(deferredQuery.toLowerCase());
    });
    const isStale = query !== deferredQuery;

    async function deleteCustomer(id) {
        if (confirm("Are you sure you want to delete this customer?") === false) return;
        await setCustomers({
            type: "delete",
            indexField: STORES.CUSTOMERS.keyPath,
            keyPath: id,
        });
    }

    function updateCustomer(id, newVal) {
        alert("update customer");
        console.log(newVal);
        return;
        setCustomers({
            type: "update",
            indexField: STORES.CUSTOMERS.keyPath,
            newVal: { ...newVal, [STORES.CUSTOMERS.keyPath]: id },
        });
    }

    function search(keyword) {
        alert(keyword);
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
                        <button className="btn text-primary " onClick={setAddFormToggle}>Add Customer</button>
                        
                        <div className="input-group " style={{width: "15em"}}>
                        <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon2" value={query} onChange={(e) => setQuery(e.target.value)}/>
                        <span className="input-group-text" id="basic-addon2">Search</span>
                        </div>
                    </div>
                </div>
            </div>



            <div className="row" 
                style={{
                    opacity: isStale ?"0.5" : "1",
                    transition: isStale ?  'opacity 0.2s 0.2s linear' : 'opacity 0s 0s linear',
                }}
            >
                <CustomerTable 
                    sortedCustomers={filteredCustomers}
                    deleteCustomer={deleteCustomer}
                    updateCustomer={updateCustomer}
                />
                
            </div>
        </>
     );
}

export default Customers;