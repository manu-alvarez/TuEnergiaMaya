import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade, Button, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getWavespell, getCastle } from '../utils/wavespell';
import { getKinConfig } from '../utils/tzolkin';
import { getColorHex, getColorGradient, getColorGlow } from '../utils/colorUtils';
import { WAVE_DESCRIPTIONS, TONE_POSITIONS, CASTLE_CONTENT } from '../data/wavespellContent';

const CASTLE_COLORS = {
  'Rojo': '#ef4444', 'Blanco': '#ffffff', 'Azul': '#3b82f6',
  'Amarillo': '#eab308', 'Verde': '#22c55e',
};

const WavespellView = ({ kinNumber, onClose }) => {
  const [activeKin, setActiveKin] = useState(kinNumber);

  useEffect(() => {
    if (kinNumber) setActiveKin(kinNumber);
  }, [kinNumber]);

  if (!kinNumber || !activeKin) return null;

  const wavespell = getWavespell(activeKin);
  const castle = getCastle(activeKin);
  const startKinConfig = getKinConfig(wavespell.wavespellStartKin);
  const startSlug = startKinConfig.slug;
  const castleColor = CASTLE_COLORS[castle.castle.color] || '#eab308';

  // Contenido interpretativo
  const waveContent = WAVE_DESCRIPTIONS[startSlug] || WAVE_DESCRIPTIONS.dragon;
  // Solo mostramos la posición tonal si el kinNumber prop está dentro de esta onda actual
  const isOriginalWavespell = kinNumber >= wavespell.wavespellStartKin && kinNumber < wavespell.wavespellStartKin + 13;
  const tonePosition = isOriginalWavespell ? TONE_POSITIONS[getWavespell(kinNumber).dayInWave - 1] : null;
  const castleContent = CASTLE_CONTENT[castle.castle.color] || CASTLE_CONTENT['Rojo'];

  // Generar los 13 Kines de la onda
  const waveKins = Array.from({ length: 13 }, (_, i) => {
    const waveKinNum = wavespell.wavespellStartKin + i;
    return { number: waveKinNum, ...getKinConfig(waveKinNum) };
  });

  const handlePrev = () => setActiveKin(prev => prev > 13 ? prev - 13 : prev + 247);
  const handleNext = () => setActiveKin(prev => prev <= 247 ? prev + 13 : prev - 247);

  return (
    <Fade in={true}>
      <Box sx={{
        width: '100%', maxWidth: 600, mx: 'auto', p: { xs: 1, sm: 2 },
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>

        {/* --- ONDA ENCANTADA --- */}
        <Box className="glass-card" sx={{
          width: '100%', mb: 3, textAlign: 'center',
          border: '1px solid rgba(0, 200, 255, 0.5)',
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 0.5, mt: 1 }}>
            <IconButton onClick={handlePrev} sx={{ color: '#00c8ff' }}>
              <ArrowBackIosIcon fontSize="small" />
            </IconButton>
            <Typography variant="overline" sx={{
              color: '#00c8ff', fontFamily: 'Cinzel', letterSpacing: 2,
              fontWeight: 700, fontSize: '0.7rem', display: 'block', mx: 2
            }}>
              🌊 Onda Encantada {wavespell.wavespellNumber} de 20
            </Typography>
            <IconButton onClick={handleNext} sx={{ color: '#00c8ff' }}>
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="h5" sx={{
            color: 'white', fontFamily: 'Cinzel', fontWeight: 800,
            textTransform: 'uppercase', mb: 0.5, fontSize: { xs: '1.3rem', sm: '1.5rem' },
          }}>
            {waveContent.name}
          </Typography>

          <Typography variant="subtitle2" sx={{
            color: 'rgba(255,255,255,0.5)', fontFamily: 'Lora', fontStyle: 'italic',
            mb: 2.5, fontSize: '0.9rem',
          }}>
            {waveContent.purpose}
          </Typography>

          {/* Descripción de la onda */}
          <Typography variant="body1" sx={{
            color: 'rgba(255,255,255,0.9)', fontFamily: 'Lora',
            fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'center',
            px: { xs: 1, sm: 3 }, mb: 2,
          }}>
            {waveContent.description}
          </Typography>

          <Typography variant="body2" sx={{
            color: '#00c8ff', fontFamily: 'Lora', fontStyle: 'italic',
            fontSize: '1rem', px: 2, mb: 3,
          }}>
            "{waveContent.invitation}"
          </Typography>

          {/* Los 13 sellos */}
          <Box sx={{
            display: 'flex', flexWrap: 'wrap', gap: { xs: 0.5, sm: 0.8 },
            justifyContent: 'center', mb: 3, px: 1,
          }}>
            {waveKins.map((wk, i) => {
              const isToday = wk.number === kinNumber;
              const sealColor = getColorHex(wk.color);
              return (
                <Box key={wk.number} sx={{ width: { xs: 44, sm: 52 }, textAlign: 'center' }}>
                  <Box sx={{
                    width: { xs: 38, sm: 46 }, height: { xs: 38, sm: 46 },
                    borderRadius: '50%', mx: 'auto',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isToday ? getColorGradient(wk.color) : 'rgba(255,255,255,0.03)',
                    border: isToday ? `2px solid ${sealColor}` : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: isToday ? `0 0 25px ${getColorGlow(wk.color)}` : 'none',
                    transition: 'all 0.3s ease', overflow: 'hidden', p: 0.6,
                  }}>
                    <img
                      src={`assets/glyphs/seals/${wk.slug}.png`}
                      alt={wk.seal_name}
                      style={{
                        width: '100%', height: '100%', objectFit: 'contain',
                        opacity: isToday ? 1 : 0.4,
                        filter: isToday ? 'none' : 'grayscale(0.6)',
                      }}
                    />
                  </Box>
                  <Typography sx={{
                    fontSize: '0.5rem', mt: 0.3, fontFamily: 'Cinzel',
                    color: isToday ? sealColor : 'rgba(255,255,255,0.3)',
                    fontWeight: isToday ? 700 : 400,
                  }}>
                    {i + 1}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* Posición tonal de hoy (solo si es la onda actual) */}
          {tonePosition && (
            <Box sx={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              pt: 2.5, px: { xs: 1, sm: 3 }, mb: 2
            }}>
              <Typography variant="subtitle2" sx={{
                color: '#00c8ff', fontFamily: 'Cinzel', fontWeight: 800,
                letterSpacing: 2, mb: 1, fontSize: '0.75rem',
              }}>
                HOY: DÍA {getWavespell(kinNumber).dayInWave} — TONO {tonePosition.name.toUpperCase()}
              </Typography>
              <Typography variant="overline" sx={{
                color: 'rgba(255,255,255,0.5)', fontFamily: 'Cinzel',
                letterSpacing: 3, fontSize: '0.65rem',
              }}>
                Función: {tonePosition.function}
              </Typography>
              <Typography variant="body1" sx={{
                color: 'rgba(255,255,255,0.85)', fontFamily: 'Lora', fontStyle: 'italic',
                fontSize: '1rem', lineHeight: 1.8, mt: 1, textAlign: 'center',
              }}>
                {tonePosition.description}
              </Typography>
            </Box>
          )}
        </Box>

        {/* --- CASTILLO --- */}
        <Box className="glass-card" sx={{
          width: '100%', mb: 3, textAlign: 'center',
          border: `1px solid ${castleColor}40`,
          boxShadow: `0 0 25px ${castleColor}15, inset 0 0 10px ${castleColor}05`,
        }}>
          <Typography variant="overline" sx={{
            color: castleColor, fontFamily: 'Cinzel', letterSpacing: 4,
            fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 0.5,
          }}>
            🏰 {castleContent.subtitle}
          </Typography>

          <Typography variant="h6" sx={{
            color: 'white', fontFamily: 'Cinzel', fontWeight: 700,
            mb: 0.5, fontSize: '1.2rem',
          }}>
            {castleContent.name}
          </Typography>

          <Typography variant="subtitle2" sx={{
            color: 'rgba(255,255,255,0.4)', fontFamily: 'Lora', fontStyle: 'italic',
            mb: 2, fontSize: '0.85rem',
          }}>
            Misión: {castleContent.mission}
          </Typography>

          <Typography variant="body1" sx={{
            color: 'rgba(255,255,255,0.85)', fontFamily: 'Lora',
            fontSize: '1rem', lineHeight: 1.8, textAlign: 'center',
            px: { xs: 1, sm: 3 }, mb: 2,
          }}>
            {castleContent.description}
          </Typography>

          <Typography variant="body2" sx={{
            color: 'rgba(255,255,255,0.4)', fontFamily: 'Cinzel',
            fontSize: '0.7rem', letterSpacing: 2,
          }}>
            Ondas: {castleContent.waves}
          </Typography>
        </Box>

        {/* Botón volver */}
        {onClose && (
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '20px', px: 4, py: 0.5, fontSize: '0.8rem',
              fontFamily: 'Cinzel', letterSpacing: 2, mt: 1,
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            VOLVER
          </Button>
        )}
      </Box>
    </Fade>
  );
};

export default WavespellView;
