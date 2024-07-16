import { IVenda } from '../Context/DataContext'
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, ResponsiveContainer, Legend, YAxis } from 'recharts'

type VendaDia = {
  data: string,
  pago: number,
  processando: number,
  falha: number
}

const tranformData = (data: IVenda[]): VendaDia[] => {
  const dias = data.reduce((acc: { [key: string]: VendaDia }, item) => {
    const dia = item.data.split(' ')[0];
    if (!acc[dia]) {
      acc[dia] = {
        data: dia,
        pago: 0,
        processando: 0,
        falha: 0
      };
    }
    acc[dia][item.status] += item.preco;

    return acc;
  }, {})
  return Object.values(dias).map(dia => ({ ...dia, data: dia.data.substring(5) }));
}

export const GraficoVendas = ({ data }: { data: IVenda[] }) => {
  const tranformedData = tranformData(data);
  return (
    <ResponsiveContainer width={'99%'} height={400}>
      <LineChart data={tranformedData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="pago" stroke="#A36AF9" strokeWidth={3} />
        <Line type="monotone" dataKey="processando" stroke="#FBCB21" strokeWidth={3} />
        <Line type="monotone" dataKey="falha" stroke="#000" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  )
}
