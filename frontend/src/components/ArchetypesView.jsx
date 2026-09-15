import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Modal, Backdrop, Fade, IconButton, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import archetypesData from '../data/archetypes.json';
import ModalLayout from './ModalLayout';

const BASE = import.meta.env.BASE_URL;

const ArchetypesView = ({ onBack, kinData }) => {
    const [selectedArchetype, setSelectedArchetype] = useState(null);
    const [showReadingModal, setShowReadingModal] = useState(false);
    const [zoomedImage, setZoomedImage] = useState(null); // { src, name }

    const archetypeKeys = Object.keys(archetypesData);

    const handleOpenFullText = (archetype) => {
        setSelectedArchetype(archetype);
        setShowReadingModal(true);
    };

    return (
        <ModalLayout
            title="LOS 21 ARQUETIPOS GALÁCTICOS"
            subtitle="Explora los perfiles míticos de la consciencia divina (Hunab Ku 21)"
            icon={<AutoFixHighIcon fontSize="large" />}
            onClose={onBack}
            maxWidth="lg"
            color="#00c8ff"
        >
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, textAlign: 'center', maxWidth: '800px', mx: 'auto', lineHeight: 1.8 }}>
                Los 21 Arquetipos Galácticos del sistema Hunab Ku 21, codificados por José Argüelles, representan los modelos originales de la memoria cósmica asociados a cada uno de los 20 sellos solares más el centro galáctico.
            </Typography>

            {/* Grid de tarjetas */}
            <Grid container spacing={3} alignItems="stretch" justifyContent="center">
                {archetypeKeys.map(key => {
                    const arch = archetypesData[key];
                    const imageSrc = `${BASE}assets/archetypes/${key}.png`;

                    return (
                        <Grid item xs={12} sm={6} md={4} key={key} sx={{ display: 'flex' }}>
                            <Card className="glass-card" sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                overflow: 'hidden',
                                border: '1px solid rgba(0, 200, 255, 0.25)',
                                borderRadius: 4,
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 35px rgba(0, 200, 255, 0.25)',
                                    borderColor: 'rgba(0, 200, 255, 0.6)'
                                }
                            }}>
                                {/* Contenedor de la Imagen */}
                                <Box
                                    sx={{ 
                                        position: 'relative', 
                                        height: { xs: '180px', sm: '220px', md: '240px' }, 
                                        flexShrink: 0, 
                                        cursor: 'zoom-in',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        p: { xs: 2, md: 3 },
                                        bgcolor: 'rgba(0, 0, 0, 0.2)'
                                    }}
                                    onClick={(e) => { e.stopPropagation(); setZoomedImage({ src: imageSrc, name: arch.archetype }); }}
                                >
                                    <Box
                                        component="img"
                                        src={imageSrc}
                                        alt={arch.archetype}
                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                        sx={{
                                            height: '100%',
                                            objectFit: 'contain',
                                            borderRadius: 2,
                                            boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
                                            transition: 'transform 0.3s ease',
                                            '&:hover': { transform: 'scale(1.03)' }
                                        }}
                                    />
                                    {/* Fallback si no carga la imagen */}
                                    <Box sx={{
                                        display: 'none',
                                        width: '120px',
                                        height: '160px',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 2,
                                        background: 'linear-gradient(135deg, rgba(0,200,255,0.15), rgba(0,200,255,0.1))',
                                        border: '1px solid rgba(0,200,255,0.3)'
                                    }}>
                                        <AutoAwesomeIcon sx={{ fontSize: 40, color: 'rgba(0,200,255,0.4)' }} />
                                    </Box>
                                    
                                    {/* Badge número */}
                                    <Chip
                                        label={arch.number}
                                        size="small"
                                        sx={{
                                            position: 'absolute', top: 12, left: 12,
                                            bgcolor: 'rgba(0,200,255,0.2)', color: '#ffffff',
                                            fontWeight: 'bold', fontSize: '0.75rem',
                                            border: '1px solid rgba(0,200,255,0.5)',
                                            backdropFilter: 'blur(4px)'
                                        }}
                                    />
                                </Box>

                                {/* Contenido */}
                                <CardContent sx={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    p: 3,
                                    '&:last-child': { pb: 3 }
                                }}>
                                    <Typography variant="caption" sx={{ color: '#00c8ff', fontWeight: 'bold', mb: 0.5, textTransform: 'uppercase', letterSpacing: 1 }}>
                                        {arch.sealName}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'white', fontFamily: 'Cinzel', mb: 2, fontSize: { xs: '1rem', sm: '1.1rem' }, lineHeight: 1.3 }}>
                                        {arch.archetype}
                                    </Typography>

                                    {/* Poema corto */}
                                    <Box sx={{
                                        flexGrow: 1,
                                        width: '100%',
                                        mb: 3
                                    }}>
                                        <Typography variant="body2" sx={{
                                            color: 'rgba(255,255,255,0.7)',
                                            fontStyle: 'italic',
                                            whiteSpace: 'pre-line',
                                            fontFamily: 'Lora',
                                            lineHeight: 1.7,
                                            fontSize: '0.85rem'
                                        }}>
                                            {arch.poem}
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="outlined"
                                        onClick={() => handleOpenFullText(arch)}
                                        startIcon={<AutoAwesomeIcon />}
                                        fullWidth
                                        sx={{
                                            color: '#00c8ff',
                                            borderColor: 'rgba(0,200,255,0.5)',
                                            borderRadius: '30px',
                                            py: 1,
                                            mt: 'auto',
                                            fontFamily: 'Cinzel',
                                            fontWeight: 'bold',
                                            transition: 'all 0.3s ease',
                                            '&:hover': { 
                                                bgcolor: 'rgba(0, 200, 255, 0.15)',
                                                borderColor: '#00c8ff',
                                                boxShadow: '0 0 15px rgba(0,200,255,0.3)'
                                            }
                                        }}
                                    >
                                        Lectura completa
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Modal de Lectura completa */}
            <Modal
                open={showReadingModal}
                onClose={() => setShowReadingModal(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: { timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }
                }}
            >
                <Fade in={showReadingModal}>
                    <Box sx={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        overflowY: 'auto',
                        display: 'flex', justifyContent: 'center',
                        p: { xs: 2, md: 4 },
                        pt: { xs: 'calc(16px + env(safe-area-inset-top, 0px))', md: 4 },
                        outline: 'none'
                    }}>
                    <Box className="glass-card" sx={{
                        width: '100%', maxWidth: 620,
                        bgcolor: 'rgba(12, 12, 28, 0.95)',
                        border: '1px solid rgba(0, 200, 255, 0.4)',
                        borderRadius: { xs: 3, md: 4 }, p: { xs: 2.5, md: 5 },
                        boxShadow: '0 0 60px rgba(0, 200, 255, 0.15)',
                        position: 'relative', alignSelf: 'flex-start',
                        my: 'auto'
                    }}>
                        <IconButton
                            onClick={() => setShowReadingModal(false)}
                            sx={{ position: 'absolute', right: 10, top: 10, color: 'rgba(255,255,255,0.5)' }}
                        >
                            <CloseIcon />
                        </IconButton>

                        {selectedArchetype && (
                            <>
                                <Typography variant="caption" sx={{ color: '#00c8ff', display: 'block', textAlign: 'center', mb: 0.5, textTransform: 'uppercase', letterSpacing: 1 }}>
                                    {selectedArchetype.sealName}
                                </Typography>
                                <Typography variant="h5" sx={{ fontFamily: 'Cinzel', color: '#00c8ff', mb: 0.5, fontWeight: 800, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2, textShadow: '0 0 20px rgba(0,200,255,0.8)' }}>
                                    {selectedArchetype.archetype}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3, textAlign: 'center', fontStyle: 'italic', fontFamily: 'Lora' }}>
                                    Lectura completa
                                </Typography>

                                {/* Texto completo del arquetipo */}
                                <Box sx={{ mb: 1, p: 3, bgcolor: 'rgba(0,200,255,0.05)', borderRadius: 2, borderLeft: '3px solid rgba(0,200,255,0.4)', border: '1px solid rgba(0,200,255,0.1)' }}>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', whiteSpace: 'pre-line', fontFamily: 'Lora', lineHeight: 1.9, fontSize: '1.05rem' }}>
                                        {selectedArchetype.fullText}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                    <Button
                                        onClick={() => setShowReadingModal(false)}
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
                                                borderColor: '#00c8ff',
                                                bgcolor: 'rgba(0, 200, 255, 0.1)',
                                                boxShadow: '0 0 20px rgba(0, 200, 255, 0.4)',
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

            {/* LIGHTBOX: Zoom de imagen del arquetipo */}
            <Modal
                open={Boolean(zoomedImage)}
                onClose={() => setZoomedImage(null)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 300, sx: { bgcolor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)', cursor: 'zoom-out' } } }}
            >
                <Fade in={Boolean(zoomedImage)}>
                    <Box
                        onClick={() => setZoomedImage(null)}
                        sx={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            outline: 'none',
                            display: 'flex', flexDirection: 'column', alignItems: 'center',
                            maxWidth: '92vw', maxHeight: '92vh'
                        }}
                    >
                        <IconButton
                            onClick={() => setZoomedImage(null)}
                            sx={{ position: 'absolute', top: -16, right: -16, bgcolor: 'rgba(0,0,0,0.7)', color: 'white', zIndex: 1,
                                '&:hover': { bgcolor: 'rgba(0,200,255,0.3)' }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        {zoomedImage && (
                            <>
                                <Box
                                    component="img"
                                    src={zoomedImage.src}
                                    alt={zoomedImage.name}
                                    onClick={(e) => e.stopPropagation()}
                                    sx={{
                                        maxWidth: '88vw', maxHeight: '82vh',
                                        objectFit: 'contain',
                                        borderRadius: 2,
                                        boxShadow: '0 0 60px rgba(0,200,255,0.3)',
                                        border: '1px solid rgba(0,200,255,0.3)'
                                    }}
                                />
                                <Typography variant="caption" sx={{
                                    mt: 2, color: 'rgba(255,255,255,0.6)',
                                    fontFamily: 'Cinzel', letterSpacing: 2, textTransform: 'uppercase'
                                }}>
                                    {zoomedImage.name}
                                </Typography>
                            </>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </ModalLayout>
    );
};

export default ArchetypesView;
