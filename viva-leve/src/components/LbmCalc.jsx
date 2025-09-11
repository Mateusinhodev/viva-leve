import Button from './Button';
import { useState } from "react";

const LbmCalc = ({calcLbm}) => {

    const [sexo, setSexo] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");

    // Limpa o formulário
    const clearForm = (e) => {
        e.preventDefault();
        setSexo("");
        setWeight("");
        setHeight("");
    }

    // Validação dos dados inseridos
    const validDigits = (text) => {
        return text.replace(/[^0-9,]/g, "")
    }

    // Capturando valores
    const handleSexoChange = (e) => {
        setSexo(e.target.value);
    }

    const handleWeightChange = (e) => {
        const updateValue = validDigits(e.target.value);
        setWeight(updateValue);
    }

    const handleHeightChange = (e) => {
        const updateValue = validDigits(e.target.value);
        setHeight(updateValue);
    }


    return (
        <div id="calc-container">
            <h2>Calculadora de Indice de Massa Magra</h2>
            <form id='lbm-form'>
                <div className="form-inputs">
                    <div className="form-control">
                        <label htmlFor="sexo">Sexo:</label>
                        <select id="sexo" name="sexo" onChange={handleSexoChange} value={sexo}>
                            <option value="">Selecione...</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                        </select>
                    </div>

                    <div className="form-control">
                        <label htmlFor="weight">Peso (kg):</label>
                        <input type="text" name="weight" id="weight" placeholder="Exemplo 70,5" onChange={(e) => handleWeightChange(e)} value={weight}/>
                    </div>

                    <div className="form-control">
                        <label htmlFor="height">Altura (cm):</label>
                        <input type="text" name="height" id="height" placeholder="Exemplo 1,75" onChange={(e) => handleHeightChange(e)} value={height}/>
                    </div>

                    <div className="action-control">
                        <Button id="clear-btn" text="Limpar" action={clearForm}/>
                        <Button id="calc-btn" text="Calcular" action={(e) => calcLbm(e, sexo, weight, height)}/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LbmCalc;