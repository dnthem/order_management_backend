import { createContext, useContext, useEffect, useState } from "react"
import Menu from "./Sections/Menu/Menu"
import Orders from "./Sections/Orders/Orders";

const ctx = createContext();

export function GetDataBaseContext() {
  return useContext(ctx);
}
function App(props) {
  const [db, setDB] = useState(props.db);
  const [state, setState] = useState(0)
  const value = { db }

  useEffect(() => {
    setState(props.state)
  })
  return (
    <ctx.Provider value={value}>

      <main className="container-fluid px-4">
        {state=== 0 && <Menu/>}
        {state===1 && <Orders/>}
      </main>
    </ctx.Provider>
  )
}

export default App
