import React from "react";
import { useState } from "react";
import {
  Button,
  Dialog,
  Tooltip,
  Typography
} from "@material-tailwind/react";

import imgMain from "../../assets/foto-doutora.jpg"
import diarioPDF from "../../assets/Diario_Viva_Leve.pdf"
import ImcCalc from "../../components/ImcCalc";
import ImcTable from "../../components/ImcTable";
import { data } from "../../data/data.js"

import "./main.css"
import TmbCalc from "../../components/TmbCalc.jsx";

export default function Main() {

    // const [size, setSize] = React.useState(null);
    // const handleOpen = (value) => setSize(value);

    const [step, setStep] = useState("calc"); // 'calc' ou 'result'


    const [imc, setImc] = useState("");
    const [info, setInfo] = useState("");
    const [infoClass, setInfoClass] = useState("");
    
    const calcImc = (e, heigth, weigth) => {
        e.preventDefault();
            
        if(!weigth || !heigth) return;

        const weigthFloat = +weigth.replace(",", ".");
        const heigthFloat = +heigth.replace(",", ".")

        const imcResult = (weigthFloat / (heigthFloat * heigthFloat)).toFixed(1);

        setImc(imcResult);
        setStep("result");

        data.forEach((item) => {
            if(imcResult >= item.min && imcResult <= item.max) {
            setInfo(item.info);
            setInfoClass(item.infoClass);
            }
        });

        if(!info) return;
    }
    
    const resetCalc = (e) => {
        e.preventDefault();

        setImc("");
        setInfo("");
        setInfoClass("");
        setStep("calc");
    }

    const [openDialog, setOpenDialog] = useState(null); 
    // valores: "imc", "tmb", null

    const handleOpen = (type) => {
        setOpenDialog(type);
    };

    const handleClose = () => {
        setOpenDialog(null);
    };

    return (
        <section className="main-container">
            <div className="container-left">
                <div className="calculadoras" id="calculadoras">
                    <h2 className="calculadoras-title">Calculadoras de Saúde</h2>

                    {/* Calculadora IMC */}
                    <Tooltip
                        className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                        content={
                            <div className="w-80">
                            <Typography color="black" className="font-medium">
                                Índice de Massa Corporal (IMC)
                            </Typography>
                            <Typography
                                variant="small"
                                color="black"
                                className="font-normal opacity-80"
                            >
                                O índice de massa corporal é uma medida internacional usada para calcular se uma pessoa está no peso ideal.
                            </Typography>
                            </div>
                        }
                    >
                        <Button onClick={() => handleOpen("imc")} className="calculadoras-btn">
                            IMC
                        </Button>   
                    </Tooltip>

                    <Dialog open={openDialog === "imc"} size={"md"} handler={handleClose}
                    >
                        {step === "calc" ? (
                            <ImcCalc calcImc={calcImc} />
                        ) : (
                            <ImcTable
                            data={data}
                            imc={imc}
                            info={info}
                            infoClass={infoClass}
                            resetCalc={resetCalc}
                            />
                        )}
                    </Dialog>

                    {/* Calculadora TMB */}
                    <Tooltip
                        className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                        content={
                            <div className="w-80">
                            <Typography color="black" className="font-medium">
                                Taxa Metabólica Basal (TMB)
                            </Typography>
                            <Typography
                                variant="small"
                                color="black"
                                className="font-normal opacity-80"
                            >
                                A taxa metabólica basal é um cálculo usado para estimar a quantidade de energia que o corpo gasta para manter as funções vitais
                            </Typography>
                            </div>
                        }
                    >
                        <Button onClick={() => handleOpen("tmb")} className="calculadoras-btn">
                            TBM
                        </Button>   
                    </Tooltip>

                    <Dialog open={openDialog === "tmb"} size={"md"} handler={handleClose}
                    >
                        <TmbCalc/>
                    </Dialog>
                    

                    <button className="calculadoras-btn">Gasto Calórico Diário</button>
                    <button className="calculadoras-btn">Água Recomendada</button>
                </div>
                <div className="jornada-content">
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
                    <a href={diarioPDF} className="btn-download" download>Baixar Diário em PDF</a>
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