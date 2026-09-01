import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button, Modal, Backdrop, Fade, CircularProgress, IconButton } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import archetypesData from '../data/archetypes.json';

const ArchetypesView = ({ onBack, kinData }) => {
    const [selectedArchetype, setSelectedArchetype] = useState(null);
    const [reading, setReading] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showReadingModal, setShowReadingModal] = useState(false);

    const archetypeKeys = Object.keys(archetypesData);

    const handleReadSoul = async (archetype) => {
        setSelectedArchetype(archetype);
        setReading(null);
        setIsLoading(true);
        setShowReadingModal(true);

        try {
            const { api } = await import('../services/api');
            const userKin = kinData ? `${kinData.kin.seal_name} ${kinData.kin.tone_name}` : "Desconocido";
            const response = await api.getArchetypeReading(archetype, userKin);
            setReading(response.response);
        } catch (error) {
            setReading("Lo siento, la conexión con la memoria galáctica falló. Inténtalo de nuevo.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontFamily: 'Cinzel', color: '#c084fc', textShadow: '0 0 10px rgba(192, 132, 252, 0.5)' }}>
                    Arquetipos Galácticos
                </Typography>
                <Button variant="outlined" onClick={onBack} sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)' }}>
                    VOLVER
                </Button>
            </Box>

            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
                Los 21 Arquetipos Galácticos representan los modelos originales de la memoria cósmica. Descubre el poema y el propósito de cada uno.
            </Typography>

            <Grid container spacing={4}>
                {archetypeKeys.map(key => {
                    const arch = archetypesData[key];
                    const imageSrc = key === 'hunabKu' ? '/assets/archetypes/hunabKu.png' : `/assets/archetypes/${key}.png`;
                    
                    return (
                        <Grid item xs={12} sm={6} md={4} key={key}>
                            <Card sx={{ 
                                bgcolor: 'rgba(20, 20, 35, 0.8)', 
                                border: '1px solid rgba(192, 132, 252, 0.3)', 
                                borderRadius: 4,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 10px 30px rgba(192, 132, 252, 0.2)'
                                }
                            }}>
                                <Box sx={{ 
                                    height: '350px', 
                                    backgroundImage: `url(${imageSrc})`,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'top center',
                                    borderTopLeftRadius: 16,
                                    borderTopRightRadius: 16,
                                    position: 'relative'
                                }}>
                                    <Box sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        width: '100%',
                                        background: 'linear-gradient(to top, rgba(20, 20, 35, 1), rgba(20, 20, 35, 0))',
                                        height: '100px'
                                    }}/>
                                </Box>
                                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 3 }}>
                                    <Typography variant="caption" sx={{ color: '#00c8ff', fontWeight: 'bold', mb: 1 }}>
                                        {arch.number}. {arch.hunabKuName}
                                    </Typography>
                                    <Typography variant="h5" sx={{ color: 'white', fontFamily: 'Cinzel', mb: 2 }}>
                                        {arch.archetype}
                                    </Typography>
                                    
                                    <Box sx={{ 
                                        flexGrow: 1, 
                                        width: '100%', 
                                        mb: 3, 
                                        maxHeight: '150px',
                                        overflowY: 'auto',
                                        pr: 1,
                                        '&::-webkit-scrollbar': { width: '4px' },
                                        '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(192, 132, 252, 0.5)', borderRadius: '4px' }
                                    }}>
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', whiteSpace: 'pre-line', fontFamily: 'Lora' }}>
                                            "{arch.fullText || arch.poem}"
                                        </Typography>
                                    </Box>

                                    <Button 
                                        variant="contained" 
                                        onClick={() => handleReadSoul(arch)}
                                        startIcon={<AutoAwesomeIcon />}
                                        sx={{ 
                                            bgcolor: 'rgba(192, 132, 252, 0.2)', 
                                            color: '#c084fc', 
                                            borderRadius: '20px',
                                            '&:hover': { bgcolor: 'rgba(192, 132, 252, 0.4)' }
                                        }}
                                    >
                                        Lectura con Alma
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
                        width: '90%', maxWidth: 600, maxHeight: '85vh', overflowY: 'auto',
                        bgcolor: 'rgba(15, 15, 30, 0.95)',
                        border: '1px solid rgba(192, 132, 252, 0.4)',
                        borderRadius: 4, p: { xs: 3, sm: 4 }, outline: 'none',
                        boxShadow: '0 0 40px rgba(192, 132, 252, 0.2)'
                    }}>
                        <IconButton 
                            onClick={() => setShowReadingModal(false)}
                            sx={{ position: 'absolute', right: 8, top: 8, color: 'rgba(255,255,255,0.5)' }}
                        >
                            <CloseIcon />
                        </IconButton>
                        
                        <Typography variant="h5" sx={{ fontFamily: 'Cinzel', color: '#c084fc', mb: 1, fontWeight: 'bold', textAlign: 'center' }}>
                            {selectedArchetype?.archetype}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, textAlign: 'center' }}>
                            Lectura del Alma y Propósito Galáctico
                        </Typography>

                        {isLoading ? (
                            <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <CircularProgress sx={{ color: '#c084fc', mb: 3 }} />
                                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
                                    Conectando con la memoria cósmica...
                                </Typography>
                            </Box>
                        ) : (
                            <Typography sx={{ color: 'white', lineHeight: 1.8, whiteSpace: 'pre-line', fontFamily: 'Lora' }}>
                                {reading}
                            </Typography>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default ArchetypesView;
