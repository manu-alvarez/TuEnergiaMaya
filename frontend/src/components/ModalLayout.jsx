import React from 'react';
import { Box, Typography, Button, Container, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
    <Container maxWidth={maxWidth} sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100%', 
      py: { xs: 2, md: 4 },
      pt: { xs: 'calc(8px + env(safe-area-inset-top, 0px))', md: 4 },
      pb: { xs: 'calc(8px + env(safe-area-inset-bottom, 0px))', md: 4 }
    }}>
        <Box className="glass-card" sx={{ 
            p: { xs: 2.5, md: 5 }, 
            width: '100%', 
            position: 'relative',
            border: `1px solid ${color}40`,
            boxShadow: `0 0 40px ${color}20`,
            bgcolor: 'rgba(12, 12, 28, 0.95)',
            borderRadius: { xs: 3, md: 4 }
        }}>
            
            {/* Botón X (Cerrar) — siempre visible, sticky en móvil */}
            {onClose && (
                <IconButton
                    onClick={onClose}
                    aria-label="Cerrar"
                    sx={{
                        position: 'sticky',
                        top: 8,
                        float: 'right',
                        zIndex: 10,
                        color: 'rgba(255,255,255,0.5)',
                        bgcolor: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        width: 40,
                        height: 40,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            color: '#fff',
                            bgcolor: 'rgba(0, 200, 255, 0.2)',
                            borderColor: color,
                            boxShadow: `0 0 15px ${color}40`
                        }
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            )}

            {/* Header Estándar */}
            <Box sx={{ textAlign: 'center', mb: 4, mt: onClose ? -3 : 0 }}>
                <Typography variant="h4" sx={{ 
                    fontFamily: 'Cinzel', 
                    color: color, 
                    mb: 1, 
                    textTransform: 'uppercase', 
                    letterSpacing: { xs: 1, md: 3 }, 
                    fontWeight: 800, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 1.5,
                    textShadow: `0 0 20px ${color}80`,
                    fontSize: { xs: '1.3rem', sm: '1.6rem', md: '2rem' },
                    px: { xs: 4, md: 0 }
                }}>
                    {icon} {title}
                </Typography>
                {subtitle && (
                    <Typography variant="subtitle1" sx={{ 
                        color: 'rgba(255,255,255,0.7)', 
                        fontFamily: 'Lora', 
                        fontStyle: 'italic', 
                        mt: 1,
                        fontSize: { xs: '0.85rem', md: '1rem' },
                        px: { xs: 1, md: 0 }
                    }}>
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

