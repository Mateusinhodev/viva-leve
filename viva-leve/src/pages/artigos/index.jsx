import capaArtigo from "../../assets/capa-artigo.jpg"

import "./artigo.css"

export default function Artigo() {
    return(
        <section className="artigo-container">
            <h2 className="artigos-title">Receitas de Conteúdos</h2>
            <p className="artigos-txt">Aqui você encontra receitas balanceadas, dicas nutricionais e artigos sobre bem-estar para apoiar a sua jornada de vida saudável. Nosso objetivo é trazer informações confiáveis e fáceis de aplicar no seu dia a dia.</p>
            <div className="artigos-receitas">
                <h3 className="artigos-subtitle">Receitas Saudáveis</h3>
                <div className="cards-container">
                    <div className="card-container">
                        <div className="card-content">
                            <article className="card-article">
                                <div className="card-image">
                                    <img src={capaArtigo} alt="" />
                                    <div className="card-shadow"></div>
                                </div>

                                <div className="card-data">
                                    <h3 className="card-name"> Pré Treino</h3>
                                    <p className="card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus optio dolor ea quia sapiente recusandae, ratione iusto repellat aperiam officia perspiciatis omnis et, quam maiores accusamus voluptates, unde id voluptatibus?</p>
                                    <a className="card-button" href="start">Ler Artigo</a>
                                </div>
                            </article>
                        </div>
                    </div>

                    <div className="card-container">
                        <div className="card-content">
                            <article className="card-article">
                                <div className="card-image">
                                    <img src={capaArtigo} alt="" />
                                    <div className="card-shadow"></div>
                                </div>

                                <div className="card-data">
                                    <h3 className="card-name"> Pré Treino</h3>
                                    <p className="card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus optio dolor ea quia sapiente recusandae, ratione iusto repellat aperiam officia perspiciatis omnis et, quam maiores accusamus voluptates, unde id voluptatibus?</p>
                                    <a className="card-button" href="start">Ler Artigo</a>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
                
            </div>

            <div className="artigos-bem estar">
                <h3  className="artigos-subtitle">Saúde e Bem-Estar</h3>
                <div className="cards-container">
                    <div className="card-container">
                        <div className="card-content">
                            <article className="card-article">
                                <div className="card-image">
                                    <img src={capaArtigo} alt="" />
                                    <div className="card-shadow"></div>
                                </div>

                                <div className="card-data">
                                    <h3 className="card-name"> Pré Treino</h3>
                                    <p className="card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus optio dolor ea quia sapiente recusandae, ratione iusto repellat aperiam officia perspiciatis omnis et, quam maiores accusamus voluptates, unde id voluptatibus?</p>
                                    <a className="card-button" href="start">Ler Artigo</a>
                                </div>
                            </article>
                        </div>
                    </div>

                    <div className="card-container">
                        <div className="card-content">
                            <article className="card-article">
                                <div className="card-image">
                                    <img src={capaArtigo} alt="" />
                                    <div className="card-shadow"></div>
                                </div>

                                <div className="card-data">
                                    <h3 className="card-name"> Pré Treino</h3>
                                    <p className="card-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus optio dolor ea quia sapiente recusandae, ratione iusto repellat aperiam officia perspiciatis omnis et, quam maiores accusamus voluptates, unde id voluptatibus?</p>
                                    <a className="card-button" href="start">Ler Artigo</a>
                                </div>
                            </article>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}