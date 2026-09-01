import React, { useState, useEffect } from 'react';
import { Modal, Backdrop, Fade, Box, Typography, Button, CircularProgress } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const ObservatorioModal = ({ open, onClose, kinData }) => {
    const [newsData, setNewsData] = useState(null);
    const [reading, setReading] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (open && !reading && !isLoading) {
            fetchObservatorio();
        }
    }, [open]);

    const fetchObservatorio = async () => {
        if (!kinData?.kin) return;
        setIsLoading(true);
        try {
            const { api } = await import('../services/api');
            const result = await api.getObservatorio(kinData.kin);
            setReading(result.response);
            setNewsData(result.news);
        } catch (error) {
            setReading("El observatorio está en mantenimiento y no pudimos sincronizar con las noticias globales. Inténtalo más tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500, sx: { backdropFilter: 'blur(10px)', bgcolor: 'rgba(0,0,0,0.8)' } }}
        >
            <Fade in={open}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: '90%', maxWidth: 600, maxHeight: '85vh', overflowY: 'auto',
                    bgcolor: 'rgba(15, 15, 30, 0.95)',
                    border: '1px solid rgba(0, 200, 255, 0.4)',
                    borderRadius: 4, p: { xs: 3, sm: 4 }, outline: 'none',
                    boxShadow: '0 0 40px rgba(0, 200, 255, 0.2)'
                }}>
                    <Typography variant="h5" sx={{ fontFamily: 'Cinzel', color: '#00c8ff', mb: 1, fontWeight: 'bold', textAlign: 'center' }}>
                        SINCRONARIO GLOBAL
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3, textAlign: 'center' }}>
                        Personajes ilustres e históricos que comparten la energía de este Kin.
                    </Typography>

                    {isLoading ? (
                        <Box sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CircularProgress sx={{ color: '#00c8ff', mb: 3 }} />
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
                                Explorando los registros akáshicos y la historia humana...
                            </Typography>
                        </Box>
                    ) : (
                        <Box>
                            {reading && (
                                <Box sx={{ mb: 4 }}>
                                    <Typography sx={{ color: 'white', lineHeight: 1.8, whiteSpace: 'pre-line', fontFamily: 'Lora' }}>
                                        <AutoAwesomeIcon sx={{ color: '#00c8ff', fontSize: 16, mr: 1, verticalAlign: 'text-bottom' }} />
                                        {reading}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}

                    <Box sx={{ textAlign: 'center' }}>
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            sx={{
                                color: 'white',
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                borderRadius: '20px',
                                px: 4,
                                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                            }}
                        >
                            CERRAR
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ObservatorioModal;
