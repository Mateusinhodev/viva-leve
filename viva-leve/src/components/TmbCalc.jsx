import "./TmbCalc.css"

import Button from './Button';
import { useState } from "react";

const TmbCalc = ({calcTmb}) => {

    // Estados que armazenará os dados do usuário
    const [sexo, setSexo] = useState("");
    const [idade, setIdade] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [nivelFisico, setNivelFisico] = useState("");

    // Limpa o formulário
    const clearForm = (e) => {
        e.preventDefault();
        setSexo("");
        setIdade("");
        setWeight("");
        setHeight("");
        setNivelFisico("");
    }

    // Validação dos dados inseridos
    const validDigits = (text) => {
        return text.replace(/[^0-9,]/g, "")
    }

    const handleSexoChange = (e) => {
        setSexo(e.target.value);
    }

    const handleIdadeChange = (e) => {
        const updateValue = validDigits(e.target.value);
        setIdade(updateValue);
    }

    const handleWeightChange = (e) => {
        const updateValue = validDigits(e.target.value);
        setWeight(updateValue);
    }

    const handleHeightChange = (e) => {
        const updateValue = validDigits(e.target.value);
        setHeight(updateValue);
    }

    const handleNivelFisicoChange = (e) => {
        setNivelFisico(e.target.value);
    }

return (
    <div id="calc-container">
        <h2>Calculadora de TMB</h2>
        <form id="tmb-form">
            <div className="form-inputs">
                <div className="form-inline">
                    <div className="form-control">
                        <label htmlFor="sexo">Sexo:</label>
                        <select id="sexo" name="sexo" onChange={handleSexoChange} value={sexo}>
                            <option value="">Selecione...</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="idade">Idade:</label>
                        <input type="number" name="idade" id="idade" onChange={(e) => handleIdadeChange(e)} value={idade}/>
                    </div>
                </div>

                <div className="form-control">
                    <label htmlFor="weight">Peso (kg):</label>
                    <input type="text" name="weight" id="weight" placeholder="Exemplo 70,5" onChange={(e) => handleWeightChange(e)} value={weight}/>
                </div>

                <div className="form-control">
                    <label htmlFor="height">Altura (cm):</label>
                    <input type="text" name="height" id="height" placeholder="Exemplo 1,75" onChange={(e) => handleHeightChange(e)} value={height}/>
                </div>

                <div className="form-control">
                    <label htmlFor="fitness">Nivel de Atividade Fisica:</label>
                    <select id="fitness" name="fitness" onChange={handleNivelFisicoChange} value={nivelFisico}>
                        <option value="">Selecione...</option>
                        <option value="1">Sedentário (pouco ou nenhum exercicio)</option>
                        <option value="2">Levemente ativo (exercicio leve ou atividade leve diária)</option>
                        <option value="3">Moderamente ativo (exercicio moderado ou atividade moderada diária)</option>
                        <option value="4">Muito ativo (exercicio intenso ou atividade intensa diária)</option>
                        <option value="5">Extremamente ativo (exercicio muito intenso ou trabalho fisico pesado)</option>
                    </select>
                </div>

                <div className="action-control">
                    <Button id="clear-btn" text="Limpar" action={clearForm}/>
                    <Button id="calc-btn" text="Calcular" action={(e) => calcTmb(e, sexo, idade, weight, height, nivelFisico)}/>
                </div>
            </div>
        </form>
    </div>
    )
}

export default TmbCalc;