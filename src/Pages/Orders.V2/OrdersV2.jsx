import Header from "../../components/Header";
import {AiOutlineShoppingCart, AiOutlinePlusCircle} from "react-icons/ai";
import DownloadBtn from "../../components/Downloadbtn";
import OrderCardV2 from "./PendingOrders/OrdersCardV2";
import CompleteOrderList from "./CompletedOrders/CompleteOrderList";
import UserInfoForm from "./UserInfoForm";
import AddToOrderForm from "./AddToOrderForm/AddToOrderForm";
import { useState } from "react";
import { useData } from "../../customHooks/useData";
import { dateFormat, downloadOrderFormat, getCurrentTime } from "../../utils";
import { STORES } from "../../indexedDB/indexedDB";

function OrdersV2() {
    const [orders, setOrders] = useData({
        store: STORES.ORDERSV2.name,
        index: 'deliverDate',
        keyPath: new Date().toLocaleDateString("en-us")
    });

    console.log(orders);
    const [customers, setCustomers] = useData({
        store: STORES.CUSTOMERS.name,
        index: "customerID",
        keyPath: null,
    })

    const [menu, setMenu] = useData({
        store: STORES.MENU.name,
        index: "id",
        keyPath: null,
    })

    const [income, setIncome] = useData({
        store: STORES.INCOME.name,
        index: "Date",
        keyPath: new Date().toLocaleDateString("en-us"),
    })

    const [itemCount, setItemCount] = useData({
        store: STORES.ITEMCOUNT.name,
        index: "Date",
        keyPath: new Date().toLocaleDateString("en-us"),
    })

    const [customer, setCustomer] = useState(null);
    const [cart, setCart] = useState(null);
    const [orderID, setOrderID] = useState(-1);
    const [deliverDate, setDeliverDate] = useState(dateFormat());
    const [orderDate, setOrderDate] = useState(dateFormat());
    const [showUserInfoForm, setShowUserInfoForm] = useState(false);
    const [showAddToOrderForm, setShowAddToOrderForm] = useState(false);
    const pending = orders.filter(order => !order.status);
    const completed = orders.filter(order => order.status);
    const total = completed.reduce((acc, order) => acc + order.total, 0);

    // order CRUD
    const onDelete = (id) => {
        setOrders({type: 'delete', indexField: 'orderID', keyPath: id, newVal: null});
    }

    /**
     * Complete order, update customer order count, total spent, and update menu
     */
    const onComplete = (id, order) => {
        setOrders({type: 'update', indexField: 'orderID', keyPath: id, newVal: {...order, status: true, completedTime: getCurrentTime()}});

        const currentCustomer = customers.find(customer => customer.customerID === order.customer.customerID);
        // update customer order count
        setCustomers({type: 'update', indexField: 'customerID', keyPath: order.customerID, newVal: {...currentCustomer, orderCount: currentCustomer.orderCount + 1, totalSpent: currentCustomer.totalSpent + order.total}});
        
        // update menu
        order.cart.forEach(item => {
            const currentItem = menu.find(menuItem => menuItem.id === item.id);
            setMenu({type: 'update', indexField: 'id', keyPath: item.id, newVal: {...currentItem, Count: currentItem.Count + item.quantity}});
        })

        // update income
        const incomeData = {
            Date: new Date().toLocaleDateString("en-us"),
            Total: income.Total??0 + order.total,
        }
        setIncome({type: 'update', indexField: 'Date', newVal: incomeData});

        // update item count
        const itemCountData = {
            Date: new Date().toLocaleDateString("en-us"),
            Count: itemCount.Count??0 + order.cart.reduce((acc, item) => acc + item.quantity, 0),
        }
        setItemCount({type: 'update', indexField: 'Date', newVal: itemCountData});
    }

    const onEdit = (order) => {
        setShowAddToOrderForm(true);
        setCart(order.cart);
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
        setCart(null);
        setCustomer(customer);
    }

    return ( 
        <>
            
            {
                showUserInfoForm && 
                <UserInfoForm 
                showForm={setShowUserInfoForm} 
                onAddCustomerSubmit={onAddCustomerSubmit}
                customers={customers}
                setCustomers={setCustomers}
                />
            }

            {
                showAddToOrderForm && 
                <AddToOrderForm 
                    menu={menu}
                    showForm={setShowAddToOrderForm} 
                    customer={customer} 
                    cart={cart}
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
                    <div className="d-flex justify-content-evenly">
                        <button className="mt-4 btn fw-bold text-primary" title="Add new order" onClick={() => setShowUserInfoForm(true)}>New order <AiOutlinePlusCircle/></button>
                        <DownloadBtn data={orders} fileName='Order_Date_' contentFormat={downloadOrderFormat}/>
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
                    <div className="section-content w-100 position-relative">
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