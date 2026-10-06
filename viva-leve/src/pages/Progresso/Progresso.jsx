import { useMemo, useState } from "react";

import useLocalStorage from "../../hooks/useLocalStorage.js";
import GraficoPeso from "../../components/GraficoPeso.jsx";
import { paraNumero } from "../../utils/calculos.js";
import { somenteDecimal, formatarKg, formatarVariacao } from "../../utils/formatos.js";
import { hojeISO, dataCurta, dataLonga } from "../../utils/datas.js";

import f from "../../components/Calculadora.module.css";
import styles from "./Progresso.module.css";

const PESO_MIN = 20;
const PESO_MAX = 400;
const HISTORICO_INICIAL = 5;

const pesoValido = (n) => Number.isFinite(n) && n >= PESO_MIN && n <= PESO_MAX;

export default function Progresso() {
  /* ---------- Dados salvos no navegador ---------- */
  const [registros, setRegistros] = useLocalStorage("vivaleve:registros", []);
  const [meta, setMeta] = useLocalStorage("vivaleve:meta", null);

  // Sempre em ordem de data, do mais antigo para o mais recente
  const ordenados = useMemo(
    () => [...registros].sort((a, b) => a.data.localeCompare(b.data)),
    [registros]
  );

  /* ---------- Formulário de registro ---------- */
  const hoje = hojeISO();
  const [data, setData] = useState(hoje);
  const [peso, setPeso] = useState("");
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");

  const registrar = (e) => {
    e.preventDefault();
    const valor = paraNumero(peso);

    if (!pesoValido(valor)) return setErro(`Informe um peso entre ${PESO_MIN} e ${PESO_MAX} kg.`);
    if (!data || data > hoje) return setErro("Escolha uma data até hoje.");

    const jaExiste = registros.some((r) => r.data === data);

    // Um registro por dia: se a data já existe, substitui
    setRegistros((lista) => [
      ...lista.filter((r) => r.data !== data),
      { data, peso: Math.round(valor * 10) / 10 },
    ]);

    setErro("");
    setAviso(jaExiste ? `Registro de ${dataLonga(data)} atualizado.` : "Peso registrado!");
    setPeso("");
    setData(hoje);
  };

  /* ---------- Excluir com opção de desfazer ---------- */
  const [removido, setRemovido] = useState(null);

  const excluir = (registro) => {
    setRegistros((lista) => lista.filter((r) => r.data !== registro.data));
    setRemovido(registro);
    setAviso("");
  };

  const desfazer = () => {
    setRegistros((lista) => [...lista, removido]);
    setRemovido(null);
  };

  /* ---------- Meta ---------- */
  const [editandoMeta, setEditandoMeta] = useState(false);
  const [metaTexto, setMetaTexto] = useState("");
  const [erroMeta, setErroMeta] = useState("");

  const abrirMeta = () => {
    setMetaTexto(meta ? formatarKg(meta) : "");
    setErroMeta("");
    setEditandoMeta(true);
  };

  const salvarMeta = (e) => {
    e.preventDefault();
    const valor = paraNumero(metaTexto);
    if (!pesoValido(valor)) return setErroMeta(`Entre ${PESO_MIN} e ${PESO_MAX} kg.`);
    setMeta(Math.round(valor * 10) / 10);
    setEditandoMeta(false);
  };

  const removerMeta = () => {
    setMeta(null);
    setEditandoMeta(false);
  };

  /* ---------- Números do resumo ---------- */
  const [verTodos, setVerTodos] = useState(false);
  const temRegistros = ordenados.length > 0;
  const primeiro = ordenados[0];
  const atual = ordenados[ordenados.length - 1];
  const variacao = ordenados.length > 1 ? atual.peso - primeiro.peso : null;

  // "Bom" depende do objetivo: se há meta, é bom se aproximar dela
  const indoParaMeta =
    meta && variacao !== null
      ? Math.abs(atual.peso - meta) < Math.abs(primeiro.peso - meta)
      : null;

  const faltam = meta && atual ? atual.peso - meta : null;
  const metaAtingida = faltam !== null && Math.abs(faltam) < 0.05;

  const historico = [...ordenados].reverse();
  const visiveis = verTodos ? historico : historico.slice(0, HISTORICO_INICIAL);

  return (
    <section
      id="progresso"
      className={`container ${styles.progresso}`}
      aria-labelledby="progresso-titulo"
    >
      <header className={styles.header}>
        <h2 id="progresso-titulo" className={styles.title}>
          Meu progresso
        </h2>
        <p className={styles.subtitle}>
          Registre seu peso uma vez por semana e acompanhe sua evolução. Os dados
          ficam salvos só neste navegador, ninguém mais tem acesso.
        </p>
      </header>

      {/* ===== Resumo ===== */}
      {temRegistros && (
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statLabel}>Peso atual</span>
            <span className={styles.statValue}>{formatarKg(atual.peso)} kg</span>
            <span className={styles.statHint}>em {dataLonga(atual.data)}</span>
          </div>

          <div className={styles.stat}>
            <span className={styles.statLabel}>Variação total</span>
            {variacao !== null ? (
              <>
                <span
                  className={`${styles.statValue} ${indoParaMeta ? styles.positivo : ""}`}
                >
                  {formatarVariacao(variacao)} kg
                </span>
                <span className={styles.statHint}>desde {dataCurta(primeiro.data)}</span>
              </>
            ) : (
              <>
                <span className={styles.statValue}>—</span>
                <span className={styles.statHint}>registre mais um peso para comparar</span>
              </>
            )}
          </div>

          <div className={styles.stat}>
            <span className={styles.statLabel}>Meta</span>
            {editandoMeta ? (
              <form className={styles.metaForm} onSubmit={salvarMeta} noValidate>
                <label htmlFor="meta-peso" className="sr-only">
                  Peso da meta em kg
                </label>
                <input
                  id="meta-peso"
                  className={`${f.input} ${styles.metaInput}`}
                  type="text"
                  inputMode="decimal"
                  placeholder="Ex.: 68"
                  value={metaTexto}
                  onChange={(e) => setMetaTexto(somenteDecimal(e.target.value))}
                  autoFocus
                />
                <button type="submit" className={styles.linkBtn}>
                  Salvar
                </button>
                {meta && (
                  <button type="button" className={styles.linkBtn} onClick={removerMeta}>
                    Remover
                  </button>
                )}
                {erroMeta && <span className={styles.erro}>{erroMeta}</span>}
              </form>
            ) : meta ? (
              <>
                <span className={styles.statValue}>{formatarKg(meta)} kg</span>
                <span className={styles.statHint}>
                  {metaAtingida
                    ? "Meta atingida!"
                    : `faltam ${formatarKg(Math.abs(faltam))} kg`}{" "}
                  ·{" "}
                  <button type="button" className={styles.linkBtn} onClick={abrirMeta}>
                    editar
                  </button>
                </span>
              </>
            ) : (
              <button type="button" className={styles.metaBtn} onClick={abrirMeta}>
                + Definir meta
              </button>
            )}
          </div>
        </div>
      )}

      <div className={`${styles.layout} ${temRegistros ? "" : styles.layoutVazio}`}>
        {/* ===== Registrar ===== */}
        <div className={`${styles.panel} ${styles.areaForm}`}>
          <h3 className={styles.panelTitle}>Registrar peso</h3>

          <form onSubmit={registrar} noValidate>
            <div className={f.fields}>
              <div className={f.row}>
                <div className={f.field}>
                  <label htmlFor="progresso-peso" className={f.label}>
                    Peso <span className={f.unit}>(kg)</span>
                  </label>
                  <input
                    id="progresso-peso"
                    className={f.input}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="Ex.: 72,4"
                    value={peso}
                    onChange={(e) => {
                      setPeso(somenteDecimal(e.target.value));
                      setErro("");
                    }}
                    aria-invalid={erro ? "true" : undefined}
                    aria-describedby={erro ? "progresso-erro" : undefined}
                  />
                </div>

                <div className={f.field}>
                  <label htmlFor="progresso-data" className={f.label}>
                    Data
                  </label>
                  <input
                    id="progresso-data"
                    className={f.input}
                    type="date"
                    max={hoje}
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
                </div>
              </div>

              {erro && (
                <p id="progresso-erro" className={styles.erro} role="alert">
                  {erro}
                </p>
              )}

              <button type="submit" className={f.btnPrimary} disabled={peso === ""}>
                Registrar
              </button>

              <p className={styles.aviso} aria-live="polite">
                {aviso}
              </p>
            </div>
          </form>
        </div>

        {/* ===== Gráfico ===== */}
        <div className={`${styles.panel} ${styles.areaChart}`}>
          <h3 className={styles.panelTitle}>Evolução do peso</h3>

          {ordenados.length >= 2 ? (
            <GraficoPeso registros={ordenados} meta={meta} />
          ) : (
            <div className={styles.vazio}>
              <p className={styles.vazioTitulo}>
                {temRegistros ? "Falta só mais um registro" : "Seu gráfico aparece aqui"}
              </p>
              <p className={styles.vazioTexto}>
                {temRegistros
                  ? "Com dois pesos registrados, a linha da sua evolução começa a aparecer."
                  : "Comece registrando o peso de hoje. Na próxima semana, registre de novo para ver a evolução."}
              </p>
            </div>
          )}
        </div>

        {/* ===== Histórico ===== */}
        {(temRegistros || removido) && (
          <div className={`${styles.panel} ${styles.areaHistory}`}>
            <h3 className={styles.panelTitle}>Histórico</h3>

            {removido && (
              <p className={styles.desfazer} role="status">
                Registro de {dataLonga(removido.data)} excluído.{" "}
                <button type="button" className={styles.linkBtn} onClick={desfazer}>
                  Desfazer
                </button>
              </p>
            )}

            <ul className={styles.lista}>
              {visiveis.map((r) => {
                const indice = ordenados.findIndex((o) => o.data === r.data);
                const anterior = indice > 0 ? ordenados[indice - 1] : null;

                return (
                  <li key={r.data} className={styles.item}>
                    <span className={styles.itemData}>{dataLonga(r.data)}</span>
                    <span className={styles.itemPeso}>{formatarKg(r.peso)} kg</span>
                    <span className={styles.itemDelta}>
                      {anterior ? `${formatarVariacao(r.peso - anterior.peso)} kg` : "início"}
                    </span>
                    <button
                      type="button"
                      className={styles.excluir}
                      onClick={() => excluir(r)}
                      aria-label={`Excluir registro de ${dataLonga(r.data)}`}
                    >
                      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </li>
                );
              })}
            </ul>

            {historico.length > HISTORICO_INICIAL && (
              <button
                type="button"
                className={styles.linkBtn}
                onClick={() => setVerTodos((v) => !v)}
              >
                {verTodos ? "Ver menos" : `Ver todos (${historico.length})`}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}