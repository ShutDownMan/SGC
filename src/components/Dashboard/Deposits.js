import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../../components/Title';
import moment from 'moment';
import 'moment/locale/pt-br';
import { faker } from '@faker-js/faker';

function preventDefault(event) {
    event.preventDefault();
}

moment.locale("pt-br");

export default function Deposits() {
    return (
        <React.Fragment>
            <Title>Depósitos Recentes</Title>
            <Typography component="p" variant="h4">
                {/* $3,024.00 */}
                R$ {faker.finance.amount({ min: 50, max: 1000, precision: 2 })}
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                {/* on 15 March, 2019 */}
                em {moment().format('DD MMMM, YYYY')}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    Ver Saldo
                </Link>
            </div>
        </React.Fragment>
    );
}