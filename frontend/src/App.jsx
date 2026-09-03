import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { Container, Typography, Box, Fade, IconButton, AppBar, Toolbar, Button, Modal, Backdrop, Tooltip, CircularProgress } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import MusicOffIcon from '@mui/icons-material/MusicOff'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import { calculateKin, getKinConfig } from './utils/tzolkin'
import { getWavespell, getCastle } from './utils/wavespell'
import { getPsiChrono } from './utils/psiChrono'
import { getColorGradient, getColorHex, getColorGlow, getGlyphFilter, isWhiteColor } from './utils/colorUtils'
import dailyData from './data/dailyData.json'
import archetypesData from './data/archetypes.json'
import SpotifyPlayer from './components/SpotifyPlayer'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import GroupsIcon from '@mui/icons-material/Groups'
import CakeIcon from '@mui/icons-material/Cake'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import ExploreIcon from '@mui/icons-material/Explore'
import WavesIcon from '@mui/icons-material/Waves'
import PsychologyIcon from '@mui/icons-material/Psychology'
import PodcastsIcon from '@mui/icons-material/Podcasts'
import PublicIcon from '@mui/icons-material/Public'
import StarsIcon from '@mui/icons-material/Stars'
import { PWAPrompt } from './components/PWAPrompt'

// Lazy loaded components for Code Splitting
const Infographic = lazy(() => import('./components/Infographic'))
const QuintaFuerza = lazy(() => import('./components/QuintaFuerza'))
const TribeList = lazy(() => import('./components/TribeList'))
const NatalKinTool = lazy(() => import('./components/NatalKinTool'))
const ToneList = lazy(() => import('./components/ToneList'))
const WavespellView = lazy(() => import('./components/WavespellView'))
const PsiChronoView = lazy(() => import('./components/PsiChronoView'))
const ObservatorioModal = lazy(() => import('./components/ObservatorioModal'))
const AstroFusionModal = lazy(() => import('./components/AstroFusionModal'))
const ChatAssistant = lazy(() => import('./components/ChatAssistant'))
const ArchetypesView = lazy(() => import('./components/ArchetypesView'))
const CastlesView = lazy(() => import('./components/CastlesView'))

function App() {
  const [kinData, setKinData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showOracle, setShowOracle] = useState(false)
  const [showTribes, setShowTribes] = useState(false)
  const [showNatal, setShowNatal] = useState(false)
  const [showTones, setShowTones] = useState(false)
  const [showWavespell, setShowWavespell] = useState(false)
  const [showPsiChrono, setShowPsiChrono] = useState(false)
  const [showObservatorio, setShowObservatorio] = useState(false)
  const [showAstroFusion, setShowAstroFusion] = useState(false)
  const [showArchetypes, setShowArchetypes] = useState(false)
  const [showCastles, setShowCastles] = useState(false)
  const [showPodcast, setShowPodcast] = useState(false)

  const audioRef = useRef(null)
  const dateInputRef = useRef(null)

  const updateKinForDate = (date) => {
    setLoading(true)
    const selectedDate = new Date(date)
    selectedDate.setHours(0, 0, 0, 0)
    const kinNumber = calculateKin(selectedDate)
    const config = getKinConfig(kinNumber)
    const extraInfo = dailyData[kinNumber] || {}
    setKinData({
      date: selectedDate.toISOString(),
      kin_number: kinNumber,
      kin: {
        ...config,
        ...extraInfo,
        affirmation: extraInfo.affirmation || config.affirmation || 'Conecta con la vibración de tu ser sagrado hoy.',
        short_description: extraInfo.short_description || config.short_description || '',
        long_description: extraInfo.long_description || config.long_description || '',
        image_url: extraInfo.image_url || null
      }
    })
    setLoading(false)
    setShowDetails(false)
  }

  useEffect(() => {
    updateKinForDate(new Date())
  }, [])

  const handleDateChange = (event) => {
    if (event.target.value) {
      const [year, month, day] = event.target.value.split('-').map(Number)
      updateKinForDate(new Date(year, month - 1, day))
    }
  }

  const toggleAudio = () => {
    if (isPlaying) { audioRef.current.pause() } else { audioRef.current.play() }
    setIsPlaying(!isPlaying)
  }

  const handleOpenModal = (e) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'transparent' }}>
      <audio ref={audioRef} src="ambient.mp3" loop />

      {/* APP BAR */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)', pt: 'env(safe-area-inset-top, 0px)' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box onClick={() => updateKinForDate(new Date())} sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', transition: 'all 0.3s', '&:hover': { transform: 'scale(1.02)', opacity: 0.9 } }}>
            <Box component="img" src="favicon.png" alt="TuEnergiaMaya" sx={{ width: 48, height: 48, filter: 'drop-shadow(0 0 15px rgba(0, 200, 255, 0.8))', animation: 'pulse 3s ease-in-out infinite', '@keyframes pulse': { '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(0, 200, 255, 0.8))' }, '50%': { filter: 'drop-shadow(0 0 25px rgba(0, 200, 255, 1))' } } }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 800, fontFamily: 'Cinzel', color: 'white', letterSpacing: 3, textShadow: '0 0 12px rgba(0,200,255,0.4)' }}>TuEnergiaMaya</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
            <IconButton component="a" href="https://instagram.com/manoelectricaazul87" target="_blank" rel="noopener noreferrer" sx={{ color: 'white', opacity: 0.8, transition: 'all 0.3s', '&:hover': { opacity: 1, transform: 'scale(1.1)', color: '#E1306C' } }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" style={{ width: 24, height: 24 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: { xs: 'calc(80px + env(safe-area-inset-top, 0px))', sm: 10 }, mb: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {loading ? (
          <Box className="glass-card" sx={{ p: 4, textAlign: 'center' }}>
            <CircularProgress size={60} thickness={2} sx={{ color: '#00c8ff', mb: 2 }} />
            <Typography variant="body1" sx={{ color: 'white', opacity: 0.7, fontFamily: 'Cinzel' }}>Sincronizando energía...</Typography>
          </Box>
        ) : kinData?.kin ? (
          <Fade in={true} timeout={1000}>
            <Box>
              {/* TOOL DOCK */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 4, justifyContent: 'center' }}>
                {[
                  { label: 'Kin Natal', icon: <CakeIcon />, action: () => setShowNatal(true) },
                  { label: 'Sellos', icon: <GroupsIcon />, action: () => setShowTribes(true) },
                  { label: 'Tonos', icon: <GraphicEqIcon />, action: () => setShowTones(true) },
                  { label: 'Onda Encantada', icon: <WavesIcon />, action: () => setShowWavespell(true) },
                  { label: 'Castillos', icon: <ExploreIcon />, action: () => setShowCastles(true) },
                  { label: 'Psi Crono', icon: <PsychologyIcon />, action: () => setShowPsiChrono(true) },
                  { label: 'Arquetipos', icon: <AutoAwesomeIcon />, action: () => setShowArchetypes(true) },
                  { label: 'Curiosidades', icon: <PublicIcon />, action: () => setShowObservatorio(true) },
                  { label: 'Podcast', icon: <PodcastsIcon />, action: () => setShowPodcast(true) }
                ].map((item) => (
                  <Button key={item.label} onClick={item.action} startIcon={item.icon} variant="outlined" sx={{ whiteSpace: 'nowrap', flexShrink: 0, borderRadius: '20px', borderColor: 'rgba(255,255,255,0.2)', color: 'white', fontFamily: 'Inter', fontWeight: 600, letterSpacing: 0.5, textTransform: 'none', bgcolor: 'rgba(15,15,30,0.6)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', '&:hover': { bgcolor: 'rgba(0, 200, 255, 0.15)', borderColor: '#00c8ff', transform: 'translateY(-2px)', boxShadow: '0 6px 12px rgba(0,200,255,0.2)' }, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                    {item.label}
                  </Button>
                ))}
              </Box>

              {/* FECHA + SELECTOR */}
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="overline" align="center" display="block" sx={{ opacity: 0.8, letterSpacing: 4, fontFamily: 'Cinzel', fontWeight: 700, lineHeight: 1 }}>
                  {new Date(kinData.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </Typography>
                <Box sx={{ position: 'relative', display: 'inline-flex', opacity: 0.7, '&:hover': { opacity: 1 } }}>
                  <IconButton color="inherit" component="span" size="small" sx={{ color: 'white' }}>
                    <CalendarMonthIcon fontSize="small" />
                  </IconButton>
                  <input type="date" ref={dateInputRef} onChange={handleDateChange} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', zIndex: 1 }} />
                </Box>
              </Box>

              {/* KIN CARD */}
              <Box className="glass-card" sx={{ mb: 3, pt: 4, px: 2, pb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', bgcolor: 'rgba(255, 255, 255, 0.005)', backdropFilter: 'blur(2px)', border: '1px solid rgba(255, 255, 255, 0.1)', transition: 'all 0.4s ease', '&:hover': { boxShadow: '0 0 30px rgba(0, 200, 255, 0.2)', borderColor: '#00c8ff' } }}>
                <Box sx={{ mb: 1 }}>
                  <Box sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: '50%', background: getColorGradient(kinData.kin.color), mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 40px ${getColorGlow(kinData.kin.color)}`, border: `2px solid ${getColorHex(kinData.kin.color)}`, overflow: 'hidden', p: 1.5 }}>
                    <img src={`assets/glyphs/seals/${kinData.kin.slug}.png`} alt={kinData.kin.seal_name} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: getGlyphFilter(kinData.kin.color) }} />
                  </Box>
                  <Typography sx={{ mt: 0.5, color: 'white', fontWeight: 800, fontSize: '0.7rem', opacity: 0.6, letterSpacing: 2, fontFamily: 'Cinzel' }}>KIN {kinData.kin_number}</Typography>
                </Box>
                <Typography variant="h4" component="h2" sx={{ color: 'white', fontWeight: 800, mb: 0.1, fontFamily: 'Cinzel', textTransform: 'uppercase', textShadow: '0 2px 10px rgba(0,0,0,0.3)', fontSize: '1.8rem' }}>{kinData.kin.seal_name}</Typography>
                <Typography variant="h6" sx={{ opacity: 0.8, mb: 3, fontWeight: 400, fontFamily: 'Lora', fontStyle: 'italic', color: 'white', fontSize: '1.1rem' }}>{kinData.kin.tone_name} {kinData.kin.color}</Typography>

                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 800, fontFamily: 'Cinzel', letterSpacing: 1, color: '#00c8ff' }}>REFLEXIÓN DE HOY...</Typography>
                <Typography variant="body1" sx={{ px: 2, mb: 1.5, color: 'white', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.5, fontSize: '1rem', opacity: 0.9 }}>
                  {kinData.kin.short_description || 'Esta energía nos invita a conectar con nuestro propósito superior.'}
                </Typography>
                
                {kinData.kin.long_description && (
                  <Box sx={{ mt: 1 }}>
                    <Button endIcon={<ZoomInIcon sx={{ transform: showDetails ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />} onClick={() => setShowDetails(!showDetails)} sx={{ color: 'white', opacity: 0.7, fontFamily: 'Lora', '&:hover': { opacity: 1 } }}>
                      {showDetails ? 'VER MENOS' : 'VER MÁS DETALLES'}
                    </Button>
                    <Fade in={showDetails}>
                      <Box sx={{ display: showDetails ? 'block' : 'none', mt: 3, textAlign: 'left', p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <Typography variant="body1" sx={{ fontFamily: 'Lora', whiteSpace: 'pre-line', opacity: 0.85, lineHeight: 1.8 }}>{kinData.kin.long_description}</Typography>
                      </Box>
                    </Fade>
                  </Box>
                )}
              </Box>

              {/* INFOGRAFÍA Y ORÁCULO */}
              <Grid container spacing={3} sx={{ mb: 4, alignItems: 'stretch' }}>
                <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                  <Box className="glass-card" sx={{ width: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: 'none', transition: 'all 0.4s ease', '&:hover': { borderColor: '#00c8ff', boxShadow: '0 0 30px rgba(0, 200, 255, 0.2)' } }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 800, fontFamily: 'Cinzel', letterSpacing: 1, textAlign: 'center', color: '#00c8ff' }}>INFOGRAFÍA</Typography>
                    <Box sx={{ position: 'relative', width: '100%', maxWidth: 400, borderRadius: '15px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 3 }}>
                      <Box component="img" src={`assets/art_seals/${kinData.kin.slug}.png`} alt={kinData.kin.seal_name} sx={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)' }} />
                    </Box>
                    <Button variant="contained" onClick={handleOpenModal} startIcon={<ZoomInIcon sx={{ fontSize: '1rem' }} />} sx={{ mt: 'auto', bgcolor: getColorHex(kinData.kin.color), color: isWhiteColor(kinData.kin.color) ? '#000000' : '#ffffff', '&:hover': { bgcolor: getColorHex(kinData.kin.color, '#fbc02d') }, borderRadius: '30px', textTransform: 'none', fontWeight: 700, px: 4, py: 1, fontFamily: 'Lora', fontSize: '0.85rem', border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
                      VER INFOGRAFÍA COMPLETA
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                  <Box className="glass-card" sx={{ width: '100%', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: 'none', transition: 'all 0.4s ease', '&:hover': { borderColor: '#c084fc', boxShadow: '0 0 30px rgba(192, 132, 252, 0.2)' } }}>
                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 800, fontFamily: 'Cinzel', letterSpacing: 1, textAlign: 'center', color: '#c084fc' }}>ORÁCULO</Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                      <Suspense fallback={<CircularProgress sx={{ color: '#c084fc', display: 'block', mx: 'auto', my: 4 }} />}>
                        <QuintaFuerza kinData={kinData} />
                      </Suspense>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* MINI CARDS */}
              {(() => {
                const ws = getWavespell(kinData.kin_number)
                const cs = getCastle(kinData.kin_number)
                const psi = getPsiChrono(new Date(kinData.date))
                const wsColorHex = getColorHex(getKinConfig(ws?.wavespellStartKin || 1).color)
                const castleColorMap = { 0: '#ef4444', 1: '#ffffff', 2: '#3b82f6', 3: '#eab308', 4: '#22c55e' }
                const castleColor = castleColorMap[cs?.castleIndex] || '#c084fc'
                const psiColorHex = psi?.psiConfig ? getColorHex(psi.psiConfig.color) : '#c084fc'
                const archetypeObj = archetypesData[kinData.kin.slug]
                const archetypeName = archetypeObj ? archetypeObj.archetype : 'Arquetipo'
                const archetypeColorHex = getColorHex(kinData.kin.color) || '#f59e0b'
                let psiName = psi?.psiConfig ? `${psi.psiConfig.seal_name} ${psi.psiConfig.tone_name}` : 'N/A'

                const miniCards = [
                  { label: 'Onda Encantada', value: ws?.wavespellName || '—', sub: `Onda ${ws?.wavespellNumber || ''} de 20`, color: wsColorHex, icon: '🌊', delay: '0s', action: () => setShowWavespell(true) },
                  { label: 'Castillo', value: cs?.castle?.name || '—', sub: cs?.castle?.color ? `Castillo ${cs.castle.color}` : '', color: castleColor, icon: '🏰', delay: '0.4s', action: () => setShowCastles(true) },
                  { label: 'Psi-Crono', value: psiName, sub: `Kin ${psi?.psiKinNumber || ''}`, color: psiColorHex, icon: '🌙', delay: '0.8s', action: () => setShowPsiChrono(true) },
                  { label: 'Arquetipo', value: archetypeName, number: archetypeObj?.number, sub: `Sello ${kinData.kin.seal_name}`, color: archetypeColorHex, icon: '✨', delay: '1.2s', action: () => setShowArchetypes(true) }
                ]

                return (
                  <>
                    <style>{`
                      @keyframes floatCard0 {
                        0%, 100% { transform: translateY(0px) rotate(0deg); }
                        33% { transform: translateY(-8px) rotate(0.3deg); }
                        66% { transform: translateY(-4px) rotate(-0.2deg); }
                      }
                      @keyframes floatCard1 {
                        0%, 100% { transform: translateY(-4px) rotate(-0.2deg); }
                        50% { transform: translateY(-12px) rotate(0.3deg); }
                      }
                      @keyframes floatCard2 {
                        0%, 100% { transform: translateY(-2px) rotate(0.2deg); }
                        40% { transform: translateY(-10px) rotate(-0.3deg); }
                        80% { transform: translateY(-6px) rotate(0.1deg); }
                      }
                      @keyframes floatCard3 {
                        0%, 100% { transform: translateY(-6px) rotate(-0.1deg); }
                        60% { transform: translateY(-14px) rotate(0.4deg); }
                      }
                      @keyframes neonPulse0 {
                        0%, 100% { box-shadow: 0 0 10px ${wsColorHex}4d, 0 0 25px ${wsColorHex}26, inset 0 0 15px ${wsColorHex}0d; }
                        50% { box-shadow: 0 0 20px ${wsColorHex}99, 0 0 45px ${wsColorHex}4d, inset 0 0 25px ${wsColorHex}1a; }
                      }
                      @keyframes neonPulse1 {
                        0%, 100% { box-shadow: 0 0 10px ${castleColor}4d, 0 0 25px ${castleColor}26, inset 0 0 15px ${castleColor}0d; }
                        50% { box-shadow: 0 0 20px ${castleColor}99, 0 0 45px ${castleColor}4d, inset 0 0 25px ${castleColor}1a; }
                      }
                      @keyframes neonPulse2 {
                        0%, 100% { box-shadow: 0 0 10px ${psiColorHex}4d, 0 0 25px ${psiColorHex}26, inset 0 0 15px ${psiColorHex}0d; }
                        50% { box-shadow: 0 0 20px ${psiColorHex}99, 0 0 45px ${psiColorHex}4d, inset 0 0 25px ${psiColorHex}1a; }
                      }
                      @keyframes neonPulse3 {
                        0%, 100% { box-shadow: 0 0 10px ${archetypeColorHex}4d, 0 0 25px ${archetypeColorHex}26, inset 0 0 15px ${archetypeColorHex}0d; }
                        50% { box-shadow: 0 0 20px ${archetypeColorHex}99, 0 0 45px ${archetypeColorHex}4d, inset 0 0 25px ${archetypeColorHex}1a; }
                      }
                      @keyframes shimmer {
                        0% { background-position: -200% center; }
                        100% { background-position: 200% center; }
                      }
                      @keyframes borderRotate {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                      }
                      .mini-card { transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease !important; }
                      .mini-card:hover { transform: translateY(-16px) scale(1.06) !important; animation-play-state: paused !important; }
                      .mini-card:hover .mini-card-icon { transform: scale(1.3) rotate(-5deg); }
                      .mini-card-icon { transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); display: inline-block; }
                    `}</style>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>
                      {miniCards.map((card, i) => (
                        <Tooltip key={card.label} title={`Ver ${card.label}`} arrow>
                          <Box
                            className="mini-card"
                            onClick={card.action}
                            sx={{
                              p: { xs: 1.5, sm: 2 },
                              borderRadius: '16px',
                              border: `1px solid ${card.color}55`,
                              background: `linear-gradient(135deg, rgba(8,8,20,0.92) 0%, ${card.color}15 100%)`,
                              backdropFilter: 'blur(16px)',
                              WebkitBackdropFilter: 'blur(16px)',
                              cursor: 'pointer',
                              textAlign: 'center',
                              position: 'relative',
                              overflow: 'hidden',
                              animation: `floatCard${i} ${3.5 + i * 0.4}s ease-in-out infinite ${card.delay}, neonPulse${i} ${2.5 + i * 0.3}s ease-in-out infinite ${card.delay}`,
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0, left: '-100%',
                                width: '60%', height: '100%',
                                background: `linear-gradient(90deg, transparent, ${card.color}18, transparent)`,
                                animation: `shimmer ${3 + i * 0.5}s linear infinite`,
                                animationDelay: card.delay,
                                pointerEvents: 'none'
                              },
                              '&::after': {
                                content: '""',
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '16px',
                                padding: '1px',
                                background: `linear-gradient(135deg, ${card.color}60, transparent 50%, ${card.color}30)`,
                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                maskComposite: 'exclude',
                                pointerEvents: 'none'
                              }
                            }}
                          >
                            <Typography className="mini-card-icon" sx={{ fontSize: { xs: '1.4rem', sm: '1.8rem' }, mb: 0.5, lineHeight: 1, display: 'block', filter: `drop-shadow(0 0 6px ${card.color}99)` }}>
                              {card.icon}
                            </Typography>
                            <Typography sx={{
                              color: card.color,
                              fontFamily: 'Cinzel',
                              letterSpacing: 0.5,
                              fontWeight: 800,
                              display: 'block',
                              fontSize: { xs: '0.48rem', sm: '0.58rem' },
                              textTransform: 'uppercase',
                              textShadow: `0 0 8px ${card.color}`,
                              mb: 0.5
                            }}>
                              {card.label}
                            </Typography>
                            <Typography sx={{
                              color: 'white',
                              fontWeight: 700,
                              fontSize: { xs: '0.7rem', sm: '0.82rem' },
                              lineHeight: 1.2,
                              fontFamily: 'Cinzel',
                              textShadow: `0 0 12px ${card.color}66`
                            }}>
                              {card.value}
                            </Typography>
                            {card.number && (
                              <Typography sx={{
                                color: 'white',
                                fontWeight: 800,
                                fontSize: '1.1rem',
                                fontFamily: 'Cinzel',
                                textShadow: `0 0 10px ${card.color}99`,
                                mt: 0.3
                              }}>
                                {card.number}
                              </Typography>
                            )}
                            {card.sub && (
                              <Typography sx={{ color: `${card.color}88`, display: 'block', fontSize: '0.55rem', mt: 0.4, fontFamily: 'Inter', fontWeight: 500 }}>
                                {card.sub}
                              </Typography>
                            )}
                          </Box>
                        </Tooltip>
                      ))}
                    </Box>
                  </>
                )
              })()}


              {/* TARJETA PODCAST SPOTIFY */}
              <Box sx={{ mt: 4, width: '100%', maxWidth: 800, mx: 'auto' }}>
                <Typography variant="h5" align="center" sx={{ color: 'white', fontFamily: 'Cinzel', mb: 2, textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>
                  PODCAST KIN DIARIO
                </Typography>
                <Suspense fallback={<CircularProgress sx={{ display: 'block', mx: 'auto', my: 2 }} />}>
                  <SpotifyPlayer kinNumber={kinData.kin_number} />
                </Suspense>
              </Box>

            </Box>
          </Fade>
        ) : (
          <Typography align="center" variant="h6">No se pudo cargar la información del Kin.</Typography>
        )}
      </Container>

      {/* FOOTER */}
      <Box component="footer" sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" display="block" sx={{ fontFamily: 'Cinzel', fontSize: '0.7rem', letterSpacing: 2, opacity: 0.4 }}>
          Creado por Mano Eléctrica Azul • TuEnergíaMaya • 2026
        </Typography>
      </Box>

      {/* BOTÓN MÚSICA FLOTANTE — esquina inferior izquierda */}
      <Tooltip title={isPlaying ? 'Detener música' : 'Siente la energía'} placement="right">
        <IconButton onClick={toggleAudio} sx={{ position: 'fixed', bottom: { xs: 24, sm: 32 }, left: { xs: 16, sm: 24 }, zIndex: 1200, width: 52, height: 52, bgcolor: isPlaying ? 'rgba(0,200,255,0.25)' : 'rgba(10,10,25,0.85)', backdropFilter: 'blur(12px)', border: `2px solid ${isPlaying ? '#00c8ff' : 'rgba(255,255,255,0.2)'}`, color: isPlaying ? '#00c8ff' : 'rgba(255,255,255,0.7)', boxShadow: isPlaying ? '0 0 25px rgba(0,200,255,0.5)' : '0 4px 15px rgba(0,0,0,0.4)', transition: 'all 0.3s ease', animation: isPlaying ? 'musicPulse 2s ease-in-out infinite' : 'none', '@keyframes musicPulse': { '0%, 100%': { boxShadow: '0 0 15px rgba(0,200,255,0.4)' }, '50%': { boxShadow: '0 0 35px rgba(0,200,255,0.8)' } }, '&:hover': { bgcolor: 'rgba(0,200,255,0.2)', borderColor: '#00c8ff', color: '#00c8ff', transform: 'scale(1.1)' } }}>
          {isPlaying ? <MusicOffIcon /> : <MusicNoteIcon />}
        </IconButton>
      </Tooltip>

      {/* MODAL: INFOGRAFÍA COMPLETA */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.98)' } }}>
        <Fade in={isModalOpen}>
          <Box onClick={() => setIsModalOpen(false)} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', outline: 'none', bgcolor: 'transparent', overflow: 'auto', p: { xs: 0, md: 2 } }}>
            <Box onClick={(e) => e.stopPropagation()} sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <Suspense fallback={<CircularProgress sx={{ color: '#00c8ff' }} />}>
                <Infographic kinData={kinData} isFullScreen={true} onClose={() => setIsModalOpen(false)} />
              </Suspense>
            </Box>
          </Box>
        </Fade>
      </Modal>



      {/* MODAL: SELLOS */}
      <Modal open={showTribes} onClose={() => setShowTribes(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}>
        <Fade in={showTribes}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', outline: 'none', bgcolor: 'transparent' }}>
            <Suspense fallback={<CircularProgress sx={{ color: '#00c8ff', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />}>
              <TribeList onClose={() => setShowTribes(false)} />
            </Suspense>
          </Box>
        </Fade>
      </Modal>

      {/* MODAL: KIN NATAL */}
      <Modal open={showNatal} onClose={() => setShowNatal(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}>
        <Fade in={showNatal}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', outline: 'none', overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Box sx={{ my: 'auto', width: '100%', display: 'flex', justifyContent: 'center', py: 4 }}>
              <Suspense fallback={<CircularProgress sx={{ color: '#00c8ff' }} />}>
                <NatalKinTool onClose={() => setShowNatal(false)} />
              </Suspense>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* MODAL: TONOS */}
      <Modal open={showTones} onClose={() => setShowTones(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}>
        <Fade in={showTones}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', outline: 'none', bgcolor: 'transparent' }}>
            <Suspense fallback={<CircularProgress sx={{ color: '#00c8ff', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />}>
              <ToneList onClose={() => setShowTones(false)} />
            </Suspense>
          </Box>
        </Fade>
      </Modal>

      {/* MODAL: ONDA ENCANTADA */}
      <Modal open={showWavespell} onClose={() => setShowWavespell(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}>
        <Fade in={showWavespell}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', outline: 'none', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4, pb: 4 }}>
            <Suspense fallback={<CircularProgress sx={{ color: '#00c8ff', mt: '20vh' }} />}>
              <WavespellView kinNumber={kinData?.kin_number} onClose={() => setShowWavespell(false)} />
            </Suspense>
          </Box>
        </Fade>
      </Modal>

      {/* MODAL: ARQUETIPOS */}
      <Modal open={showArchetypes} onClose={() => setShowArchetypes(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}>
        <Fade in={showArchetypes}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', outline: 'none', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4, pb: 4 }}>
            <Suspense fallback={<CircularProgress sx={{ color: '#00c8ff', mt: '20vh' }} />}>
              <ArchetypesView onBack={() => setShowArchetypes(false)} kinData={kinData} />
            </Suspense>
          </Box>
        </Fade>
      </Modal>

      {/* MODAL: CASTILLOS */}
      <Modal open={showCastles} onClose={() => setShowCastles(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}>
        <Fade in={showCastles}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', outline: 'none', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4, pb: 4 }}>
            <Suspense fallback={<CircularProgress sx={{ color: '#00c8ff', mt: '20vh' }} />}>
              <CastlesView onBack={() => setShowCastles(false)} kinNumber={kinData?.kin_number} />
            </Suspense>
          </Box>
        </Fade>
      </Modal>

      {/* MODAL: PODCAST */}
      <Modal open={showPodcast} onClose={() => setShowPodcast(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}>
        <Fade in={showPodcast}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', outline: 'none', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4, pb: 4 }}>
            <Box sx={{ width: '100%', maxWidth: 600, px: 2 }}>
              <Typography variant="h4" align="center" sx={{ color: 'white', fontFamily: 'Cinzel', mb: 4, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>PODCAST</Typography>
              <SpotifyPlayer />
              <Button variant="outlined" onClick={() => setShowPodcast(false)} sx={{ mt: 4, display: 'block', mx: 'auto', color: 'white', borderColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '20px', px: 4, py: 0.5, fontSize: '0.8rem', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255, 255, 255, 0.1)' } }}>VOLVER</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* MODAL: PSI CRONO */}
      <Modal open={showPsiChrono} onClose={() => setShowPsiChrono(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}>
        <Fade in={showPsiChrono}>
          <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', outline: 'none', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4, pb: 4 }}>
            <Suspense fallback={<CircularProgress sx={{ color: '#00c8ff', mt: '20vh' }} />}>
              <PsiChronoView date={kinData ? new Date(kinData.date) : new Date()} kinNumber={kinData?.kin_number} onClose={() => setShowPsiChrono(false)} />
            </Suspense>
          </Box>
        </Fade>
      </Modal>

      {/* MODAL: SINCRONARIO GLOBAL / CURIOSIDADES */}
      <Suspense fallback={null}>
        {showObservatorio && <ObservatorioModal open={showObservatorio} onClose={() => setShowObservatorio(false)} kinData={kinData} onOpenAstro={() => { setShowObservatorio(false); setShowAstroFusion(true); }} />}
      </Suspense>

      {/* Fusión Astrológica */}
      <Suspense fallback={null}>
        {kinData && <AstroFusionModal open={showAstroFusion} onClose={() => setShowAstroFusion(false)} kinData={kinData} />}
      </Suspense>

      <Suspense fallback={null}>
        <ChatAssistant currentKin={kinData?.kin} />
      </Suspense>
      <PWAPrompt />
    </Box>
  )
}

export default App
