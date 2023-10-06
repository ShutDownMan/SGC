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
import InputAdornment from '@mui/material/InputAdornment';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


// id, data, pagante, valor, forma, status
export default function PagamentoDetails() {
    const [open, setOpen] = React.useState(true);
    const [mode, setMode] = React.useState("view");
    const [currentPagamento, setCurrentPagamento] = React.useState({
        id: faker.string.uuid().substring(0, 6).toUpperCase(),
        data: faker.date.past(),
        pagante: faker.person.fullName(),
        valor: faker.finance.amount(),
        forma: faker.helpers.arrayElement(['Dinheiro', 'Cartão', 'Cheque']),
        status: faker.helpers.arrayElement(['Pago', 'Pendente'])
    });
    const toggleDrawer = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        const queryParameters = new URLSearchParams(window.location.search);
        setMode(queryParameters.get("mode"));

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
                                            id="id"
                                            label="id"
                                            type="text"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth
                                            disabled={true}
                                            value={currentPagamento.id}
                                            onChange={(event) => {
                                                setCurrentPagamento({ ...currentPagamento, id: event.target.value })
                                            }}
                                        />
                                    </Grid>
                                    <Grid item lg={12}>
                                        <TextField
                                            id="data"
                                            label="Data"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth
                                            disabled={mode !== "new"}
                                        // value={mode === "new" ? "" : moment(currentPagamento.data).format("YYYY-MM-DD")}
                                        />
                                    </Grid>
                                    <Grid item lg={12}>
                                        <Autocomplete
                                            disablePortal
                                            id="pagante"
                                            options={faker.helpers.multiple(faker.person.fullName, { count: 10 })}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    label="Pagante"
                                                    fullWidth
                                                    disabled={mode !== "new"}
                                                    type="text"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />}
                                        />
                                    </Grid>
                                    <Grid item lg={12}>
                                        <TextField
                                            id="valor"
                                            label="Valor"
                                            type="number"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            fullWidth
                                            disabled={mode !== "new"}
                                        // // value={mode === "new" ? "" : currentPagamento.valor}
                                        />
                                    </Grid>
                                </Grid>
                                {/* Edit button */}
                                <Grid container spacing={2} justifyContent="flex-end" alignItems="flex-end" lg={12}>
                                    <Button variant="contained" color="primary"
                                        onClick={() => { setMode("edit") }}
                                        component={Link} to={`/financeiro`}
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