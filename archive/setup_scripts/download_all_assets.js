const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_DIR = path.join(__dirname, 'frontend/public/assets/glyphs');
const SEALS_DIR = path.join(BASE_DIR, 'seals');
const TONES_DIR = path.join(BASE_DIR, 'tones');

// Ensure directories exist
[SEALS_DIR, TONES_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const sealsMapping = {
    "082": "dragon", "084": "wind", "086": "night", "088": "seed",
    "090": "serpent", "092": "worldbridger", "094": "hand", "096": "star",
    "098": "moon", "100": "dog", "102": "monkey", "104": "human",
    "106": "skywalker", "108": "wizard", "110": "eagle", "112": "warrior",
    "114": "earth", "116": "mirror", "118": "storm", "120": "sun"
};

const tonesMapping = {
    "002": "1", "004": "2", "006": "3", "008": "4",
    "010": "5", "012": "6", "014": "7", "016": "8",
    "018": "9", "020": "10", "022": "11", "024": "12", "026": "13"
};

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const REFERER = "https://13lunas.net/tutorial/tutorial.html";

async function download(code, name, type) {
    const url = `https://13lunas.net/tutorial/tutorial13lunas_/image${code}.png`;
    const folder = type === 'seal' ? SEALS_DIR : TONES_DIR;
    const dest = path.join(folder, `${name}.png`);

    console.log(`Downloading ${type} ${name} from ${url}...`);

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const options = {
            headers: { 'User-Agent': USER_AGENT, 'Referer': REFERER }
        };

        https.get(url, options, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${name}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

async function start() {
    console.log("📥 Starting download of Mayan Glyphs...");

    // Download Seals
    for (const [code, name] of Object.entries(sealsMapping)) {
        try {
            await download(code, name, 'seal');
            await new Promise(r => setTimeout(r, 500)); // Be nice to server
        } catch (err) {
            console.error(`❌ Error downloading seal ${name}: ${err.message}`);
        }
    }

    // Download Tones
    for (const [code, number] of Object.entries(tonesMapping)) {
        try {
            await download(code, number, 'tone');
            await new Promise(r => setTimeout(r, 500));
        } catch (err) {
            console.error(`❌ Error downloading tone ${number}: ${err.message}`);
        }
    }

    console.log("✅ All downloads finished.");
}

start();
