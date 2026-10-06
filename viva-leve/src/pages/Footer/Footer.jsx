import styles from "./Footer.module.css";

/* ⚠️ Troque pelos seus links antes de publicar */
const AUTOR = {
  nome: "Mateus",
  github: "https://github.com/Mateusinhodev",
  linkedin: "https://www.linkedin.com/in/mateus-rodrigues-a47002264/",
};

const NAVEGACAO = [
  { texto: "Calculadoras", href: "#calculadoras" },
  { texto: "Meu progresso", href: "#progresso" },
  { texto: "Artigos", href: "#artigos" },
];

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#" className={styles.logo}>
              Viva Leve
            </a>
            <p className={styles.tagline}>
              Ferramentas simples para cuidar do seu peso e da sua saúde.
            </p>
          </div>

          <nav aria-label="Rodapé">
            <ul className={styles.nav}>
              {NAVEGACAO.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.link}>
                    {item.texto}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Aviso de saúde: importante em qualquer site sobre o tema */}
        <p className={styles.aviso}>
          <strong>Aviso:</strong> as calculadoras e conteúdos do Viva Leve são
          informativos e não substituem consulta com médico, nutricionista ou
          outro profissional de saúde.
        </p>

        <div className={styles.bottom}>
          <p>© {ano} Viva Leve</p>
          <p>
            Desenvolvido por {AUTOR.nome} ·{" "}
            <a href={AUTOR.github} className={styles.link} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{" "}
            ·{" "}
            <a href={AUTOR.linkedin} className={styles.link} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}