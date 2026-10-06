import { useState } from "react";

import { somenteDecimal, somenteInteiro } from "../utils/formatos.js";
import s from "./Calculadora.module.css";

const NIVEIS_ATIVIDADE = [
  { valor: "1", texto: "Sedentário — pouco ou nenhum exercício" },
  { valor: "2", texto: "Levemente ativo — exercício 1 a 3x por semana" },
  { valor: "3", texto: "Moderadamente ativo — exercício 3 a 5x por semana" },
  { valor: "4", texto: "Muito ativo — exercício intenso 6 a 7x por semana" },
  { valor: "5", texto: "Extremamente ativo — treino pesado ou trabalho físico" },
];

const FORM_VAZIO = { sexo: "", idade: "", peso: "", altura: "", nivel: "" };

const TmbCalc = ({ calcTmb }) => {
  // Um objeto só para o formulário inteiro, em vez de 5 useState
  const [form, setForm] = useState(FORM_VAZIO);

  const atualizar = (campo, valor) =>
    setForm((atual) => ({ ...atual, [campo]: valor }));

  const preenchido = Object.values(form).every((v) => v !== "");
  const vazio = Object.values(form).every((v) => v === "");

  const enviar = (e) =>
    calcTmb(e, form.sexo, form.idade, form.peso, form.altura, form.nivel);

  return (
    <div className={s.panel}>
      <h2 className={s.title}>Calculadora de TMB</h2>
      <p className={s.intro}>
        Descubra quantas calorias seu corpo gasta por dia e quanto comer para
        manter, perder ou ganhar peso.
      </p>

      <form onSubmit={enviar} noValidate>
        <div className={s.fields}>
          <div className={s.row}>
            <fieldset className={s.field}>
              <legend className={s.label}>Sexo</legend>
              <div className={s.segmented}>
                {["masculino", "feminino"].map((opcao) => (
                  <label key={opcao} className={s.option}>
                    <input
                      type="radio"
                      name="tmb-sexo"
                      value={opcao}
                      checked={form.sexo === opcao}
                      onChange={(e) => atualizar("sexo", e.target.value)}
                    />
                    <span>{opcao === "masculino" ? "Masculino" : "Feminino"}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className={s.field}>
              <label htmlFor="tmb-idade" className={s.label}>
                Idade <span className={s.unit}>(anos)</span>
              </label>
              <input
                id="tmb-idade"
                className={s.input}
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="Ex.: 30"
                value={form.idade}
                onChange={(e) => atualizar("idade", somenteInteiro(e.target.value))}
              />
            </div>
          </div>

          <div className={s.row}>
            <div className={s.field}>
              <label htmlFor="tmb-peso" className={s.label}>
                Peso <span className={s.unit}>(kg)</span>
              </label>
              <input
                id="tmb-peso"
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
              <label htmlFor="tmb-altura" className={s.label}>
                Altura <span className={s.unit}>(cm)</span>
              </label>
              <input
                id="tmb-altura"
                className={s.input}
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ex.: 175"
                value={form.altura}
                onChange={(e) => atualizar("altura", somenteDecimal(e.target.value))}
                aria-describedby="tmb-altura-dica"
              />
              <small id="tmb-altura-dica" className={s.hint}>
                Em metros também funciona: 1,75
              </small>
            </div>
          </div>

          <div className={s.field}>
            <label htmlFor="tmb-nivel" className={s.label}>
              Nível de atividade física
            </label>
            <select
              id="tmb-nivel"
              className={s.input}
              value={form.nivel}
              onChange={(e) => atualizar("nivel", e.target.value)}
            >
              <option value="" disabled>
                Selecione...
              </option>
              {NIVEIS_ATIVIDADE.map((n) => (
                <option key={n.valor} value={n.valor}>
                  {n.texto}
                </option>
              ))}
            </select>
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

export default TmbCalc;