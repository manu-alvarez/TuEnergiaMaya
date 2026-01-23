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
        <Box className="glass-card" sx={{ mt: 4, p: 2, overflow: 'hidden' }}>
            <Typography variant="subtitle2" color="primary.light" sx={{ mb: 2, fontWeight: 800, fontFamily: 'Cinzel', letterSpacing: 1, textAlign: 'center' }}>
                ESCUCHA EL PODCAST
            </Typography>
            <iframe
                title="Spotify Podcast"
                style={{ borderRadius: '12px' }}
                src={embedUrl}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </Box>
    );
};

export default SpotifyPlayer;
