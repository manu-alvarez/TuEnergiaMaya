import { useState, useEffect, useRef } from 'react'
import { Container, Typography, Box, Card, Skeleton, Fade, IconButton, AppBar, Toolbar, Button, Modal, Backdrop } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import MusicOffIcon from '@mui/icons-material/MusicOff'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import { calculateKin, getKinConfig } from './utils/tzolkin'
import dailyData from './data/dailyData.json'
import Infographic from './components/Infographic'
import QuintaFuerza from './components/QuintaFuerza'
import TribeList from './components/TribeList'
import NatalKinTool from './components/NatalKinTool'
import ToneList from './components/ToneList'
import SpotifyPlayer from './components/SpotifyPlayer'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GroupsIcon from '@mui/icons-material/Groups';
import CakeIcon from '@mui/icons-material/Cake';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import ExploreIcon from '@mui/icons-material/Explore';
import ChatAssistant from './components/ChatAssistant';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function App() {
  const [kinData, setKinData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [showOracle, setShowOracle] = useState(false)
  const [showTribes, setShowTribes] = useState(false)
  const [showNatal, setShowNatal] = useState(false)
  const [showTones, setShowTones] = useState(false)
  const [showPodcast, setShowPodcast] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)

  const audioRef = useRef(null)
  const dateInputRef = useRef(null)

  useEffect(() => {
    updateKinForDate(new Date())
  }, [])

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
        affirmation: extraInfo.affirmation || config.affirmation || "Conecta con la vibración de tu ser sagrado hoy.",
        short_description: extraInfo.short_description || config.short_description || "",
        long_description: extraInfo.long_description || config.long_description || "",
        image_url: extraInfo.image_url || null
      }
    })
    setLoading(false)
    setShowDetails(false)
    setIsFlipped(false)
  }

  const handleDateChange = (event) => {
    if (event.target.value) {
      const [year, month, day] = event.target.value.split('-').map(Number);
      const newDate = new Date(year, month - 1, day);
      updateKinForDate(newDate);
    }
  }

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleOpenModal = (e) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMenuAction = (action) => {
    action()
    handleMenuClose()
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'transparent' }}>
      <audio ref={audioRef} src="ambient.mp3" loop />

      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          pt: 'env(safe-area-inset-top, 0px)', // Support for mobile status bars
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box
            onClick={() => updateKinForDate(new Date())}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'scale(1.02)',
                opacity: 0.9
              }
            }}
          >
            <Box
              component="img"
              src="favicon.png"
              alt="Mano Eléctrica Azul"
              sx={{
                width: 48,
                height: 48,
                filter: 'drop-shadow(0 0 15px rgba(0, 200, 255, 0.8))',
                animation: 'pulse 3s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { filter: 'drop-shadow(0 0 15px rgba(0, 200, 255, 0.8))' },
                  '50%': { filter: 'drop-shadow(0 0 25px rgba(0, 200, 255, 1))' }
                }
              }}
            />
            <Typography variant="h5" component="div" sx={{ fontWeight: 800, fontFamily: 'Cinzel', color: 'white', letterSpacing: 3, textShadow: '0 0 12px rgba(0,200,255,0.4)' }}>
              TuEnergiaMaya
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
            <IconButton
              component="a"
              href="https://instagram.com/manoelectricaazul87"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'white',
                opacity: 0.8,
                transition: 'all 0.3s',
                '&:hover': {
                  opacity: 1,
                  transform: 'scale(1.1)',
                  color: '#E1306C'
                }
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                alt="Instagram"
                style={{ width: 24, height: 24 }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: { xs: 'calc(80px + env(safe-area-inset-top, 0px))', sm: 10 }, mb: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {loading ? (
          <Box className="glass-card">
            <Skeleton variant="circular" width={100} height={100} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="60%" height={40} sx={{ mx: 'auto' }} />
          </Box>
        ) : kinData?.kin ? (
          <Fade in={true} timeout={1000}>
            <Box>
              {/* UNIFIED MENU BUTTON */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
                <Button
                  id="maya-menu-button"
                  aria-controls={openMenu ? 'maya-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? 'true' : undefined}
                  variant="contained"
                  onClick={handleMenuClick}
                  startIcon={<ExploreIcon />}
                  sx={{
                    borderRadius: '30px',
                    px: 4,
                    py: 1.5,
                    fontFamily: 'Cinzel',
                    fontWeight: 700,
                    letterSpacing: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(0, 200, 255, 0.15)',
                      borderColor: '#00c8ff',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  EXPLORAR COSMOS
                </Button>
                <Menu
                  id="maya-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                  MenuListProps={{ 'aria-labelledby': 'maya-menu-button' }}
                  sx={{
                    '& .MuiPaper-root': {
                      bgcolor: 'rgba(10, 10, 25, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      minWidth: 200,
                      borderRadius: '15px',
                    }
                  }}
                >
                  {[
                    { label: 'Oráculo', icon: <AutoAwesomeIcon />, action: () => setShowOracle(true) },
                    { label: 'Sellos', icon: <GroupsIcon />, action: () => setShowTribes(true) },
                    { label: 'Tonos', icon: <GraphicEqIcon />, action: () => setShowTones(true) },
                    { label: 'Kin Natal', icon: <CakeIcon />, action: () => setShowNatal(true) },
                    { label: 'Podcast', icon: <PodcastsIcon />, action: () => setShowPodcast(true) }
                  ].map((item) => (
                    <MenuItem key={item.label} onClick={() => handleMenuAction(item.action)} sx={{ py: 1.5, '&:hover': { bgcolor: 'rgba(0, 200, 255, 0.1)' } }}>
                      <ListItemIcon sx={{ color: '#00c8ff' }}>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} primaryTypographyProps={{ fontFamily: 'Inter', fontWeight: 600 }} />
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="overline" align="center" display="block" sx={{ opacity: 0.8, letterSpacing: 4, fontFamily: 'Cinzel', fontWeight: 700, lineHeight: 1 }}>
                  {new Date(kinData.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </Typography>

                <Box sx={{ position: 'relative', display: 'inline-flex', opacity: 0.7, '&:hover': { opacity: 1 } }}>
                  <IconButton color="inherit" component="span" size="small" sx={{ color: 'white' }}>
                    <CalendarMonthIcon fontSize="small" />
                  </IconButton>
                  <input
                    type="date"
                    ref={dateInputRef}
                    onChange={handleDateChange}
                    style={{
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                      opacity: 0, cursor: 'pointer', zIndex: 1
                    }}
                  />
                </Box>
              </Box>

              <Box className={`flip-card ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip} sx={{ height: 350 }}>
                <Box className="flip-card-inner">
                  <Card className="glass-card card-front" sx={{
                    height: '100%', display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-start', pt: 4, px: 2, pb: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.005)', backdropFilter: 'blur(2px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: 'none',
                    backfaceVisibility: 'hidden', transition: 'all 0.4s ease',
                    '&:hover': {
                      boxShadow: '0 0 30px rgba(0, 200, 255, 0.2)',
                      borderColor: '#00c8ff'
                    }
                  }}>
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{
                        width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: '50%',
                        background: ['Blanco', 'Blanca'].includes(kinData.kin.color) ? 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)' :
                          ['Rojo', 'Roja'].includes(kinData.kin.color) ? 'linear-gradient(135deg, #ff5252 0%, #b71c1c 100%)' :
                            kinData.kin.color === 'Azul' ? 'linear-gradient(135deg, #448aff 0%, #0d47a1 100%)' :
                              'linear-gradient(135deg, #ffd740 0%, #f57f17 100%)',
                        mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 0 40px ${['Rojo', 'Roja'].includes(kinData.kin.color) ? 'rgba(255,0,0,0.6)' :
                          ['Blanco', 'Blanca'].includes(kinData.kin.color) ? 'rgba(255,255,255,0.6)' :
                            kinData.kin.color === 'Azul' ? 'rgba(0,100,255,0.6)' : 'rgba(255,215,0,0.6)'}`,
                        border: `2px solid ${['Rojo', 'Roja'].includes(kinData.kin.color) ? '#ef4444' :
                          ['Blanco', 'Blanca'].includes(kinData.kin.color) ? '#ffffff' :
                            kinData.kin.color === 'Azul' ? '#3b82f6' : '#eab308'}`,
                        overflow: 'hidden', p: 1.5
                      }}>
                        <img
                          src={`assets/glyphs/seals/${kinData.kin.slug}.png`}
                          alt={kinData.kin.seal_name}
                          style={{
                            width: '100%', height: '100%', objectFit: 'contain',
                            filter: ['Blanco', 'Blanca'].includes(kinData.kin.color) ? 'drop-shadow(0 0 2px rgba(0,0,0,0.5))' : 'drop-shadow(0 0 5px rgba(255,255,255,0.3))'
                          }}
                        />
                      </Box>
                      <Typography sx={{ mt: 0.5, color: 'white', fontWeight: 800, fontSize: '0.7rem', opacity: 0.6, letterSpacing: 2, fontFamily: 'Cinzel' }}>
                        KIN {kinData.kin_number}
                      </Typography>
                    </Box>

                    <Typography variant="h4" component="h2" sx={{ color: 'white', fontWeight: 800, mb: 0.1, fontFamily: 'Cinzel', textTransform: 'uppercase', textShadow: '0 2px 10px rgba(0,0,0,0.3)', fontSize: '1.8rem' }}>
                      {kinData.kin.seal_name}
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.8, mb: 1.5, fontWeight: 400, fontFamily: 'Lora', fontStyle: 'italic', color: 'white', fontSize: '1.1rem' }}>
                      {kinData.kin.tone_name} {kinData.kin.color}
                    </Typography>

                    <Typography variant="body1" sx={{ px: 2, mb: 1.5, color: 'white', fontStyle: 'italic', fontWeight: 300, lineHeight: 1.3, fontSize: '1rem' }}>
                      {kinData.kin.affirmation}
                    </Typography>

                    <Box sx={{ mt: 1 }}>
                      <Button endIcon={<ZoomInIcon />} sx={{ color: 'white', opacity: 0.7, fontFamily: 'Lora', '&:hover': { opacity: 1 } }}>
                        GIRAR LA CARTA
                      </Button>
                    </Box>
                  </Card>

                  <Card className="glass-card card-back" sx={{
                    height: '100%', position: 'absolute', top: 0, left: 0,
                    bgcolor: 'rgba(255, 255, 255, 0.005)', backdropFilter: 'blur(2px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: 'none',
                    backfaceVisibility: 'hidden', transform: 'rotateY(180deg)',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      boxShadow: '0 0 30px rgba(0, 200, 255, 0.2)',
                      borderColor: '#00c8ff',
                      transform: 'rotateY(180deg)'
                    }
                  }}>
                    <Box sx={{ position: 'relative', width: '100%', height: '90%', borderRadius: '15px', overflow: 'hidden', p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Box
                        component="img"
                        src={`assets/art_seals/${kinData.kin.slug}.png`}
                        alt={kinData.kin.seal_name}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                      <Button
                        variant="contained"
                        onClick={handleOpenModal}
                        startIcon={<ZoomInIcon sx={{ fontSize: '1rem' }} />}
                        sx={{
                          position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
                          bgcolor: (['Blanco', 'Blanca'].includes(kinData.kin.color)) ? '#ffffff' : (['Rojo', 'Roja'].includes(kinData.kin.color) ? '#ff5252' : (kinData.kin.color === 'Azul' ? '#448aff' : '#ffd740')),
                          color: (['Blanco', 'Blanca'].includes(kinData.kin.color)) ? '#000000' : '#ffffff',
                          '&:hover': {
                            bgcolor: (['Blanco', 'Blanca'].includes(kinData.kin.color)) ? '#f0f0f0' : (['Rojo', 'Roja'].includes(kinData.kin.color) ? '#d32f2f' : (kinData.kin.color === 'Azul' ? '#1976d2' : '#fbc02d')),
                          },
                          zIndex: 10, borderRadius: '30px', textTransform: 'none', fontWeight: 700, px: 2, py: 0.5,
                          fontFamily: 'Lora', fontSize: '0.75rem', minWidth: '200px', border: '2px solid rgba(255,255,255,0.2)'
                        }}
                      >
                        VER INFOGRAFÍA COMPLETA
                      </Button>
                    </Box>
                    <Button variant="outlined" color="inherit" onClick={(e) => { e.stopPropagation(); handleFlip(); }} sx={{ mt: 0.5, borderRadius: 20, fontSize: '0.8rem', py: 0.5 }}>
                      VOLVER
                    </Button>
                  </Card>
                </Box>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Box className="glass-card" sx={{
                  p: 3, border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: 'none',
                  transition: 'all 0.4s ease',
                  '&:hover': { borderColor: '#00c8ff', boxShadow: '0 0 30px rgba(0, 200, 255, 0.2)' }
                }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 800, fontFamily: 'Cinzel', letterSpacing: 1, textAlign: 'center', color: '#00c8ff' }}>
                    REFLEXIÓN DE HOY...
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.8, fontSize: '1.1rem', opacity: 0.9, fontWeight: 400, fontFamily: 'Lora', textAlign: 'center' }}>
                    {kinData.kin.short_description || "Esta energía nos invita a conectar con nuestro propósito superior. Sincronízate con el tiempo natural del universo."}
                  </Typography>

                  {kinData.kin.long_description && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <Button
                        endIcon={<ZoomInIcon sx={{ transform: showDetails ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />}
                        onClick={() => setShowDetails(!showDetails)}
                        sx={{ color: 'white', opacity: 0.7, fontFamily: 'Lora', '&:hover': { opacity: 1 } }}
                      >
                        {showDetails ? 'VER MENOS' : 'VER MÁS DETALLES'}
                      </Button>
                      <Fade in={showDetails}>
                        <Box sx={{ display: showDetails ? 'block' : 'none', mt: 3, textAlign: 'left', p: 2, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                          <Typography variant="body1" sx={{ fontFamily: 'Lora', whiteSpace: 'pre-line', opacity: 0.85, lineHeight: 1.8 }}>
                            {kinData.kin.long_description}
                          </Typography>
                        </Box>
                      </Fade>
                    </Box>
                  )}
                </Box>

                {/* RESTORED SPOTIFY PLAYER CARD */}
                <Box className="glass-card" sx={{
                  p: 3,
                  mt: 4,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: 'none',
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    borderColor: '#00c8ff',
                    boxShadow: '0 0 30px rgba(0, 200, 255, 0.2)'
                  }
                }}>
                  <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 800, fontFamily: 'Cinzel', letterSpacing: 1, textAlign: 'center', color: '#00c8ff' }}>
                    ESCUCHAR PODCAST
                  </Typography>
                  <SpotifyPlayer />
                </Box>
              </Box>
            </Box>
          </Fade>
        ) : (
          <Typography align="center" variant="h6">No se pudo cargar la información del Kin.</Typography>
        )}
      </Container>

      {/* Fullscreen Infographic Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.98)' } }}
      >
        <Fade in={isModalOpen}>
          <Box
            onClick={() => setIsModalOpen(false)}
            sx={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center',
              outline: 'none', bgcolor: 'transparent', overflow: 'auto', p: { xs: 0, md: 2 }
            }}
          >
            <Box onClick={(e) => e.stopPropagation()} sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <Infographic kinData={kinData} isFullScreen={true} onClose={() => setIsModalOpen(false)} />
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Box component="footer" sx={{ p: 4, textAlign: 'center', opacity: 0.8 }}>
        <Button
          startIcon={isPlaying ? <MusicOffIcon /> : <MusicNoteIcon />}
          variant="contained"
          onClick={toggleAudio}
          sx={{
            mb: 2,
            borderRadius: '30px',
            px: 4,
            py: 1.5,
            fontFamily: 'Cinzel',
            fontWeight: 700,
            letterSpacing: 2,
            bgcolor: 'rgba(0, 200, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(0, 200, 255, 0.5)',
            color: 'white',
            boxShadow: '0 0 20px rgba(0, 200, 255, 0.2)',
            transition: 'all 0.3s',
            '&:hover': {
              bgcolor: 'rgba(0, 200, 255, 0.15)',
              borderColor: '#00c8ff',
              boxShadow: '0 0 35px rgba(0, 200, 255, 0.4)',
              transform: 'translateY(-2px)'
            }
          }}
        >
          {isPlaying ? "Detener Energía" : "Siente la Energía"}
        </Button>
        <Typography variant="caption" display="block" sx={{ fontFamily: 'Cinzel', fontSize: '0.7rem', letterSpacing: 2, opacity: 0.6 }}>
          Creado por Mano Eléctrica Azul • TuEnergiaMaya • 2026
        </Typography>
      </Box>

      {/* MODAL: QUINTA FUERZA (ORÁCULO) */}
      <Modal
        open={showOracle}
        onClose={() => setShowOracle(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}
      >
        <Fade in={showOracle}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '100%', height: '100%', outline: 'none', overflowY: 'auto', p: 2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
            <Box sx={{ width: '100%', maxWidth: 600, position: 'relative' }}>
              <Typography variant="h4" align="center" sx={{ color: 'white', fontFamily: 'Cinzel', mb: 2 }}>
                ORÁCULO DEL KIN
              </Typography>
              <QuintaFuerza kinData={kinData} />
              <Button
                variant="outlined"
                onClick={() => setShowOracle(false)}
                sx={{
                  mt: 3,
                  display: 'block',
                  mx: 'auto',
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '20px',
                  px: 4,
                  py: 0.5,
                  fontSize: '0.8rem',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                VOLVER
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* MODAL: TRIBE LIST (EXPLORADOR) */}
      <Modal
        open={showTribes}
        onClose={() => setShowTribes(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}
      >
        <Fade in={showTribes}>
          <Box sx={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%', outline: 'none', bgcolor: 'transparent'
          }}>
            <TribeList onClose={() => setShowTribes(false)} />
          </Box>
        </Fade>
      </Modal>

      {/* MODAL: NATAL KIN TOOL */}
      <Modal
        open={showNatal}
        onClose={() => setShowNatal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}
      >
        <Fade in={showNatal}>
          <Box sx={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%', outline: 'none', overflowY: 'auto', p: 2,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start'
          }}>
            <Box sx={{ my: 'auto', width: '100%', display: 'flex', justifyContent: 'center', py: 4 }}>
              <NatalKinTool onClose={() => setShowNatal(false)} />
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* MODAL: TONE LIST (EXPLORADOR TONOS) */}
      <Modal
        open={showTones}
        onClose={() => setShowTones(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}
      >
        <Fade in={showTones}>
          <Box sx={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%', outline: 'none', bgcolor: 'transparent'
          }}>
            <ToneList onClose={() => setShowTones(false)} />
          </Box>
        </Fade>
      </Modal>

      {/* MODAL: PODCAST SPOTIFY */}
      <Modal
        open={showPodcast}
        onClose={() => setShowPodcast(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}
      >
        <Fade in={showPodcast}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '100%', maxWidth: 500, outline: 'none', p: 2,
            display: 'flex', flexDirection: 'column', alignItems: 'center'
          }}>
            <Box className="glass-card" sx={{ p: 1, width: '100%', bgcolor: 'rgba(0,0,0,0.6)' }}>
              <Typography variant="h5" align="center" sx={{ color: 'white', fontFamily: 'Cinzel', mb: 2, pt: 2 }}>
                TU ENERGÍA MAYA: PODCAST
              </Typography>
              <SpotifyPlayer />
              <Button
                variant="outlined"
                onClick={() => setShowPodcast(false)}
                sx={{
                  mt: 3,
                  display: 'block',
                  mx: 'auto',
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '20px',
                  px: 4,
                  py: 0.5,
                  fontSize: '0.8rem',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                VOLVER
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* CHAT ASSISTANT - TEMPORALMENTE DESACTIVADO POR MANTENIMIENTO */}
      {/* <ChatAssistant kinData={kinData} /> */}

    </Box>
  )
}

export default App
