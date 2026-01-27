
import fs from 'fs';
import https from 'https';

const SHOW_URL = 'https://open.spotify.com/show/2B3BQ2wzhaflyGhwp24OOL';
const TARGET_FILE = './src/data/episodes.js';

function fetchSpotifyShow() {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };
        https.get(SHOW_URL, options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function syncEpisodes() {
    console.log('Fetching latest episodes from Spotify...');
    try {
        const html = await fetchSpotifyShow();

        // Spotify minified JSON pattern for episodes:
        // "uri":"spotify:episode:6FWsWLyqnjUpVVFx6ax3Wg","name":"Kin 48 - Estrella Solar Amarilla"
        // or vice versa.

        const episodes = [];

        // Regex to find Kin X - Title and the corresponding episode ID
        // Pattern: ... "uri":"spotify:episode:([a-zA-Z0-9]+)" ... "name":"(Kin (\d+)[^"]+)"
        // or ... "name":"(Kin (\d+)[^"]+)" ... "uri":"spotify:episode:([a-zA-Z0-9]+)"

        const regex1 = /"uri":"spotify:episode:([a-zA-Z0-9]{22})".*?"name":"(Kin (\d+)[^"]+)"/g;
        const regex2 = /"name":"(Kin (\d+)[^"]+?)".*?"uri":"spotify:episode:([a-zA-Z0-9]{22})"/g;

        let match;
        while ((match = regex1.exec(html)) !== null) {
            const [_, episodeId, title, kinNum] = match;
            episodes.push({
                kinNumber: parseInt(kinNum),
                episodeId,
                title: title.replace(/\\u0026/g, '&').replace(/\\u0027/g, "'")
            });
        }

        while ((match = regex2.exec(html)) !== null) {
            const [_, title, kinNum, episodeId] = match;
            episodes.push({
                kinNumber: parseInt(kinNum),
                episodeId,
                title: title.replace(/\\u0026/g, '&').replace(/\\u0027/g, "'")
            });
        }

        // Fallback for different HTML patterns found in current Spotify SSR
        if (episodes.length === 0) {
            console.log('Primary regex failed, trying secondary...');
            const altRegex = /href="\/episode\/([a-zA-Z0-9]{22})".*?>(Kin (\d+)[^<]+)<\/a>/g;
            while ((match = altRegex.exec(html)) !== null) {
                const [_, episodeId, title, kinNum] = match;
                episodes.push({
                    kinNumber: parseInt(kinNum),
                    episodeId,
                    title
                });
            }
        }

        // Deduplicate and sort
        const uniqueEpisodes = [];
        const seen = new Set();
        episodes.forEach(ep => {
            if (!seen.has(ep.kinNumber)) {
                uniqueEpisodes.push(ep);
                seen.add(ep.kinNumber);
            }
        });

        uniqueEpisodes.sort((a, b) => b.kinNumber - a.kinNumber);

        if (uniqueEpisodes.length > 0) {
            const content = `// Spotify Episode IDs for Tu Energía Maya Podcast
// This file is automatically updated.
export const PODCAST_EPISODES = ${JSON.stringify(uniqueEpisodes, null, 4)};

export const findEpisodeByKin = (kinNumber) => {
    return PODCAST_EPISODES.find(ep => ep.kinNumber === kinNumber);
};

export const getEpisodeIndex = (kinNumber) => {
    return PODCAST_EPISODES.findIndex(ep => ep.kinNumber === kinNumber);
};

export const getNextEpisode = (currentKinNumber) => {
    const currentIndex = getEpisodeIndex(currentKinNumber);
    if (currentIndex === -1 || currentIndex === 0) return null;
    return PODCAST_EPISODES[currentIndex - 1];
};

export const getPreviousEpisode = (currentKinNumber) => {
    const currentIndex = getEpisodeIndex(currentKinNumber);
    if (currentIndex === -1 || currentIndex === PODCAST_EPISODES.length - 1) return null;
    return PODCAST_EPISODES[currentIndex + 1];
};
`;
            fs.writeFileSync(TARGET_FILE, content);
            console.log(`Successfully synced ${uniqueEpisodes.length} episodes to ${TARGET_FILE}`);
        } else {
            console.log('Found 0 episodes. The Spotify page might be using a protected format or no episodes are visible in the raw HTML.');

            // Hardcoded update for the one we just found in the browser to ensure latest is there
            // Kin 48 was just published.
        }

    } catch (error) {
        console.error('Error syncing episodes:', error);
    }
}

syncEpisodes();
