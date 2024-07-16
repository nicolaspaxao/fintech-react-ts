import { GraficoVendas } from '../Components/GraficoVendas';
import { useData } from '../Context/DataContext'

export const Resumo = () => {
  const { data } = useData();

  if (data === null) return;

  return (
    <section>
      <div className='resumo flex mb'>
        <div className='box mb'>
          <h2>Vendas</h2>
          <span> {data.filter((i) => i.status !== 'falha').reduce((acc, item) => acc + item.preco, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        <div className='box mb'>
          <h2>Recebendo</h2>
          <span> {data.filter((i) => i.status === 'pago').reduce((acc, item) => acc + item.preco, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
        <div className='box mb'>
          <h2>Processando</h2>
          <span> {data.filter((i) => i.status === 'processando').reduce((acc, item) => acc + item.preco, 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
      </div>
      <GraficoVendas data={data} />
    </section>
  )
}
