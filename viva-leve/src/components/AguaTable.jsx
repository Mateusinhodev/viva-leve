import "./AguaTable.css";
import Button from "./Button";

const AguaTable = ({ aguaMinima, aguaMaxima, resetCalc }) => {
  const horarios = [
    "Ao acordar",
    "10h",
    "12h",
    "14h",
    "16h",
    "18h",
    "20h",
    "Antes de dormir",
  ];

  const porcaoMin = ((aguaMinima * 1000) / horarios.length).toFixed(0);
  const porcaoMax = ((aguaMaxima * 1000) / horarios.length).toFixed(0);

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
          <h4>Horário</h4>
          <h4>Quantidade</h4>
        </div>
        {horarios.map((hora, index) => (
          <div className="table-data" key={index}>
            <p>{hora}</p>
            <p>
              {porcaoMin} ml – {porcaoMax} ml
            </p>
          </div>
        ))}
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