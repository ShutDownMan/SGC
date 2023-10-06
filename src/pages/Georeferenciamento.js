import React from 'react';
import { useState, useCallback, useMemo } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MainAppBar from '../components/MainAppBar';
import Copyright from '../components/Copyright';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { faker } from '@faker-js/faker';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent, Rectangle } from 'react-leaflet'
import { Typography } from '@mui/material';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

// Paraná
const position = [-25.512259, -54.531230]

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
}

const BOUNDS_STYLE = { weight: 1 }

function MinimapBounds({ parentMap, zoom }) {
    const minimap = useMap()

    // Clicking a point on the minimap sets the parent's map center
    const onClick = useCallback(
        (e) => {
            parentMap.setView(e.latlng, parentMap.getZoom())
        },
        [parentMap],
    )
    useMapEvent('click', onClick)

    // Keep track of bounds in state to trigger renders
    const [bounds, setBounds] = useState(parentMap.getBounds())
    const onChange = useCallback(() => {
        setBounds(parentMap.getBounds())
        // Update the minimap's view to match the parent map's center and zoom
        minimap.setView(parentMap.getCenter(), zoom)
    }, [minimap, parentMap, zoom])

    // Listen to events on the parent map
    const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
    // useEventHandlers({ instance: parentMap }, handlers)

    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
}

function MinimapControl({ position, zoom }) {
    const parentMap = useMap()
    const mapZoom = zoom || 0

    // Memoize the minimap so it's not affected by position changes
    const minimap = useMemo(
        () => (
            <MapContainer
                style={{ height: 80, width: 80 }}
                center={parentMap.getCenter()}
                zoom={mapZoom}
                dragging={false}
                doubleClickZoom={false}
                scrollWheelZoom={false}
                attributionControl={false}
                zoomControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
            </MapContainer>
        ),
        [],
    )

    const positionClass =
        (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright
    return (
        <div className={positionClass}>
            <div className="leaflet-control leaflet-bar">{minimap}</div>
        </div>
    )
}

function createMarkerPosition(lat, lng) {
    return [lat, lng];
}

const markerPositions = [
    createMarkerPosition(-25.523723, -54.561799),
    createMarkerPosition(-25.542930, -54.577258),
    createMarkerPosition(-25.436040, -54.594684),
    createMarkerPosition(-25.513809, -54.593405),
    createMarkerPosition(-25.472903, -54.593482),
]

const icon = new Icon({
    iconUrl: 'https://img.icons8.com/ios-glyphs/30/region-code.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
});

export default function ContratoDetails() {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <MainAppBar title="Georeferenciamento" open={open} toggleDrawer={toggleDrawer} />
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
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', height: '80vh' }}
                        >
                            <Box sx={{ height: '100%', width: '100%' }}>
                                <MapContainer center={position} zoom={12} scrollWheelZoom={true}
                                    style={{
                                        height: "100%"
                                    }} >
                                    <TileLayer
                                        maxZoom={18}
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    {markerPositions.map((position, idx) =>
                                        <Marker key={`marker-${idx}`} position={position} icon={icon}>
                                            <Popup>
                                                <Typography variant="subtitle1" gutterBottom>
                                                    {`Contrato ${idx + 1}`}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    Endereço: {faker.location.streetAddress()}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    Status: {faker.helpers.arrayElement(['Ativo', 'Inativo'])}
                                                </Typography>

                                                <Typography variant="body2" gutterBottom>
                                                    Empresa: {faker.company.name()}
                                                </Typography>

                                                <Grid container spacing={2} padding={2} justifyContent="space-around" alignItems="flex-start">
                                                    <Button variant="contained" color="primary" size="small"
                                                        component={Link} to={`/contratos/${idx + 1}?mode=view`} style={{ color: 'white' }}>
                                                        Ver Detalhes
                                                    </Button>
                                                </Grid>
                                            </Popup>
                                        </Marker>
                                    )}
                                    <MinimapControl position="topright" />
                                </MapContainer>
                            </Box>
                        </Paper>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

// https://icons8.com/icon/17548/region