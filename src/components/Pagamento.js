import { Link } from "react-router-dom";
function conf(){
    alert("Pagamento registrado!");
}

export default function Pagamento(props) {

    return(
        <con className = "pag">
            <div>
                <text>
                    Numero: {props.nro}
                </text>
            </div>
            <div>
                <text>
                    Valor do contrato: {props.val}
                </text>
            </div>
            <div>
                <text>
                    Forma de pagamento: {props.for}
                </text>
            </div>
            <div>
                <text>
                    Valor a ser pago: <input size={10} placeholder="Digite o valor"/>
                </text>
            </div>
            <div>
                <Link to = {props.pg}>
                        <button onClick={conf}>
                            Registrar
                        </button>
                </Link>
            </div>
        </con>
    )
}