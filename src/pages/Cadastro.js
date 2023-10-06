import { useState } from 'react';
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import 'react-datepicker/dist/react-datepicker.css';

function conf(){
    alert("Cadastro realizado!");
}

function canc(){
    alert("Cadastro cancelado!");
}

export default function Cadastro() {

    const optipo = [
        {label: 'Serviços de TI', value: 1},
        {label: 'Obras', value: 2},
        {label: 'Mão Obra', value: 3},
        {label: 'Instalação de produtos', value: 4},
    ]

    const opaga = [
        {label: 'Dinheiro', value: 1},
        {label: 'Cartão', value: 2},
        {label: 'Cheque', value: 3},
    ]

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return(

        <cad className = "cadastro">

            <linha1 className = "linha1">
                
                <div>
                    <text>
                        Numero: 1234
                    </text>
                </div>

                <div>
                    <text>
                        Objetivo:
                    </text>
                </div>

                <input size={30} placeholder="Objetivo do contrato"/>

                <div>
                    <text>
                        Tipo:
                    </text>
                </div>
                <div>
                <Dropdown
                        placeholder = "Tipo de contratação"
                        fluid
                        multiple
                        search
                        selection
                        options = {optipo}
                    />
                </div>
            </linha1>

            <linha2 className = "linha">

                <div>
                    <text>
                        Empresa:
                    </text>
                    <input size={30} placeholder="Nome da Empresa contratada"/>
                </div>

                <div>
                    <text>
                        Gestor:
                    </text>
                    <input size={30} placeholder="Nome do Gestor do contrato"/>
                </div>
                <div>
                    <text>
                        Representante:
                    </text>
                    <input size={30} placeholder="Nome do Representante Legal"/>
                </div>
            </linha2>

            <linha3 className = "linha">
                <div>
                    <text>
                        Periodo de Vigência.
                        Dê: <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                        até <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    </text>
                </div>
                
            </linha3>

            <linha4 className = "linha">
                <div>
                    <text>
                        Local:
                    </text>
                </div>
                
                <div>
                    <input size={30} placeholder="Local de execução do contrato"/>
                </div>

                <div>
                    <text>
                        Valor:
                    </text>
                </div>
                
                <div>
                    <input size={30} placeholder="Valor do contrato: R$ 00,00"/>
                </div>

                <div>
                    <text>
                        Pagamento:
                    </text>
                </div>
                <div>
                <Dropdown
                        placeholder = "Forma de Pagamento"
                        fluid
                        multiple
                        search
                        selection
                        options = {opaga}
                    />
                </div>
            </linha4>

            <linha5 className = "linha">
                <div>
                    <text>
                        Descrição:
                    </text>
                </div>
                <div>
                    <input size={120} placeholder="Descrição do contrato"/>
                </div>
            </linha5>

            <linha6 className = "linha6">
                <div>
                    <Link to = "/">
                        <button onClick={conf}>
                            Confirmar
                        </button>
                    </Link>
                </div>

                <div>
                    <Link to="/">
                        <button onClick={canc}>
                            Cancelar
                        </button>
                    </Link>
                </div>
            </linha6>

        </cad>
    )
}