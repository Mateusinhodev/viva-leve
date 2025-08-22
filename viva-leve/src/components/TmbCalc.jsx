import "./TmbCalc.css"

import Button from './Button';

const TmbCalc = () => {

return (
    <div id="calc-container">
        <h2>Calculadora de TMB</h2>
        <form id="tmb-form">
            <div className="form-inputs">
                <div className="form-inline">
                    <div className="form-control">
                    <label htmlFor="sexo">Sexo:</label>
                    <select id="sexo" name="sexo">
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                    </select>
                    </div>

                    <div className="form-control">
                    <label htmlFor="idade">Idade:</label>
                    <input type="number" name="idade" id="idade" />
                    </div>
                </div>

                <div className="form-control">
                    <label htmlFor="weight">Peso:</label>
                    <input type="text" name="weight" id="weight" placeholder="Exemplo 70,5"/>
                </div>

                <div className="form-control">
                    <label htmlFor="height">Altura:</label>
                    <input type="text" name="height" id="height" placeholder="Exemplo 1,75"/>
                </div>
                <div className="action-control">
                    <Button id="clear-btn" text="Limpar"/>
                    <Button id="calc-btn" text="Calcular"/>
                </div>
            </div>
        </form>
    </div>
    )
}

export default TmbCalc;