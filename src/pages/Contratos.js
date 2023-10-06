import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import MainAppBar from '../components/MainAppBar';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Copyright from '../components/Copyright';
import moment from 'moment';
import { faker } from '@faker-js/faker';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

// Generate Order Data
function createData(id, dataInicio, dataFim, nro, objeto, empresa, gestor, tipo, status) {
    return { id, dataInicio, dataFim, nro, objeto, empresa, gestor, tipo, status };
}

const rows = [
    createData(
        0,
        moment(faker.date.past({ min: 365 * 2 })).format('DD MMM, YYYY'),
        moment(faker.date.future({ min: 365 * 2 })).format('DD MMM, YYYY'),
        '0001',
        'Contrato de Prestação de Serviços para Manutenção de Equipamentos de Informática',
        faker.company.name(),
        faker.person.firstName(),
        'Serviço de TI',
        faker.helpers.arrayElement(['Ativo', 'Cancelado', 'Suspenso', 'Encerrado', 'Sob Análise']),
    ),
    createData(
        1,
        moment(faker.date.past({ min: 365 * 2 })).format('DD MMM, YYYY'),
        moment(faker.date.future({ min: 365 * 2 })).format('DD MMM, YYYY'),
        '0002',
        'Contrato de Aquisição de Equipamentos de Informática para o Escritório Central',
        faker.company.name(),
        faker.person.firstName(),
        'Aquisição',
        faker.helpers.arrayElement(['Ativo', 'Cancelado', 'Suspenso', 'Encerrado', 'Sob Análise']),
    ),
    createData(2,
        moment(faker.date.past({ min: 365 * 2 })).format('DD MMM, YYYY'),
        moment(faker.date.future({ min: 365 * 2 })).format('DD MMM, YYYY'),
        '0003',
        'Contrato de Locação de Imóvel para o Setor Administrativo',
        faker.company.name(),
        faker.person.firstName(),
        'Locação',
        faker.helpers.arrayElement(['Ativo', 'Cancelado', 'Suspenso', 'Encerrado', 'Sob Análise']),
    ),
    createData(
        3,
        moment(faker.date.past({ min: 365 * 2 })).format('DD MMM, YYYY'),
        moment(faker.date.future({ min: 365 * 2 })).format('DD MMM, YYYY'),
        '0004',
        'Contrato de Transporte dos Funcionários',
        faker.company.name(),
        faker.person.firstName(),
        'Transporte',
        faker.helpers.arrayElement(['Ativo', 'Cancelado', 'Suspenso', 'Encerrado', 'Sob Análise']),
    ),
    createData(
        4,
        moment(faker.date.past({ min: 365 * 2 })).format('DD MMM, YYYY'),
        moment(faker.date.future({ min: 365 * 2 })).format('DD MMM, YYYY'),
        '0005',
        'Contrato de Desenvolvimento de Software para o Setor de Recursos Humanos',
        faker.company.name(),
        faker.person.firstName(),
        'Serviço de TI',
        faker.helpers.arrayElement(['Ativo', 'Cancelado', 'Suspenso', 'Encerrado', 'Sob Análise']),
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const columns = [
    // { field: 'id', headerName: 'ID', width: 30 },
    { field: 'nro', headerName: 'Nro', width: 80 },
    { field: 'dataInicio', headerName: 'Data Início', width: 130 },
    { field: 'dataFim', headerName: 'Data Fim', width: 130 },
    { field: 'objeto', headerName: 'Objeto', width: 290, flex: 1 },
    { field: 'empresa', headerName: 'Empresa', width: 130 },
    { field: 'gestor', headerName: 'Gestor', width: 100 },
    { field: 'tipo', headerName: 'Tipo', width: 130 },
    { field: 'status', headerName: 'Status', width: 130 },
];

export default function Contratos() {
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

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [selectedRowsData, setSelectedRowsData] = React.useState([]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <MainAppBar title="Contratos" open={open} toggleDrawer={toggleDrawer} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="false" sx={{ mt: 4, mb: 4 }}>
                        {/* Search bar */}
                        <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ pt: 2, pb: 2 }}>
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 650 }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Pesquisar"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />
                                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                    <SearchIcon />
                                </IconButton>

                            </Paper>
                        </Grid>
                        {/* Search Results */}
                        <Grid container spacing={3} justifyContent="center" alignItems="center">
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <React.Fragment>
                                        <Title>Resultados da Busca</Title>
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { page: 0, pageSize: 5 },
                                                },
                                            }}
                                            pageSizeOptions={[5, 10]}
                                            disableSelectionOnClick
                                            onRowSelectionModelChange={(ids) => {
                                                const _selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
                                                setSelectedRowsData(_selectedRowsData);
                                                console.log(_selectedRowsData);
                                            }}
                                            checkboxSelection
                                        />
                                        { /* action buttons on the selected contract */}
                                        <Box sx={{ pt: 2 }}>
                                            <Grid container spacing={2} justifyContent="flex-end">
                                                <Grid item>
                                                    <Button variant="contained" color="primary" component={Link} to={`/contratos/new?mode=new`}>
                                                        Novo Contrato
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="outlined" color="primary" component={Link} to={`/contratos/${selectedRowsData[0]?.id}?mode=edit`}
                                                        disabled={!(selectedRowsData.length === 1)}>
                                                        Editar
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" color="secondary" component={Link} to="/dashboard" onClick={handleHide}
                                                        disabled={!(selectedRowsData.length > 0)}>
                                                        Esconder
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        {/* <Table size="large">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Nro</TableCell>
                                                    <TableCell width="9%">Data Início</TableCell>
                                                    <TableCell width="9%">Data Fim</TableCell>
                                                    <TableCell>Objeto</TableCell>
                                                    <TableCell>Empresa</TableCell>
                                                    <TableCell>Gestor</TableCell>
                                                    <TableCell>Tipo</TableCell>
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
                                                        <TableCell>{row.empresa}</TableCell>
                                                        <TableCell>{row.gestor}</TableCell>
                                                        <TableCell>{row.tipo}</TableCell>
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
                                        </Table> */}
                                    </React.Fragment>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}