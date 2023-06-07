import React, { useEffect, useState, useRef, useReducer } from 'react';
import Backdrop from '../../components/Backdrop';
import CloseBtn from '../../components/CloseBtn';
import {AiOutlineUser, AiOutlinePhone, AiOutlineIdcard} from 'react-icons/ai';
import { useDebounce } from "./customHooks/useDebouce";
import { dateFormat, phoneFormat } from '../../utils';
import { use } from 'chai';

/**
 * Function to filter the customers array based on the query
 * @param {string} query - The search query
 * @param {string} type - The input type to search on
 * @returns {array} - The filtered array of customers
 */
function autoComplete(customers, query, type) {
  return customers.filter((customer) =>
    customer[type].toLowerCase().includes(query.toLowerCase())
  );
}

/**
 * Function to filter the customers array based on the query, but only returns the first result
 * @param {object} customers  - The array of customers
 * @param {string} query  - The search query
 * @param {string} type  - The input type to search on
 * @returns {object} - The filtered array of customers
 */
function exactMatch(customers, query, type = "phone") {
  if (type === "customerName") return customers.find((customer) => customer[type].toLowerCase() === query.toLowerCase());
  return customers.find((customer) => phoneFormat(customer[type]) === phoneFormat(query));
}

function UserInfoForm(props) {
    const [customers, setCustomers] = [props.customers, props.setCustomers] // customer list from parent
    // const [customerName, setCustomerName] = useState("");
    // const [phone, setPhone] = useState("");
    // use reducer to handle multiple states, customerName and phone either must not be empty
    const [customer, updateCustomer] = useReducer((state, action) => {
      switch (action.type) {
        case 'customerName':
          return {...state, customerName: action.payload};
        case 'phone':
          return {...state, phone: action.payload};
        case 'customerID':
          return {...state, customerID: action.payload};
        case 'all':
          return action.payload;
        default:
          return state;
      }
    }, {customerName: '', phone: '', customerID: -1});

    const debouncedQuery = useDebounce(customer.customerName);
    const [suggestions, setSuggestion] = useState([]);
    

    const nameRef = useRef(null);
    let outline = customer.customerID > 0 ? "success" : "primary";
    
    function handleSelectSuggestion(suggestion) {
        updateCustomer({type: 'customerName', payload: suggestion.customerName});
        updateCustomer({type: 'phone', payload: suggestion.phone});
        updateCustomer({type: 'customerID', payload: suggestion.customerID});
        setSuggestion([]);
    }

    async function handleSubmit(e) {
      e.preventDefault();
      // check either at least one of the fields is filled
      if (customer.customerName === "" && customer.phone === "") {
        alert("Please enter customer name or phone number");
        return;
      }

      let _customerID = customer.customerID,
          _customerName = customer.customerName,
          _phone = customer.phone,
          _registerationDate = '';
      
      // in case user hits enter without selecting a suggestion even though there is a exact match
      if (customer.customerID === -1) {
        const query = customer.customerName=== ""? customer.phone : customer.customerName;
        const type = customer.customerName === "" ? "phone" : "customerName";
        const results = exactMatch(customers, query, type);
        if (results) {
          _customerID = results.customerID;
          _customerName = results.customerName;
          _phone = results.phone;
          _registerationDate = results.registerationDate;
        }
      }

      const newCustomer = { // create new customer object
        customerName : _customerName,
        phone: phoneFormat(_phone),
        orderCount: 0,
        totalSpent: 0,
        lastPurchase: '',  
        registerationDate: _registerationDate,
      };
      // new customer
      if (_customerID === -1) {
        newCustomer.registerationDate = dateFormat();
        _customerID = await setCustomers({ // add customer to database     
            type: "add",
            indexField: "customerID",
            newVal: newCustomer,
        }); 
        newCustomer.customerID = _customerID; 
      } 
      else {
        newCustomer.customerID= _customerID;
        await setCustomers({ // update customer to database     
          type: "update",
          indexField: "customerID",
          indexValue: _customerID,
          newVal: newCustomer,
        });
      }

      props.onAddCustomerSubmit(newCustomer);
    }

    function handleInputPhone(e) {
        const value = e.target.value.replace(/\D/g, "")
        if (value.length > 10) {
            return;
        }
        if (value.length <= 10) {
            const results = exactMatch(customers, value);
            if (results) {
                // updateCustomer({type: "customerName", payload: results.customerName === '' ? customerName : results.customerName });
                // setPhone(results.phone === '' ? phone : results.phone)
                // setCustomerID(results.customerID);
                updateCustomer({type: 'all', payload: results});
                outline = "success";
            }
            else {
              // setCustomerID(-1);
              // setPhone(phoneFormat(value));
              updateCustomer({type: 'customerID', payload: -1});
              updateCustomer({type: 'phone', payload: phoneFormat(value)});
            }   
        }
    }
    
    
    useEffect(() => {
      if (debouncedQuery && document.activeElement === nameRef.current) {
          const results = autoComplete(customers, debouncedQuery, "customerName");
          setSuggestion(results);
          if (results.length === 0) updateCustomer({type: 'customerID', payload: -1});
          
      } else {
          setSuggestion([]);
      }
      
  }, [debouncedQuery]);

    return (
      <>
      <Backdrop/>
      <div
        data-test-id='add-customer-form'
        className={`col-md-5 col-xl-3 p-3 border border-5 border-` + outline}
        style={{
          borderRadius: "5px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "1000",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0,0,0,.5)",
        }}
      >
        <div 
          className="section-title text-center" style={{position: 'relative'}}>
          <h2><AiOutlineIdcard/> Customer Infomation</h2>
          <CloseBtn onClick={() => props.showForm(false)}/>
        </div>
        <div className="section-content">
          <form className="row g-3">
            <div className="col">
              <label htmlFor="customerName" className="form-label">
                <AiOutlineUser/>Customer Name
                {customer.customerID > 0 && (
                  <span className="badge bg-success">Existing Customer</span>
                )}
              </label>
              <input
                data-test-id='customer-name-input'
                type="text"
                className="form-control"
                id="customerName"
                placeholder="Customer Name"
                ref={nameRef}
                value={customer.customerName}
                onChange={(e) => updateCustomer({ type: "customerName", payload: e.target.value.replace(/[^A-Za-z ]/g, '')})}
                autoComplete='off'
              />
              <style>
                {`
                  .list-group-item:hover {
                    cursor: pointer;
                    background-color: #e9ecef;
                    color: black;
                  }
                `}

              </style>
              <ul 
                data-test-id='suggestions-list'
                className="list-group">
                {suggestions.length > 0 &&
                  suggestions.map((suggestion) => (
                    <li data-test-id="suggestion-item"
                      className="list-group-item"
                      key={suggestion.customerID}
                      onClick={() => handleSelectSuggestion(suggestion)}
                    >
                      {suggestion.customerName} &nbsp;
                      {suggestion.phone}
                    </li>
                  ))}
              </ul>

              <label htmlFor="phone" className="form-label">
              <AiOutlinePhone/> Phone
              </label>
              <input
                data-test-id='phone-input'
                inputMode="numeric"
                autoComplete='off'
                type="text"
                className="form-control"
                id="phone"
                placeholder="714-456-7890"
                value={customer.phone}
                onChange={handleInputPhone}
              />
            </div>

            <button
              data-test-id='confirm-btn'
              type="submit"
              className={`btn btn-` + outline}
              onClick={handleSubmit}
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
      </>
      
    );
}

export default UserInfoForm;