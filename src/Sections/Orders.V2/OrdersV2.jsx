import Header from "../../components/Header";
import {AiOutlineCheckCircle, AiOutlineShoppingCart, AiOutlinePlusCircle} from "react-icons/ai";
import DownloadBtn from "../../components/Downloadbtn";
import OrderCardV2 from "../../components/OrdersCardV2";
import CompleteOrderList from "./CompleteOrderList";
import UserInfoForm from "./UserInfoForm";
import AddToOrderForm from "./AddToOrderForm/AddToOrderForm";
import { useState } from "react";
import { useData } from "./customHooks/useData";
function OrdersV2(props) {
    const [orders, setOrders] = useData({
        store: 'OrdersV2',
        index: 'date',
        keyPath: new Date().toLocaleDateString("en-us")
    });

    const [menu, setMenu] = useData({
        store: 'Menu',
        index: 'id',
        keyPath: null
    })

    const [showUserInfoForm, setShowUserInfoForm] = useState(false);
    const [showAddToOrderForm, setShowAddToOrderForm] = useState(true);
    const pending = orders.filter(order => !order.status);
    const completed = orders.filter(order => order.status);
    
    const total = completed.reduce((acc, order) => acc + order.total, 0);

    // order CRUD
    const onDelete = (id) => {
        setOrders({type: 'delete', indexField: 'orderID', keyPath: id, newVal: null});
    }
    const onComplete = (id, order) => {
        setOrders({type: 'update', indexField: 'orderID', keyPath: id, newVal: {...order, status: true}});
    }
    const onEdit = (id, newVal) => {
        setOrders({type: 'update', indexField: 'orderID',keyPath: id, newVal: newVal});
    }
    return ( 
        <>
            {showUserInfoForm && <UserInfoForm showForm={setShowUserInfoForm}/>}
            {showAddToOrderForm && <AddToOrderForm showForm={setShowAddToOrderForm}/>}
            <div className="row data-bs-backdrop">
                <div className="col-md-8 col-sm-12">
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
                <div className="col-md-3 col-sm-12 d-flex flex-column align-items-center">
                    <div className="section-title ">
                        <h2>Completed Orders
                        
                        </h2>
                        <aside className="text-muted">Total: ${total}</aside>
                    </div>
                    <div className="section-content">
                        <CompleteOrderList orders={completed}/>
                    </div>
                    
                </div>

                <div className="col-md-9 px-2 col-sm-12" >
                    <div className="section-title width-100 text-center">
                        <h2>Pending Orders</h2>
                    </div>
                    <div className="section-content row d-flex justify-content-center px-1">
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