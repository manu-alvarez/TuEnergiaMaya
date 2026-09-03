import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Modal, Backdrop, Fade, CircularProgress, IconButton, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import archetypesData from '../data/archetypes.json';

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
        <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', p: { xs: 1, sm: 2 } }}>
            {/* Header */}
            <Box sx={{ position: 'relative', mb: 4, textAlign: 'center' }}>
                <Button
                    variant="outlined"
                    onClick={onBack}
                    sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}
                >
                    VOLVER
                </Button>
                <Typography variant="h4" sx={{ fontFamily: 'Cinzel', color: '#c084fc', textShadow: '0 0 10px rgba(192, 132, 252, 0.5)' }}>
                    Arquetipos Galácticos
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
                    Hunab Ku 21 · Los 21 Arquetipos del Tzolkin
                </Typography>
            </Box>

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
                            <Card sx={{
                                width: '100%',
                                bgcolor: 'rgba(15, 15, 30, 0.9)',
                                border: '1px solid rgba(192, 132, 252, 0.25)',
                                borderRadius: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                overflow: 'hidden',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 12px 35px rgba(192, 132, 252, 0.25)',
                                    borderColor: 'rgba(192, 132, 252, 0.5)'
                                }
                            }}>
                {/* Imagen */}
                                <Box
                                    sx={{ position: 'relative', height: '260px', overflow: 'hidden', flexShrink: 0, cursor: 'zoom-in' }}
                                    onClick={(e) => { e.stopPropagation(); setZoomedImage({ src: imageSrc, name: arch.archetype }); }}
                                >
                                    <Box
                                        component="img"
                                        src={imageSrc}
                                        alt={arch.archetype}
                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'top center',
                                            display: 'block'
                                        }}
                                    />
                                    {/* Fallback si no carga la imagen */}
                                    <Box sx={{
                                        display: 'none',
                                        width: '100%',
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(135deg, rgba(192,132,252,0.15), rgba(0,200,255,0.1))'
                                    }}>
                                        <AutoAwesomeIcon sx={{ fontSize: 60, color: 'rgba(192,132,252,0.4)' }} />
                                    </Box>
                                    {/* Gradient overlay */}
                                    <Box sx={{
                                        position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80px',
                                        background: 'linear-gradient(to top, rgba(15,15,30,1) 0%, rgba(15,15,30,0) 100%)'
                                    }} />
                                    {/* Badge número */}
                                    <Chip
                                        label={arch.number}
                                        size="small"
                                        sx={{
                                            position: 'absolute', top: 10, left: 10,
                                            bgcolor: 'rgba(0,0,0,0.7)', color: '#c084fc',
                                            fontWeight: 'bold', fontSize: '0.75rem',
                                            border: '1px solid rgba(192,132,252,0.5)'
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
                                    p: 2.5,
                                    '&:last-child': { pb: 2.5 }
                                }}>
                                    <Typography variant="caption" sx={{ color: '#00c8ff', fontWeight: 'bold', mb: 0.5, textTransform: 'uppercase', letterSpacing: 1 }}>
                                        {arch.sealName}
                                    </Typography>
                                    <Typography variant="h6" sx={{ color: 'white', fontFamily: 'Cinzel', mb: 2, fontSize: { xs: '1rem', sm: '1.1rem' }, lineHeight: 1.3 }}>
                                        {arch.archetype}
                                    </Typography>

                                    {/* Poema corto completo sin truncar */}
                                    <Box sx={{
                                        flexGrow: 1,
                                        width: '100%',
                                        mb: 2.5
                                    }}>
                                        <Typography variant="body2" sx={{
                                            color: 'rgba(255,255,255,0.65)',
                                            fontStyle: 'italic',
                                            whiteSpace: 'pre-line',
                                            fontFamily: 'Lora',
                                            lineHeight: 1.7,
                                            fontSize: '0.82rem'
                                        }}>
                                            {arch.poem}
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        onClick={() => handleOpenFullText(arch)}
                                        startIcon={<AutoAwesomeIcon />}
                                        fullWidth
                                        sx={{
                                            bgcolor: 'rgba(192, 132, 252, 0.15)',
                                            color: '#c084fc',
                                            borderRadius: '20px',
                                            border: '1px solid rgba(192,132,252,0.3)',
                                            py: 0.8,
                                            mt: 'auto',
                                            '&:hover': { bgcolor: 'rgba(192, 132, 252, 0.3)' }
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

            {/* Modal de Lectura con Alma */}
            <Modal
                open={showReadingModal}
                onClose={() => setShowReadingModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500, sx: { backdropFilter: 'blur(10px)', bgcolor: 'rgba(0,0,0,0.8)' } }}
            >
                <Fade in={showReadingModal}>
                    <Box sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '92%', maxWidth: 620, maxHeight: '88vh', overflowY: 'auto',
                        bgcolor: 'rgba(12, 12, 28, 0.97)',
                        border: '1px solid rgba(192, 132, 252, 0.4)',
                        borderRadius: 4, p: { xs: 3, sm: 4 }, outline: 'none',
                        boxShadow: '0 0 60px rgba(192, 132, 252, 0.15)'
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
                                <Typography variant="h5" sx={{ fontFamily: 'Cinzel', color: '#c084fc', mb: 0.5, fontWeight: 'bold', textAlign: 'center' }}>
                                    {selectedArchetype.archetype}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 3, textAlign: 'center', fontStyle: 'italic' }}>
                                    Lectura completa
                                </Typography>

                                {/* Texto completo del arquetipo */}
                                <Box sx={{ mb: 1, p: 3, bgcolor: 'rgba(192,132,252,0.05)', borderRadius: 2, borderLeft: '3px solid rgba(192,132,252,0.4)' }}>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)', whiteSpace: 'pre-line', fontFamily: 'Lora', lineHeight: 1.9, fontSize: '1.05rem' }}>
                                        {selectedArchetype.fullText}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Box>
                </Fade>
            </Modal>

            {/* LIGHTBOX: Zoom de imagen del arquetipo */}
            <Modal
                open={Boolean(zoomedImage)}
                onClose={() => setZoomedImage(null)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 300, sx: { bgcolor: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(8px)', cursor: 'zoom-out' } }}
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
                                '&:hover': { bgcolor: 'rgba(192,132,252,0.3)' }
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
                                        boxShadow: '0 0 60px rgba(192,132,252,0.3)',
                                        border: '1px solid rgba(192,132,252,0.3)'
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
        </Box>
    );
};


export default ArchetypesView;
