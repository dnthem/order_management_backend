import { createContext, useContext, useEffect, useState } from "react"
import Dashboard from "./Pages/Dashboard/Dashboard";
import History from "./Pages/History/History";
import Menu from "./Pages/Menu/Menu"
import Settings from "./Pages/Settings/Settings";
import OrdersV2 from "./Pages/Orders.V2/OrdersV2";

const ctx = createContext();


export function GetDataBaseContext() {
  return useContext(ctx);
}
function App(props) {
  const [db, setDB] = useState(props.db);
  const value = { db }

  const RenderOnState = () => {
    let res;
    switch (props.state) {
      case 0:
        res = <Menu/>; break;
      case 1:
        res= <OrdersV2/>; break;
      case 2:
        res = <Dashboard/>; break;
      case 3:
        res = <History/>; break;
      case 4:
        res = <Settings/>; break;
    }
    return res;
  }

  return (
    <ctx.Provider value={value}>

      <main className="container-fluid px-4">
        {RenderOnState()}
      </main>
    </ctx.Provider>
  )
}

export default App
