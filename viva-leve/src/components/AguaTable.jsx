import "./AguaTable.css";
import Button from "./Button";

const AguaTable = ({ aguaMinima, aguaMaxima, resetCalc }) => {
  // Definição dos turnos e quantas vezes a pessoa pode beber em cada
  const turnos = [
    { nome: "Manhã", horas: 4 }, // acordar até 12h
    { nome: "Tarde", horas: 4 }, // 12h até 18h
    { nome: "Noite", horas: 3 }, // 18h até antes de dormir
  ];

  // Total de "vezes" para dividir a água
  const totalPartes = turnos.reduce((acc, t) => acc + t.horas, 0);

  return (
    <div id="result-container">
      <h2>Consumo Diário de Água 💧</h2>

      <div id="agua-number">
        <p>
          <strong>Mínimo:</strong> {aguaMinima} L/dia
        </p>
        <p>
          <strong>Máximo:</strong> {aguaMaxima} L/dia
        </p>
      </div>

      <h3>Distribuição sugerida ao longo do dia</h3>
      <div id="agua-table">
        <div className="table-header">
          <h4>Turno</h4>
          <h4>Intervalo</h4>
        </div>

        {turnos.map((turno, index) => {
          // Divide proporcionalmente ao número de "vezes"
          const porcaoMin = ((aguaMinima * 1000 * turno.horas) / totalPartes).toFixed(0);
          const porcaoMax = ((aguaMaxima * 1000 * turno.horas) / totalPartes).toFixed(0);

          return (
            <div className="table-data" key={index}>
              <p>{turno.nome}</p>
              <p>
                {porcaoMin} ml – {porcaoMax} ml
              </p>
            </div>
          );
        })}
      </div>

      <p className="note">
        *Esses valores são estimativas. Ajuste conforme sua rotina, clima e
        nível de atividade física.
      </p>

      <Button id="back-btn" text="Voltar" action={resetCalc} />
    </div>
  );
};

export default AguaTable;
