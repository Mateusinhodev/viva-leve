import r from "./Resultado.module.css";

const ImcTable = ({ data, imc, info, infoClass, resetCalc }) => {
  // infoClass vem do data.js ("good", "low"...) e vira a classe do CSS Module
  const cor = r[infoClass];

  return (
    <div className={r.panel}>
      <p className={r.label}>Seu IMC</p>
      <p className={`${r.number} ${cor}`}>{imc}</p>
      <p className={`${r.info} ${r.infoStrong}`}>
        Situação atual: <span className={`${r.badge} ${cor}`}>{info}</span>
      </p>

      <h3 className={r.subtitle}>Confira as classificações</h3>

      <table className={r.table}>
        <caption className="sr-only">
          Classificação do IMC por faixa, com a sua faixa destacada
        </caption>
        <thead>
          <tr>
            <th scope="col">IMC</th>
            <th scope="col">Classificação</th>
            <th scope="col">Obesidade</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            const faixaAtual = item.info === info;

            return (
              <tr
                key={item.info}
                className={faixaAtual ? r.current : undefined}
                aria-current={faixaAtual ? "true" : undefined}
              >
                <td>{item.classification}</td>
                <td>
                  {item.info}
                  {faixaAtual && <span className={r.you}>Você</span>}
                </td>
                <td>{item.obesity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className={r.note}>
        O IMC é uma referência geral e não considera massa muscular, idade ou
        sexo. Para uma avaliação completa, converse com um profissional de saúde.
      </p>

      <button type="button" className={r.btn} onClick={resetCalc}>
        Calcular novamente
      </button>
    </div>
  );
};

export default ImcTable;