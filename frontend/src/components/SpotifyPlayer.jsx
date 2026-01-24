import React from 'react';
import { Box, Typography } from '@mui/material';

const SpotifyPlayer = ({ podcastUrl }) => {
    // Extract the show ID or episode ID from the URL if needed, 
    // but Spotify Embed usually takes the full share URL and converts it.
    // Standard format: https://open.spotify.com/embed/show/ID or https://open.spotify.com/embed/episode/ID

    // Actual podcast URL provided by user
    const defaultEmbedUrl = "https://open.spotify.com/embed/show/2B3BQ2wzhaflyGhwp24OOL?utm_source=generator&theme=0";

    // Function to convert a standard Spotify URL to an Embed URL
    const getEmbedUrl = (url) => {
        if (!url) return defaultEmbedUrl;
        if (url.includes('/embed/')) return url;
        return url.replace('open.spotify.com/', 'open.spotify.com/embed/');
    };

    const embedUrl = getEmbedUrl(podcastUrl);

    return (
        <Box sx={{
            mt: 4,
            p: 1, // Reducimos padding para evitar franjas
            borderRadius: '24px', // Un poco menos exagerado pero premium
            bgcolor: '#000000', // Negro absoluto para el fondo del reproductor
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 15px 45px 0 rgba(0, 0, 0, 0.8)',
            colorScheme: 'dark' // Forzamos esquema oscuro en el contenedor
        }}>
            <Typography variant="subtitle2" color="primary.light" sx={{ mb: 1, fontWeight: 800, fontFamily: 'Cinzel', letterSpacing: 1, textAlign: 'center' }}>
                ESCUCHA EL PODCAST
            </Typography>
            <iframe
                title="Spotify Podcast"
                style={{
                    borderRadius: '12px',
                    border: 'none',
                    background: 'transparent'
                }}
                src={embedUrl}
                width="100%"
                height="352" // Standard height for episode list
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </Box>
    );
};

export default SpotifyPlayer;
