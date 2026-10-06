import { useState } from "react";

import { somenteDecimal } from "../utils/formatos.js";
import s from "./Calculadora.module.css";

const AguaCalc = ({ calcAgua }) => {
  const [peso, setPeso] = useState("");

  return (
    <div className={s.panel}>
      <h2 className={s.title}>Água recomendada</h2>
      <p className={s.intro}>
        Descubra quanta água beber por dia e como distribuir ao longo do dia.
      </p>

      <form onSubmit={(e) => calcAgua(e, peso)} noValidate>
        <div className={s.fields}>
          <div className={s.field}>
            <label htmlFor="agua-peso" className={s.label}>
              Peso <span className={s.unit}>(kg)</span>
            </label>
            <input
              id="agua-peso"
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
            <button
              type="button"
              className={s.btnSecondary}
              onClick={() => setPeso("")}
              disabled={peso === ""}
            >
              Limpar
            </button>
            <button type="submit" className={s.btnPrimary} disabled={peso === ""}>
              Calcular
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AguaCalc;