import { useState } from "react";

import { somenteDecimal } from "../utils/formatos.js";
import s from "./Calculadora.module.css";

const FORM_VAZIO = { sexo: "", peso: "", altura: "" };

const LbmCalc = ({ calcLbm }) => {
  const [form, setForm] = useState(FORM_VAZIO);

  const atualizar = (campo, valor) =>
    setForm((atual) => ({ ...atual, [campo]: valor }));

  const preenchido = Object.values(form).every((v) => v !== "");
  const vazio = Object.values(form).every((v) => v === "");

  return (
    <div className={s.panel}>
      <h2 className={s.title}>Massa magra</h2>
      <p className={s.intro}>
        Estime quanto do seu peso é músculo, osso, órgãos e água — e quanto é gordura.
      </p>

      <form onSubmit={(e) => calcLbm(e, form.sexo, form.peso, form.altura)} noValidate>
        <div className={s.fields}>
          <fieldset className={s.field}>
            <legend className={s.label}>Sexo</legend>
            <div className={s.segmented}>
              {["masculino", "feminino"].map((opcao) => (
                <label key={opcao} className={s.option}>
                  <input
                    type="radio"
                    name="lbm-sexo"
                    value={opcao}
                    checked={form.sexo === opcao}
                    onChange={(e) => atualizar("sexo", e.target.value)}
                  />
                  <span>{opcao === "masculino" ? "Masculino" : "Feminino"}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={s.row}>
            <div className={s.field}>
              <label htmlFor="lbm-peso" className={s.label}>
                Peso <span className={s.unit}>(kg)</span>
              </label>
              <input
                id="lbm-peso"
                className={s.input}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex.: 70,5"
                value={form.peso}
                onChange={(e) => atualizar("peso", somenteDecimal(e.target.value))}
              />
            </div>

            <div className={s.field}>
              <label htmlFor="lbm-altura" className={s.label}>
                Altura <span className={s.unit}>(cm)</span>
              </label>
              <input
                id="lbm-altura"
                className={s.input}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex.: 175"
                value={form.altura}
                onChange={(e) => atualizar("altura", somenteDecimal(e.target.value))}
                aria-describedby="lbm-altura-dica"
              />
              <small id="lbm-altura-dica" className={s.hint}>
                Em metros também funciona: 1,75
              </small>
            </div>
          </div>

          <div className={s.actions}>
            <button
              type="button"
              className={s.btnSecondary}
              onClick={() => setForm(FORM_VAZIO)}
              disabled={vazio}
            >
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

export default LbmCalc;