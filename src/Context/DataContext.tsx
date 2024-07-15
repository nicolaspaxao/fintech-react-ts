import React from 'react'
import useFetch from '../Hooks/useFetch';

interface IDataContext {
  data: null | IVenda[],
  loading: boolean,
  error: string | null,
  inicio: string,
  final: string,
  setInicio: React.Dispatch<React.SetStateAction<string>>
  setFinal: React.Dispatch<React.SetStateAction<string>>
}

export interface IVenda {
  id: string,
  nome: string,
  preco: number,
  status: "pago" | "processando" | "falha",
  pagamento: "boleto" | "pix" | "cartao",
  parcelas: number | null,
  data: string
}

const getDate = (n: number) => {
  const date = new Date();
  date.setDate(date.getDate() - n)
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

const DataContext = React.createContext<IDataContext | null>(null);

export const DataContextProvider = ({ children }: React.PropsWithChildren) => {
  const [inicio, setInicio] = React.useState(getDate(14));
  const [final, setFinal] = React.useState(getDate(0));

  const { data, loading, error } = useFetch<IVenda[]>(`https://data.origamid.dev/vendas/?inicio=${inicio}&final=${final}`);

  return (
    <DataContext.Provider value={{ data, loading, error, inicio, setInicio, final, setFinal }}>
      {children}
    </DataContext.Provider>
  )
}


export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context) throw new Error("useData precisar estar em DataContextProvider")
  return context;
}