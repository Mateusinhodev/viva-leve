import imgMain from "../../assets/foto-doutora.jpg"
import diarioPDF from "../../assets/Diario_Viva_Leve.pdf"

import "./main.css"

export default function Main() {
    return (
        <section className="main-container">
            <div className="container-left">
                <div className="calculadoras">
                    <h2 className="calculadoras-title">Calculadoras de Saúde</h2>
                    <button className="calculadoras-btn">IMC</button>
                    <button className="calculadoras-btn">TMB</button>
                    <button className="calculadoras-btn">Gasto Calórico Diário</button>
                    <button className="calculadoras-btn">Água Recomendada</button>
                </div>
                <div class="jornada-content">
                    <h2>Minha Jornada</h2>
                    <p>Alguns lembretes simples para te ajudar a cuidar de você com leveza:</p>

                    <ul>
                        <li>Estabeleça metas reais e possíveis.</li>
                        <li>Pese-se no máximo 1 vez por semana.</li>
                        <li>Observe como você se sente (não só o peso).</li>
                        <li>Anote seus hábitos e pequenas vitórias.</li>
                        <li>Cuide da água, do sono e da respiração.</li>
                    </ul>

                    <p>Quer acompanhar seu progresso?</p>
                    <a href={diarioPDF} class="btn-download" download>Baixar Diário em PDF</a>
                </div>
            </div>
            
            <div className="container-rigth">
                <div className="profissionais">
                    <div className="profissionais-card">
                        <div className="card-title">
                            <h2>Encontre ajuda profissional</h2>
                        </div>
                        <div className="card-img">
                            <img src={imgMain} alt="Imagem de doutora"/>
                        </div>
                        <div className="action">
                            <a href="https://www.doctoralia.com.br/pesquisa?q=Tratamento%20de%20obesidade&loc=&filters%5Bservices%5D%5B%5D=3731https://www.doctoralia.com.br/pesquisa?q=Tratamento+de+obesidade&loc=&filters%5Bservices%5D%5B%5D=3731&utm_source=meupesominhajornada_website&utm_medium=banner&utm_campaign=awareness_bookings">Buscar profissionais de Sáude</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    )
}