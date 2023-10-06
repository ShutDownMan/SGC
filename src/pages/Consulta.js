import { Link } from "react-router-dom";
export default function Consulta() {
    return(

        <cad className = "cadastro">

            <linha1 className = "linha1">
                <div>
                    <text>
                        Numero: Numero do contrato
                    </text>
                </div>

                <div>
                    <text>
                        Objetivo: Objetivo do contrato
                    </text>
                </div>

                <div>
                    <text>
                        Tipo: Tipo de contratação
                    </text>
                </div>

            </linha1>

            <linha2 className = "linha">

                <div>
                    <text>
                        Empresa: Nome da Empresa contratada
                    </text>
                </div>

                <div>
                    <text>
                        Gestor: Nome do Gestor do contrato
                    </text>
                </div>

                <div>
                    <text>
                        Representante: Nome do Representante Legal
                    </text>
                </div>
            </linha2>

            <linha3 className = "linha">
                <div>
                    <text>
                        Periodo de Vigência.    Dê: 01/01/2023 até 01/01/2024
                    </text>
                </div>
            </linha3>

            <linha4 className = "linha">
                <div>
                    <text>
                        Local: Local de execução do contrato
                    </text>
                </div>

                <div>
                    <text>
                        Valor do Contrato: R$ 00,00
                    </text>
                </div>

                <div>
                    <text>
                        Pagamento: Forma de Pagamento
                    </text>
                </div>
            </linha4>

            <linha5 className = "linha5">
                <div>
                    <text>
                        Descrição: Descrição do contrato
                    </text>
                </div>
            </linha5>

            <linha6 className="linha6">
                <div>
                    <text>
                        Valor Pago: R$ 00,00
                    </text>
                </div>
                <div>
                    <text>
                        Status de execução: Percentual de execução numa escala de 0% a 100%
                    </text>
                </div>
                <div>
                    <Link to="/">
                        <button>
                            Voltar
                        </button>
                    </Link>
                </div>
            </linha6>
        </cad>
    )
}