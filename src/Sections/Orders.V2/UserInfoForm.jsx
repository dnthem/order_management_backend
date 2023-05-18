import React, { useEffect, useState, useRef } from 'react';
import Backdrop from '../../components/Backdrop';
import CloseBtn from '../../components/CloseBtn';
import { useData } from './customHooks/useData';
import {AiOutlineUser, AiOutlinePhone, AiOutlineIdcard} from 'react-icons/ai';
import { useDebounce } from "./customHooks/useDebouce";
import { phoneFormat } from '../../utils';

/**
 * Function to filter the customers array based on the query
 * @param {string} query - The search query
 * @param {string} inputType - The input type to search on
 * @returns {array} - The filtered array of customers
 */
function autoComplete(customers, query, inputType) {
  return customers.filter((customer) =>
    customer[inputType].toLowerCase().includes(query.toLowerCase())
  );
}

/**
 * Function to filter the customers array based on the query, but only returns the first result
 * @param {object} customers  - The array of customers
 * @param {string} query  - The search query
 * @returns {object} - The filtered array of customers
 */
function exactMatch(customers, query) {
    return customers.find((customer) => phoneFormat(customer.phone) === phoneFormat(query));
}

function UserInfoForm(props) {
    const [customers, setCustomers] = useData({
      store: "Customers",
      index: "customerID",
      keyPath: null,
    })
    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const debouncedQuery = useDebounce(customerName);
    const [suggestions, setSuggestion] = useState([]);
    const [customerID, setCustomerID] = useState(-1);

    const nameRef = useRef(null);
    let outline = customerID > 0 ? "success" : "primary";
    
    function handleSelectSuggestion(suggestion) {
        setCustomerName(suggestion.customerName);
        setPhone(suggestion.phone);
        setCustomerID(suggestion.customerID);
        setSuggestion([]);
    }

    async function handleSubmit(e) {
      e.preventDefault();
      let newCustomerID = customerID;
      const newCustomer = { // create new customer object
        customerName,
        phone: phoneFormat(phone),
        orderCount: 0,
      };
      // new customer
      if (customerID === -1) {
          newCustomerID = await setCustomers({ // add customer to database     
              type: "add",
              indexField: "customerID",
              newVal: newCustomer,
          }); 
      }
      newCustomer.customerID = newCustomerID; 
      setCustomerName("");
      setPhone("");
      
      props.onAddCustomerSubmit(newCustomer);
    }

    function handleInputPhone(e) {
        const value = e.target.value.replace(/\D/g, "")
        if (value.length <= 10) {
            setPhone(value);
        }
        if (value.length === 10) {
            const results = exactMatch(customers, value);
            console.log(results);
            if (results) {
                setCustomerName(results.customerName);
                setPhone(results.phone)
                setCustomerID(results.customerID);
                outline = "success";
            }
        }
        else {
            setCustomerID(-1);
            outline = "primary";
        }

    }
    
    
    useEffect(() => {
      if (debouncedQuery && document.activeElement === nameRef.current) {
          const results = autoComplete(customers, debouncedQuery, "customerName");
          setSuggestion(results);
          if (results.length === 0) setCustomerID(-1);
          
      } else {
          setSuggestion([]);
      }
      
  }, [debouncedQuery]);

  

    return (
      <>
      <Backdrop/>
      <div
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
        <div className="section-title text-center" style={{position: 'relative'}}>
          <h2><AiOutlineIdcard/> Customer Infomation</h2>
          <CloseBtn onClick={() => props.showForm(false)}/>
        </div>
        <div className="section-content">
          <form className="row g-3">
            <div className="col">
              <label htmlFor="customerName" className="form-label">
                <AiOutlineUser/>Customer Name
                {customerID > 0 && (
                  <span className="badge bg-success">Existing Customer</span>
                )}
              </label>
              <input
                type="text"
                className="form-control"
                id="customerName"
                placeholder="Customer Name"
                ref={nameRef}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value.replace(/[^A-Za-z ]/g, ''))}
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
              <ul className="list-group">
                {suggestions.length > 0 &&
                  suggestions.map((suggestion) => (
                    <li 
                      className="list-group-item"
                      key={suggestion.customerID}
                      onClick={() => handleSelectSuggestion(suggestion)}
                    >
                      <div className="row">
                        <div className="col-6">
                          <span>{suggestion.customerName}</span>
                        </div>
                        <div className="col-6">
                          <span>{suggestion.phone}</span>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>

              <label htmlFor="phone" className="form-label">
              <AiOutlinePhone/> Phone
              </label>
              <input
                inputMode="numeric"
                autoComplete='off'
                type="text"
                className="form-control"
                id="phone"
                placeholder="714-456-7890"
                value={phone}
                onChange={handleInputPhone}
              />
            </div>

            <button
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