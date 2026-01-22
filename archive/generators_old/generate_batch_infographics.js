const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { calculateOracle } = require('./tzolkin_oracle');

const TEMPLATE_PATH = path.join(__dirname, 'infographic_organic.html');
const OUTPUT_DIR = path.join(__dirname, 'frontend/public/assets/infographies');
const GLYPHS_DIR = path.join(__dirname, 'frontend/public/assets/glyphs');
const ART_SEALS_DIR = path.join(__dirname, 'frontend/public/assets/art_seals');
const DATA_FILE = path.join(__dirname, 'frontend/src/data/dailyData.json');

// Ensure directories exist
[OUTPUT_DIR, GLYPHS_DIR, ART_SEALS_DIR].forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// --- MAPPINGS (Copied from generate-hybrid.js) ---
const sealNamesEs = [
    "Dragón", "Viento", "Noche", "Semilla", "Serpiente", "Enlazador", "Mano", "Estrella", "Luna", "Perro",
    "Mono", "Humano", "Caminante", "Mago", "Águila", "Guerrero", "Tierra", "Espejo", "Tormenta", "Sol"
];
const sealsMapping = [
    "dragon", "wind", "night", "seed", "serpent", "worldbridger", "hand", "star", "moon", "dog",
    "monkey", "human", "skywalker", "wizard", "eagle", "warrior", "earth", "mirror", "storm", "sun"
];
const toneNamesEs = [
    "Magnético", "Lunar", "Eléctrico", "Autoexistente", "Entonado", "Rítmico", "Resonante",
    "Galáctico", "Solar", "Planetario", "Espectral", "Cristal", "Cósmico"
];
const tonesMapping = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
const colorsHex = ["#ef4444", "#f1f5f9", "#3b82f6", "#eab308"];

const sealDescriptions = [
    "La Energía Madre: Inicio y Nutrición.",
    "El Aliento Divino: Comunicación y Espíritu.",
    "El Santuario Interior: Sueños e Intuición.",
    "El Potencial Latente: Sembrar y Florecer.",
    "La Fuerza Vital: Instinto y Pasión.",
    "El Puente de Mundos: Muerte y Oportunidad.",
    "La Sanación Realizadora: Conocer y Curar.",
    "El Arte Elegante: Belleza y Armonía.",
    "El Flujo Universal: Purificar emociones.",
    "El Amor Leal: Corazón y Compañerismo.",
    "El Niño Divino: Juego, Magia y Humor.",
    "El Libre Albedrío: Sabiduría y Elección.",
    "El Explorador Cósmico: Espacio y Vigilancia.",
    "El Jaguar Místico: Atemporalidad y Encanto.",
    "La Visión Superior: Mente y Creación.",
    "La Inteligencia Valiente: Cuestionar sin miedo.",
    "La Navegación Sincrónica: Evolución y Tierra.",
    "El Reflejo de Verdad: Orden y Claridad.",
    "La Catalización: Transformación total.",
    "El Fuego Universal: Iluminación y Vida."
];

const toneDescriptions = [
    "Atrae el propósito y unifica la meta.",
    "Identifica desafíos y estabiliza polos.",
    "Activa el servicio y une a las partes.",
    "Define la forma y mide la acción.",
    "Toma el mando y empodera el brillo.",
    "Organiza el equilibrio y encuentra ritmo.",
    "Sintoniza con la fuente e inspira.",
    "Armoniza la realidad con integridad.",
    "Pulsa la intención para realizarla.",
    "Perfecciona y manifiesta el resultado.",
    "Libera, disuelve y deja ir lo viejo.",
    "Coopera y universaliza la conciencia.",
    "Trasciende y da el vuelo mágico final."
];

const sealAdvice = [
    { ideal: ["Iniciar nuevos proyectos.", "Nutrir tu cuerpo y descansar.", "Conectar con tu origen."], avoid: ["Descuidar tu salud.", "Aislarte demasiado.", "Quedarte en el pasado."] },
    { ideal: ["Comunicar tu verdad.", "Escribir o hablar en público.", "Practicar respiración consciente."], avoid: ["Los chismorreos inútiles.", "Callar lo que sientes.", "Dispersarte mentalmente."] },
    { ideal: ["Seguir tu intuición.", "Meditar en silencio.", "Soñar en grande."], avoid: ["Dudar de ti mismo.", "El miedo a la escasez.", "Rodearte de ruido excesivo."] },
    { ideal: ["Sembrar intenciones claras.", "Planificar a largo plazo.", "Estudiar o aprender algo."], avoid: ["La impaciencia por resultados.", "Dejar las cosas a medias.", "Hacerlo todo con prisa."] },
    { ideal: ["Mover el cuerpo (deporte).", "Despertar tu pasión.", "Escuchar tus instintos."], avoid: ["El sedentarismo total.", "Reprimir tu energía vital.", "Ignorar señales físicas."] },
    { ideal: ["Cerrar ciclos pendientes.", "Perdonar y soltar.", "Limpiar y ordenar tu espacio."], avoid: ["Aferrarte a lo viejo.", "El control excesivo.", "Miedo a los cambios."] },
    { ideal: ["Sanar heridas emocionales.", "Trabajar con las manos.", "Concretar tareas pendientes."], avoid: ["Posponer lo necesario.", "La autocrítica destructiva.", "Exigirte perfección."] },
    { ideal: ["Crear arte o belleza.", "Buscar la armonía social.", "Brillar con luz propia."], avoid: ["El drama innecesario.", "La superficialidad.", "Compararte con otros."] },
    { ideal: ["Dejar fluir tus emociones.", "Llorar si lo necesitas.", "Conectar con el agua."], avoid: ["Reprimir lo que sientes.", "La rigidez mental.", "Olvidar tu sensibilidad."] },
    { ideal: ["Compartir con amigos.", "Amar incondicionalmente.", "Ser leal a tu corazón."], avoid: ["Los celos o posesividad.", "Depender de otros.", "Traicionarte a ti mismo."] },
    { ideal: ["Jugar y reír mucho.", "Romper la rutina seria.", "Ver la magia en todo."], avoid: ["La amargura o seriedad.", "Tomarte todo personal.", "La burla hiriente."] },
    { ideal: ["Ejercer tu libertad.", "Tomar decisiones propias.", "Influenciar positivamente."], avoid: ["Culpar a los demás.", "La indecisión eterna.", "Seguir al rebaño ciegas."] },
    { ideal: ["Explorar lugares nuevos.", "Salir de tu zona confort.", "Vigilar tu espacio."], avoid: ["El miedo a lo desconocido.", "Encerrarte en casa.", "La inercia."] },
    { ideal: ["Vivir el aquí y ahora.", "Encantar el momento.", "Conectar con lo sutil."], avoid: ["Ansiedad por el futuro.", "Vivir en el pasado.", "La manipulación."] },
    { ideal: ["Ver el panorama completo.", "Crear una visión clara.", "Elevar tu perspectiva."], avoid: ["Perderte en detalles.", "Obsesionarte con pequeñeces.", "La miopía mental."] },
    { ideal: ["Cuestionar con inteligencia.", "Perder el miedo a actuar.", "Planear estrategias."], avoid: ["La duda paralizante.", "Pelear sin sentido.", "La cobardía."] },
    { ideal: ["Conectar con la naturaleza.", "Seguir las señales.", "Evolucionar paso a paso."], avoid: ["Desconectarte de la tierra.", "Forzar los ritmos.", "La prisa."] },
    { ideal: ["Mirarte en el espejo.", "Decir siempre la verdad.", "Poner orden y claridad."], avoid: ["El autoengaño.", "Juzgar a los demás.", "El desorden y caos."] },
    { ideal: ["Hacer cambios radicales.", "Reinventarte hoy.", "Permitir la catarsis."], avoid: ["Resistirse al cambio.", "Aferrarte a la estabilidad.", "El estancamiento."] },
    { ideal: ["Iluminar a los demás.", "Amar la vida plenamente.", "Liderar con el ejemplo."], avoid: ["Apagar tu luz interna.", "El egoísmo o arrogancia.", "Esconderte."] }
];

const sealGenders = ["M", "M", "F", "F", "F", "M", "F", "F", "F", "M", "M", "M", "M", "M", "F", "M", "F", "M", "F", "M"];

// --- HELPERS ---
function adjustGender(name, gender) {
    if (gender === "M") return name;
    if (name.endsWith("o")) return name.slice(0, -1) + "a";
    return name;
}

function getImgBase64(subfolder, filename) {
    const fullPath = path.join(GLYPHS_DIR, subfolder, filename);
    if (!fs.existsSync(fullPath)) return "";
    return `data:image/png;base64,${fs.readFileSync(fullPath).toString('base64')}`;
}

function getArtBase64(sealNameEnglish) {
    const sealPath = path.join(ART_SEALS_DIR, `${sealNameEnglish}.png`);
    if (fs.existsSync(sealPath)) return `data:image/png;base64,${fs.readFileSync(sealPath).toString('base64')}`;
    return `https://via.placeholder.com/600x800/111111/FFFFFF?text=${sealNameEnglish}`;
}

function extractConsejo(longDesc) {
    if (!longDesc) return "Conecta con tu corazón.";
    const sentences = longDesc.split('.').map(s => s.trim()).filter(s => s.length > 5);
    const last = sentences[sentences.length - 1];
    if (last.length < 15 && sentences.length > 1) return sentences[sentences.length - 2];
    return last + ".";
}

// --- BATCH GENERATOR ---
async function runBatch() {
    console.log("🚀 Starting Optimized Batch Generation...");

    // Load Data
    const dailyData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

    // Launch Browser ONCE
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });

    // Determine Kins to Process: 1-35 AND 61-260
    // (We skip 36-60 as they are manually curated and likely already generated or we can include them if we want uniformity)
    // User instruction implied regenerating 1-35 and 61-260.
    const ranges = [];
    for (let i = 1; i <= 35; i++) ranges.push(i);
    for (let i = 61; i <= 260; i++) ranges.push(i);

    console.log(`🎯 Processing ${ranges.length} Kins...`);

    for (const kinNumber of ranges) {
        const kinStr = kinNumber.toString();
        const kinData = dailyData[kinStr];

        if (!kinData) {
            console.error(`❌ Missing data for Kin ${kinNumber}`);
            continue;
        }

        const oracle = calculateOracle(parseInt(kinNumber));
        const kDestiny = oracle.destiny;
        const gender = sealGenders[kDestiny.seal];
        const themeColor = colorsHex[kDestiny.seal % 4];
        const adjustedTone = adjustGender(toneNamesEs[kDestiny.tone - 1], gender);
        const adjustedColor = adjustGender(kDestiny.color, gender);

        // Prepare Data
        const data = {
            kinDate: `KIN ${kinNumber}`,
            kinName: `${sealNamesEs[kDestiny.seal]} ${adjustedTone} ${adjustedColor}`,
            sealName: sealNamesEs[kDestiny.seal],
            sealDesc: sealDescriptions[kDestiny.seal],
            sealIcon: getImgBase64('seals', sealsMapping[kDestiny.seal] + '.png'),
            toneName: adjustedTone,
            toneDesc: toneDescriptions[kDestiny.tone - 1],
            toneIcon: getImgBase64('tones', tonesMapping[kDestiny.tone - 1] + '.png'),
            artBase64: getArtBase64(sealsMapping[kDestiny.seal]),
            mainQuote: `"${kinData.short_description}"`,
            guideName: sealNamesEs[oracle.guide.seal],
            guideIcon: getImgBase64('seals', sealsMapping[oracle.guide.seal] + '.png'),
            antipodeName: sealNamesEs[oracle.antipode.seal],
            antipodeIcon: getImgBase64('seals', sealsMapping[oracle.antipode.seal] + '.png'),
            analogName: sealNamesEs[oracle.analog.seal],
            analogIcon: getImgBase64('seals', sealsMapping[oracle.analog.seal] + '.png'),
            occultName: sealNamesEs[oracle.occult.seal],
            occultIcon: getImgBase64('seals', sealsMapping[oracle.occult.seal] + '.png'),
            destinyIcon: getImgBase64('seals', sealsMapping[kDestiny.seal] + '.png'),
            idealPoints: sealAdvice[kDestiny.seal].ideal,
            consejoText: `"${extractConsejo(kinData.long_description)}"`,
            avoidPoints: sealAdvice[kDestiny.seal].avoid,
            themeColor: themeColor
        };

        // Inject Content
        await page.setContent(template); // Reset content to ensure clean state
        await page.evaluate((d) => {
            document.documentElement.style.setProperty('--theme-color', d.themeColor);
            document.documentElement.style.setProperty('--theme-glow', d.themeColor + '99');

            document.getElementById('bgImage').style.backgroundImage = `url('${d.artBase64}')`;
            document.getElementById('artImage').src = d.artBase64;

            document.getElementById('kinDate').innerText = d.kinDate;
            document.getElementById('kinName').innerText = d.kinName;
            document.getElementById('mainQuote').innerText = d.mainQuote;

            document.getElementById('sealName').innerText = d.sealName;
            document.getElementById('sealDesc').innerText = d.sealDesc;
            document.getElementById('sealIcon').src = d.sealIcon;
            document.getElementById('toneName').innerText = d.toneName;
            document.getElementById('toneDesc').innerText = d.toneDesc;
            document.getElementById('toneIcon').src = d.toneIcon;

            document.getElementById('guideName').innerText = d.guideName;
            document.getElementById('guideIcon').src = d.guideIcon;
            document.getElementById('antipodeName').innerText = d.antipodeName;
            document.getElementById('antipodeIcon').src = d.antipodeIcon;
            document.getElementById('analogName').innerText = d.analogName;
            document.getElementById('analogIcon').src = d.analogIcon;
            document.getElementById('occultName').innerText = d.occultName;
            document.getElementById('occultIcon').src = d.occultIcon;
            document.getElementById('destinyIcon').src = d.destinyIcon;

            // Footer Lists
            const idealUl = document.getElementById('idealList');
            idealUl.innerHTML = '';
            d.idealPoints.forEach(p => { const li = document.createElement('li'); li.innerText = p; idealUl.appendChild(li); });

            document.getElementById('consejoText').innerText = d.consejoText;

            const avoidUl = document.getElementById('avoidList');
            avoidUl.innerHTML = '';
            d.avoidPoints.forEach(p => { const li = document.createElement('li'); li.innerText = p; avoidUl.appendChild(li); });

        }, data);

        // Screenshot
        // await page.waitForNetworkIdle(); // Less necessary if base64, but good practice
        const outputPath = path.join(OUTPUT_DIR, `Kin ${kinNumber}.png`);
        await page.screenshot({ path: outputPath, type: 'png' });

        process.stdout.write(`chk ${kinNumber} `); // Minimal log to avoid clutter
    }

    console.log("\n✅ Batch Completed successfully!");
    await browser.close();
}

runBatch();
