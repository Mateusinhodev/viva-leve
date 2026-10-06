import styles from "./HeroIllustration.module.css";

/*
  Ilustração da Home: painel com IMC, evolução do peso, água e meta.
  Como é SVG dentro do React (e não um <img>), ela herda a fonte do site
  e usa as variáveis de cor do index.css.
*/
export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 480 600"
      className={styles.svg}
      role="img"
      aria-labelledby="hero-ilustracao-titulo"
    >
      <title id="hero-ilustracao-titulo">
        Painel do Viva Leve com resultado do IMC, evolução do peso, consumo de
        água e meta semanal
      </title>

      <defs>
        <filter id="vl-hero-sombra" x="-20%" y="-20%" width="140%" height="150%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="12" />
          <feOffset dy="10" result="blur" />
          <feFlood floodColor="#0f172a" floodOpacity="0.12" />
          <feComposite in2="blur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="vl-hero-fundo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dfe5ec" />
          <stop offset="1" stopColor="#d3dbe4" />
        </linearGradient>
      </defs>

      {/* Formas de fundo */}
      <circle cx="250" cy="300" r="225" fill="url(#vl-hero-fundo)" />
      <circle cx="420" cy="470" r="38" className={styles.successLight} opacity="0.9" />
      <circle cx="60" cy="110" r="24" fill="#bfdbfe" opacity="0.8" />

      {/* Card principal: IMC */}
      <g filter="url(#vl-hero-sombra)">
        <rect x="40" y="120" width="400" height="350" rx="24" className={styles.surface} />
      </g>
      <text x="76" y="168" fontSize="18" className={styles.muted}>
        Seu IMC
      </text>
      <text x="74" y="218" fontSize="46" fontWeight="800" className={styles.primary}>
        22,4
      </text>

      <rect x="282" y="150" width="134" height="34" rx="17" className={styles.successLight} />
      <circle cx="303" cy="167" r="5" className={styles.success} />
      <text x="315" y="173" fontSize="15" fontWeight="700" className={styles.successText}>
        Peso normal
      </text>

      {/* Medidor: faixas da escala de IMC */}
      <g transform="translate(0 -22)">
        <g fill="none" strokeWidth="22">
          <path d="M130 420 A110 110 0 0 1 151 355.3" stroke="#60a5fa" />
          <path d="M151 355.3 A110 110 0 0 1 206 315.4" style={{ stroke: "var(--color-success)" }} />
          <path d="M206 315.4 A110 110 0 0 1 274 315.4" stroke="#facc15" />
          <path d="M274 315.4 A110 110 0 0 1 329 355.3" stroke="#fb923c" />
          <path d="M329 355.3 A110 110 0 0 1 350 420" style={{ stroke: "var(--color-error)" }} />
        </g>
        <g stroke="#fff" strokeWidth="3">
          <line x1="160.8" y1="362.4" x2="141.2" y2="348.2" />
          <line x1="209.7" y1="327" x2="202.3" y2="303.8" />
          <line x1="270.3" y1="327" x2="277.7" y2="303.8" />
          <line x1="319.2" y1="362.4" x2="338.8" y2="348.2" />
        </g>
        <line
          x1="240" y1="420" x2="190" y2="351.2"
          strokeWidth="6" strokeLinecap="round"
          className={styles.pointer}
        />
        <circle cx="240" cy="420" r="13" className={styles.primary} />
        <circle cx="240" cy="420" r="5" fill="#fff" />
      </g>

      {/* Card flutuante: peso */}
      <g filter="url(#vl-hero-sombra)">
        <rect x="290" y="28" width="170" height="112" rx="18" className={styles.surface} />
      </g>
      <text x="310" y="58" fontSize="14" className={styles.muted}>
        Peso · 30 dias
      </text>
      <text x="310" y="90" fontSize="26" fontWeight="800" className={styles.successText}>
        −3,2 kg
      </text>
      <polyline
        points="310,106 330,110 350,108 370,116 390,114 410,122 440,126"
        fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        className={styles.successStroke}
      />
      <circle cx="440" cy="126" r="4" className={styles.success} />

      {/* Card flutuante: água */}
      <g filter="url(#vl-hero-sombra)">
        <rect x="16" y="448" width="218" height="100" rx="18" className={styles.surface} />
      </g>
      <circle cx="54" cy="498" r="20" fill="#dbeafe" />
      <path
        d="M54 485 C54 485 44 497 44 503 a10 10 0 0 0 20 0 C64 497 54 485 54 485 Z"
        fill="#3b82f6"
      />
      <text x="86" y="486" fontSize="14" className={styles.muted}>
        Água hoje
      </text>
      <text x="86" y="512" fontSize="20" fontWeight="800" className={styles.primary}>
        2,1 / 2,5 L
      </text>
      <rect x="86" y="524" width="128" height="8" rx="4" className={styles.track} />
      <rect x="86" y="524" width="108" height="8" rx="4" fill="#60a5fa" />

      {/* Card flutuante: meta */}
      <g filter="url(#vl-hero-sombra)">
        <rect x="262" y="500" width="190" height="68" rx="18" className={styles.surface} />
      </g>
      <circle cx="296" cy="534" r="18" className={styles.successLight} />
      <path
        d="M287 534 l6 6 l11 -12"
        fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
        className={styles.successStroke}
      />
      <text x="324" y="527" fontSize="13" className={styles.muted}>
        Meta semanal
      </text>
      <text x="324" y="550" fontSize="18" fontWeight="800" className={styles.primary}>
        4 de 5 dias
      </text>
    </svg>
  );
}