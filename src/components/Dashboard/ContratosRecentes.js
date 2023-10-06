import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../Title';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

// Generate Order Data
function createData(id, dataInicio, dataFim, nro, objeto, empresa, gestor, tipo, status) {
    return { id, dataInicio, dataFim, nro, objeto, empresa, gestor, tipo, status };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        '16 Mar, 2020',
        '0001',
        'Contrato de Prestação de Serviços para Manutenção de Equipamentos de Informática',
        'Empresa 1',
        'Gestor 1',
        'Serviço de TI',
        'Ativo',
    ),
    createData(
        1,
        '17 Mar, 2019',
        '17 Mar, 2020',
        '0002',
        'Contrato de Aquisição de Equipamentos de Informática para o Escritório Central',
        'Empresa 2',
        'Gestor 2',
        'Aquisição',
        'Ativo',
    ),
    createData(2,
        '18 Mar, 2019',
        '18 Mar, 2020',
        '0003',
        'Contrato de Locação de Imóvel para o Setor Administrativo',
        'Empresa 3',
        'Gestor 3',
        'Locação',
        'Ativo'
    ),
    createData(
        3,
        '19 Mar, 2019',
        '19 Mar, 2020',
        '0004',
        'Contrato de Transporte dos Funcionários',
        'Empresa 4',
        'Gestor 4',
        'Transporte',
        'Ativo',
    ),
    createData(
        4,
        '20 Mar, 2019',
        '20 Mar, 2020',
        '0005',
        'Contrato de Desenvolvimento de Software para o Setor de Recursos Humanos',
        'Empresa 5',
        'Gestor 5',
        'Serviço de TI',
        'Ativo',
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

export default function ContratosRecentes() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
    };

    const handleHide = (event) => {
        handleClose(event);
    };

    return (
        <React.Fragment>
            <Title>Contratos Recentes</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Nro</TableCell>
                        <TableCell>Data Início</TableCell>
                        <TableCell>Data Fim</TableCell>
                        <TableCell>Objeto</TableCell>
                        {/* <TableCell>Empresa</TableCell>
                        <TableCell>Gestor</TableCell>
                        <TableCell>Tipo</TableCell> */}
                        <TableCell>Status</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.nro}</TableCell>
                            <TableCell>{row.dataInicio}</TableCell>
                            <TableCell>{row.dataFim}</TableCell>
                            <TableCell>{row.objeto}</TableCell>
                            {/* <TableCell>{row.empresa}</TableCell>
                            <TableCell>{row.gestor}</TableCell>
                            <TableCell>{row.tipo}</TableCell> */}
                            <TableCell>{row.status}</TableCell>
                            <TableCell>
                                <IconButton
                                    edge="end"
                                    aria-label="more"
                                    aria-controls="long-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                    size="large"
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    TransitionComponent={Fade}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem component={Link} to="/contratos?edit=true" onClick={handleClose}>Ver</MenuItem>
                                    <MenuItem component={Link} to="/contratos?edit=false" onClick={handleClose}>Editar</MenuItem>
                                    <MenuItem onClick={handleHide}>Esconder</MenuItem>
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" to="/contratos" sx={{ mt: 3 }}>
                Ver todos os contratos
            </Link>
        </React.Fragment>
    );
}