import { useEffect, useRef, useState } from "react";

import { paraData, dataCurta, dataLonga } from "../utils/datas.js";
import { formatarKg, formatarVariacao } from "../utils/formatos.js";
import styles from "./GraficoPeso.module.css";

const ALTURA_MAX = 440;
const MARGEM = { top: 24, right: 72, bottom: 36, left: 44 };

// Escolhe um passo "redondo" para o eixo Y (0,5 / 1 / 2 / 5 / 10 kg...)
function escolherPasso(intervalo) {
  const opcoes = [0.5, 1, 2, 5, 10, 20, 50];
  return opcoes.find((passo) => intervalo / passo <= 4) ?? 100;
}

/*
  Gráfico de linha da evolução do peso.
  - registros: [{ data: "2026-10-05", peso: 72.4 }] em ordem de data
  - meta: número ou null
*/
export default function GraficoPeso({ registros, meta }) {
  const containerRef = useRef(null);
  const [tamanho, setTamanho] = useState(null); // { largura, altura } medidos
  const [ativo, setAtivo] = useState(null); // índice do ponto destacado

  // Mede o espaço real disponível: o gráfico se ajusta à tela sem esticar o texto
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observador = new ResizeObserver(([entrada]) => {
      const { width, height } = entrada.contentRect;
      setTamanho({ largura: Math.max(260, width), altura: Math.min(ALTURA_MAX, height) });
    });
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  // Primeira renderização: ainda sem medida, só reserva o espaço
  if (!tamanho) return <div ref={containerRef} className={styles.wrapper} />;

  const { largura, altura: ALTURA } = tamanho;

  /* ---------- Escalas ---------- */
  const larguraUtil = largura - MARGEM.left - MARGEM.right;
  const alturaUtil = ALTURA - MARGEM.top - MARGEM.bottom;

  const pesos = registros.map((r) => r.peso);
  const valores = meta ? [...pesos, meta] : pesos;
  const passo = escolherPasso(Math.max(...valores) - Math.min(...valores));
  const yMin = Math.floor((Math.min(...valores) - passo / 2) / passo) * passo;
  const yMax = Math.ceil((Math.max(...valores) + passo / 2) / passo) * passo;

  const tempos = registros.map((r) => paraData(r.data).getTime());
  const tMin = tempos[0];
  const tMax = tempos[tempos.length - 1];

  const x = (t) =>
    tMax === tMin
      ? MARGEM.left + larguraUtil / 2 // um ponto só: fica no meio
      : MARGEM.left + ((t - tMin) / (tMax - tMin)) * larguraUtil;
  const y = (peso) => MARGEM.top + ((yMax - peso) / (yMax - yMin)) * alturaUtil;

  const pontos = registros.map((r, i) => ({ ...r, px: x(tempos[i]), py: y(r.peso) }));
  const ultimo = pontos[pontos.length - 1];
  const base = MARGEM.top + alturaUtil;

  const linha = pontos.map((p, i) => `${i ? "L" : "M"}${p.px},${p.py}`).join(" ");
  const area = `${linha} L${ultimo.px},${base} L${pontos[0].px},${base} Z`;

  const ticks = [];
  for (let v = yMin; v <= yMax + 0.001; v += passo) ticks.push(Math.round(v * 10) / 10);

  // Com muitos registros, as bolinhas viram ruído: mostra só a última
  const mostrarMarcadores = pontos.length <= 24;

  /* ---------- Interação: mouse, toque e teclado ---------- */
  const pontoMaisProximo = (evento) => {
    const caixa = evento.currentTarget.getBoundingClientRect();
    const xPonteiro = evento.clientX - caixa.left;
    let melhor = 0;
    pontos.forEach((p, i) => {
      if (Math.abs(p.px - xPonteiro) < Math.abs(pontos[melhor].px - xPonteiro)) melhor = i;
    });
    setAtivo(melhor);
  };

  const navegarComTeclado = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const delta = e.key === "ArrowRight" ? 1 : -1;
      setAtivo((i) => Math.min(pontos.length - 1, Math.max(0, (i ?? pontos.length - 1) + delta)));
    }
  };

  const pontoAtivo = ativo !== null ? pontos[ativo] : null;
  const anterior = ativo > 0 ? pontos[ativo - 1] : null;
  const textoAtivo = pontoAtivo
    ? `${dataLonga(pontoAtivo.data)}: ${formatarKg(pontoAtivo.peso)} kg`
    : "";

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <svg
        width={largura}
        height={ALTURA}
        className={styles.svg}
        tabIndex={0}
        role="img"
        aria-label={`Gráfico da evolução do peso com ${pontos.length} registros. Use as setas para percorrer.`}
        onPointerMove={pontoMaisProximo}
        onPointerDown={pontoMaisProximo}
        onPointerLeave={() => setAtivo(null)}
        onKeyDown={navegarComTeclado}
        onFocus={(e) => {
          // Só ao chegar pelo Tab: no toque/clique quem decide o ponto é o ponteiro
          if (e.currentTarget.matches(":focus-visible")) setAtivo(pontos.length - 1);
        }}
        onBlur={() => setAtivo(null)}
      >
        {/* Linhas de grade e valores do eixo Y */}
        {ticks.map((v) => (
          <g key={v}>
            <line
              x1={MARGEM.left}
              x2={largura - MARGEM.right + 8}
              y1={y(v)}
              y2={y(v)}
              className={styles.grid}
            />
            <text x={MARGEM.left - 8} y={y(v)} dy="0.32em" textAnchor="end" className={styles.tick}>
              {formatarKg(v).replace(",0", "")}
            </text>
          </g>
        ))}

        {/* Datas: primeira e última */}
        <text x={pontos[0].px} y={ALTURA - 10} textAnchor={pontos.length > 1 ? "start" : "middle"} className={styles.tick}>
          {dataCurta(pontos[0].data)}
        </text>
        {pontos.length > 1 && (
          <text x={ultimo.px} y={ALTURA - 10} textAnchor="end" className={styles.tick}>
            {dataCurta(ultimo.data)}
          </text>
        )}

        {/* Meta */}
        {meta && (
          <g>
            <line
              x1={MARGEM.left}
              x2={largura - MARGEM.right + 8}
              y1={y(meta)}
              y2={y(meta)}
              className={styles.meta}
            />
            <text x={MARGEM.left + 6} y={y(meta) - 7} className={styles.metaLabel}>
              Meta {formatarKg(meta)} kg
            </text>
          </g>
        )}

        {/* Área e linha */}
        {pontos.length > 1 && <path d={area} className={styles.area} />}
        {pontos.length > 1 && <path d={linha} className={styles.line} />}

        {/* Crosshair */}
        {pontoAtivo && (
          <line x1={pontoAtivo.px} x2={pontoAtivo.px} y1={MARGEM.top} y2={base} className={styles.crosshair} />
        )}

        {/* Marcadores */}
        {pontos.map((p, i) =>
          mostrarMarcadores || i === pontos.length - 1 || i === ativo ? (
            <circle
              key={p.data}
              cx={p.px}
              cy={p.py}
              r={i === ativo ? 6 : 4}
              className={styles.dot}
            />
          ) : null
        )}

        {/* Rótulo só no último ponto */}
        <text x={ultimo.px + 10} y={ultimo.py} dy="0.32em" className={styles.endLabel}>
          {formatarKg(ultimo.peso)} kg
        </text>
      </svg>

      {/* Tooltip */}
      {pontoAtivo && (
        <div
          className={styles.tooltip}
          style={{
            left: Math.min(Math.max(pontoAtivo.px, 70), largura - 70),
            top: pontoAtivo.py,
          }}
          aria-hidden="true"
        >
          <span className={styles.tooltipDate}>{dataLonga(pontoAtivo.data)}</span>
          <strong className={styles.tooltipValue}>{formatarKg(pontoAtivo.peso)} kg</strong>
          {anterior && (
            <span className={styles.tooltipDelta}>
              {formatarVariacao(pontoAtivo.peso - anterior.peso)} kg desde o anterior
            </span>
          )}
        </div>
      )}

      {/* Leitores de tela ouvem o ponto atual ao navegar pelas setas */}
      <p className="sr-only" aria-live="polite">
        {textoAtivo}
      </p>
    </div>
  );
}