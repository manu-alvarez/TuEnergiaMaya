import React from 'react';
import { Box, Typography, Avatar, Tooltip, Fade } from '@mui/material';

const GalacticCompass = ({ kinData }) => {
    if (!kinData || !kinData.oracle) return null;

    const { guide, analog, antipode, occult } = kinData.oracle;

    const OracleSeal = ({ seal, position, label }) => (
        <Tooltip title={`${label}: ${seal.name}`} arrow placement="top">
            <Box sx={{
                position: 'absolute',
                ...position,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'scale(1.2) translateY(-5px)',
                    filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.4))'
                },
                cursor: 'pointer'
            }}>
                <Avatar
                    src={`/assets/glyphs/seals/${seal.slug}.png`}
                    sx={{
                        width: { xs: 50, md: 65 },
                        height: { xs: 50, md: 65 },
                        border: '2px solid rgba(255,255,255,0.1)',
                        bgcolor: 'rgba(255,255,255,0.05)',
                        p: 0.5,
                        boxShadow: `0 0 20px ${seal.color === 'Rojo' ? 'rgba(239, 68, 68, 0.3)' :
                            seal.color === 'Blanco' ? 'rgba(255, 255, 255, 0.3)' :
                                seal.color === 'Azul' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(252, 211, 77, 0.3)'}`
                    }}
                />
                <Typography variant="caption" sx={{ mt: 0.5, color: 'rgba(255,255,255,0.7)', fontFamily: 'Cinzel', fontSize: '0.6rem', letterSpacing: 1 }}>
                    {label}
                </Typography>
            </Box>
        </Tooltip>
    );

    return (
        <Fade in={true} timeout={1500}>
            <Box sx={{
                position: 'relative',
                width: { xs: 240, md: 320 },
                height: { xs: 240, md: 320 },
                mx: 'auto',
                my: 6,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'radial-gradient(circle, rgba(147, 51, 234, 0.05) 0%, transparent 70%)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    border: '1px dashed rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    animation: 'rotateBorder 20s linear infinite'
                }
            }}>
                {/* Center - Destino */}
                <Box sx={{
                    zIndex: 2,
                    textAlign: 'center',
                    animation: 'float 3s ease-in-out infinite'
                }}>
                    <Avatar
                        src={`/assets/glyphs/seals/${kinData.slug}.png`}
                        sx={{
                            width: { xs: 80, md: 100 },
                            height: { xs: 80, md: 100 },
                            border: '3px solid #9333ea',
                            bgcolor: 'rgba(147, 51, 234, 0.1)',
                            p: 1,
                            boxShadow: '0 0 30px rgba(147, 51, 234, 0.5)'
                        }}
                    />
                    <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#9333ea', fontWeight: 'bold', fontFamily: 'Cinzel' }}>
                        DESTINO (K{kinData.number})
                    </Typography>
                </Box>

                {/* The 4 Directions */}
                <OracleSeal seal={guide} label="GUÍA" position={{ top: -10 }} />
                <OracleSeal seal={analog} label="ANÁLOGO" position={{ right: -10 }} />
                <OracleSeal seal={antipode} label="ANTÍPODA" position={{ left: -10 }} />
                <OracleSeal seal={occult} label="OCULTO" position={{ bottom: -10 }} />

                {/* Connecting Lines */}
                <Box sx={{
                    position: 'absolute',
                    width: '70%',
                    height: '70%',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }} />
            </Box>
        </Fade>
    );
};

export default GalacticCompass;
