import "./AguaTable.css";
import Button from "./Button";

const AguaTable = ({ aguaMinima, aguaMaxima, resetCalc }) => {
  const turnos = [
    { nome: "Manhã", horas: 4 },  // acordar até 12h
    { nome: "Tarde", horas: 4 },  // 12h até 18h
    { nome: "Noite", horas: 3 },  // 18h até antes de dormir
  ];

  const totalPartes = turnos.reduce((acc, t) => acc + t.horas, 0);

  // Calcula a distribuição de água em cada turno
  const distribuicao = turnos.map((turno) => {
    const porcaoMin = ((aguaMinima * 1000 * turno.horas) / totalPartes).toFixed(0);
    const porcaoMax = ((aguaMaxima * 1000 * turno.horas) / totalPartes).toFixed(0);
    return { ...turno, porcaoMin, porcaoMax };
  });

  return (
    <div id="result-container">
      <h2>💧 Consumo Diário de Água</h2>

      <div id="agua-number">
        <p>
          <strong>Mínimo:</strong> <span className="highlight">{aguaMinima} L/dia</span>
        </p>
        <p>
          <strong>Máximo:</strong> <span className="highlight">{aguaMaxima} L/dia</span>
        </p>
      </div>

      <h3>📊 Distribuição sugerida ao longo do dia</h3>

      <table className="agua-table">
        <thead>
          <tr>
            <th>Turno</th>
            <th>Quantidade sugerida</th>
          </tr>
        </thead>
        <tbody>
          {distribuicao.map((turno, index) => (
            <tr key={index}>
              <td>{turno.nome}</td>
              <td>
                {Number(turno.porcaoMin).toLocaleString()} ml –{" "}
                {Number(turno.porcaoMax).toLocaleString()} ml
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="note">
        *Esses valores são estimativas. Ajuste conforme sua rotina, clima e nível de atividade física.
      </p>

      <Button id="back-btn" text="Voltar" action={resetCalc} />
    </div>
  );
};

export default AguaTable;
