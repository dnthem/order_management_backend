import { createContext, useContext, useEffect, useState } from "react"
import Dashboard from "./Sections/Dashboard/Dashboard";
import Menu from "./Sections/Menu/Menu"
import Orders from "./Sections/Orders/Orders";

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
        res= <Orders/>; break;
      case 2:
        res = <Dashboard/>; break;
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
