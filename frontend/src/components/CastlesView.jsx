import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import FortIcon from '@mui/icons-material/Fort';
import { getCastle } from '../utils/wavespell';
import { CASTLE_CONTENT } from '../data/wavespellContent';
import ModalLayout from './ModalLayout';

const CASTLE_COLORS = {
  'Rojo': '#ef4444',
  'Blanco': '#ffffff',
  'Azul': '#3b82f6',
  'Amarillo': '#eab308',
  'Verde': '#22c55e',
};

const CastlesView = ({ onBack, kinNumber }) => {
    const castleInfo = getCastle(kinNumber);
    const castleColorName = castleInfo.castle.color;
    const currentCastleContent = CASTLE_CONTENT[castleColorName] || CASTLE_CONTENT['Rojo'];
    const currentCastleColorHex = CASTLE_COLORS[castleColorName] || '#ef4444';

    return (
        <ModalLayout
            title="Los 5 Castillos"
            subtitle="El Tzolkin se divide en 5 Castillos de 52 días cada uno. Juntos forman el viaje evolutivo de 260 días."
            icon={<FortIcon fontSize="large" />}
            onClose={onBack}
            maxWidth="lg"
            color="#00c8ff"
        >
            {/* --- CASTILLO ACTUAL INFO --- */}
            <Box className="glass-card" sx={{
                width: '100%', mb: 6, textAlign: 'center', p: 4,
                border: `1px solid ${currentCastleColorHex}50`,
                boxShadow: `0 0 30px ${currentCastleColorHex}20, inset 0 0 15px ${currentCastleColorHex}10`,
                bgcolor: 'rgba(0,0,0,0.4)', borderRadius: '30px'
            }}>
                <Typography variant="overline" sx={{
                    color: currentCastleColorHex, fontFamily: 'Cinzel', letterSpacing: 4,
                    fontWeight: 800, fontSize: '0.9rem', display: 'block', mb: 1, textShadow: `0 0 10px ${currentCastleColorHex}80`
                }}>
                    🏰 {currentCastleContent.subtitle} (CASTILLO ACTUAL)
                </Typography>

                <Typography variant="h4" sx={{
                    color: 'white', fontFamily: 'Cinzel', fontWeight: 800,
                    mb: 1, textTransform: 'uppercase', textShadow: '0 0 15px rgba(255,255,255,0.3)'
                }}>
                    {currentCastleContent.name}
                </Typography>

                <Typography variant="subtitle1" sx={{
                    color: 'rgba(255,255,255,0.7)', fontFamily: 'Lora', fontStyle: 'italic',
                    mb: 3, fontSize: '1.1rem'
                }}>
                    Misión: {currentCastleContent.mission}
                </Typography>

                <Typography variant="body1" sx={{
                    color: 'rgba(255,255,255,0.9)', fontFamily: 'Lora',
                    fontSize: '1.1rem', lineHeight: 1.8, textAlign: 'center',
                    maxWidth: 800, mx: 'auto', mb: 4,
                }}>
                    {currentCastleContent.description}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mb: 4, justifyContent: 'center' }}>
                    <Box sx={{ flex: 1, p: 2, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Typography variant="overline" sx={{ color: '#22c55e', fontWeight: 'bold', mb: 1, display: 'block' }}>EL REGALO</Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Lora', fontStyle: 'italic' }}>
                            {currentCastleContent.theGift}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1, p: 2, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Typography variant="overline" sx={{ color: '#ef4444', fontWeight: 'bold', mb: 1, display: 'block' }}>EL DESAFÍO</Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Lora', fontStyle: 'italic' }}>
                            {currentCastleContent.theChallenge}
                        </Typography>
                    </Box>
                </Box>

                <Typography variant="body2" sx={{
                    color: currentCastleColorHex, fontFamily: 'Cinzel',
                    fontSize: '0.8rem', letterSpacing: 2, fontWeight: 'bold'
                }}>
                    Ondas: {currentCastleContent.waves}
                </Typography>
            </Box>

            <Typography variant="h5" sx={{ fontFamily: 'Cinzel', color: 'white', mb: 4, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2 }}>
                EL VIAJE DE LOS 5 CASTILLOS
            </Typography>

            <Grid container spacing={4}>
                {Object.entries(CASTLE_CONTENT).map(([colorKey, castle]) => {
                    const castleColor = CASTLE_COLORS[colorKey];
                    const isCurrent = colorKey === castleColorName;
                    
                    return (
                        <Grid item xs={12} key={colorKey}>
                            <Card className="glass-card" sx={{ 
                                bgcolor: isCurrent ? 'rgba(0, 0, 0, 0.5)' : 'rgba(15, 15, 25, 0.6)', 
                                border: `1px solid ${castleColor}40`,
                                borderRadius: '24px',
                                transition: 'all 0.4s ease',
                                boxShadow: isCurrent ? `0 0 25px ${castleColor}20` : 'none',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    borderColor: castleColor,
                                    boxShadow: `0 0 30px ${castleColor}30`
                                }
                            }}>
                                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, alignItems: 'flex-start' }}>
                                        <Box sx={{ flex: '0 0 auto', minWidth: '250px' }}>
                                            {isCurrent && (
                                                <Typography variant="overline" sx={{ color: castleColor, fontWeight: 800, letterSpacing: 2, display: 'block', mb: 1 }}>
                                                    CASTILLO ACTUAL
                                                </Typography>
                                            )}
                                            <Typography variant="h5" sx={{ color: castleColor, fontFamily: 'Cinzel', mb: 1, fontWeight: 800 }}>
                                                {castle.name}
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{ color: 'white', mb: 1, fontFamily: 'Cinzel', fontSize: '0.9rem', letterSpacing: 1 }}>
                                                {castle.subtitle}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 2, fontStyle: 'italic', fontFamily: 'Lora' }}>
                                                Misión: {castle.mission}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ flex: '1 1 auto' }}>
                                            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, fontFamily: 'Lora', mb: 2 }}>
                                                {castle.description}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', fontFamily: 'Lora', mb: 1 }}>
                                                <span style={{ color: '#22c55e', fontStyle: 'normal' }}>Regalo:</span> {castle.theGift}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', fontFamily: 'Lora' }}>
                                                <span style={{ color: '#ef4444', fontStyle: 'normal' }}>Desafío:</span> {castle.theChallenge}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </ModalLayout>
    );
};

export default CastlesView;
