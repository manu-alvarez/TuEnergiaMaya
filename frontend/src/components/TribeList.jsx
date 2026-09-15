import React, { useState } from 'react';
import { Typography, Box, Grid, Card, Avatar, Modal, Backdrop, Fade, Button } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import ModalLayout from './ModalLayout';

// Static Data for the 20 Seals
const SEALS = [
    { number: 1, name: 'Dragón', slug: 'dragon', color: '#ef4444', essence: 'Nacimiento, Nutrición, Ser' },
    { number: 2, name: 'Viento', slug: 'wind', color: '#f9fafb', essence: 'Espíritu, Aliento, Comunicación' },
    { number: 3, name: 'Noche', slug: 'night', color: '#3b82f6', essence: 'Abundancia, Intuición, Sueño' },
    { number: 4, name: 'Semilla', slug: 'seed', color: '#eab308', essence: 'Florecimiento, Atino, Consciencia' },
    { number: 5, name: 'Serpiente', slug: 'serpent', color: '#ef4444', essence: 'Fuerza Vital, Instinto, Sobrevivencia' },
    { number: 6, name: 'Enlazador', slug: 'worldbridger', color: '#f9fafb', essence: 'Muerte, Oportunidad, Igualdad' },
    { number: 7, name: 'Mano', slug: 'hand', color: '#3b82f6', essence: 'Realización, Curación, Conocimiento' },
    { number: 8, name: 'Estrella', slug: 'star', color: '#eab308', essence: 'Arte, Elegancia, Embellecer' },
    { number: 9, name: 'Luna', slug: 'moon', color: '#ef4444', essence: 'Agua Universal, Purificación, Flujo' },
    { number: 10, name: 'Perro', slug: 'dog', color: '#f9fafb', essence: 'Corazón, Amor, Lealtad' },
    { number: 11, name: 'Mono', slug: 'monkey', color: '#3b82f6', essence: 'Magia, Juego, Ilusión' },
    { number: 12, name: 'Humano', slug: 'human', color: '#eab308', essence: 'Libre Voluntad, Sabiduría, Influencia' },
    { number: 13, name: 'Caminante', slug: 'skywalker', color: '#ef4444', essence: 'Espacio, Exploración, Vigilancia' },
    { number: 14, name: 'Mago', slug: 'wizard', color: '#f9fafb', essence: 'Atemporalidad, Encantamiento, Receptividad' },
    { number: 15, name: 'Águila', slug: 'eagle', color: '#3b82f6', essence: 'Visión, Mente, Creación' },
    { number: 16, name: 'Guerrero', slug: 'warrior', color: '#eab308', essence: 'Inteligencia, Intrepidez, Cuestionar' },
    { number: 17, name: 'Tierra', slug: 'earth', color: '#ef4444', essence: 'Navegación, Evolución, Sincronicidad' },
    { number: 18, name: 'Espejo', slug: 'mirror', color: '#f9fafb', essence: 'Sin Fin, Orden, Reflejo' },
    { number: 19, name: 'Tormenta', slug: 'storm', color: '#3b82f6', essence: 'Autogeneración, Energía, Catalizar' },
    { number: 20, name: 'Sol', slug: 'sun', color: '#eab308', essence: 'Fuego Universal, Vida, Iluminar' },
];

const TribeList = ({ onClose }) => {
    const [selectedSeal, setSelectedSeal] = useState(null);

    return (
        <ModalLayout
            title="SELLOS SOLARES"
            subtitle="Conoce a los 20 Sellos Solares. Encuentra tu familia cósmica."
            icon={<GroupsIcon fontSize="large" />}
            onClose={onClose}
            maxWidth="lg"
        >
            <Grid container spacing={3} justifyContent="center">
                {SEALS.map((seal) => (
                    <Grid item xs={6} sm={4} md={3} lg={2.4} key={seal.number}>
                        <Card
                            onClick={() => setSelectedSeal(seal)}
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
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 3,
                                '&:hover': {
                                    transform: 'translateY(-10px) scale(1.05)',
                                    boxShadow: `0 0 30px ${seal.color}50`,
                                    borderColor: seal.color,
                                    bgcolor: 'rgba(0,200,255,0.05)'
                                }
                            }}
                        >
                            <Box sx={{
                                width: 80,
                                height: 80,
                                mb: 2,
                                borderRadius: '50%',
                                border: `2px solid ${seal.color}`,
                                p: 0.5,
                                bgcolor: 'rgba(0,0,0,0.4)'
                            }}>
                                <Avatar
                                    src={`assets/glyphs/seals/${seal.slug}.png`}
                                    variant="square"
                                    sx={{ width: '100%', height: '100%' }}
                                />
                            </Box>
                            <Typography variant="h6" sx={{ fontFamily: 'Cinzel', fontSize: '1rem', fontWeight: 'bold', color: seal.color }}>
                                {seal.name}
                            </Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Seal Detail Modal */}
            <Modal
                open={!!selectedSeal}
                onClose={() => setSelectedSeal(null)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: { timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }
                }}
            >
                <Fade in={!!selectedSeal}>
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
                        border: `1px solid ${selectedSeal?.color || 'white'}40`,
                        borderRadius: { xs: 3, md: 4 },
                        boxShadow: `0 0 50px ${selectedSeal?.color || 'white'}30`,
                        p: { xs: 2.5, md: 5 },
                        color: 'white',
                        textAlign: 'center',
                        alignSelf: 'flex-start',
                        my: 'auto'
                    }}>
                        {selectedSeal && (
                            <>
                                <Box sx={{
                                    width: 150,
                                    height: 150,
                                    mx: 'auto',
                                    mb: 3,
                                    position: 'relative', // Para posicionar fantasma
                                    borderRadius: '50%',
                                    boxShadow: `0 0 40px ${selectedSeal.color}40`,
                                    p: 1,
                                    border: `2px solid ${selectedSeal.color}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'visible'
                                }}>
                                    <img
                                        src={`assets/glyphs/seals/${selectedSeal.slug}.png`}
                                        alt=""
                                        style={{
                                            position: 'absolute',
                                            top: 0, left: 0,
                                            width: '100%', height: '100%',
                                            opacity: 0,
                                            zIndex: 1,
                                            animation: 'cosmicPulse 3s ease-out infinite',
                                            filter: 'blur(2px)'
                                        }}
                                    />
                                    <img
                                        src={`assets/glyphs/seals/${selectedSeal.slug}.png`}
                                        alt={selectedSeal.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            position: 'relative',
                                            zIndex: 2
                                        }}
                                    />
                                </Box>

                                <Typography variant="h4" sx={{ fontFamily: 'Cinzel', color: selectedSeal.color, mb: 1, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 3, textShadow: `0 0 20px ${selectedSeal.color}80` }}>
                                    {selectedSeal.name}
                                </Typography>

                                <Typography variant="h6" sx={{ fontFamily: 'Cinzel', color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                                    Sello Solar Nº {selectedSeal.number}
                                </Typography>

                                <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 3, borderRadius: 4, mb: 3, border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Lora', fontSize: '1.2rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                                        "{selectedSeal.essence}"
                                    </Typography>
                                </Box>

                                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                                    Medita en estas palabras clave para integrar la energía de {selectedSeal.name} en tu vida.
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                                    <Button
                                        onClick={() => setSelectedSeal(null)}
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
                                                borderColor: selectedSeal.color,
                                                bgcolor: `${selectedSeal.color}10`,
                                                boxShadow: `0 0 20px ${selectedSeal.color}40`,
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

export default TribeList;
