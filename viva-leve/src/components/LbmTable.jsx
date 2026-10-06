import r from "./Resultado.module.css";
import l from "./LbmTable.module.css";

// 61.42 -> "61,4"
const kg = (valor) =>
  valor.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const LbmTable = ({ weight, massaMagra, massaGorda, percentoGordura, resetCalc }) => {
  const percentoMagra = 100 - percentoGordura;

  const componentes = [
    {
      nome: "Massa magra",
      detalhe: "músculos, ossos, órgãos e água",
      kg: massaMagra,
      pct: percentoMagra,
      cor: l.magra,
    },
    {
      nome: "Massa gorda",
      detalhe: "gordura corporal estimada",
      kg: massaGorda,
      pct: percentoGordura,
      cor: l.gorda,
    },
  ];

  return (
    <div className={r.panel}>
      <p className={r.label}>Sua massa magra</p>
      <p className={r.number}>
        {kg(massaMagra)} <span className={r.numberUnit}>kg</span>
      </p>
      <p className={r.info}>
        de <strong>{kg(weight)} kg</strong> de peso total, com cerca de{" "}
        <strong>{kg(percentoGordura)}% de gordura</strong>.
      </p>

      <h3 className={r.subtitle}>Sua composição corporal</h3>

      {/* Barra proporcional: o texto equivalente está na tabela logo abaixo */}
      <div className={l.bar} aria-hidden="true">
        {componentes.map((c) => (
          <span key={c.nome} className={`${l.segment} ${c.cor}`} style={{ width: `${c.pct}%` }}>
            {c.pct >= 12 && `${Math.round(c.pct)}%`}
          </span>
        ))}
      </div>

      <table className={r.table}>
        <caption className="sr-only">Composição corporal estimada</caption>
        <thead>
          <tr>
            <th scope="col">Componente</th>
            <th scope="col">Peso</th>
            <th scope="col">%</th>
          </tr>
        </thead>
        <tbody>
          {componentes.map((c) => (
            <tr key={c.nome}>
              <th scope="row">
                <span className={`${l.dot} ${c.cor}`} aria-hidden="true" />
                {c.nome}
                <span className={r.cellHint}>{c.detalhe}</span>
              </th>
              <td className={r.value}>{kg(c.kg)} kg</td>
              <td>{kg(c.pct)}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className={r.note}>
        Estimativa pela fórmula de Boer, que usa só peso, altura e sexo. Para
        medir sua composição corporal com precisão, faça bioimpedância ou uma
        avaliação com um profissional.
      </p>

      <button type="button" className={r.btn} onClick={resetCalc}>
        Calcular novamente
      </button>
    </div>
  );
};

export default LbmTable;