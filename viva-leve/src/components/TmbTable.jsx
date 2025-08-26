import "./TmbTable.css";
import Button from './Button';

const TmbTable = ({ tmb, gct, caloriasPerda, caloriasGanha, resetCalc }) => {
  return (
    <div id="result-container">
      <h2>Taxa Metabólica Basal</h2>

      <div id="tmb-number">{tmb} kcal/dia</div>
      <p id="tmb-info">
        Isso significa que seu corpo gasta aproximadamente <strong>{tmb} calorias por dia</strong> em repouso, apenas para manter funções vitais (respiração, batimentos cardíacos, etc.).
      </p>

      <h3>Recomendações de Calorias</h3>
      <div id="tmb-table">
        <div className="table-header">
          <h4>Objetivo</h4>
          <h4>Calorias</h4>
        </div>
        <div className="table-data">
          <p>Manter peso</p>
          <p className="normal">{gct} kcal</p>
        </div>
        <div className="table-data">
          <p>Perder peso</p>
          <p className="low">{caloriasPerda} kcal</p>
        </div>
        <div className="table-data">
          <p>Ganhar peso</p>
          <p className="high">{caloriasGanha} kcal</p>
        </div>
      </div>

      <p className="note">
        *Os valores são estimativas e podem variar conforme seu metabolismo, nível de atividade física e outros fatores individuais.
      </p>

      <Button id="back-btn" text="Voltar" action={resetCalc} />
    </div>
  );
};

export default TmbTable;