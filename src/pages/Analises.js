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
import { faker } from '@faker-js/faker';
import moment from 'moment';
import DummyChart from '../components/DummyChart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const contratoDummyData = faker.helpers.multiple(() => ({
    name: faker.date.month(),
    contratos: faker.datatype.number({ min: 0, max: 100 })
}), { count: 12 });

const contratoStatusDummyData = [
    {
        name: 'Ativo',
        contratos: faker.number.int({ min: 0, max: 100 })
    },
    {
        name: 'Inativo',
        contratos: faker.number.int({ min: 0, max: 100 })
    },
];

const pagamentoDummyData = faker.helpers.multiple(() => ({
    name: faker.date.month(),
    pagamentos: faker.datatype.number({ min: 0, max: 100 })
}), { count: 12 });

export default function Analises() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <MainAppBar title="Analises" open={open} toggleDrawer={toggleDrawer} />
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
                    <Container sx={{ mt: 4, mb: 4, maxWidth: '100%' }} maxWidth={false}>
                        <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
                            {/* Chart */}
                            <Grid item lg={12}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <DummyChart
                                        title="Análise de Contratos"
                                        data={contratoDummyData}
                                        xAxisDataKey="name"
                                        yAxisLabel="Contratos"
                                        lineDataKey="contratos"
                                    />
                                </Paper>
                            </Grid>
                            {/* More Charts */}
                            <Grid item lg={4}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <BarChart
                                        width={300}
                                        height={230}
                                        data={contratoStatusDummyData}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        {/* <Legend /> */}
                                        <Bar dataKey="contratos" fill="#8884d8" />
                                    </BarChart>
                                </Paper>
                            </Grid>
                            <Grid item lg={8}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                    }}
                                >
                                    <DummyChart
                                        title="Pagamentos"
                                        data={pagamentoDummyData}
                                        xAxisDataKey="name"
                                        yAxisLabel="Pagamentos"
                                        lineDataKey="pagamentos"
                                    />
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