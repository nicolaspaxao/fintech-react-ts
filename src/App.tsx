import { Header } from "./Components/Header"
import { Sidednav } from "./Components/Sidednav"
import { DataContextProvider } from "./Context/DataContext"
import { Resumo } from "./Pages/Resumo"
import { Vendas } from "./Pages/Vendas"
import "./Style.css"

function App() {
  return (
    <DataContextProvider>
      <div className="container">
        <Sidednav />
        <main>
          <Header />
          <Resumo />
          <Vendas />
        </main>
      </div>
    </DataContextProvider>

  )
}

export default App
