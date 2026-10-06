import styles from "./Artigos.module.css";

/* Para adicionar um artigo, basta incluir um item aqui */
const ARTIGOS = [
  {
    titulo: "A alimentação é essencial para melhorar a qualidade de vida. Difícil é mudar!",
    categoria: "Alimentação",
    fonte: "Daily Food Brasil",
    imagem: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*XiIyNNIe3XRKuLuwYzbN0g.jpeg",
    url: "https://medium.com/@dailyfoodbrasil/a-alimenta%C3%A7%C3%A3o-%C3%A9-essencial-para-melhorar-a-qualidade-de-vida-dif%C3%ADcil-%C3%A9-mudar-804004caa9f",
  },
  {
    titulo: "Receitas Detox Deliciosas para Transformar Sua Jornada de Emagrecimento",
    categoria: "Receitas",
    fonte: "Alimentação Consciente",
    imagem: "https://miro.medium.com/v2/resize:fit:1100/format:webp/0*OYY60ARrS2X_iclz",
    url: "https://medium.com/@alimentacaoconscientesempre/receitas-detox-deliciosas-para-transformar-sua-jornada-de-emagrecimento-26adfd2f3cb6",
  },
  {
    titulo: "Como Emagrecer com Saúde em 6 Semanas: Eu Perdi 10 Quilos com Este Método!",
    categoria: "Emagrecimento",
    fonte: "Sua Saúde Total",
    imagem: "https://miro.medium.com/v2/resize:fit:786/format:webp/0*8HWGxMMDfri6ATje.jpg",
    url: "https://medium.com/@suasaudetotal/como-emagrecer-com-sa%C3%BAde-em-6-semanas-eu-perdi-10-quilos-com-este-m%C3%A9todo-aaf214c186e",
  },
];

export default function Artigos() {
  return (
    <section
      id="artigos"
      className={`container ${styles.artigos}`}
      aria-labelledby="artigos-titulo"
    >
      <header className={styles.header}>
        <h2 id="artigos-titulo" className={styles.title}>
          Artigos relacionados
        </h2>
        <p className={styles.subtitle}>
          Receitas, dicas de nutrição e bem-estar para apoiar a sua jornada,
          com informações fáceis de aplicar no dia a dia.
        </p>
      </header>

      <ul className={styles.grid}>
        {ARTIGOS.map((artigo) => (
          <li key={artigo.url}>
            {/* O card inteiro é um link só: qualquer ponto dele abre o artigo */}
            <a
              href={artigo.url}
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* alt vazio: a imagem é decorativa, o título do card já descreve o link */}
              <img
                src={artigo.imagem}
                alt=""
                className={styles.image}
                loading="lazy"
              />

              <div className={styles.body}>
                <span className={styles.tag}>{artigo.categoria}</span>
                <h3 className={styles.cardTitle}>{artigo.titulo}</h3>
                <p className={styles.source}>{artigo.fonte} · Medium</p>
                <span className={styles.cta}>
                  Ler artigo <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (abre em nova aba)</span>
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}