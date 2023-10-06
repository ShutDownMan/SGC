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
import { DataGrid, GridToolbar, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

// gerar dado de pagamento de contrato
function createData(id, data, pagante, valor, forma, status) {
    return { id, data, pagante, valor, forma, status };
}

const rows = faker.helpers.multiple(() => createData(
    faker.string.uuid().substring(0, 6).toUpperCase(),
    faker.date.past(),
    faker.person.fullName(),
    faker.finance.amount(),
    faker.helpers.arrayElement(['Dinheiro', 'Cartão', 'Cheque']),
    faker.helpers.arrayElement(['Pago', 'Pendente'])
), { count: 100 });

function preventDefault(event) {
    event.preventDefault();
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: 'data',
        headerName: 'Data',
        width: 200,
        valueGetter: (params) => moment(params.row.data).format('DD/MM/YYYY HH:mm:ss'),
    },
    { field: 'pagante', headerName: 'Pagante', width: 200 },
    {
        field: 'valor',
        headerName: 'Valor',
        width: 150,
        valueGetter: (params) => `R$ ${params.row.valor}`,
    },
    { field: 'forma', headerName: 'Forma', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
];

export default function Pagamentos() {
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
                <MainAppBar title="Financeiro" open={open} toggleDrawer={toggleDrawer} />
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
                        {/* Search Results */}
                        <Grid container spacing={3} justifyContent="center" alignItems="center">
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <React.Fragment>
                                        <Title>Pagamentos Realizados</Title>
                                        <DataGrid
                                            rows={rows}
                                            columns={columns}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { page: 0, pageSize: 5 },
                                                },
                                            }}
                                            pageSizeOptions={[5, 10, 25, 50, 100]}
                                            disableSelectionOnClick
                                            onRowSelectionModelChange={(ids) => {
                                                const _selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
                                                setSelectedRowsData(_selectedRowsData);
                                                console.log(_selectedRowsData);
                                            }}
                                            // checkboxSelection
                                            slots={{ toolbar: GridToolbar }}
                                        />
                                        { /* action buttons on the selected contract */}
                                        <Box sx={{ pt: 2 }}>
                                            <Grid container spacing={2} justifyContent="flex-end">
                                                <Grid item>
                                                    <Button variant="contained" color="primary" component={Link} to={`/pagamentos/new?mode=new`}>
                                                        Cadastrar Pagamento
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="outlined" color="primary" component={Link} to={`/pagamentos/${selectedRowsData[0]?.id}?mode=edit`}
                                                        disabled={!(selectedRowsData.length === 1)}>
                                                        Editar Detalhes
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
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