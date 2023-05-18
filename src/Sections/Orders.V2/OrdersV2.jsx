import Header from "../../components/Header";
import {AiOutlineCheckCircle, AiOutlineShoppingCart, AiOutlinePlusCircle} from "react-icons/ai";
import DownloadBtn from "../../components/Downloadbtn";
import OrderCardV2 from "./OrdersCardV2";
import CompleteOrderList from "./CompleteOrderList";
import UserInfoForm from "./UserInfoForm";
import AddToOrderForm from "./AddToOrderForm/AddToOrderForm";
import { useState } from "react";
import { useData } from "./customHooks/useData";
import Loader from "../../components/Loader";
import { dateToISO, getCurrentTime } from "../../utils";
function OrdersV2(props) {
    const [orders, setOrders] = useData({
        store: 'OrdersV2',
        index: 'deliverDate',
        keyPath: new Date().toLocaleDateString("en-us")
    });
    const [customer, setCustomer] = useState(null);
    const [order, setOrder] = useState(null);
    const [orderID, setOrderID] = useState(-1);
    const [deliverDate, setDeliverDate] = useState(dateToISO());
    const [orderDate, setOrderDate] = useState(dateToISO());
    const [showUserInfoForm, setShowUserInfoForm] = useState(false);
    const [showAddToOrderForm, setShowAddToOrderForm] = useState(false);
    const pending = orders.filter(order => !order.status);
    const completed = orders.filter(order => order.status);
    
    const total = completed.reduce((acc, order) => acc + order.total, 0);

    // order CRUD
    const onDelete = (id) => {
        setOrders({type: 'delete', indexField: 'orderID', keyPath: id, newVal: null});
    }
    const onComplete = (id, order) => {
        setOrders({type: 'update', indexField: 'orderID', keyPath: id, newVal: {...order, status: true, completedTime: getCurrentTime()}});
    }
    const onEdit = (order) => {
        setShowAddToOrderForm(true);
        setOrder(order.order);
        setCustomer(order.customer);
        setOrderID(order.orderID);
        setDeliverDate(order.deliverDate);
        setOrderDate(order.orderDate);
    }

    const onAddNewOrder = (newVal) => {
        setOrders({type: 'add', indexField: 'orderID', newVal: newVal});
    }

    const onUpdateOrder = (newVal) => { 
        setOrders({type: 'update', indexField: 'orderID', keyPath: orderID, newVal: newVal});
    }

    const onAddCustomerSubmit = (customer) => {
        setShowUserInfoForm(false);
        setShowAddToOrderForm(true);
        setOrderID(-1);
        setOrder(null);
        setCustomer(customer);
    }

    return ( 
        <>
            
            {
                showUserInfoForm && 
                <UserInfoForm showForm={setShowUserInfoForm} onAddCustomerSubmit={onAddCustomerSubmit}/>
            }

            {
                showAddToOrderForm && 
                <AddToOrderForm 
                    showForm={setShowAddToOrderForm} 
                    customer={customer} 
                    order={order}
                    orderID={orderID}
                    deliverDate={deliverDate}
                    orderDate={orderDate}
                    setDeliverDate={setDeliverDate}
                    setOrderDate={setOrderDate}
                    updateCustomer={setCustomer}
                    onAddNewOrder={onAddNewOrder}
                    onUpdateOrder={onUpdateOrder}
                />
            }

            <div className="row data-bs-backdrop border-bottom">
                <div className="col-md-8 col-sm-12 ">
                        <Header icon={<AiOutlineShoppingCart/>} 
                        title={"Orders - " + new Date().toLocaleDateString("en-us")}/>
                </div>

                <div className="col-md-4 col-sm-12">
                    <div className="d-flex justify-content-between">
                        <button className="mt-4 btn fw-bold text-primary" title="Add new order" onClick={() => setShowUserInfoForm(true)}>New order <AiOutlinePlusCircle/></button>
                        <button className="mt-4 btn" title="Click here when complete today order">Complete <AiOutlineCheckCircle/></button>
                        <DownloadBtn data={null} fileName='Order_Date_' contentFormat={null}/>
                    </div>
                    
                </div>
            </div>

            <div className="row">
                <div className="col-md-3 col-sm-12 d-flex flex-column align-items-center border-end">
                    <div className="section-title ">
                        <h2>Completed Orders
                        
                        </h2>
                        <aside className="text-muted">Total: ${total}</aside>
                    </div>
                    <div className="section-content w-100">
                        <CompleteOrderList orders={completed}/>
                    </div>
                    
                </div>

                <div className="col-md-9 px-2 col-sm-12" >
                    <div className="section-title width-100 text-center">
                        <h2>Pending Orders</h2>
                    </div>
                    <div className="section-content row d-flex justify-content-start px-1">
                        {
                            pending.map((order, index) => {
                                return <OrderCardV2 
                                key={index} 
                                id={order.orderID}
                                order={order}
                                onDelete={onDelete}
                                onComplete={onComplete}
                                onEdit={onEdit}
                                />
                            }).reverse()
                        }
                    </div>
                </div>
            </div>
        </>
     );
}

export default OrdersV2;