import "./home.css"

import imgHome from "../../assets/home-img2.png"

export default function Home() {
    return(
      <div className="home">
        <div className="home-text">
            <h1 className="home-text-titulo">Controle do seu peso e da sua saúde</h1>
            <p className="home-text-subtitulo">Ferramentas simples, conteúdo confiável e apoio profissional.</p>
            <a href="#calculadoras" className="home-link">Calculadoras de saúde</a>
        </div>
        <div className="home-img">
            <img src={imgHome} alt="Foto de mulher se pesando na balança" />
        </div>
      </div>  
    )
}