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

function App() {
  const [kinData, setKinData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const audioRef = useRef(null)
  const dateInputRef = useRef(null)

  useEffect(() => {
    updateKinForDate(new Date())
  }, [])

  const updateKinForDate = (date) => {
    setLoading(true)
    // Adjust for timezone offset to prevent day shifting
    // Ensure we are working with the start of the selected day in local time
    const selectedDate = new Date(date)
    selectedDate.setHours(0, 0, 0, 0)

    const kinNumber = calculateKin(selectedDate)
    const config = getKinConfig(kinNumber)

    // Merge with static data if exists
    const extraInfo = dailyData[kinNumber] || {}

    setKinData({
      date: selectedDate.toISOString(),
      kin_number: kinNumber,
      kin: {
        ...config,
        ...extraInfo,  // JSON data overrides automatic generation
        affirmation: extraInfo.affirmation || config.affirmation || "Conecta con la vibración de tu ser sagrado hoy.",
        short_description: extraInfo.short_description || config.short_description || "",
        long_description: extraInfo.long_description || config.long_description || "",
        image_url: extraInfo.image_url || null
      }
    })
    setLoading(false)
    setShowDetails(false) // Reset details view
    setIsFlipped(false)   // Reset card flip
  }

  const handleDateChange = (event) => {
    if (event.target.value) {
      // Create date from YYYY-MM-DD input, considering local time
      const [year, month, day] = event.target.value.split('-').map(Number);
      const newDate = new Date(year, month - 1, day);
      updateKinForDate(newDate);
    }
  }

  // triggerDatePicker removed - using direct input overlay for mobile compatibility

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

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'transparent' }}>
      <audio ref={audioRef} src="ambient.mp3" loop />

      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
            <Box
              component="img"
              src="favicon.png"
              alt="Mano Eléctrica Azul"
              sx={{
                width: 40,
                height: 40,
                filter: 'drop-shadow(0 0 8px rgba(0, 200, 255, 0.5))',
                animation: 'pulse 3s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(0, 200, 255, 0.5))' },
                  '50%': { filter: 'drop-shadow(0 0 15px rgba(0, 200, 255, 0.8))' }
                }
              }}
            />
            <Typography variant="h6" component="div" sx={{ fontWeight: 800, fontFamily: 'Cinzel', color: 'white', letterSpacing: 2 }}>
              TuEnergiaMaya
            </Typography>
          </Box>
          <IconButton color="inherit" onClick={toggleAudio}>
            {isPlaying ? <MusicNoteIcon color="primary" /> : <MusicOffIcon />}
          </IconButton>
          {/* Date Picker Button with Mobile-Friendly Overlay */}
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <IconButton color="inherit" component="span">
              <CalendarMonthIcon />
            </IconButton>
            <input
              type="date"
              ref={dateInputRef}
              onChange={handleDateChange}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                cursor: 'pointer',
                zIndex: 1
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 10, mb: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {loading ? (
          <Box className="glass-card">
            <Skeleton variant="circular" width={100} height={100} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="60%" height={40} sx={{ mx: 'auto' }} />
          </Box>
        ) : kinData?.kin ? (
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography variant="overline" align="center" display="block" sx={{ opacity: 0.8, letterSpacing: 4, mb: 2, fontFamily: 'Cinzel', fontWeight: 700 }}>
                {new Date(kinData.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </Typography>

              <Box className={`flip-card ${isFlipped ? 'is-flipped' : ''}`} onClick={handleFlip} sx={{ height: 500 }}>
                <Box className="flip-card-inner">
                  {/* FRONT SIDE */}
                  <Card className="glass-card card-front" sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 4, bgcolor: 'rgba(20,20,30,0.8)' }}>
                    <Box sx={{ mb: 2 }}>
                      <Box
                        className="kin-image-glow"
                        sx={{
                          width: 140,
                          height: 140,
                          borderRadius: '50%',
                          background: kinData.kin.color === 'White'
                            ? 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)'
                            : kinData.kin.color === 'Red'
                              ? 'linear-gradient(135deg, #ff5252 0%, #b71c1c 100%)'
                              : kinData.kin.color === 'Blue'
                                ? 'linear-gradient(135deg, #448aff 0%, #0d47a1 100%)'
                                : 'linear-gradient(135deg, #ffd740 0%, #f57f17 100%)',
                          mx: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 0 40px ${kinData.kin.color === 'Red' ? 'rgba(255,0,0,0.4)' :
                            kinData.kin.color === 'White' ? 'rgba(255,255,255,0.4)' :
                              kinData.kin.color === 'Blue' ? 'rgba(0,0,255,0.4)' :
                                'rgba(255,255,0,0.4)'
                            }`,
                          border: '2px solid rgba(255,255,255,0.3)',
                          overflow: 'hidden',
                          p: 2.5
                        }}
                      >
                        <img
                          src={`assets/glyphs/${kinData.kin.slug}.png`}
                          alt={kinData.kin.seal_name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            filter: kinData.kin.color === 'White' ? 'drop-shadow(0 0 2px rgba(0,0,0,0.5))' : 'drop-shadow(0 0 5px rgba(255,255,255,0.3))'
                          }}
                        />
                      </Box>
                      <Typography sx={{ mt: 1, color: 'white', fontWeight: 800, fontSize: '0.8rem', opacity: 0.6, letterSpacing: 2, fontFamily: 'Cinzel' }}>
                        KIN {kinData.kin_number}
                      </Typography>
                    </Box>

                    <Typography variant="h4" component="h2" sx={{ color: 'white', fontWeight: 800, mb: 0.5, fontFamily: 'Cinzel', textTransform: 'uppercase', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                      {kinData.kin.seal_name}
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.8, mb: 3, fontWeight: 400, fontFamily: 'Lora', fontStyle: 'italic', color: 'white' }}>
                      {kinData.kin.tone_name}
                    </Typography>

                    <Typography variant="body1" className="afirmacion" sx={{ px: 2, mb: 3, color: 'white' }}>
                      {kinData.kin.affirmation}
                    </Typography>

                    <Typography variant="caption" sx={{ opacity: 0.5, mt: 2, color: 'white' }}>
                      (Toca la carta para revelar la infografía)
                    </Typography>
                  </Card>

                  {/* BACK SIDE */}
                  <Card className="glass-card card-back" sx={{ height: '100%', position: 'absolute', top: 0, left: 0 }}>
                    <Box sx={{ position: 'relative', width: '100%', height: '85%', borderRadius: '15px', overflow: 'hidden' }}>
                      <Infographic kinData={kinData} />
                      <IconButton
                        onClick={handleOpenModal}
                        sx={{ position: 'absolute', bottom: 10, right: 10, bgcolor: 'rgba(0,0,0,0.5)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' }, zIndex: 10 }}
                      >
                        <ZoomInIcon />
                      </IconButton>
                    </Box>
                    <Button variant="outlined" color="inherit" onClick={(e) => { e.stopPropagation(); handleFlip(); }} sx={{ mt: 1, borderRadius: 20 }}>
                      VOLVER
                    </Button>
                  </Card>
                </Box>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Box className="glass-card" sx={{ p: 3 }}>
                  <Typography variant="subtitle2" color="primary.light" sx={{ mb: 1, fontWeight: 800, fontFamily: 'Cinzel', letterSpacing: 1, textAlign: 'center' }}>
                    SABIDURÍA DIARIA
                  </Typography>
                  <Typography variant="body2" sx={{ lineHeight: 1.8, fontSize: '1.1rem', opacity: 0.9, fontWeight: 400, fontFamily: 'Lora', textAlign: 'center' }}>
                    {kinData.kin.short_description || "Esta energía nos invita a conectar con nuestro propósito superior. Sincronízate con el tiempo natural del universo."}
                  </Typography>

                  {kinData.kin.long_description && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <Button
                        endIcon={<ZoomInIcon sx={{ transform: showDetails ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />}
                        onClick={() => setShowDetails(!showDetails)}
                        sx={{ color: 'white', opacity: 0.7, '&:hover': { opacity: 1 } }}
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
        BackdropProps={{ timeout: 500, sx: { bgcolor: 'rgba(0,0,0,0.95)' } }}
      >
        <Fade in={isModalOpen}>
          <Box
            onClick={() => setIsModalOpen(false)}
            sx={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '95vw', height: '95vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
              outline: 'none', cursor: 'zoom-out', bgcolor: '#0f172a', borderRadius: 2, overflow: 'hidden'
            }}
          >
            <Infographic kinData={kinData} />
          </Box>
        </Fade>
      </Modal>

      <Box component="footer" sx={{ p: 4, textAlign: 'center', opacity: 0.6 }}>
        {!isPlaying && (
          <Button
            startIcon={<MusicNoteIcon />}
            variant="outlined"
            color="inherit"
            onClick={toggleAudio}
            sx={{ mb: 2, borderRadius: 30, px: 3, py: 1, fontFamily: 'Lora' }}
          >
            Siente la Energía (Activar Audio)
          </Button>
        )}
        <Typography variant="caption" display="block" sx={{ fontFamily: 'Cinzel', fontSize: '0.7rem', letterSpacing: 2 }}>
          Creado por Mano Eléctrica Azul • TuEnergiaMaya • 2026
        </Typography>
      </Box>
    </Box>
  )
}

export default App
