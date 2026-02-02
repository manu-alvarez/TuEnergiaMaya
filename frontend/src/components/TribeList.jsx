import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, Avatar, Modal, Backdrop, Fade, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'transparent', overflowY: 'auto' }}>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 6, position: 'relative' }}>
                    {/* Close Icon Removed */}

                    <Typography variant="h3" sx={{ fontFamily: 'Cinzel', color: '#00c8ff', textShadow: '0 0 20px rgba(0,200,255,0.8)', mb: 2 }}>
                        SELLOS SOLARES
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontFamily: 'Lora', color: 'rgba(0, 200, 255, 0.8)', fontStyle: 'italic', mb: 3 }}>
                        Conoce a los 20 Sellos Solares. Encuentra tu familia cósmica.
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        sx={{
                            color: 'white',
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            borderRadius: '20px',
                            px: 4,
                            py: 0.5,
                            fontSize: '0.8rem',
                            '&:hover': {
                                borderColor: 'white',
                                bgcolor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        VOLVER
                    </Button>
                </Box>

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
                                    '&:hover': {
                                        transform: 'translateY(-10px) scale(1.05)',
                                        boxShadow: `0 0 30px ${seal.color}50`,
                                        borderColor: seal.color
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
                                    bgcolor: 'rgba(0,0,0,0.2)'
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
                                {/* Keywords removed from list view as requested */}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

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
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: 500 },
                        bgcolor: 'transparent',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${selectedSeal?.color || 'white'}`,
                        borderRadius: 8,
                        boxShadow: `0 0 50px ${selectedSeal?.color || 'white'}30`,
                        p: 4,
                        outline: 'none',
                        color: 'white',
                        textAlign: 'center'
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
                                    overflow: 'visible' // Permitir que el fantasma salga
                                }}>
                                    {/* Ghost Image for Cosmic Effect */}
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
                                    {/* Main Image */}
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

                                <Typography variant="h4" sx={{ fontFamily: 'Cinzel', color: selectedSeal.color, mb: 1 }}>
                                    {selectedSeal.name}
                                </Typography>

                                <Typography variant="h6" sx={{ fontFamily: 'Cinzel', color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                                    Sello Solar Nº {selectedSeal.number}
                                </Typography>

                                <Box sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 3, borderRadius: 4, mb: 3 }}>
                                    <Typography variant="body1" sx={{ fontFamily: 'Lora', fontSize: '1.2rem', fontStyle: 'italic', lineHeight: 1.6 }}>
                                        "{selectedSeal.essence}"
                                    </Typography>
                                </Box>

                                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                                    Medita en estas palabras clave para integrar la energía de {selectedSeal.name} en tu vida.
                                </Typography>

                                <Button
                                    onClick={() => setSelectedSeal(null)}
                                    variant="outlined"
                                    sx={{
                                        mt: 4,
                                        color: 'white',
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        borderRadius: '20px',
                                        px: 4,
                                        py: 0.5,
                                        fontSize: '0.8rem',
                                        '&:hover': {
                                            borderColor: 'white',
                                            bgcolor: 'rgba(255, 255, 255, 0.1)'
                                        }
                                    }}
                                >
                                    VOLVER
                                </Button>
                            </>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default TribeList;
