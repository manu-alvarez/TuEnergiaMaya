import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Tooltip, Zoom, Fade, Modal, Backdrop, Button } from '@mui/material';
import { getColorHex, getColorGlow } from '../utils/colorUtils';
// CloseIcon removed

const QuintaFuerza = ({ kinData }) => {
    const canvasRef = useRef(null);
    const [hoveredPos, setHoveredPos] = useState(null);
    const [selectedSeal, setSelectedSeal] = useState(null);

    // Destructure kin safely
    const kin = kinData?.kin || kinData;
    if (!kin || !kin.oracle) return null;

    const { guide, analog, antipode, occult } = kin.oracle;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const particles = [];
        const particleCount = 40;

        class Particle {
            constructor(targetPos) {
                this.reset(targetPos);
            }

            reset(targetPos) {
                this.x = canvas.width / 2;
                this.y = canvas.height / 2;
                this.targetPos = targetPos; // 0: Top, 1: Right, 2: Left, 3: Bottom

                const angle = this.getAngle();
                const speed = 0.5 + Math.random() * 1.5;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.life = 0;
                this.maxLife = 50 + Math.random() * 50;
                this.size = Math.random() * 2 + 1;
            }

            getAngle() {
                if (this.targetPos === 0) return -Math.PI / 2 + (Math.random() - 0.5) * 0.5;
                if (this.targetPos === 1) return 0 + (Math.random() - 0.5) * 0.5;
                if (this.targetPos === 2) return Math.PI + (Math.random() - 0.5) * 0.5;
                return Math.PI / 2 + (Math.random() - 0.5) * 0.5;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life++;
                if (this.life >= this.maxLife) {
                    this.reset(Math.floor(Math.random() * 4));
                }
            }

            draw() {
                const opacity = 1 - (this.life / this.maxLife);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(147, 51, 234, ${opacity * 0.5})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(Math.floor(Math.random() * 4)));
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw energy lines from center to satellites
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const time = Date.now() * 0.002;

            const targets = [
                { x: centerX, y: 40 }, // Top (Guía)
                { x: canvas.width - 60, y: centerY }, // Right (Análogo)
                { x: 60, y: centerY }, // Left (Antípoda)
                { x: centerX, y: canvas.height - 40 } // Bottom (Oculto)
            ];

            ctx.lineWidth = 1.5;
            targets.forEach((target, index) => {
                // Determine target color based on position
                let targetColorHex = '#9333ea'; // Fallback purple
                let targetColorName = 'Morado';

                if (index === 0 && kin?.oracle?.guide?.color) { targetColorName = kin.oracle.guide.color; } // Top - Guide
                else if (index === 1 && kin?.oracle?.analog?.color) { targetColorName = kin.oracle.analog.color; } // Right - Analog
                else if (index === 2 && kin?.oracle?.antipode?.color) { targetColorName = kin.oracle.antipode.color; } // Left - Antipode
                else if (index === 3 && kin?.oracle?.occult?.color) { targetColorName = kin.oracle.occult.color; } // Bottom - Occult

                // Map color name to hex
                targetColorHex = getColorHex(targetColorName, '#9333ea');

                // Determine center color
                const centerColorName = kin?.color || 'Morado';
                const centerColorHex = getColorHex(centerColorName, '#9333ea');


                const gradient = ctx.createLinearGradient(centerX, centerY, target.x, target.y);
                gradient.addColorStop(0, centerColorHex); // Start from Center Color
                gradient.addColorStop(1, targetColorHex); // End at Target Color

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.setLineDash([10, 5]);
                ctx.lineDashOffset = -time * 20;
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(target.x, target.y);
                ctx.stroke();

                // Glow effect at target
                const glow = ctx.createRadialGradient(target.x, target.y, 0, target.x, target.y, 15);
                // Use target color for glow, fading to transparent
                // Need to convert hex to rgba for opacity. Simple hack:
                const hexToRgba = (hex, alpha) => {
                    const r = parseInt(hex.slice(1, 3), 16);
                    const g = parseInt(hex.slice(3, 5), 16);
                    const b = parseInt(hex.slice(5, 7), 16);
                    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
                };

                glow.addColorStop(0, hexToRgba(targetColorHex, 0.6));
                glow.addColorStop(1, 'transparent');

                ctx.fillStyle = glow;
                ctx.beginPath();
                ctx.arc(target.x, target.y, 15 + Math.sin(time) * 5, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.setLineDash([]); // Reset for particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrameId = window.requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [kin]);

    const getColorGradient = (color) => {
        const c = color.toLowerCase();
        if (c.includes('rojo')) return 'radial-gradient(circle, rgba(255, 82, 82, 0.4) 0%, transparent 70%)';
        if (c.includes('blanco')) return 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%)';
        if (c.includes('azul')) return 'radial-gradient(circle, rgba(68, 138, 255, 0.4) 0%, transparent 70%)';
        return 'radial-gradient(circle, rgba(255, 215, 64, 0.4) 0%, transparent 70%)';
    };

    // Robust color to hex conversion
    const getColorHex = (colorValue) => {
        if (!colorValue || typeof colorValue !== 'string') return '#eab308'; // Default yellow
        const c = colorValue.toLowerCase();
        if (c.includes('rojo') || c.includes('roja')) return '#ef4444';
        if (c.includes('blanco') || c.includes('blanca')) return '#ffffff';
        if (c.includes('azul')) return '#3b82f6';
        return '#eab308'; // Amarillo default
    };

    const handleSealClick = (seal, label) => {
        setSelectedSeal({ ...seal, label });
    };

    const SelloSagrado = ({ seal, label, position, isCenter = false }) => {
        if (!seal) return null;
        // Get color from seal data - check multiple possible properties
        const color = seal.color || seal.seal_color || 'Blanco';
        const auraColor = getColorGradient(color);

        return (
            <Tooltip
                title={
                    <Box sx={{ p: 1, textAlign: 'center' }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontFamily: 'Cinzel' }}>{label}: {seal.name || seal.seal_name}</Typography>
                        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>{seal.keywords || "Energía Sagrada"}</Typography>
                    </Box>
                }
                arrow
                TransitionComponent={Zoom}
            >
                <Box
                    onMouseEnter={() => setHoveredPos(label)}
                    onMouseLeave={() => setHoveredPos(null)}
                    onClick={() => handleSealClick(seal, label)}
                    sx={{
                        position: isCenter ? 'relative' : 'absolute',
                        ...position,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: isCenter ? 10 : 5,
                        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        cursor: 'pointer',
                        transform: hoveredPos === label ? 'scale(1.25) translateY(-10px)' : 'scale(1)',
                        '&:hover .aura': { opacity: 1, transform: 'scale(1.5)' }
                    }}
                >
                    {/* Aura */}
                    <Box className="aura" sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: isCenter ? 150 : 100,
                        height: isCenter ? 150 : 100,
                        transform: 'translate(-50%, -50%)',
                        background: auraColor,
                        borderRadius: '50%',
                        opacity: isCenter ? 0.6 : 0.3,
                        transition: 'all 0.5s ease',
                        pointerEvents: 'none',
                        mixBlendMode: 'screen'
                    }} />

                    {/* Badge Sello */}
                    <Box sx={{
                        width: isCenter ? { xs: 80, sm: 100 } : { xs: 60, sm: 75 },
                        height: isCenter ? { xs: 80, sm: 100 } : { xs: 60, sm: 75 },
                        borderRadius: '50%',
                        background: 'rgba(15, 15, 30, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: `2px solid ${getColorHex(color)}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1.5,
                        boxShadow: hoveredPos === label ? `0 0 30px ${getColorHex(color)}80` : 'none',
                        animation: 'float-ethereal 4s ease-in-out infinite'
                    }}>
                        <img
                            src={`assets/glyphs/seals/${seal.slug}.png`}
                            alt={seal.name || seal.seal_name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </Box>
                    <Typography sx={{
                        mt: 1,
                        color: 'white',
                        fontFamily: 'Cinzel',
                        fontSize: isCenter ? '0.8rem' : '0.6rem',
                        fontWeight: 'bold',
                        letterSpacing: 2,
                        textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                        opacity: hoveredPos === label ? 1 : 0.7
                    }}>
                        {label}
                    </Typography>
                </Box>
            </Tooltip>
        );
    };

    const [aiReading, setAiReading] = useState(null);
    const [isLoadingReading, setIsLoadingReading] = useState(false);
    const [showAiModal, setShowAiModal] = useState(false);

    const handleGetOracleReading = async () => {
        setIsLoadingReading(true);
        setShowAiModal(true);
        setAiReading(null);
        try {
            const { api } = await import('../services/api');
            const response = await api.getOracleReading(kin);
            setAiReading(response.response);
        } catch (error) {
            setAiReading("Lo siento, no pude conectar con el Oráculo en este momento. Inténtalo más tarde.");
        } finally {
            setIsLoadingReading(false);
        }
    };

    return (
        <Box sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 500,
            height: 450,
            mx: 'auto',
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />

            {/* Central - Destino */}
            <SelloSagrado seal={kin} label="DESTINO" isCenter={true} />

            {/* Cruce Sagrado */}
            <SelloSagrado seal={guide} label="GUÍA" position={{ top: 0 }} />
            <SelloSagrado seal={analog} label="ANÁLOGO" position={{ right: { xs: 0, sm: 20 } }} />
            <SelloSagrado seal={antipode} label="ANTÍPODA" position={{ left: { xs: 0, sm: 20 } }} />
            <SelloSagrado seal={occult} label="OCULTO" position={{ bottom: 0 }} />

            {/* Botón de IA */}
            <Box sx={{ position: 'absolute', bottom: -40, zIndex: 10 }}>
                <Button
                    variant="outlined"
                    onClick={handleGetOracleReading}
                    startIcon={<span>✨</span>}
                    sx={{
                        color: '#c084fc',
                        borderColor: 'rgba(192, 132, 252, 0.5)',
                        borderRadius: '20px',
                        px: 3,
                        py: 0.8,
                        fontSize: '0.8rem',
                        fontFamily: 'Cinzel',
                        fontWeight: 'bold',
                        letterSpacing: 1,
                        bgcolor: 'rgba(15, 15, 30, 0.8)',
                        backdropFilter: 'blur(5px)',
                        boxShadow: '0 0 15px rgba(192, 132, 252, 0.2)',
                        '&:hover': {
                            borderColor: '#c084fc',
                            bgcolor: 'rgba(192, 132, 252, 0.1)',
                            boxShadow: '0 0 25px rgba(192, 132, 252, 0.4)'
                        }
                    }}
                >
                    LECTURA PROFUNDA DEL ORÁCULO
                </Button>
            </Box>

            {/* Modal de Lectura de IA */}
            <Modal
                open={showAiModal}
                onClose={() => setShowAiModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500, sx: { backdropFilter: 'blur(10px)', bgcolor: 'rgba(0,0,0,0.8)' } }}
            >
                <Fade in={showAiModal}>
                    <Box sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '90%', maxWidth: 500, maxHeight: '80vh', overflowY: 'auto',
                        bgcolor: 'rgba(15, 15, 30, 0.95)',
                        border: '1px solid rgba(192, 132, 252, 0.5)',
                        borderRadius: 4, p: { xs: 3, sm: 4 }, outline: 'none', textAlign: 'center',
                        boxShadow: '0 0 50px rgba(192, 132, 252, 0.3)'
                    }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Cinzel', color: '#c084fc', mb: 3, fontWeight: 'bold' }}>
                            ✨ LECTURA DEL ORÁCULO ✨
                        </Typography>
                        
                        {isLoadingReading ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                                <Box sx={{
                                    width: 40, height: 40, borderRadius: '50%',
                                    border: '3px solid rgba(192, 132, 252, 0.2)',
                                    borderTopColor: '#c084fc',
                                    animation: 'spin 1s linear infinite'
                                }} />
                                <Typography sx={{ mt: 3, fontFamily: 'Lora', color: 'rgba(255,255,255,0.7)' }}>
                                    Conectando con la sabiduría galáctica...
                                </Typography>
                                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                            </Box>
                        ) : (
                            <Typography variant="body1" sx={{ 
                                color: 'rgba(255,255,255,0.9)', 
                                lineHeight: 1.8, 
                                fontFamily: 'Lora', 
                                mb: 4,
                                textAlign: 'left',
                                whiteSpace: 'pre-line'
                            }}>
                                {aiReading}
                            </Typography>
                        )}

                        <Button
                            variant="outlined"
                            onClick={() => setShowAiModal(false)}
                            sx={{
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
                            CERRAR
                        </Button>
                    </Box>
                </Fade>
            </Modal>

            {/* Modal de Información del Sello (Original) */}
            <Modal
                open={Boolean(selectedSeal)}
                onClose={() => setSelectedSeal(null)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500, sx: { backdropFilter: 'blur(10px)', bgcolor: 'rgba(0,0,0,0.8)' } }}
            >
                <Fade in={Boolean(selectedSeal)}>
                    <Box sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: '90%', maxWidth: 400,
                        bgcolor: 'rgba(0, 0, 0, 0.95)',
                        border: `2px solid ${getColorHex(selectedSeal?.color)}`,
                        borderRadius: 8, p: 4, outline: 'none', textAlign: 'center',
                        boxShadow: `0 0 50px ${getColorHex(selectedSeal?.color)}40`
                    }}>
                        {selectedSeal && (
                            <>
                                <Box sx={{
                                    width: 100, height: 100, mx: 'auto', mb: 2, p: 2,
                                    borderRadius: '50%', background: 'rgba(255,255,255,0.05)',
                                    border: `2px solid ${getColorHex(selectedSeal?.color)}`,
                                    boxShadow: `0 0 30px ${getColorGlow(selectedSeal?.color, 0.3)}`
                                }}>
                                    <img
                                        src={`assets/glyphs/seals/${selectedSeal.slug}.png`}
                                        alt={selectedSeal.name || selectedSeal.seal_name}
                                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                                    />
                                </Box>
                                <Typography variant="overline" sx={{
                                    letterSpacing: 3,
                                    fontWeight: 'bold',
                                    color: getColorHex(selectedSeal?.color)
                                }}>
                                    {selectedSeal.label}
                                </Typography>
                                <Typography variant="h4" sx={{ fontFamily: 'Cinzel', color: 'white', mb: 1 }}>
                                    {selectedSeal.name || selectedSeal.seal_name}
                                </Typography>
                                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2, fontStyle: 'italic', fontSize: '1rem' }}>
                                    "{selectedSeal.keywords || "Energía Sagrada"}"
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'white', opacity: 0.9, lineHeight: 1.7, fontFamily: 'Lora', mb: 3 }}>
                                    {selectedSeal.description || selectedSeal.short_description || "Esta energía sagrada te guía en tu camino galáctico. Conéctate con su esencia para expandir tu consciencia."}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={() => setSelectedSeal(null)}
                                    sx={{
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
                            </>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </Box>
    );
};

export default QuintaFuerza;
