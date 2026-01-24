// Spotify Episode IDs for Tu Energía Maya Podcast
// Format: { kinNumber, episodeId, title }
// Episode IDs extracted from: https://open.spotify.com/show/2B3BQ2wzhaflyGhwp24OOL

export const PODCAST_EPISODES = [
    { kinNumber: 46, episodeId: "0O1v54zBotRtDk4CPcRTZN", title: "Kin 46 - Enlazador de Mundos Resonante Blanco" },
    { kinNumber: 45, episodeId: "02lHXb0IuNiHNwB4l5YfrF", title: "Kin 45 - Serpiente Rítmica Roja" },
    { kinNumber: 44, episodeId: "4pOzoLSYuFFrVMn57RJnwl", title: "Kin 44 - Semilla Entonada Amarilla" },
    { kinNumber: 43, episodeId: "3ommODYW0MrwqIk3eKmjkx", title: "Kin 43 - Noche Autoexistente Azul" },
];

// Helper function to find episode by Kin number
export const findEpisodeByKin = (kinNumber) => {
    return PODCAST_EPISODES.find(ep => ep.kinNumber === kinNumber);
};

// Helper function to get episode index
export const getEpisodeIndex = (kinNumber) => {
    return PODCAST_EPISODES.findIndex(ep => ep.kinNumber === kinNumber);
};

// Helper function to get next episode
export const getNextEpisode = (currentKinNumber) => {
    const currentIndex = getEpisodeIndex(currentKinNumber);
    if (currentIndex === -1 || currentIndex === 0) return null;
    return PODCAST_EPISODES[currentIndex - 1]; // Next episode has lower Kin number (if ordered descending)
    // Note: The logic in SpotifyPlayer assumes order in array matches navigation direction. 
    // If array is descending by Kin (46, 45...), then:
    // "Next" (newer) would be index - 1 ? No, usually "Next" implies forward in time or sequence.
    // Context: Player has "Previous" and "Next". 
    // Previous usually means older (higher index in descending list).
    // Next usually means newer (lower index in descending list).
    // I will check SpotifyPlayer logic again to be sure.
};

// Helper function to get previous episode
export const getPreviousEpisode = (currentKinNumber) => {
    const currentIndex = getEpisodeIndex(currentKinNumber);
    if (currentIndex === -1 || currentIndex === PODCAST_EPISODES.length - 1) return null;
    return PODCAST_EPISODES[currentIndex + 1];
};
