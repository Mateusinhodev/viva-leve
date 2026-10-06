import { useState } from "react";

import { somenteDecimal } from "../utils/formatos.js";
import s from "./Calculadora.module.css";

const ImcCalc = ({ calcImc }) => {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");

  const preenchido = altura !== "" && peso !== "";
  const vazio = altura === "" && peso === "";

  const limpar = () => {
    setAltura("");
    setPeso("");
  };

  return (
    <div className={s.panel}>
      <h2 className={s.title}>Calculadora de IMC</h2>
      <p className={s.intro}>Informe sua altura e seu peso atuais.</p>

      {/* onSubmit faz o Enter calcular; o Limpar é type="button" e não envia o form */}
      <form onSubmit={(e) => calcImc(e, altura, peso)} noValidate>
        <div className={s.fields}>
          <div className={s.field}>
            <label htmlFor="imc-altura" className={s.label}>
              Altura <span className={s.unit}>(m)</span>
            </label>
            <input
              id="imc-altura"
              className={s.input}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="Ex.: 1,75"
              value={altura}
              onChange={(e) => setAltura(somenteDecimal(e.target.value))}
              aria-describedby="imc-altura-dica"
            />
            <small id="imc-altura-dica" className={s.hint}>
              Pode digitar em centímetros também, ex.: 175
            </small>
          </div>

          <div className={s.field}>
            <label htmlFor="imc-peso" className={s.label}>
              Peso <span className={s.unit}>(kg)</span>
            </label>
            <input
              id="imc-peso"
              className={s.input}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="Ex.: 70,5"
              value={peso}
              onChange={(e) => setPeso(somenteDecimal(e.target.value))}
            />
          </div>

          <div className={s.actions}>
            <button type="button" className={s.btnSecondary} onClick={limpar} disabled={vazio}>
              Limpar
            </button>
            <button type="submit" className={s.btnPrimary} disabled={!preenchido}>
              Calcular
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ImcCalc;