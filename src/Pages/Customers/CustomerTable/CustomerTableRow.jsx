import { useState } from 'react';
import useToggle from '../../../customHooks/useToggle';
import { phoneFormat } from '../../../utils/phoneFormat';
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

    const btnStyle = {
        margin: '0px 1em 0px 0',
        padding: '0px',
        border: 'none',
    };
    return ( 
        <tr
            aria-label="customer-table-row"
            key={customer.customerID}>
            <td aria-label="customer-registeration-date">{customer.registerationDate}</td>
            
            {
                editToggle ? (
                    <>
                    <td> 
                        <input 
                            aria-label="customer-name-input"
                            type="text"  
                            value={editCustomer.customerName} 
                            onChange={(e) => handleNameChange(e)}
                        />
                    </td>
                    <td>
                        <input 
                            aria-label="customer-phone-input"
                            type="text" 
                            inputMode='numeric'  
                            value={editCustomer.phone} 
                            onChange={(e) => handlePhoneChange(e)}
                        />
                    </td>
                    </>
                ) : (
                    <>
                        <td aria-label="customer-name">{customer.customerName}</td>
                        <td aria-label="customer-phone">{customer.phone}</td>
                    </>
                )
            }

            <td aria-label="customer-order-count">{customer.orderCount}</td>
            <td aria-label="customer-total-spent">{Intl.NumberFormat('en-us',{style: 'currency', currency: 'USD'}).format(customer.totalSpent)}</td>
            <td arial-label="customer-last-purchase">{customer.lastPurchase}</td>
            { deleteCustomer && updateCustomer &&
                <td>
                    
                    {
                        editToggle ? (
                            <>
                            <button 
                                className="btn" 
                                aria-label="save-edit-customer-btn"
                                onClick={onEditSave}>Save</button>
                            <button 
                                className="btn" 
                                aria-label="cancel-edit-customer-btn"
                                onClick={onEditCancel}>Cancel</button>
                            </>
                            
                        ) : (
                            
                            <div>
                            <button 
                                className="btn" 
                                aria-label='edit-customer-btn' onClick={setEditToggle}
                                style={btnStyle}
                                ><FaEdit/></button>
                            <button className="btn" aria-label='remove-customer-btn' onClick={onDeleteCustomer}
                            style={btnStyle}
                            ><FaRegTrashAlt/></button>
                            </div>
                            
                        )
                    }

                    
                </td>
            }
        </tr>
     );
}

export default CustomerTableRow;