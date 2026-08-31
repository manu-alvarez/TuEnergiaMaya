import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { getPsiChrono, isGalacticActivationPortal } from '../utils/psiChrono';
import { getColorHex, getColorGradient, getColorGlow } from '../utils/colorUtils';

const PsiChronoView = ({ date, kinNumber }) => {
  if (!date) return null;

  const psi = getPsiChrono(date);
  const isGAP = kinNumber ? isGalacticActivationPortal(kinNumber) : false;

  // Si no hay datos Psi para esta fecha, no renderizar
  if (psi.psiKinNumber === null) return null;

  const psiColor = psi.psiConfig?.color || 'Amarilla';

  return (
    <Box sx={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: 4,
      p: 3,
      mb: 3,
    }}>
      {/* Título */}
      <Typography variant="overline" sx={{
        color: '#00c8ff',
        fontFamily: 'Cinzel',
        letterSpacing: 3,
        fontWeight: 'bold',
        fontSize: '0.7rem',
      }}>
        Banco Psi Cronológico
      </Typography>

      {psi.isDayOutOfTime ? (
        // Día Fuera del Tiempo
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Typography variant="h5" sx={{
            color: '#22c55e',
            fontFamily: 'Cinzel',
            fontWeight: 700,
            mb: 1,
          }}>
            ✨ Día Fuera del Tiempo ✨
          </Typography>
          <Typography variant="body2" sx={{
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'Lora',
            fontStyle: 'italic',
            maxWidth: 300,
            mx: 'auto',
          }}>
            Hoy es un portal místico y mágico. Vuelo directo en la cuarta dimensión.
            Reconexión con la noosfera planetaria.
          </Typography>
        </Box>
      ) : (
        // Día normal con Psi Crono
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1.5 }}>
          {/* Badge del sello Psi */}
          <Box sx={{
            width: 50, height: 50,
            borderRadius: '50%',
            background: getColorGradient(psiColor),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${getColorHex(psiColor)}`,
            boxShadow: `0 0 15px ${getColorGlow(psiColor, 0.4)}`,
            p: 0.8,
            flexShrink: 0,
          }}>
            <img
              src={`assets/glyphs/seals/${psi.psiConfig?.slug || 'sun'}.png`}
              alt={psi.psiConfig?.seal_name || 'Psi Crono'}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Box>

          {/* Info del Psi Crono */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" sx={{
              color: 'white',
              fontFamily: 'Cinzel',
              fontWeight: 600,
              fontSize: '0.95rem',
            }}>
              Kin {psi.psiKinNumber}: {psi.psiConfig?.seal_name} {psi.psiConfig?.tone_name}
            </Typography>
            <Typography variant="body2" sx={{
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Lora',
              fontStyle: 'italic',
              fontSize: '0.8rem',
            }}>
              Tu placa reguladora del día — la energía que sincroniza tu campo telepático.
            </Typography>
          </Box>
        </Box>
      )}

      {/* Indicadores especiales */}
      <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {isGAP && (
          <Chip
            label="🌀 Portal de Activación Galáctica"
            size="small"
            sx={{
              bgcolor: 'rgba(147, 51, 234, 0.2)',
              color: '#c084fc',
              fontFamily: 'Lora',
              fontSize: '0.7rem',
              border: '1px solid rgba(147, 51, 234, 0.4)',
              fontWeight: 600,
            }}
          />
        )}
        {psi.isLeapDay && (
          <Chip
            label="Día bisiesto — Misma energía que ayer"
            size="small"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Lora',
              fontSize: '0.7rem',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default PsiChronoView;
