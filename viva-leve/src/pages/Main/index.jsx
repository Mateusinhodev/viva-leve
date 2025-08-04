import imgMain from "../../assets/foto-doutora.jpg"

import "./main.css"

export default function Main() {
    return (
        <section className="main-container">
            <div className="calculadoras">
                <h2 className="calculadoras-title">Calculadoras de Saúde</h2>
                <button className="calculadoras-btn">IMC</button>
                <button className="calculadoras-btn">TMB</button>
                <button className="calculadoras-btn">Gasto Calórico Diário</button>
                <button className="calculadoras-btn">Água Recomendada</button>
            </div>
            <div className="profissionais">
                <div className="profissionais-card">
                    <div className="card-title">
                        <h2>Encontre ajuda profissional</h2>
                    </div>
                    <div className="card-img">
                        <img src={imgMain} alt="Imagem de doutora"/>
                    </div>
                    <div className="action">
                        <a href="profissionais">Buscar profissionais de Sáude</a>
                    </div>
                </div>
                
            </div>
        </section>
        
    )
}