import { createContext, useContext, useState } from "react"
import Dashboard from "./Pages/Dashboard/Dashboard";
import History from "./Pages/History/History";
import Menu from "./Pages/Menu/Menu"
import Settings from "./Pages/Settings/Settings";
import OrdersV2 from "./Pages/Orders.V2/OrdersV2";
import { Route, Routes, Link } from "react-router-dom";
import { FaBars, FaTachometerAlt, FaHistory} from "react-icons/fa";
import {MdMenuBook} from 'react-icons/md';
import {AiOutlineShoppingCart, AiOutlineUser} from "react-icons/ai";

import {RiSettings5Line} from 'react-icons/ri'
import useToggle from "./customHooks/useToggle";
import Customers from "./Pages/Customers/Customers";
import useLocalStorage from "./customHooks/useLocalStorage";
const ctx = createContext();



export function GetDataBaseContext() {
  return useContext(ctx);
}
function App(props) {
  const [db, ] = useState(props.db);
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
  const [sideBarToggle, setSideBarToggle] = useToggle(false);
  const value = { db, jwtToken, setJwtToken };

  const iconStyle = {
    color: "#545454",
  }
  return (
   <div className={sideBarToggle?"sb-nav-fixed sb-sidenav-toggled":"sb-nav-fixed"}>
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
      <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 mx-2" id="sidebarToggle" onClick={setSideBarToggle}>
        <FaBars style={iconStyle}/>
      </button>
      <Link className="navbar-brand ps-3" to="/">Order Management</Link>
    </nav>
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <Link to="/dashboard" className="btn nav-link" id="Dashboard">
                        <div className="sb-nav-link-icon">
                          <FaTachometerAlt style={iconStyle}/>
                        </div>
                        Dashboard
                    </Link>
                    <div className="sb-sidenav-menu-heading">Main</div>
                    <Link to="/menu" id="Menu" className="nav-link btn">
                      <div className="sb-nav-link-icon">
                        <MdMenuBook style={iconStyle}/> 
                      </div>
                      Menu
                    </Link>
                    <Link to="/orders" id="Orders" className="btn nav-link">
                      <div className="sb-nav-link-icon">
                        <AiOutlineShoppingCart style={iconStyle}/>
                      </div>
                      Orders
                    </Link>
                    <Link to="/history" id="History" className="btn nav-link">
                      <div className="sb-nav-link-icon">
                        <FaHistory style={iconStyle}/>
                      </div>
                      History
                    </Link>
                    <Link to="/customers" id="Customers" className="btn nav-link">
                      <div className="sb-nav-link-icon">
                        <AiOutlineUser style={iconStyle}/>
                      </div>
                      Customers
                    </Link>
                    <Link to="/settings" id="Setting" className="btn nav-link">
                      <div className="sb-nav-link-icon">
                        <RiSettings5Line style={iconStyle}/>
                      </div>
                      Setting
                    </Link>
                    
                </div>
            </div>
        </nav>
      </div>
        <div id="layoutSidenav_content">
          <main className="container-fluid px-4">
          <ctx.Provider value={value}>
            <Routes>
              <Route path="/" element={<Menu/>} />
              <Route path="/menu" element={<Menu/>} />
              <Route path="/orders" element={<OrdersV2/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/history" element={<History/>} />
              <Route path="/settings" element={<Settings/>} />
              <Route path="/customers" element={<Customers/>} />
            </Routes>
            </ctx.Provider>
          </main>
        </div>
      </div>
    
    </div>
 
  )
}

export default App
