import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        {/* O h1 da página é o título da Home; o logo vira um link para o topo */}
        <a href="/" className={styles.logo}>
          {/* Mesmo arquivo do favicon (pasta public). alt vazio: o nome ao lado já identifica o link */}
          <img src="/image.png" alt="" className={styles.logoIcon} width="48" height="48" />
          Viva Leve
        </a>

        <a href="#calculadoras" className={styles.cta}>
          Comece sua jornada
        </a>
      </div>
    </header>
  );
}