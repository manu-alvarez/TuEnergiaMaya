import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { PODCAST_EPISODES, getEpisodeIndex, getNextEpisode, getPreviousEpisode } from '../data/episodes';

const SpotifyPlayer = ({ podcastUrl, currentKinNumber }) => {
    // State to track current episode
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(() => {
        // Initialize with current Kin if provided, otherwise use first episode
        if (currentKinNumber) {
            const index = getEpisodeIndex(currentKinNumber);
            return index !== -1 ? index : 0;
        }
        return 0;
    });

    const currentEpisode = PODCAST_EPISODES[currentEpisodeIndex];

    // Default show URL
    const defaultShowUrl = "https://open.spotify.com/embed/show/2B3BQ2wzhaflyGhwp24OOL?utm_source=generator&theme=0";

    // Build episode embed URL
    const getEmbedUrl = () => {
        if (podcastUrl) {
            // If custom URL provided, use it
            if (podcastUrl.includes('/embed/')) return podcastUrl;
            return podcastUrl.replace('open.spotify.com/', 'open.spotify.com/embed/');
        }

        // Use current episode if available
        if (currentEpisode && currentEpisode.episodeId) {
            return `https://open.spotify.com/embed/episode/${currentEpisode.episodeId}?utm_source=generator&theme=0`;
        }

        // Fallback to show URL
        return defaultShowUrl;
    };

    const embedUrl = getEmbedUrl();

    // Navigation handlers
    const handlePrevious = () => {
        if (currentEpisodeIndex < PODCAST_EPISODES.length - 1) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        }
    };

    const handleNext = () => {
        if (currentEpisodeIndex > 0) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        }
    };

    const hasPrevious = currentEpisodeIndex < PODCAST_EPISODES.length - 1;
    const hasNext = currentEpisodeIndex > 0;

    return (
        <Box sx={{
            mt: 4,
            p: 1,
            borderRadius: '24px',
            bgcolor: '#000000',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 15px 45px 0 rgba(0, 0, 0, 0.8)',
            colorScheme: 'dark'
        }}>
            {/* Header with title */}
            <Typography
                variant="subtitle2"
                color="primary.light"
                sx={{
                    mb: 1,
                    fontWeight: 800,
                    fontFamily: 'Cinzel',
                    letterSpacing: 1,
                    textAlign: 'center'
                }}
            >
                ESCUCHA EL PODCAST
            </Typography>

            {/* Navigation Controls */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1,
                px: 1
            }}>
                <IconButton
                    onClick={handlePrevious}
                    disabled={!hasPrevious}
                    sx={{
                        color: 'primary.light',
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                        },
                        '&.Mui-disabled': {
                            color: 'rgba(255, 255, 255, 0.3)',
                            bgcolor: 'rgba(255, 255, 255, 0.02)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                    size="small"
                >
                    <ArrowBackIos sx={{ fontSize: 16, ml: 0.5 }} />
                </IconButton>

                <Typography
                    variant="caption"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontFamily: 'Outfit',
                        fontSize: '0.75rem',
                        textAlign: 'center',
                        flex: 1,
                        px: 2
                    }}
                >
                    {currentEpisode ? currentEpisode.title : 'Todos los episodios'}
                </Typography>

                <IconButton
                    onClick={handleNext}
                    disabled={!hasNext}
                    sx={{
                        color: 'primary.light',
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                        },
                        '&.Mui-disabled': {
                            color: 'rgba(255, 255, 255, 0.3)',
                            bgcolor: 'rgba(255, 255, 255, 0.02)',
                        },
                        transition: 'all 0.3s ease',
                    }}
                    size="small"
                >
                    <ArrowForwardIos sx={{ fontSize: 16 }} />
                </IconButton>
            </Box>

            {/* Spotify Embed */}
            <iframe
                key={embedUrl} // Force re-render when URL changes
                title="Spotify Podcast"
                style={{
                    borderRadius: '12px',
                    border: 'none',
                    background: 'transparent'
                }}
                src={embedUrl}
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            ></iframe>
        </Box>
    );
};

export default SpotifyPlayer;
