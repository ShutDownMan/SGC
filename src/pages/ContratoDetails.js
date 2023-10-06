import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MainAppBar from '../components/MainAppBar';
import Copyright from '../components/Copyright';
import { TextField, Input, InputLabel, Autocomplete } from '@mui/material';
import { faker } from '@faker-js/faker';
import moment from 'moment';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const companies = faker.helpers.multiple(faker.company.name, { count: 10 });
const gestores = faker.helpers.multiple(faker.person.fullName, { count: 10 });

const contractTypes = [
    "Serviço de TI",
    "Serviço de Limpeza",
    "Locação",
    "Transporte",
    "Aquisição de Bens",
    "Serviço de Segurança",
    "Serviço de Manutenção",
];
const contractStatus = ['Ativo', 'Cancelado', 'Suspenso', 'Encerrado', 'Sob Análise'];


export default function ContratoDetails() {
    const [open, setOpen] = React.useState(true);
    const [mode, setMode] = React.useState("view");
    const [currentContrato, setCurrentContrato] = React.useState();
    const toggleDrawer = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        setMode(queryParameters.get("mode"));

        if (queryParameters.get("mode") !== "new") {
            setCurrentContrato({
                nro: faker.number.int(1000),
                dataInicio: moment(faker.date.past({ min: 365 * 2 })).format("YYYY-MM-DD"),
                dataFim: moment(faker.date.future({ min: 365 * 2 })).format("YYYY-MM-DD"),
                objeto: faker.lorem.paragraph(),
                tipo: contractTypes[0],
                status: contractStatus[0],
                empresa: companies[0],
                gestor: gestores[0],
            });
        }
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <MainAppBar title="Detalhes do Contrato" open={open} toggleDrawer={toggleDrawer} />
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
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} justifyContent="center" alignItems="flex-start">
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px' }}
                        >
                            <Grid container spacing={2} padding={2} justifyContent="space-around" alignItems="flex-start">
                                <Grid item container p={2} spacing={2} justifyContent="space-around" lg={6}>
                                    <Grid item lg={12}>
                                        <TextField
                                            id="nro"
                                            label="Nro"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth
                                            disabled={mode !== "new"}
                                            value={currentContrato?.nro}
                                        />
                                    </Grid>
                                    <Grid item lg={6}>
                                        <TextField
                                            id="dataInicio"
                                            label="Data Início"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth
                                            disabled={mode === "view"}
                                            value={currentContrato?.dataInicio}
                                        />
                                    </Grid>
                                    <Grid item lg={6}>
                                        <TextField
                                            id="dataFim"
                                            label="Data Fim"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth
                                            disabled={mode === "view"}
                                            value={currentContrato?.dataFim}
                                        />
                                    </Grid>
                                    <Grid item lg={12}>
                                        <TextField
                                            id="objeto"
                                            label="Objeto"
                                            multiline
                                            rows={3}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth
                                            disabled={mode === "view"}
                                            type="text"
                                            value={currentContrato?.objeto}
                                        />
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Autocomplete
                                            disablePortal
                                            id="tipo"
                                            options={contractTypes}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    label="Tipo"
                                                    fullWidth
                                                    disabled={mode === "view"}
                                                    type="text"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />}
                                            defaultValue={{ label: contractTypes[0] }}
                                        />
                                    </Grid>
                                    <Grid item lg={6}>
                                        <Autocomplete
                                            disablePortal
                                            id="status"
                                            options={contractStatus}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    label="Status"
                                                    fullWidth
                                                    disabled={mode === "view"}
                                                    type="text"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />}
                                            defaultValue={{ label: contractStatus[0] }}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container p={2} spacing={2} justifyContent="space-around" lg={6}>
                                    <Grid item lg={12}>
                                        <Autocomplete
                                            disablePortal
                                            id="empresa"
                                            options={companies}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    label="Empresa"
                                                    fullWidth
                                                    disabled={mode === "view"}
                                                    type="text"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />}
                                            defaultValue={{ label: companies[0] }}
                                        />
                                    </Grid>
                                    {/* Spacer */}
                                    <Grid item lg={12} >
                                        <hr />
                                    </Grid>
                                    <Grid item lg={12}>
                                        <Autocomplete
                                            disablePortal
                                            id="gestor"
                                            options={gestores}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    label="Gestor"
                                                    fullWidth
                                                    disabled={mode === "view"}
                                                    type="text"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />}
                                            defaultValue={{ label: gestores[0] }}
                                        />
                                    </Grid>
                                </Grid>
                                {/* Edit button */}
                                <Grid container spacing={2} justifyContent="flex-end" alignItems="flex-end" lg={12}>
                                    {/* <Button variant="contained" color="primary"
                                        onClick={() => { setMode("edit") }}
                                        component={Link} to={`/contratos/${1}?mode=edit`}
                                        disabled={mode !== "view"}
                                    >
                                        Editar
                                    </Button> */}
                                    <Button variant="contained" color="primary"
                                        onClick={() => { setMode("edit") }}
                                        component={Link} to={`/contratos/${1}?mode=edit`}
                                        disabled={mode === "view"}
                                    >
                                        Gravar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box >
        </ThemeProvider >
    );
}