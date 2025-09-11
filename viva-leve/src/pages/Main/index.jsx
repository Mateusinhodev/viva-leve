import { use, useState } from "react";

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
import TmbCalc from "../../components/TmbCalc.jsx";
import TmbTable from "../../components/TmbTable.jsx";
import AguaCalc from "../../components/AguaCalc.jsx";
import AguaTable from "../../components/AguaTable.jsx";
import LbmCalc from "../../components/LbmCalc.jsx";
import LbmTable from "../../components/LbmTable.jsx";

import { data } from "../../data/data.js"

import "./main.css"


export default function Main() {

    // Calculadora IMC
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
        setTmb("");
        setGct("");
        setCaloriasPerda("");
        setCaloriasGanha("");
        setAguaMaxima("");
        setAguaMinima("");
        setStep("calc");
    }

    // Calculadora de Taxa Metábolica Basal

    const [tmb, setTmb] = useState("");
    const [gct, setGct] = useState("");
    const [caloriasPerda, setCaloriasPerda] = useState("");
    const [caloriasGanha, setCaloriasGanha] = useState("");

    const calcTmb = (e, sexo, idade, weight, height, nivelFisico) => {
        e.preventDefault();

        // Validações dos dados inseridos
        if(!idade || !weight || !height ) {
            alert("É necessário que todos os dados sejam inseridos!");
            return;
        }

        const weightFloat = +weight.replace(",",".");
        const heightFloat = +height.replace(",",".");


        // Cálculo da Taxa Metábólica Basal
        let tmbResult = 0;

        if(sexo === "masculino") {
            tmbResult = (10 * weightFloat) + (6.25 * heightFloat) - (5 * idade) + 5;
        } else if(sexo === "feminino") {
            tmbResult = (10 * weightFloat) + (6.25 * heightFloat) - (5 * idade) - 161;
        } else {
            alert("É necessário que um sexo!");
            return;
        }

        setTmb(tmbResult.toFixed(2)); // Resultado da Taxa Metabólica Basal

        // GTC - Gasto Calórico Total (O quanto o corpo gasta por dia considerando a atividade fisica)
        let gctResult = 0;

        switch(nivelFisico) {
            case "1":
                gctResult = tmbResult * 1.2;
                break;
            case "2": 
                gctResult = tmbResult * 1.375;
                break;
            case "3": 
                gctResult = tmbResult * 1.55;
                break;
            case "4": 
                gctResult = tmbResult * 1.725;
                break;
            case "5": 
                gctResult = tmbResult * 1.9;
                break;
            default:
                alert("Dados inválidos");
                return;
        }

        setGct(gctResult.toFixed(2)); // Resultado do GTC

        // Deficit Calórico (Para perder peso)

        let deficitCalorico = (20/100) * gctResult;
        setCaloriasPerda((gctResult - deficitCalorico).toFixed(2));

        // Superavit Calórico
        let superavitCalorico = (20/100) * gctResult;
        setCaloriasGanha((gctResult + superavitCalorico).toFixed(2));
        
        setStep("result")
    }

    // Calculadora Água Recomendada

    const [aguaMinima, setAguaMinima] = useState("");
    const [aguaMaxima, setAguaMaxima] = useState("");

    const calcAgua = (e, weight) => {
        e.preventDefault();
        if(!weight) return;

        const weightFloat = +weight.replace(",", ".");
        const aguaMin = (weightFloat * 35) / 1000; // em litros
        const aguaMax = (weightFloat * 40) / 1000;

        setAguaMinima(aguaMin.toFixed(2))
        setAguaMaxima(aguaMax.toFixed(2));

        setStep("result")
    };

    // Calculadora de Indice de Massa de Magra

    const [weight, setWeight] = useState("");
    const [massaMagra, setMassaMagra] = useState("");
    const [massaGorda, setMassaGorda] = useState("");
    const [percentoGordura, setPercentoGordura] = useState("");

    const calcLbm = (e, sexo, weight, height) => {
        e.preventDefault();

        if(!weight || !height) return;

        setWeight(weight);

        const weightFloat = +weight.replace(",",".");
        const heightFloat = +height.replace(",",".");

        // Massa Magra
        let lbm;

        if(sexo === "masculino") {
            lbm = (0.407 * weightFloat) + (0.267 * heightFloat) - 19.2;
        } else {
            lbm = (0.252 * weightFloat) + (0.473 * heightFloat) - 48.3;
        } 

        setMassaMagra(lbm.toFixed(2));

        // Massa Gorda

        let massaGorda = weightFloat - lbm;
        setMassaGorda(massaGorda.toFixed(2));

        // Percentual de Gordura

        let percentoGordura = (massaGorda / weightFloat) * 100;
        setPercentoGordura(percentoGordura.toFixed(2));

        setStep("result");
    }
    

    // MODAL
    const [step, setStep] = useState("calc"); // 'calc' ou 'result'

    const [openDialog, setOpenDialog] = useState(null); // valores: "imc", "tmb", null

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
                            TMB
                        </Button>   
                    </Tooltip>

                    <Dialog open={openDialog === "tmb"} size={"md"} handler={handleClose}
                    >
                        {step === "calc" ? (
                            <TmbCalc calcTmb={calcTmb} />
                        ) : (
                            <TmbTable
                            tmb={tmb}
                            gct={gct}
                            caloriasPerda={caloriasPerda}
                            caloriasGanha={caloriasGanha}
                            resetCalc={resetCalc}
                            />
                        )}
                        {/* <TmbCalc calcTmb={calcTmb}/> */}
                    </Dialog>
                    
                    {/* Calculadora de Agua Recomendada */}
                    <Tooltip
                        className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                        content={
                            <div className="w-80">
                            <Typography color="black" className="font-medium">
                                Água Recomendada
                            </Typography>
                            <Typography
                                variant="small"
                                color="black"
                                className="font-normal opacity-80"
                            >
                                A calculadora de ingestão diária de água é uma maneira simples e rápida de determinar quantos litros de água uma pessoa pode consumir por dia com base em seu peso corporal.
                            </Typography>
                            </div>
                        }
                    >
                        <Button onClick={() => handleOpen("agua")} className="calculadoras-btn">
                            Água Recomendada
                        </Button>   
                    </Tooltip>
                    
                    <Dialog open={openDialog === "agua"} size={"md"} handler={handleClose}
                    >
                        {step === "calc" ? (
                            <AguaCalc calcAgua={calcAgua}/>
                        ) : (
                            <AguaTable
                            aguaMaxima={aguaMaxima}
                            aguaMinima={aguaMinima}
                            resetCalc={resetCalc}
                            />
                        )}
                        {/* <AguaCalc calcAgua={calcAgua}/> */}
                    </Dialog>

                    {/* Calculadora de Índice de Massa Magra */}
                    <Tooltip
                        className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                        content={
                            <div className="w-80">
                            <Typography color="black" className="font-medium">
                                índice de Massa Magra
                            </Typography>
                            <Typography
                                variant="small"
                                color="black"
                                className="font-normal opacity-80"
                            >
                                O índice de massa magra (ou massa livre de gordura) representa a quantidade total de componentes do corpo que não são gordura, como músculos, ossos, órgãos e água.
                            </Typography>
                            </div>
                        }
                    >
                        <Button onClick={() => handleOpen("lbm")} className="calculadoras-btn">
                            índice de Massa Magra
                        </Button>   
                    </Tooltip>

                    <Dialog open={openDialog === "lbm"} size={"md"} handler={handleClose}
                    >
                        {step === "calc" ? (
                            <LbmCalc calcLbm={calcLbm}/>
                        ) : (
                            <LbmTable
                            weight={weight}
                            massaMagra={massaMagra}
                            massaGorda={massaGorda}
                            percentoGordura={percentoGordura}
                            resetCalc={resetCalc}
                            />
                        )}
                    </Dialog>

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