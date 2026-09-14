import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Fade, Divider } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { calculateKin, getKinConfig, generateMysticalMessage } from '../utils/tzolkin';
import dailyData from '../data/dailyData.json';
import QuintaFuerza from './QuintaFuerza';
import ModalLayout from './ModalLayout';

const NatalKinTool = ({ onClose }) => {
    const [birthDate, setBirthDate] = useState('');
    const [result, setResult] = useState(null);
    const [transitResult, setTransitResult] = useState(null);
    const [showTransit, setShowTransit] = useState(false);

    const handleCalculate = () => {
        if (!birthDate) {
            alert("Por favor selecciona una fecha");
            return;
        }

        const birthDateObj = new Date(birthDate);
        const kinNumber = calculateKin(birthDateObj);
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

        // Kin de Tránsito (Último cumpleaños)
        const today = new Date();
        let lastBirthday = new Date(today.getFullYear(), birthDateObj.getMonth(), birthDateObj.getDate());
        if (lastBirthday > today) {
            lastBirthday.setFullYear(today.getFullYear() - 1);
        }

        const transitKinNumber = calculateKin(lastBirthday);
        const transitConfig = getKinConfig(transitKinNumber);
        setTransitResult({
            ...transitConfig,
            kin_number: transitConfig.number,
            name: `${transitConfig.seal_name} ${transitConfig.tone_name}`
        });
        setShowTransit(false);
    };

    return (
        <ModalLayout 
            title="TU KIN NATAL" 
            subtitle="Calcula tu Kin de nacimiento y descubre tu mapa galáctico personal."
            icon={<CalendarMonthIcon fontSize="large" />}
            onClose={onClose}
            maxWidth="md"
        >
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
                        color: '#000',
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

                        <Box sx={{ textAlign: 'center', mb: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                            <Button 
                                variant={!showTransit ? "contained" : "outlined"}
                                onClick={() => setShowTransit(false)}
                                sx={{ color: !showTransit ? 'black' : 'white', bgcolor: !showTransit ? '#00c8ff' : 'transparent', borderColor: '#00c8ff' }}
                            >
                                KIN NATAL
                            </Button>
                            <Button 
                                variant={showTransit ? "contained" : "outlined"}
                                onClick={() => setShowTransit(true)}
                                sx={{ color: showTransit ? 'black' : 'white', bgcolor: showTransit ? '#00c8ff' : 'transparent', borderColor: '#00c8ff' }}
                            >
                                KIN DE TRÁNSITO
                            </Button>
                        </Box>

                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography variant="h6" sx={{ color: 'white', fontFamily: 'Cinzel', mb: 1 }}>
                                {!showTransit ? `Eres Kin ${result.kin_number}: ${result.name}` : `Tu Kin de Tránsito actual es ${transitResult.kin_number}: ${transitResult.name}`}
                            </Typography>
                            {showTransit && (
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                    (Firma galáctica de tu último cumpleaños en el año solar)
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <QuintaFuerza kinData={!showTransit ? result : transitResult} />
                        </Box>

                        <Box sx={{ mt: 4, p: 3, bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 4, textAlign: 'left' }}>
                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, fontFamily: 'Lora', whiteSpace: 'pre-line' }}>
                                {!showTransit ? result.mysticalMessage : (transitResult.mysticalMessage || `Este año transitas bajo la energía del ${transitResult.name}. Te acompaña la vibración del tono ${transitResult.tone_name} para tu propósito anual.`)}
                            </Typography>
                        </Box>

                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Button
                                variant="outlined"
                                onClick={() => setResult(null)}
                                sx={{
                                    color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '20px',
                                    px: 4, py: 0.5, fontSize: '0.8rem', fontFamily: 'Cinzel', letterSpacing: 2,
                                    '&:hover': { borderColor: '#00c8ff', bgcolor: 'rgba(0,200,255, 0.1)' }
                                }}
                            >
                                VOLVER A CALCULAR
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            )}
        </ModalLayout>
    );
};

export default NatalKinTool;
