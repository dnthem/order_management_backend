import { createContext, useContext, useState } from "react"
import Menu from "./Sections/Menu/Menu"

const ctx = createContext();

export function GetDataBaseContext() {
  return useContext(ctx);
}
function App(props) {
  const [db, setDB] = useState(props.db);

  const value = { db }
  return (
    <ctx.Provider value={value}>
      <main className="container-fluid px-4">
        <Menu/>
      </main>
    </ctx.Provider>
  )
}

export default App
