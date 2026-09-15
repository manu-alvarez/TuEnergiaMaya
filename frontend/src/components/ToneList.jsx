import React, { useState } from 'react';
import { Typography, Box, Grid, Card, Avatar, Modal, Backdrop, Fade, Button } from '@mui/material';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import ModalLayout from './ModalLayout';

// Static Data for the 13 Tones
const TONES = [
    { number: 1, name: 'Magnético', slug: '1', action: 'Atrayendo', essence: 'Propósito', power: 'Unificar', listTitle: 'INICIO', listSubtitle: 'El origen del propósito' },
    { number: 2, name: 'Lunar', slug: '2', action: 'Estabilizando', essence: 'Desafío', power: 'Polarizar', listTitle: 'DUALIDAD', listSubtitle: 'El reconocimiento del obstáculo' },
    { number: 3, name: 'Eléctrico', slug: '3', action: 'Vinculando', essence: 'Servicio', power: 'Activar', listTitle: 'MOVIMIENTO', listSubtitle: 'La chispa de la acción' },
    { number: 4, name: 'Auto-existente', slug: '4', action: 'Midiendo', essence: 'Forma', power: 'Definir', listTitle: 'ESTRUCTURA', listSubtitle: 'La base del proyecto' },
    { number: 5, name: 'Entonado', slug: '5', action: 'Comandando', essence: 'Esplendor', power: 'Conferir Poder', listTitle: 'PODER', listSubtitle: 'La toma de mando' },
    { number: 6, name: 'Rítmico', slug: '6', action: 'Equilibrando', essence: 'Igualdad', power: 'Organizar', listTitle: 'EQUILIBRIO', listSubtitle: 'La fluidez interna' },
    { number: 7, name: 'Resonante', slug: '7', action: 'Inspirando', essence: 'Sintonización', power: 'Canalizar', listTitle: 'CONEXIÓN', listSubtitle: 'La sintonía con lo divino' },
    { number: 8, name: 'Galáctico', slug: '8', action: 'Modelando', essence: 'Integridad', power: 'Armonizar', listTitle: 'ARMONÍA', listSubtitle: 'La coherencia ética' },
    { number: 9, name: 'Solar', slug: '9', action: 'Realizando', essence: 'Intención', power: 'Pulsar', listTitle: 'REALIZACIÓN', listSubtitle: 'La voluntad en marcha' },
    { number: 10, name: 'Planetario', slug: '10', action: 'Produciendo', essence: 'Manifestación', power: 'Perfeccionar', listTitle: 'MANIFESTACIÓN', listSubtitle: 'El resultado tangible' },
    { number: 11, name: 'Espectral', slug: '11', action: 'Divulgando', essence: 'Liberación', power: 'Disolver', listTitle: 'LIBERACIÓN', listSubtitle: 'Soltar lo que no sirve' },
    { number: 12, name: 'Cristal', slug: '12', action: 'Universalizando', essence: 'Cooperación', power: 'Dedicarse', listTitle: 'COOPERACIÓN', listSubtitle: 'La unión con el grupo' },
    { number: 13, name: 'Cósmico', slug: '13', action: 'Trascendiendo', essence: 'Presencia', power: 'Perdurar', listTitle: 'TRASCENDENCIA', listSubtitle: 'El retorno a la fuente' },
];

const ToneList = ({ onClose }) => {
    const [selectedTone, setSelectedTone] = useState(null);
    const primaryColor = '#00c8ff'; // Turquoise

    return (
        <ModalLayout
            title="TONOS LUNARES"
            subtitle="Los 13 poderes de la creación. Descubre tu frecuencia de acción."
            icon={<Brightness3Icon fontSize="large" />}
            onClose={onClose}
            maxWidth="lg"
            color={primaryColor}
        >
            <Grid container spacing={3} justifyContent="center">
                {TONES.map((tone) => (
                    <Grid item xs={6} sm={4} md={3} lg={2.4} key={tone.number}>
                        <Card
                            onClick={() => setSelectedTone(tone)}
                            className="glass-card"
                            sx={{
                                p: 2,
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                height: '100%',
                                bgcolor: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(0, 200, 255, 0.1)',
                                borderRadius: 3,
                                '&:hover': {
                                    transform: 'translateY(-10px) scale(1.05)',
                                    boxShadow: `0 0 30px ${primaryColor}50`,
                                    borderColor: primaryColor,
                                    bgcolor: 'rgba(0,200,255,0.05)'
                                }
                            }}
                        >
                            <Box sx={{
                                width: 80,
                                height: 80,
                                mb: 2,
                                borderRadius: '24px', // Squircle shape to fit square glyphs better
                                border: `2px solid ${primaryColor}`,
                                p: 2, // Padding to give breathing room
                                bgcolor: 'rgba(0,0,0,0.4)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <img
                                    src={`assets/glyphs/tones/${tone.slug}.png`}
                                    alt={tone.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        filter: 'brightness(0) invert(1) drop-shadow(0 0 2px #00c8ff)'
                                    }}
                                />
                            </Box>
                            <Typography variant="h6" sx={{ fontFamily: 'Cinzel', fontSize: '1rem', fontWeight: 'bold', color: primaryColor }}>
                                {tone.name}
                            </Typography>
                            <Typography variant="caption" sx={{ fontFamily: 'Cinzel', color: 'white', fontWeight: 'bold', letterSpacing: 1, display: 'block', mt: 1 }}>
                                {tone.listTitle}
                            </Typography>
                            <Typography variant="caption" sx={{ fontFamily: 'Lora', color: 'rgba(255, 255, 255, 0.6)', display: 'block', fontStyle: 'italic', fontSize: '0.7rem' }}>
                                {tone.listSubtitle}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Tone Detail Modal */}
            <Modal
                open={!!selectedTone}
                onClose={() => setSelectedTone(null)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: { timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }
                }}
            >
                <Fade in={!!selectedTone}>
                    <Box sx={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        overflowY: 'auto',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        p: { xs: 2, md: 4 },
                        pt: { xs: 'calc(16px + env(safe-area-inset-top, 0px))', md: 4 },
                        outline: 'none'
                    }}>
                    <Box className="glass-card" sx={{
                        width: { xs: '100%', sm: 500 },
                        bgcolor: 'rgba(12, 12, 28, 0.95)',
                        border: `1px solid ${primaryColor}40`,
                        borderRadius: { xs: 3, md: 4 },
                        boxShadow: `0 0 50px ${primaryColor}30`,
                        p: { xs: 2.5, md: 5 },
                        color: primaryColor,
                        textAlign: 'center',
                        alignSelf: 'flex-start',
                        my: 'auto'
                    }}>
                        {selectedTone && (
                            <>
                                <Box sx={{
                                    width: 150,
                                    height: 150,
                                    mx: 'auto',
                                    mb: 3,
                                    position: 'relative',
                                    borderRadius: '24px', // Squircle
                                    boxShadow: `0 0 40px ${primaryColor}40`,
                                    p: 3, // Sufficient padding
                                    border: `2px solid ${primaryColor}`,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    overflow: 'visible'
                                }}>
                                    {/* Ghost Image for Cosmic Effect */}
                                    <img
                                        src={`assets/glyphs/tones/${selectedTone.slug}.png`}
                                        alt=""
                                        style={{
                                            position: 'absolute',
                                            top: 0, left: 0,
                                            width: '100%', height: '100%',
                                            opacity: 0,
                                            zIndex: 1,
                                            animation: 'cosmicPulse 3s ease-out infinite',
                                            filter: 'brightness(0) invert(1) drop-shadow(0 0 5px #00c8ff) blur(2px)'
                                        }}
                                    />

                                    {/* Main Image */}
                                    <img
                                        src={`assets/glyphs/tones/${selectedTone.slug}.png`}
                                        alt={selectedTone.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            filter: 'brightness(0) invert(1) drop-shadow(0 0 5px #00c8ff)',
                                            position: 'relative',
                                            zIndex: 2
                                        }}
                                    />
                                </Box>

                                <Typography variant="h4" sx={{ fontFamily: 'Cinzel', color: primaryColor, mb: 1, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3, textShadow: `0 0 20px ${primaryColor}80` }}>
                                    Tono {selectedTone.name}
                                </Typography>

                                <Typography variant="h6" sx={{ fontFamily: 'Cinzel', color: 'rgba(255, 255, 255, 0.7)', mb: 3 }}>
                                    Nivel {selectedTone.number} de la Onda Encantada
                                </Typography>

                                <Box sx={{ p: 2, mb: 3, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <Typography variant="body1" paragraph sx={{ color: 'white', fontFamily: 'Lora', fontSize: '1.1rem' }}>
                                        <strong>Poder:</strong> {selectedTone.power}
                                    </Typography>
                                    <Typography variant="body1" paragraph sx={{ color: 'white', fontFamily: 'Lora', fontSize: '1.1rem' }}>
                                        <strong>Acción:</strong> {selectedTone.action}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Lora', fontSize: '1.1rem' }}>
                                        <strong>Esencia:</strong> {selectedTone.essence}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                                    <Button
                                        onClick={() => setSelectedTone(null)}
                                        variant="outlined"
                                        sx={{
                                            color: 'white',
                                            borderColor: 'rgba(255, 255, 255, 0.3)',
                                            borderRadius: '30px',
                                            px: 5, py: 1,
                                            fontFamily: 'Cinzel',
                                            fontWeight: 700,
                                            letterSpacing: 2,
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                borderColor: primaryColor,
                                                bgcolor: `${primaryColor}10`,
                                                boxShadow: `0 0 20px ${primaryColor}40`,
                                                transform: 'scale(1.05)'
                                            }
                                        }}
                                    >
                                        VOLVER
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Box>
                    </Box>
                </Fade>
            </Modal>
        </ModalLayout>
    );
};

export default ToneList;
