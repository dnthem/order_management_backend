import Backdrop from "../../../components/Backdrop";
import { orderFormater } from "../../../utils";
import { useData } from "../customHooks/useData";
import Customer from "./Customer/Customer";
import Menu from "./Menu";
import { useState } from "react";

function AddToOrderForm(props) {
    const [menu, _] = useData({
        store: "Menu",
        index: "id",
        keyPath: '',
    });

    const [order, setOrder] = useState([]);
    const customer = props.customer;

    /**
     * Update order
     * @param {number} id  id of the item
     * @returns {void}
     */
    const updateOrder = (id) => {
        console.log('updateOrder: ' + id);
        const updatedOrder = [...order];
        const index = order.findIndex(item => item.id === id);
        if(index === -1) {
            const item = menu.find(item => item.id === id);
            const newOrder = {
                id: item.id,
                name: item.Title,
                price: item.Price,
                quantity: 1,
            };
            updatedOrder.push(newOrder);
        } else {
            updatedOrder[index].quantity += 1;
        }
        setOrder(updatedOrder);
    }

    /**
     * Update quantity
     * @param {number} id  id of the item
     * @param {number} quantity  quantity of the item
     * @returns {void}
    */
    const updateQuantity = (id, quantity) => {
        console.log('updateQuantity: ' + id + ' ' + quantity);
        const index = order.findIndex(item => item.id === id);
        if(index !== -1) {
            const updatedOrder = [...order];
            updatedOrder[index].quantity = parseInt(quantity);
            setOrder(updatedOrder);
        }
    }

    /**
     * Remove order
     * @param {number} id  id of the item
     * @returns {void}
     * */
    const removeOrder = (id) => {
        console.log('removeOrder: ' + id);
        const index = order.findIndex(item => item.id === id);
        if(index !== -1) {
            const updatedOrder = [...order];
            updatedOrder.splice(index, 1);
            setOrder(updatedOrder);
        }

    }

    const handleAddToOrder = () => {
        console.log('handleAddToOrder');
        const newOrder = orderFormater({customer, order});
        props.onAddNewOrder(newOrder);
        props.showForm(false);
    }
    
    return ( 
        <>
            <Backdrop show={props.showForm} setShow={props.setShowForm}/>
            <div
                className={`col-md-12 col-xl-10 p-3 bg-white border rounded-3 shadow-lg`}
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "9999",
                }}
            >
                <div className="row position-relative" style={{
                    height: "80dvh",
                    
                }}>
                    <Customer customer={customer} order={order} 
                        removeOrder={removeOrder} 
                        updateQuantity={updateQuantity}
                    />
                    
                    <Menu  menu={menu} updateOrder={updateOrder}/>

                </div>
                <div className="row pt-3 border-top bg-">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={handleAddToOrder}>Add to Order</button>
                        <button className="btn btn-danger ms-2" onClick={() => props.showForm(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
      );
}

export default AddToOrderForm;