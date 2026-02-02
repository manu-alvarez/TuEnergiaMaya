import React from 'react';
import { AppBar, Toolbar, Box, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <Box
                        component="img"
                        src="/favicon.png"
                        alt="Logo"
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
                    <Typography variant="h5" component="div" sx={{ fontWeight: 800, fontFamily: 'Cinzel', color: 'white', letterSpacing: 3, textShadow: '0 0 12px rgba(0,200,255,0.4)', display: { xs: 'none', sm: 'block' } }}>
                        TuEnergiaMaya
                    </Typography>
                </Box>

                <Box>
                    <Button
                        color="inherit"
                        onClick={() => navigate('/community')}
                        startIcon={<PeopleIcon />}
                        sx={{
                            fontFamily: 'Lora',
                            fontWeight: 'bold',
                            mr: 2,
                            display: { xs: 'none', sm: 'inline-flex' },
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                color: '#4fc3f7',
                                textShadow: '0 0 10px rgba(79, 195, 247, 0.6)',
                                background: 'transparent'
                            }
                        }}
                    >
                        Comunidad
                    </Button>
                    {/* Mobile Icon Only */}
                    <IconButton
                        color="inherit"
                        onClick={() => navigate('/community')}
                        sx={{ display: { xs: 'inline-flex', sm: 'none' }, mr: 1 }}
                    >
                        <PeopleIcon />
                    </IconButton>

                    <Button
                        color="inherit"
                        onClick={() => navigate('/oracle')}
                        startIcon={<AutoAwesomeIcon />}
                        sx={{
                            fontFamily: 'Lora',
                            fontWeight: 'bold',
                            mr: 2,
                            display: { xs: 'none', sm: 'inline-flex' },
                            color: '#d8b4fe',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                color: '#c084fc',
                                textShadow: '0 0 15px rgba(192, 132, 252, 0.8)',
                                transform: 'scale(1.05)',
                                background: 'transparent'
                            }
                        }}
                    >
                        Oráculo
                    </Button>
                    <IconButton
                        color="inherit"
                        onClick={() => navigate('/oracle')}
                        sx={{ display: { xs: 'inline-flex', sm: 'none' }, mr: 1, color: '#d8b4fe' }}
                    >
                        <AutoAwesomeIcon />
                    </IconButton>

                    <Button color="inherit" onClick={() => navigate('/login')} sx={{ fontFamily: 'Lora', fontWeight: 'bold' }}>Ingresar</Button>

                    <IconButton
                        component="a"
                        href="https://instagram.com/manoelectricaazul87"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            color: 'white',
                            opacity: 0.8,
                            ml: 1,
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
    );
};

export default Navbar;
