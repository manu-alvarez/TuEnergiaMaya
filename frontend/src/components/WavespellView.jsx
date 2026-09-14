import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade, Button, IconButton, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import WavesIcon from '@mui/icons-material/Waves';
import { getWavespell, getCastle } from '../utils/wavespell';
import { getKinConfig } from '../utils/tzolkin';
import { getColorHex, getColorGradient, getColorGlow } from '../utils/colorUtils';
import { WAVE_DESCRIPTIONS, TONE_POSITIONS, CASTLE_CONTENT } from '../data/wavespellContent';
import ModalLayout from './ModalLayout';

const CASTLE_COLORS = {
  'Rojo': '#ef4444', 'Blanco': '#ffffff', 'Azul': '#3b82f6',
  'Amarillo': '#eab308', 'Verde': '#22c55e',
};

const WavespellView = ({ kinNumber, onClose }) => {
  const [activeKin, setActiveKin] = useState(kinNumber);
  const [prevKinNumber, setPrevKinNumber] = useState(kinNumber);

  if (kinNumber !== prevKinNumber) {
    setPrevKinNumber(kinNumber);
    setActiveKin(kinNumber);
  }

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
    <ModalLayout
        title="ONDA ENCANTADA"
        subtitle="El ciclo de 13 días con un propósito específico"
        icon={<WavesIcon fontSize="large" />}
        onClose={onClose}
        maxWidth="md"
    >
        {/* --- ONDA ENCANTADA ACTUAL INFO --- */}
        <Box className="glass-card" sx={{
          width: '100%', mb: 3, textAlign: 'center', p: 3,
          border: '1px solid rgba(0, 200, 255, 0.5)',
          borderRadius: 4
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

        {/* --- LAS 20 ONDAS ENCANTADAS (DESGLOSE) --- */}
        <Typography variant="h5" sx={{ fontFamily: 'Cinzel', color: 'white', mb: 4, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2 }}>
            EL CICLO DE LAS 20 ONDAS ENCANTADAS
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {Object.entries(WAVE_DESCRIPTIONS).map(([slug, wave]) => {
            const isCurrentWave = slug === startSlug;
            return (
              <Grid item xs={12} sm={6} key={slug}>
                <Box className="glass-card" sx={{
                  p: 3, height: '100%', display: 'flex', flexDirection: 'column',
                  border: isCurrentWave ? '1px solid #00c8ff' : '1px solid rgba(255,255,255,0.1)',
                  bgcolor: isCurrentWave ? 'rgba(0, 200, 255, 0.05)' : 'rgba(0,0,0,0.3)',
                  boxShadow: isCurrentWave ? '0 0 20px rgba(0, 200, 255, 0.2)' : 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#00c8ff',
                    transform: 'translateY(-2px)'
                  }
                }}>
                  {isCurrentWave && (
                    <Typography variant="overline" sx={{ color: '#00c8ff', fontWeight: 800, mb: 1, display: 'block' }}>
                      ONDA ACTUAL
                    </Typography>
                  )}
                  <Typography variant="h6" sx={{ color: 'white', fontFamily: 'Cinzel', fontWeight: 800, mb: 0.5, fontSize: '1.1rem' }}>
                    {wave.name}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Lora', fontStyle: 'italic', mb: 2 }}>
                    Propósito: {wave.purpose}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'Lora', mb: 2, flexGrow: 1, lineHeight: 1.6 }}>
                    {wave.description}
                  </Typography>
                  <Box sx={{ mt: 'auto', p: 1.5, bgcolor: 'rgba(0,200,255,0.05)', borderRadius: '10px', borderLeft: '3px solid #00c8ff' }}>
                    <Typography variant="caption" sx={{ color: '#00c8ff', fontFamily: 'Cinzel', fontWeight: 800, display: 'block', mb: 0.5 }}>
                      MANTRA
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'Lora', fontStyle: 'italic', fontSize: '0.85rem' }}>
                      "{wave.mantra}"
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
    </ModalLayout>
  );
};

export default WavespellView;
