import { Link } from "react-router-dom";
export default function ListaContrato(props) {

    return(
        <con className = "con">
            <div>
                <text>
                    Numero: {props.nro}
                </text>
            </div>
            <div>
                <text>
                    Objetivo: {props.obj}
                </text>
            </div>
            <div>
                <text>
                    Empresa: {props.emp}
                </text>
            </div>
            <div>
                <text>
                    Gestor: {props.ges}
                </text>
            </div>
            <div>
                <text>
                    Vigência: {props.dti} até {props.dtf}
                </text>
            </div>
            <div>
                <text>
                    Tipo: {props.tip}
                </text>
            </div>
            <div>
                <text>
                    Status de execução: {props.exe}
                </text>
            </div>
            <div>
                <Link to = {props.pg}>
                    <button>
                        Ver
                    </button>
                </Link>
            </div>
        </con>
    )
}