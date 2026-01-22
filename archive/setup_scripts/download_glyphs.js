const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT_DIR = path.join(__dirname, 'frontend/public/assets/glyphs');
if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
}

const mapping = {
    "082": "dragon",
    "084": "wind",
    "086": "night",
    "088": "seed",
    "090": "serpent",
    "092": "worldbridger",
    "094": "hand",
    "096": "star",
    "098": "moon",
    "100": "dog",
    "102": "monkey",
    "104": "human",
    "106": "skywalker",
    "108": "wizard",
    "110": "eagle",
    "112": "warrior",
    "114": "earth",
    "116": "mirror",
    "118": "storm",
    "120": "sun"
};

const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const REFERER = "https://13lunas.net/tutorial/tutorial.html";

async function download(code, name) {
    const url = `https://13lunas.net/tutorial/tutorial13lunas_/image${code}.png`;
    const dest = path.join(OUT_DIR, `${name}.png`);

    console.log(`Downloading ${name} from ${url}...`);

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        const options = {
            headers: {
                'User-Agent': USER_AGENT,
                'Referer': REFERER
            }
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
            fs.unlink(dest, () => { }); // Delete the file on error
            reject(err);
        });
    });
}

async function start() {
    for (const [code, name] of Object.entries(mapping)) {
        try {
            await download(code, name);
            console.log(`Success: ${name}`);
        } catch (err) {
            console.error(`Error downloading ${name}: ${err.message}`);
        }
        // Wait 1.5s between downloads
        await new Promise(r => setTimeout(r, 1500));
    }
    console.log("Finished.");
}

start();
