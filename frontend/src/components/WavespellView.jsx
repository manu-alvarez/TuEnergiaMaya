import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { getWavespell, getCastle } from '../utils/wavespell';
import { getKinConfig } from '../utils/tzolkin';
import { getColorHex, getColorGlow, getColorGradient } from '../utils/colorUtils';

const CASTLE_COLORS = {
  'Rojo': '#ef4444',
  'Blanco': '#ffffff',
  'Azul': '#3b82f6',
  'Amarillo': '#eab308',
  'Verde': '#22c55e',
};

const WavespellView = ({ kinNumber }) => {
  if (!kinNumber) return null;

  const wavespell = getWavespell(kinNumber);
  const castle = getCastle(kinNumber);
  const startKinConfig = getKinConfig(wavespell.wavespellStartKin);
  const castleColor = CASTLE_COLORS[castle.castle.color] || '#eab308';

  // Generar los 13 Kines de la onda
  const waveKins = Array.from({ length: 13 }, (_, i) => {
    const waveKinNum = wavespell.wavespellStartKin + i;
    const config = getKinConfig(waveKinNum);
    return { number: waveKinNum, ...config };
  });

  return (
    <Box sx={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: 4,
      p: 3,
      mb: 3,
    }}>
      {/* Título de la Onda */}
      <Typography variant="overline" sx={{
        color: castleColor,
        fontFamily: 'Cinzel',
        letterSpacing: 3,
        fontWeight: 'bold',
        fontSize: '0.7rem',
      }}>
        {castle.castle.name}
      </Typography>

      <Typography variant="h6" sx={{
        color: 'white',
        fontFamily: 'Cinzel',
        fontWeight: 700,
        mt: 0.5,
        mb: 0.5,
      }}>
        Onda Encantada del {startKinConfig.seal_name}
      </Typography>

      <Typography variant="body2" sx={{
        color: 'rgba(255,255,255,0.6)',
        fontFamily: 'Lora',
        fontStyle: 'italic',
        mb: 2,
      }}>
        Hoy navegas el día {wavespell.dayInWave} de 13 — Propósito: {startKinConfig.seal_desc}
      </Typography>

      {/* Los 13 días de la Onda */}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0.8,
        justifyContent: 'center',
        mb: 2,
      }}>
        {waveKins.map((wk, i) => {
          const isToday = wk.number === kinNumber;
          const sealColor = getColorHex(wk.color);

          return (
            <Box
              key={wk.number}
              sx={{
                width: { xs: 42, sm: 50 },
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Badge circular del sello */}
              <Box sx={{
                width: { xs: 36, sm: 44 },
                height: { xs: 36, sm: 44 },
                borderRadius: '50%',
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isToday ? getColorGradient(wk.color) : 'rgba(255,255,255,0.05)',
                border: isToday
                  ? `2px solid ${sealColor}`
                  : '1px solid rgba(255,255,255,0.1)',
                boxShadow: isToday ? `0 0 20px ${getColorGlow(wk.color)}` : 'none',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                p: 0.6,
              }}>
                <img
                  src={`assets/glyphs/seals/${wk.slug}.png`}
                  alt={wk.seal_name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    opacity: isToday ? 1 : 0.5,
                    filter: isToday ? 'none' : 'grayscale(0.5)',
                  }}
                />
              </Box>

              {/* Número del tono */}
              <Typography sx={{
                fontSize: '0.55rem',
                color: isToday ? sealColor : 'rgba(255,255,255,0.4)',
                fontWeight: isToday ? 700 : 400,
                mt: 0.3,
                fontFamily: 'Cinzel',
              }}>
                {i + 1}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Chip del castillo */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
        <Chip
          label={`Día ${wavespell.dayInWave} de 13`}
          size="small"
          sx={{
            bgcolor: 'rgba(255,255,255,0.08)',
            color: 'white',
            fontFamily: 'Lora',
            fontSize: '0.7rem',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        />
        <Chip
          label={`Onda ${wavespell.wavespellNumber} de 20`}
          size="small"
          sx={{
            bgcolor: 'rgba(255,255,255,0.08)',
            color: 'white',
            fontFamily: 'Lora',
            fontSize: '0.7rem',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
        />
      </Box>
    </Box>
  );
};

export default WavespellView;
