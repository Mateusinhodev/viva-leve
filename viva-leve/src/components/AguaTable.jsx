import r from "./Resultado.module.css";

const ML_POR_COPO = 250;

// Peso de cada turno na distribuição (proporcional às horas acordado)
const TURNOS = [
  { nome: "Manhã", periodo: "ao acordar até 12h", horas: 4 },
  { nome: "Tarde", periodo: "12h às 18h", horas: 4 },
  { nome: "Noite", periodo: "18h até dormir", horas: 3 },
];

const TOTAL_HORAS = TURNOS.reduce((soma, t) => soma + t.horas, 0);

// 2.45 -> "2,5" (uma casa: ninguém mede 2,45 L)
const litros = (valor) =>
  valor.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// 891 -> "900" (arredonda de 50 em 50 ml, mais fácil de medir)
const ml = (valor) => (Math.round(valor / 50) * 50).toLocaleString("pt-BR");

// Mostra "4 copos" ou "3 a 4 copos"
const copos = (minMl, maxMl) => {
  const min = Math.round(minMl / ML_POR_COPO);
  const max = Math.round(maxMl / ML_POR_COPO);
  const plural = max === 1 ? "copo" : "copos";
  return min === max ? `${max} ${plural}` : `${min} a ${max} ${plural}`;
};

const AguaTable = ({ aguaMinima, aguaMaxima, resetCalc }) => {
  const distribuicao = TURNOS.map((turno) => {
    const fracao = turno.horas / TOTAL_HORAS;
    return {
      ...turno,
      minMl: aguaMinima * 1000 * fracao,
      maxMl: aguaMaxima * 1000 * fracao,
    };
  });

  return (
    <div className={r.panel}>
      <p className={r.label}>Sua meta diária de água</p>
      <p className={r.number}>
        {litros(aguaMinima)} – {litros(aguaMaxima)}{" "}
        <span className={r.numberUnit}>litros</span>
      </p>
      <p className={r.info}>
        Cerca de <strong>{copos(aguaMinima * 1000, aguaMaxima * 1000)}</strong>{" "}
        de {ML_POR_COPO} ml por dia, considerando 35 a 40 ml por kg.
      </p>

      <h3 className={r.subtitle}>Como distribuir ao longo do dia</h3>
      <p className={r.subtitleHint}>Beber aos poucos é melhor do que tudo de uma vez</p>

      <table className={r.table}>
        <caption className="sr-only">Quantidade de água sugerida por turno do dia</caption>
        <thead>
          <tr>
            <th scope="col">Turno</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Copos</th>
          </tr>
        </thead>
        <tbody>
          {distribuicao.map((t) => (
            <tr key={t.nome}>
              <th scope="row">
                {t.nome}
                <span className={r.cellHint}>{t.periodo}</span>
              </th>
              <td className={r.value}>
                {ml(t.minMl)} – {ml(t.maxMl)} ml
              </td>
              <td>{copos(t.minMl, t.maxMl)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className={r.note}>
        Aumente em dias quentes ou com exercício. Quem tem problemas renais ou
        cardíacos deve seguir a orientação do médico sobre quantidade de líquidos.
      </p>

      <button type="button" className={r.btn} onClick={resetCalc}>
        Calcular novamente
      </button>
    </div>
  );
};

export default AguaTable;