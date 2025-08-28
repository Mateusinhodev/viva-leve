import Button from './Button';
import { useState } from "react";

const AguaCalc = ({calcAgua}) => {

    // Estados que armazenará os dados do usuário
    const [weight, setWeight] = useState("");

    const clearForm = (e) => {
        e.preventDefault();

        setWeight("");
    }

    const validDigits = (text) => {
        return text.replace(/[^0-9,]/g, "")
    }

    const handleWeightChange = (e) => {
        const updateValue = validDigits(e.target.value);
        setWeight(updateValue);
    }

    return (
        <div id="calc-container">
            <h2>Calculadora de Água Recomendada</h2>
            <form id="tmb-form">
                <div className="form-inputs">
                    <div className="form-control">
                        <label htmlFor="weight">Peso (kg):</label>
                        <input type="text" name="weight" id="weight" placeholder="Exemplo 70,5" onChange={(e) => handleWeightChange(e)} value={weight}/>
                    </div>

                    <div className="action-control">
                        <Button id="clear-btn" text="Limpar" action={clearForm}/>
                        <Button id="calc-btn" text="Calcular" action={(e) => calcAgua(e, weight)}/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AguaCalc;