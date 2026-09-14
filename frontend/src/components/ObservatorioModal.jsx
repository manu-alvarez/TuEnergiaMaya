import React, { useState, useEffect } from 'react';
import { Modal, Backdrop, Fade, Box, Typography, Button, CircularProgress } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PublicIcon from '@mui/icons-material/Public';
import ModalLayout from './ModalLayout';

const ObservatorioModal = ({ open, onClose, kinData, onOpenAstro }) => {
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
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: { timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }
            }}
        >
            <Fade in={open}>
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', outline: 'none', overflowY: 'auto' }}>
                    <ModalLayout
                        title="CURIOSIDADES"
                        subtitle="Personajes ilustres e históricos que comparten la energía de este Kin."
                        icon={<PublicIcon fontSize="large" />}
                        onClose={onClose}
                        maxWidth="sm"
                    >
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

                        <Box sx={{ textAlign: 'center', mb: 1, pt: 3, borderTop: '1px solid rgba(0, 200, 255, 0.2)' }}>
                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
                                Descubre cómo se entrelaza la Astrología Tradicional con tu Kin Maya.
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={onOpenAstro}
                                sx={{
                                    bgcolor: 'rgba(0, 200, 255, 0.15)',
                                    color: '#00c8ff',
                                    border: '1px solid rgba(0, 200, 255, 0.5)',
                                    borderRadius: '20px',
                                    px: 4,
                                    py: 1,
                                    fontFamily: 'Cinzel',
                                    fontWeight: 'bold',
                                    letterSpacing: 1,
                                    '&:hover': { bgcolor: 'rgba(0, 200, 255, 0.3)' }
                                }}
                            >
                                VER FUSIÓN ASTROLÓGICA
                            </Button>
                        </Box>
                    </ModalLayout>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ObservatorioModal;
