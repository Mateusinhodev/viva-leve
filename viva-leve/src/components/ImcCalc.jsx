import { useState } from 'react';

import Button from './Button';

import './ImcCalc.css';

const ImcCalc = ({ calcImc }) => {

    const [height, setHeigth] = useState("");
    const [weigth, setWeigth] = useState("");

    const clearForm = (e) => {
        e.preventDefault();
        setHeigth(""); // Limpandos os dados de Altura
        setWeigth(""); // Limpandos os dados de Peso
    }

    const validDigits = (text) => {
        return text.replace(/[^0-9,]/g, "")
    }

    const handleHeigthChange = (e) => {
        const updateValue = validDigits(e.target.value)
        setHeigth(updateValue);
    }

    const handleWeigthChange = (e) => {
        const updateValue = validDigits(e.target.value)
        setWeigth(updateValue);
    }

    return (
        <div id='calc-container'>
            <h2>Calculadora de IMC</h2>
            <form id='imc-form'>
                <div className="form-inputs">
                    <div className="form-control">
                        <label htmlFor="heigth">Altura:</label>
                        <input 
                            type="text" 
                            name='heigth' 
                            id='height' 
                            placeholder='Exemplo 1,75'
                            onChange={(e) => handleHeigthChange(e)}
                            value={height}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="weight">Peso:</label>
                        <input 
                            type="text" 
                            name='weight' 
                            id='weight' 
                            placeholder='Exemplo 70,5'
                            onChange={(e) => handleWeigthChange(e)}
                            value={weigth}
                        />
                    </div>
                    <div className="action-control">
                        <Button id="clear-btn" text="Limpar" action={clearForm}/>
                        <Button id="calc-btn" text="Calcular" action={(e) => calcImc(e, height, weigth)}/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ImcCalc