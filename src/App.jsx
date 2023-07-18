import { createContext, useContext, useState } from "react"
import Dashboard from "./Pages/Dashboard/Dashboard";
import History from "./Pages/History/History";
import Menu from "./Pages/Menu/Menu"
import Settings from "./Pages/Settings/Settings";
import OrdersV2 from "./Pages/Orders.V2/OrdersV2";
import { Route, Routes, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import useToggle from "./customHooks/useToggle";
import Customers from "./Pages/Customers/Customers";
import SideNavFooter from "./SideNavFooter/SideNavFooter";
import SideNavMenu from "./SideNavMenu/SideNavMenu";
import LogIn from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
const ctx = createContext();



export function GetDataBaseContext() {
  return useContext(ctx);
}
function App(props) {
  const [db, ] = useState(props.db);
  const [sideBarToggle, setSideBarToggle] = useToggle(false);
  const value = { db };

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
        <nav className="sb-sidenav accordion sb-sidenav-dark">
            <SideNavMenu/>
            <SideNavFooter/>
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
              {/* <Route path="/settings" element={<Settings/>} /> */}
              <Route path="/customers" element={<Customers/>} />
              <Route path="/login" element={<LogIn/>} />
              <Route path='/signup' element={<Signup/>} />
            </Routes>
            </ctx.Provider>
          </main>
        </div>
      </div>
    
    </div>
 
  )
}

export default App
