import './ImcCalc.css'
const ImcCalc = () => {
  return (
    <div>
        <h2>Calculadora de IMC</h2>
        <form id='imc-form'>
            <div className="form-inputs">
                <div className="form-control">
                    <label htmlFor="heigth">Altura:</label>
                    <input 
                        type="text" 
                        name='heigth' 
                        id='height' 
                        placeholder='1,75'
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="weight">Peso:</label>
                    <input 
                        type="text" 
                        name='weight' 
                        id='weight' 
                        placeholder='70,5'
                    />
                </div>
                <div className="action-control">
                    <button>Calcular</button>
                    <button>Limpar</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default ImcCalc