import React from 'react';
import { Box, Typography, Fade, Button } from '@mui/material';
import { getPsiChrono, isGalacticActivationPortal } from '../utils/psiChrono';
import { getColorHex, getColorGradient, getColorGlow, getGlyphFilter } from '../utils/colorUtils';
import { PSI_CHRONO_INTRO, GAP_CONTENT, DFT_CONTENT, SEAL_PSI_MEANINGS } from '../data/psiChronoContent';

const PsiChronoView = ({ date, kinNumber, onClose }) => {
  if (!date) return null;

  const psi = getPsiChrono(date);
  const isGAP = kinNumber ? isGalacticActivationPortal(kinNumber) : false;

  if (psi.psiKinNumber === null) return null;

  const psiColor = psi.psiConfig?.color || 'Amarilla';
  const psiSlug = psi.psiConfig?.slug || 'sun';
  const psiMeaning = SEAL_PSI_MEANINGS[psiSlug] || SEAL_PSI_MEANINGS.sun;

  return (
    <Fade in={true}>
      <Box sx={{
        width: '100%', maxWidth: 600, mx: 'auto', p: { xs: 1, sm: 2 },
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>

        {/* --- PSI CRONO --- */}
        <Box className="glass-card" sx={{
          width: '100%', mb: 3, textAlign: 'center',
          border: '1px solid rgba(0, 200, 255, 0.5)',
        }}>
          <Typography variant="overline" sx={{
            color: '#00c8ff', fontFamily: 'Cinzel', letterSpacing: 4,
            fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 0.5,
          }}>
            🧠 {PSI_CHRONO_INTRO.title}
          </Typography>

          <Typography variant="subtitle2" sx={{
            color: 'rgba(255,255,255,0.5)', fontFamily: 'Lora', fontStyle: 'italic',
            mb: 2.5, fontSize: '0.9rem',
          }}>
            {PSI_CHRONO_INTRO.subtitle}
          </Typography>

          {/* Explicación general */}
          <Typography variant="body1" sx={{
            color: 'rgba(255,255,255,0.85)', fontFamily: 'Lora',
            fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'center',
            px: { xs: 1, sm: 3 }, mb: 1.5,
          }}>
            {PSI_CHRONO_INTRO.description}
          </Typography>

          <Typography variant="body2" sx={{
            color: 'rgba(255,255,255,0.5)', fontFamily: 'Lora', fontStyle: 'italic',
            fontSize: '0.9rem', px: 2, mb: 3,
          }}>
            {PSI_CHRONO_INTRO.howToUse}
          </Typography>

          {/* Separador */}
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mx: 3, mb: 3 }} />

          {psi.isDayOutOfTime ? (
            /* --- DÍA FUERA DEL TIEMPO --- */
            <Box sx={{ pb: 2 }}>
              <Typography variant="h5" sx={{
                color: '#22c55e', fontFamily: 'Cinzel', fontWeight: 800,
                mb: 0.5, fontSize: '1.4rem',
              }}>
                {DFT_CONTENT.emoji} {DFT_CONTENT.title} {DFT_CONTENT.emoji}
              </Typography>

              <Typography variant="subtitle2" sx={{
                color: 'rgba(255,255,255,0.5)', fontFamily: 'Cinzel',
                letterSpacing: 3, mb: 2, fontSize: '0.7rem',
              }}>
                {DFT_CONTENT.subtitle}
              </Typography>

              <Typography variant="body1" sx={{
                color: 'rgba(255,255,255,0.9)', fontFamily: 'Lora',
                fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'center',
                px: { xs: 1, sm: 3 }, mb: 2,
              }}>
                {DFT_CONTENT.description}
              </Typography>

              <Typography variant="body1" sx={{
                color: 'rgba(255,255,255,0.8)', fontFamily: 'Lora',
                fontSize: '1rem', lineHeight: 1.8, textAlign: 'center',
                px: { xs: 1, sm: 3 }, mb: 2,
              }}>
                {DFT_CONTENT.ritual}
              </Typography>

              <Typography variant="body2" sx={{
                color: '#22c55e', fontFamily: 'Lora', fontStyle: 'italic',
                fontSize: '1rem', px: 2,
              }}>
                "{DFT_CONTENT.affirmation}"
              </Typography>
            </Box>
          ) : (
            /* --- PSI CRONO DEL DÍA --- */
            <Box sx={{ pb: 1 }}>
              {/* Sello Psi con badge circular */}
              <Box sx={{
                width: { xs: 70, sm: 90 }, height: { xs: 70, sm: 90 },
                borderRadius: '50%', mx: 'auto', mb: 2,
                background: getColorGradient(psiColor),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `2px solid ${getColorHex(psiColor)}`,
                boxShadow: `0 0 30px ${getColorGlow(psiColor)}`,
                p: 1.2,
              }}>
                <img
                  src={`assets/glyphs/seals/${psiSlug}.png`}
                  alt={psi.psiConfig?.seal_name}
                  style={{
                    width: '100%', height: '100%', objectFit: 'contain',
                    filter: getGlyphFilter(psiColor),
                  }}
                />
              </Box>

              <Typography variant="h6" sx={{
                color: 'white', fontFamily: 'Cinzel', fontWeight: 700,
                mb: 0.5, fontSize: '1.1rem',
              }}>
                Kin {psi.psiKinNumber}: {psi.psiConfig?.seal_name} {psi.psiConfig?.tone_name}
              </Typography>

              <Typography variant="subtitle2" sx={{
                color: getColorHex(psiColor), fontFamily: 'Cinzel',
                letterSpacing: 2, fontSize: '0.65rem', mb: 2,
              }}>
                {psi.psiConfig?.color}
              </Typography>

              {/* Interpretación del sello Psi */}
              <Typography variant="body1" sx={{
                color: 'rgba(255,255,255,0.9)', fontFamily: 'Lora', fontStyle: 'italic',
                fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'center',
                px: { xs: 1, sm: 3 }, mb: 1,
              }}>
                {psiMeaning}
              </Typography>

              {psi.isLeapDay && (
                <Typography variant="body2" sx={{
                  color: 'rgba(255,255,255,0.4)', fontFamily: 'Lora',
                  fontSize: '0.85rem', mt: 1,
                }}>
                  Día bisiesto — la misma frecuencia que ayer se mantiene.
                </Typography>
              )}
            </Box>
          )}
        </Box>

        {/* --- PORTAL DE ACTIVACIÓN GALÁCTICA --- */}
        {isGAP && (
          <Box className="glass-card" sx={{
            width: '100%', mb: 3, textAlign: 'center',
            border: '1px solid rgba(147, 51, 234, 0.5)',
            boxShadow: '0 0 25px rgba(147, 51, 234, 0.15), inset 0 0 10px rgba(147, 51, 234, 0.05)',
          }}>
            <Typography variant="overline" sx={{
              color: '#c084fc', fontFamily: 'Cinzel', letterSpacing: 4,
              fontWeight: 700, fontSize: '0.7rem', display: 'block', mb: 1,
            }}>
              {GAP_CONTENT.emoji} {GAP_CONTENT.title}
            </Typography>

            <Typography variant="body1" sx={{
              color: 'rgba(255,255,255,0.9)', fontFamily: 'Lora',
              fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'center',
              px: { xs: 1, sm: 3 }, mb: 2,
            }}>
              {GAP_CONTENT.description}
            </Typography>

            <Typography variant="body2" sx={{
              color: '#c084fc', fontFamily: 'Lora', fontStyle: 'italic',
              fontSize: '0.95rem', px: 2,
            }}>
              {GAP_CONTENT.advice}
            </Typography>
          </Box>
        )}

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

export default PsiChronoView;
