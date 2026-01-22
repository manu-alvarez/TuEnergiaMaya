const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const TEMPLATE_PATH = path.join(__dirname, 'infographic_template.html');
const OUTPUT_DIR = path.join(__dirname, 'frontend/public/assets/infographies');
const GLYPHS_DIR = path.join(__dirname, 'frontend/public/assets/glyphs');
const DATA_FILE = path.join(__dirname, 'frontend/src/data/dailyData.json');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper to get seal/tone filenames
const sealsMapping = [
    "dragon", "wind", "night", "seed", "serpent", "worldbridger", "hand", "star", "moon", "dog",
    "monkey", "human", "skywalker", "wizard", "eagle", "warrior", "earth", "mirror", "storm", "sun"
];
const tonesMapping = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"
];
const sealNamesEs = [
    "Dragón", "Viento", "Noche", "Semilla", "Serpiente", "Enlazador de Mundos", "Mano", "Estrella", "Luna", "Perro",
    "Mono", "Humano", "Caminante del Cielo", "Mago", "Águila", "Guerrero", "Tierra", "Espejo", "Tormenta", "Sol"
];
const toneNamesEs = [
    "Magnético", "Lunar", "Eléctrico", "Autoexistente", "Entonado", "Rítmico", "Resonante",
    "Galáctico", "Solar", "Planetario", "Espectral", "Cristal", "Cósmico"
];
const colors = ["Rojo", "Blanco", "Azul", "Amarillo"];

// --- Logic to Calculate Kin Info (Simplified) ---
// Note: In a real scenario, we might import tzolkin.js logic, but here we construct names from indices.
function getKinDetails(kinNumber) {
    const kin = parseInt(kinNumber);
    const sealIndex = (kin - 1) % 20;
    const toneIndex = (kin - 1) % 13;
    const colorIndex = sealIndex % 4;

    const sealName = sealNamesEs[sealIndex];
    const toneName = toneNamesEs[toneIndex];
    const color = colors[colorIndex];

    // Construct filenames
    // Seal mapping key: 082 + (index * 2) -> formatted to 3 digits
    // Tone mapping key: 002 + (index * 2) -> formatted to 3 digits
    // Wait, we downloaded them with names, so we can use the names directly!
    // We saved them as 'dragon.png', '1.png', etc.

    return {
        number: kin,
        title: `${sealName} ${toneName} ${color}`,
        sealImg: `file://${path.join(GLYPHS_DIR, 'seals', sealsMapping[sealIndex] + '.png')}`,
        toneImg: `file://${path.join(GLYPHS_DIR, 'tones', tonesMapping[toneIndex] + '.png')}`
    };
}

async function generate(kinNumber) {
    console.log(`🎨 Generating infographic for Kin ${kinNumber}...`);

    // 1. Read Data
    const dailyData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const kinData = dailyData[kinNumber.toString()];

    if (!kinData) {
        console.error(`❌ Error: No data found for Kin ${kinNumber} in dailyData.json`);
        process.exit(1);
    }

    const details = getKinDetails(kinNumber);

    // 2. Launch Browser
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // 3. Set Viewport (Instagram Post size)
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });

    // 4. Load Template
    const templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf8');
    await page.setContent(templateContent);

    // 5. Inject Data
    await page.evaluate((data) => {
        document.getElementById('kinNumber').innerText = `KIN ${data.number}`;
        document.getElementById('kinTitle').innerText = data.title;
        document.getElementById('affirmationText').innerText = data.affirmation;
        document.getElementById('wisdomText').innerText = data.wisdom;
        document.getElementById('sealImg').src = data.sealImg;
        document.getElementById('toneImg').src = data.toneImg;
    }, {
        number: details.number,
        title: details.title,
        affirmation: kinData.affirmation.replace(/"/g, ''), // Remove quotes if present
        wisdom: kinData.short_description,
        sealImg: details.sealImg,
        toneImg: details.toneImg
    });

    // 6. Wait for images to load
    await page.waitForNetworkIdle();

    // 7. Screenshot
    const outputPath = path.join(OUTPUT_DIR, `Kin ${kinNumber}.png`);
    await page.screenshot({ path: outputPath, type: 'png' });

    console.log(`✅ Infographic saved to: ${outputPath}`);

    await browser.close();
}

// CLI usage
const args = process.argv.slice(2);
if (args.length === 0) {
    console.log("Usage: node generate-infographic.js <kin_number>");
    process.exit(0);
}

const kinToGen = args[0];
generate(kinToGen);
