import { useState } from 'react';
import useToggle from '../Orders.V2/customHooks/useToggle';
import { phoneFormat } from '../../utils';
import {FaRegTrashAlt, FaEdit} from 'react-icons/fa';

function CustomerTableRow({customer, deleteCustomer, updateCustomer}) {
    const [editToggle, setEditToggle] = useToggle(false);
    const [editCustomer, setEditCustomer] = useState(customer);

    const onEditSave = () => {
        if (editCustomer.customerName === "" && editCustomer.phone === "") {
            alert('Please enter at least a name or phone number');
            return;
        }
        
        const newVal = {
            ...customer,
            customerName: editCustomer.customerName,
            phone: editCustomer.phone
        }
        setEditToggle();
        updateCustomer(customer.customerID, newVal);
    }

    const onEditCancel = () => {
        setEditToggle();
        setEditCustomer(customer);
    };

    const onDeleteCustomer = () => {
        if (confirm("Are you sure you want to delete this customer?") === false) return;
        deleteCustomer(customer.customerID);
    };

    const handleNameChange = (e) => {
        const regex = /^[a-zA-Z ]*$/;
        if (regex.test(e.target.value)) {
            setEditCustomer({...editCustomer, customerName: e.target.value});
        }
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        // only allow numbers or dashes
        const regex = /^[0-9-]*$/;
        if (regex.test(value) || value === "") {
          setEditCustomer({ ...editCustomer, phone: phoneFormat(value )});
        }
    };
    return ( 
        <tr
            data-test-id="customer-info"
            key={customer.customerID}>
            <td>{customer.registerationDate}</td>
            
            {
                editToggle ? (
                    <>
                    <td> 
                        <input type="text" value={editCustomer.customerName} onChange={(e) => handleNameChange(e)}/>
                    </td>
                    <td>
                        <input type="text" inputMode='numeric'  value={editCustomer.phone} onChange={(e) => handlePhoneChange(e)}/>
                    </td>
                    </>
                ) : (
                    <>
                        <td>{customer.customerName}</td>
                        <td>{customer.phone}</td>
                    </>
                )
            }

            <td>{customer.orderCount}</td>
            <td>{Intl.NumberFormat('en-us',{style: 'currency', currency: 'USD'}).format(customer.totalSpent)}</td>
            <td>{customer.lastPurchase}</td>
            { deleteCustomer && updateCustomer &&
                <td>
                    
                    {
                        editToggle ? (
                            <>
                            <button className="btn" aria-label='save-edit-customer' onClick={onEditSave}>Save</button>
                            <button className="btn" aria-label='cancel-edit-customer' onClick={onEditCancel}>Cancel</button>
                            </>
                            
                        ) : (
                            <>
                            <button className="btn" aria-label='edit-customer' onClick={setEditToggle}><FaEdit/></button>
                            <button className="btn" aria-label='remove-customer' onClick={onDeleteCustomer}><FaRegTrashAlt/></button>
                            </>
                        )
                    }

                    
                </td>
            }
        </tr>
     );
}

export default CustomerTableRow;