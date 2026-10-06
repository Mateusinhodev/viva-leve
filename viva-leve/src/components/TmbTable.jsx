import r from "./Resultado.module.css";

const TmbTable = ({ tmb, gct, caloriasPerda, caloriasGanha, resetCalc }) => {
  const objetivos = [
    { nome: "Manter o peso", detalhe: "seu gasto total do dia", valor: gct },
    { nome: "Perder peso", detalhe: "déficit de 20%", valor: caloriasPerda },
    { nome: "Ganhar peso", detalhe: "superávit de 20%", valor: caloriasGanha },
  ];

  return (
    <div className={r.panel}>
      <p className={r.label}>Sua taxa metabólica basal</p>
      <p className={r.number}>
        {tmb} <span className={r.numberUnit}>kcal/dia</span>
      </p>
      <p className={r.info}>
        É o que seu corpo gasta em repouso, só para manter funções vitais como
        respiração e batimentos cardíacos.
      </p>

      <h3 className={r.subtitle}>Quanto comer por dia</h3>
      <p className={r.subtitleHint}>Considerando o seu nível de atividade física</p>

      <table className={r.table}>
        <caption className="sr-only">Calorias diárias recomendadas por objetivo</caption>
        <thead>
          <tr>
            <th scope="col">Objetivo</th>
            <th scope="col">Calorias por dia</th>
          </tr>
        </thead>
        <tbody>
          {objetivos.map((o) => (
            <tr key={o.nome}>
              <th scope="row">
                {o.nome}
                <span className={r.cellHint}>{o.detalhe}</span>
              </th>
              <td className={r.value}>{o.valor} kcal</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className={r.note}>
        Os valores são estimativas e variam conforme metabolismo, rotina e
        saúde. Para dietas com déficit calórico, o ideal é ter acompanhamento
        de um nutricionista.
      </p>

      <button type="button" className={r.btn} onClick={resetCalc}>
        Calcular novamente
      </button>
    </div>
  );
};

export default TmbTable;