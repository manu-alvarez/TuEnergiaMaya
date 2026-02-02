import React, { useState, useEffect } from 'react';
import { Box, TextField, List, ListItem, ListItemAvatar, ListItemText, Avatar, Button, Typography, IconButton, Chip, Fade } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import { api } from '../services/api';

const SocialSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(0);

    const handleSearch = async (searchTerm) => {
        if (searchTerm.length < 3) {
            setResults([]);
            return;
        }
        setLoading(true);
        try {
            const data = await api.searchUsers(searchTerm);
            setResults(data);
        } catch (error) {
            console.error("Search error", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const val = e.target.value;
        setQuery(val);

        if (typingTimeout) clearTimeout(typingTimeout);

        setTypingTimeout(setTimeout(() => {
            handleSearch(val);
        }, 500));
    };

    const sendRequest = async (userId) => {
        try {
            await api.sendFriendRequest(userId);
            // Update local state to show pending
            setResults(results.map(u =>
                u.id === userId ? { ...u, friendship_status: 'sent' } : u
            ));
        } catch (error) {
            console.error("Friend Request error", error);
        }
    };

    return (
        <Box className="glass-card" sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" sx={{ color: 'white', mb: 2, fontFamily: 'Cinzel' }}>
                BUSCAR VIAJEROS
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2, px: 2 }}>
                <SearchIcon sx={{ color: 'rgba(255,255,255,0.5)', mr: 1 }} />
                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Buscar por nombre o correo..."
                    value={query}
                    onChange={handleChange}
                    InputProps={{ disableUnderline: true, sx: { color: 'white' } }}
                />
            </Box>

            <List>
                {results.map((user) => (
                    <Fade in={true} key={user.id}>
                        <ListItem
                            sx={{
                                bgcolor: 'rgba(255,255,255,0.03)',
                                mb: 1.5,
                                borderRadius: '15px',
                                border: '1px solid rgba(255,255,255,0.08)',
                                transition: '0.2s',
                                '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' }
                            }}
                            secondaryAction={
                                user.friendship_status === 'none' ? (
                                    <IconButton edge="end" onClick={() => sendRequest(user.id)} sx={{ color: '#4fc3f7' }}>
                                        <PersonAddIcon />
                                    </IconButton>
                                ) : user.friendship_status === 'sent' ? (
                                    <Chip icon={<AccessTimeIcon sx={{ fontSize: 16 }} />} label="Enviada" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white' }} />
                                ) : user.friendship_status === 'received' ? (
                                    <Typography variant="caption" sx={{ color: '#ffb74d' }}>Pendiente</Typography>
                                ) : (
                                    <Chip icon={<HowToRegIcon sx={{ fontSize: 16 }} />} label="Amigos" size="small" color="success" variant="outlined" />
                                )
                            }
                        >
                            <ListItemAvatar>
                                <Avatar
                                    src={user.kin ? `/assets/glyphs/seals/${user.kin.slug}.png` : null}
                                    sx={{ bgcolor: 'rgba(255,255,255,0.1)', p: 0.5 }}
                                >
                                    {user.name[0]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                        {user.name}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                        {user.kin ? `Kin ${user.kin.kin_number}: ${user.kin.name}` : 'Sin Kin asignado'}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    </Fade>
                ))}
                {query.length >= 3 && results.length === 0 && !loading && (
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', mt: 2 }}>
                        No se encontraron viajeros.
                    </Typography>
                )}
            </List>
        </Box>
    );
};

export default SocialSearch;
