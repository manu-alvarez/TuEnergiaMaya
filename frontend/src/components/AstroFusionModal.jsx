import React, { useState } from 'react';
import { Modal, Backdrop, Fade, Box, Typography, Button, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ModalLayout from './ModalLayout';

const AstroFusionModal = ({ open, onClose, kinData }) => {
    const [zodiacSign, setZodiacSign] = useState('');
    const [reading, setReading] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const signs = [
        "Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo",
        "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"
    ];

    const handleFusion = async () => {
        if (!zodiacSign || !kinData?.kin) return;
        setIsLoading(true);
        setReading(null);
        try {
            const { api } = await import('../services/api');
            const result = await api.getAstrologyFusion(kinData.kin, zodiacSign);
            setReading(result.response);
        } catch (error) {
            setReading("Las estrellas están nubladas hoy. No pudimos realizar la fusión. Inténtalo más tarde.");
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
                        title="FUSIÓN ASTROLÓGICA"
                        subtitle="Cruza la sabiduría de tu Signo Zodiacal con tu Energía Maya actual."
                        icon={<AutoFixHighIcon fontSize="large" />}
                        onClose={onClose}
                        maxWidth="sm"
                    >
                        {!reading && !isLoading && (
                            <Box sx={{ mb: 4, textAlign: 'center' }}>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <InputLabel sx={{ color: 'rgba(255,255,255,0.6)' }} id="zodiac-select-label">Tu Signo Zodiacal</InputLabel>
                                    <Select
                                        labelId="zodiac-select-label"
                                        value={zodiacSign}
                                        label="Tu Signo Zodiacal"
                                        onChange={(e) => setZodiacSign(e.target.value)}
                                        sx={{
                                            color: 'white',
                                            textAlign: 'left',
                                            '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#00c8ff' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#00c8ff' },
                                            '.MuiSvgIcon-root': { color: 'white' }
                                        }}
                                    >
                                        {signs.map(sign => (
                                            <MenuItem key={sign} value={sign}>{sign}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Button
                                    variant="contained"
                                    disabled={!zodiacSign}
                                    onClick={handleFusion}
                                    sx={{
                                        bgcolor: 'rgba(0, 200, 255, 0.2)',
                                        color: '#00c8ff',
                                        border: '1px solid #00c8ff',
                                        borderRadius: '20px',
                                        px: 4,
                                        py: 1,
                                        fontFamily: 'Cinzel',
                                        fontWeight: 'bold',
                                        '&:hover': { bgcolor: 'rgba(0, 200, 255, 0.4)' },
                                        '&.Mui-disabled': { bgcolor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }
                                    }}
                                >
                                    ALINEAR ASTROS
                                </Button>
                            </Box>
                        )}

                        {isLoading && (
                            <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <CircularProgress sx={{ color: '#00c8ff', mb: 2 }} />
                                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
                                    Leyendo las estrellas...
                                </Typography>
                            </Box>
                        )}

                        {reading && (
                            <Box sx={{ textAlign: 'left', mb: 4 }}>
                                <Typography sx={{ color: 'white', lineHeight: 1.8, whiteSpace: 'pre-line', fontFamily: 'Lora' }}>
                                    {reading}
                                </Typography>
                                <Box sx={{ mt: 3, textAlign: 'center' }}>
                                    <Button
                                        variant="text"
                                        onClick={() => setReading(null)}
                                        sx={{ color: '#00c8ff', textTransform: 'none' }}
                                    >
                                        Hacer otra consulta
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </ModalLayout>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AstroFusionModal;
