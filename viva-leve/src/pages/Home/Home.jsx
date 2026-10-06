import styles from "./Home.module.css";
import HeroIllustration from "../../components/HeroIllustration.jsx";

export default function Home() {
  return (
    <section className={`container ${styles.hero}`} aria-labelledby="home-titulo">
      <div className={styles.content}>
        <h1 id="home-titulo" className={styles.title}>
          Controle do seu peso e da sua saúde
        </h1>

        <p className={styles.subtitle}>
          Ferramentas simples, conteúdo confiável e apoio profissional.
        </p>

        <a href="#calculadoras" className={styles.cta}>
          Calculadoras de saúde
        </a>
      </div>

      <div className={styles.media}>
        <HeroIllustration />
      </div>
    </section>
  );
}