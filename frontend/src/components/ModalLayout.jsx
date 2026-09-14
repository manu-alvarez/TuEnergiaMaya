import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const ModalLayout = ({ 
  title, 
  subtitle, 
  onClose, 
  children,
  maxWidth = 'lg',
  icon = null,
  color = '#00c8ff'
}) => {
  return (
    <Container maxWidth={maxWidth} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%', py: { xs: 2, md: 4 } }}>
        <Box className="glass-card" sx={{ 
            p: { xs: 3, md: 5 }, 
            width: '100%', 
            position: 'relative',
            border: `1px solid ${color}40`,
            boxShadow: `0 0 40px ${color}20`,
            bgcolor: 'rgba(12, 12, 28, 0.95)',
            borderRadius: 4
        }}>
            
            {/* Header Estándar */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ 
                    fontFamily: 'Cinzel', 
                    color: color, 
                    mb: 1, 
                    textTransform: 'uppercase', 
                    letterSpacing: 3, 
                    fontWeight: 800, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 1.5,
                    textShadow: `0 0 20px ${color}80`
                }}>
                    {icon} {title}
                </Typography>
                {subtitle && (
                    <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Lora', fontStyle: 'italic', mt: 1 }}>
                        {subtitle}
                    </Typography>
                )}
            </Box>

            {/* Contenido Principal */}
            <Box sx={{ mb: 4 }}>
                {children}
            </Box>

            {/* Botón VOLVER Unificado */}
            {onClose && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        sx={{
                            color: 'white',
                            borderColor: 'rgba(255, 255, 255, 0.3)',
                            borderRadius: '30px',
                            px: 6, py: 1.2,
                            fontFamily: 'Cinzel',
                            fontWeight: 700,
                            letterSpacing: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderColor: color,
                                bgcolor: `${color}10`,
                                boxShadow: `0 0 20px ${color}40`,
                                transform: 'scale(1.05)'
                            }
                        }}
                    >
                        VOLVER
                    </Button>
                </Box>
            )}
        </Box>
    </Container>
  );
};

export default ModalLayout;
