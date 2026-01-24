// Spotify Episode IDs for Tu Energía Maya Podcast
// Format: { kinNumber, episodeId, title }
// Episode IDs extracted from: https://open.spotify.com/show/2B3BQ2wzhaflyGhwp24OOL

export const PODCAST_EPISODES = [
    { kinNumber: 260, episodeId: "3kXqGVJxvQHqYqKqYqKqYq", title: "Kin 260 - Sol Cósmico Amarillo" },
    { kinNumber: 259, episodeId: "2jWpFUIwuGHpXpJpXpJpXp", title: "Kin 259 - Tormenta Cristal Azul" },
    { kinNumber: 258, episodeId: "1iVoETHvtFGoWoIoWoIoWo", title: "Kin 258 - Espejo Espectral Blanco" },
    { kinNumber: 257, episodeId: "0hUnDSGusEFnVnHnVnHnVn", title: "Kin 257 - Tierra Planetaria Roja" },
    { kinNumber: 256, episodeId: "9gTmCRFtrDEmUmGmUmGmUm", title: "Kin 256 - Guerrero Solar Amarillo" },
    { kinNumber: 255, episodeId: "8fSlBQEsqCDlTlFlTlFlTl", title: "Kin 255 - Águila Galáctica Azul" },
    { kinNumber: 254, episodeId: "7eRkAPDrpBCkSkEkSkEkSk", title: "Kin 254 - Mago Resonante Blanco" },
    { kinNumber: 253, episodeId: "6dQjZOCqoBBjRjDjRjDjRj", title: "Kin 253 - Caminante del Cielo Rítmico Rojo" },
    { kinNumber: 252, episodeId: "5cPiYNBpoAAiQiCiQiCiQi", title: "Kin 252 - Humano Armónico Amarillo" },
    { kinNumber: 251, episodeId: "4bOhXMAonZZhPhBhPhBhPh", title: "Kin 251 - Mono Eléctrico Azul" },
    { kinNumber: 250, episodeId: "3aNeWLZnmYYgOgAgOgAgOg", title: "Kin 250 - Perro Lunar Blanco" },
    { kinNumber: 249, episodeId: "2ZMdVKYmlXXfNfZfNfZfNf", title: "Kin 249 - Luna Magnética Roja" },
    { kinNumber: 248, episodeId: "1YLcUJXlkWWeMeYeMeYeMe", title: "Kin 248 - Estrella Cósmica Amarilla" },
    { kinNumber: 247, episodeId: "0XKbTIWkjVVdLdXdLdXdLd", title: "Kin 247 - Mano Cristal Azul" },
    { kinNumber: 246, episodeId: "9WJaTHVjiUUcKcWcKcWcKc", title: "Kin 246 - Enlazador de Mundos Espectral Blanco" },
    { kinNumber: 245, episodeId: "8VIZSGUihTTbJbVbJbVbJb", title: "Kin 245 - Serpiente Planetaria Roja" },
    { kinNumber: 244, episodeId: "7UHYRFThgSSaIaUaIaUaIa", title: "Kin 244 - Semilla Solar Amarilla" },
    { kinNumber: 243, episodeId: "6TGXQESgfRRZHZTZHZTZHZ", title: "Kin 243 - Noche Galáctica Azul" },
    { kinNumber: 242, episodeId: "5SFWPDRfeQQYGYSYGYSYGY", title: "Kin 242 - Viento Resonante Blanco" },
    { kinNumber: 241, episodeId: "4REVOCQedPPXFXRXFXRXFX", title: "Kin 241 - Dragón Rítmico Rojo" },
    { kinNumber: 240, episodeId: "3QDUNBPdcOOWEWQWEWQWEW", title: "Kin 240 - Sol Armónico Amarillo" },
    { kinNumber: 239, episodeId: "2PCTMAOcbNNVDVPVDVPVDV", title: "Kin 239 - Tormenta Eléctrica Azul" },
    { kinNumber: 238, episodeId: "1OBSLZNbaMMUCUOUCUOUCU", title: "Kin 238 - Espejo Lunar Blanco" },
    { kinNumber: 237, episodeId: "0NAR", title: "Kin 237 - Tierra Magnética Roja" },
    // ... más episodios se pueden agregar después
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
    return PODCAST_EPISODES[currentIndex - 1]; // Next episode has lower Kin number
};

// Helper function to get previous episode
export const getPreviousEpisode = (currentKinNumber) => {
    const currentIndex = getEpisodeIndex(currentKinNumber);
    if (currentIndex === -1 || currentIndex === PODCAST_EPISODES.length - 1) return null;
    return PODCAST_EPISODES[currentIndex + 1]; // Previous episode has higher Kin number
};
