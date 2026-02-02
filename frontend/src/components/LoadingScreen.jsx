import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const LoadingScreen = () => {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle, #1a1a2e 0%, #0f0f1a 100%)',
                color: 'white'
            }}
        >
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress
                    size={80}
                    thickness={2}
                    sx={{ color: '#9333ea', position: 'absolute' }}
                />
                <AutoAwesomeIcon
                    sx={{
                        fontSize: 40,
                        color: '#ffb74d',
                        animation: 'pulse 2s infinite ease-in-out'
                    }}
                />
            </Box>

            <Typography
                variant="h6"
                sx={{
                    mt: 4,
                    fontFamily: 'Cinzel',
                    letterSpacing: 4,
                    animation: 'pulse 1.5s infinite',
                    textShadow: '0 0 10px rgba(147, 51, 234, 0.5)'
                }}
            >
                SINCRONIZANDO CON EL TZOLKIN...
            </Typography>

            <Typography
                variant="caption"
                sx={{
                    mt: 1,
                    fontFamily: 'Lora',
                    opacity: 0.5,
                    fontStyle: 'italic'
                }}
            >
                Leyendo hilos del tiempo
            </Typography>
        </Box>
    );
};

export default LoadingScreen;
