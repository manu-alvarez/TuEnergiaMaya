import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, Fade, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { calculateKin, getKinConfig, generateMysticalMessage } from '../utils/tzolkin';
import dailyData from '../data/dailyData.json';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QuintaFuerza from './QuintaFuerza';

const NatalKinTool = ({ onClose }) => {
    const [birthDate, setBirthDate] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
        if (!birthDate) {
            alert("Por favor selecciona una fecha");
            return;
        }

        const kinNumber = calculateKin(new Date(birthDate));
        const config = getKinConfig(kinNumber);

        // Obtener descripción rica de dailyData
        const richData = dailyData[kinNumber];
        const mysticalMessage = richData ?
            `${richData.long_description}\n\n"${richData.affirmation}"\n\n*In Lak'ech - Yo soy otro tú.*` :
            generateMysticalMessage(kinNumber);

        // Adapt data structure to what component expects
        const kinData = {
            ...config,
            kin_number: config.number,
            name: `${config.seal_name} ${config.tone_name}`,
            mysticalMessage: mysticalMessage
        };

        setResult(kinData);
    };

    return (
        <Card className="glass-card" sx={{
            p: 4,
            width: '100%',
            maxWidth: 800,
            mx: 'auto',
            border: '1px solid rgba(0, 200, 255, 0.3)', // Turquoise
            boxShadow: '0 0 30px rgba(0, 200, 255, 0.1)', // Turquoise glow
            position: 'relative',
            overflow: 'visible' // Changed to visible for close button
        }}>
            <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    color: 'rgba(255,255,255,0.5)',
                    zIndex: 10,
                    '&:hover': { color: 'white' }
                }}
            >
                <CloseIcon />
            </IconButton>

            <Box sx={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, bgcolor: 'rgba(0, 200, 255, 0.1)', filter: 'blur(60px)', borderRadius: '50%' }} />
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h5" sx={{ fontFamily: 'Cinzel', color: '#00c8ff', mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <CalendarMonthIcon /> TU KIN NATAL
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Lora' }}>
                    Calcula tu Kin de nacimiento y descubre tu mapa galáctico personal.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', mb: 4 }}>
                <TextField
                    type="date"
                    label="Fecha de Nacimiento"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    sx={{
                        flexGrow: 1,
                        maxWidth: 300,
                        input: { color: 'white', colorScheme: 'dark' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.2)' }
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleCalculate}
                    sx={{
                        bgcolor: '#00c8ff',
                        px: 4,
                        fontFamily: 'Cinzel',
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: '#00b4e6' }
                    }}
                >
                    DESCUBRIR MI MAPA
                </Button>
            </Box>

            {result && (
                <Fade in={!!result}>
                    <Box sx={{ mt: 2 }}>
                        <Divider sx={{ mb: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />

                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="h6" sx={{ color: 'white', fontFamily: 'Cinzel', mb: 1 }}>
                                Eres Kin {result.kin_number}: {result.name}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <QuintaFuerza kinData={result} />
                        </Box>

                        <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 4, textAlign: 'left' }}>
                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, fontFamily: 'Lora', whiteSpace: 'pre-line' }}>
                                {result.mysticalMessage}
                            </Typography>
                        </Box>

                        <Box sx={{ mt: 4, textAlign: 'center' }}>
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
                    </Box>
                </Fade>
            )}

            {!result && (
                <Box sx={{ mt: 4, textAlign: 'center' }}>
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
            )}
        </Card>
    );
};

export default NatalKinTool;
