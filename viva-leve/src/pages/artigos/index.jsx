import capaArtigo from "../../assets/capa-artigo.jpg"

import "./artigo.css"

export default function Artigo() {
    return(
        <section className="artigo-container">
            <h2 className="artigos-title">Receitas de Conteúdos</h2>
            <p className="artigos-txt">Aqui você encontra receitas balanceadas, dicas nutricionais e artigos sobre bem-estar para apoiar a sua jornada de vida saudável. Nosso objetivo é trazer informações confiáveis e fáceis de aplicar no seu dia a dia.</p>
            <div className="artigos-receitas">
                <h3 className="artigos-subtitle">Receitas Saudáveis</h3>
                {/* <div className="owl-carousel owl-theme">
                    <div className="carousel-item">
                        <a href="start"></a>
                        <div className="carousel-item-image">
                            <img src={capaArtigo} alt="Capa de Artigo" />
                        </div>
                        <div className="carousel-item-text">
                            <span className="item-kicker">Receita da vóvó</span>
                            <h3 className="item-title">Ana Maria Braga</h3>
                        </div>
                    </div>
                </div> */}
            </div>

            <div className="artigos-bem estar">
                <h3 className="artigos-subtitle">Saúde e Bem-Estar</h3>
            </div>
        </section>
    )
}