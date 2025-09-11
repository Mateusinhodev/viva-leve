import Button from './Button';
import "./LbmTable.css"

const LbmTable = ({ weight, massaMagra, massaGorda, percentoGordura, resetCalc }) => {

  return (
    <div id="result-container">
      <h2>Composição Corporal</h2>

      <div id="massa-numbers">
        <p>
          <strong>Peso Total:</strong>{" "}
          <span className="highlight">{weight} kg</span>
        </p>
        <p>
          <strong>Massa Magra:</strong>{" "}
          <span className="highlight">{massaMagra} kg</span>
        </p>
        <p>
          <strong>Massa Gorda:</strong>{" "}
          <span className="highlight">{massaGorda} kg</span>
        </p>
        <p>
          <strong>% de Gordura:</strong>{" "}
          <span className="highlight">{percentoGordura}%</span>
        </p>
      </div>

      <h3>ℹ️ Interpretação básica</h3>
      <p className="note">
        - Massa Magra: músculos, ossos, órgãos e água.<br/>
        - Massa Gorda: gordura corporal estimada.<br/>
        - % de Gordura: proporção de gordura em relação ao peso total.
      </p>

      <Button id="back-btn" text="Voltar" action={resetCalc} />
    </div>
  );
};

export default LbmTable;