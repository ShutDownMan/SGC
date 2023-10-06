import { Link } from "react-router-dom";
import {useState} from 'react';
import Pagamento from "../components/Pagamento";
export default function Financeiro() {

    const [isShown, setIsShown] = useState(false);

    const handleClick = event => {
      // 👇️ toggle shown state
      setIsShown(current => !current);
  
      // 👇️ or simply set it to true
      // setIsShown(true);
    };

    return (
        
        <fin className = "fin">

            <div>
                <input size={75} placeholder="Escreva o numero do contrato"/>
            </div>

            <div>
                <button onClick={handleClick}>Confirmar</button>

                {/* 👇️ show components on click */}
                {isShown && <Box />}
            </div>

            <div>
                <Link to = "/historico">
                    <button>
                        Historico
                    </button>
                </Link>
            </div>
        </fin>
        )
}

function Box() {
    return (
      <div>
        <Pagamento nro = "1234" val = "1000,00" for = "Cheque" pg = "/financeiro"/>
      </div>
    );
  }