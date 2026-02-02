import React from 'react';
import { Box } from '@mui/material';

const SpotifyPlayer = () => {
    // URL oficial del Show "Tu Energía Maya" en formato Embed
    // theme=0 para tema oscuro por defecto
    const embedUrl = "https://open.spotify.com/embed/show/2B3BQ2wzhaflyGhwp24OOL?utm_source=generator&theme=0";

    return (
        <Box sx={{
            mt: 4,
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
        }}>
            <iframe
                style={{
                    borderRadius: '12px',
                    border: 'none', // Sin bordes ni sombras externas complejas, el embed ya trae su diseño
                    display: 'block', // Evita espacios extra en inline
                }}
                src={embedUrl}
                width="100%"
                height="152"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Podcast Tu Energía Maya"
            ></iframe>
        </Box>
    );
};

export default SpotifyPlayer;
