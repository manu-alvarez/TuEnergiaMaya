const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'frontend/src/data/dailyData.json');
const dailyData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

// Tzolkin reference data
const seals = [
    "Dragón", "Viento", "Noche", "Semilla", "Serpiente",
    "Enlazador", "Mano", "Estrella", "Luna", "Perro",
    "Mono", "Humano", "Caminante", "Mago", "Águila",
    "Guerrero", "Tierra", "Espejo", "Tormenta", "Sol"
];

const tones = [
    "Magnético", "Lunar", "Eléctrico", "Autoexistente", "Entonado",
    "Rítmico", "Resonante", "Galáctico", "Solar", "Planetario",
    "Espectral", "Cristal", "Cósmico"
];

const colors = ["Rojo", "Blanco", "Azul", "Amarillo"];

// Calculate kin components
function getKinComponents(kinNumber) {
    const sealIndex = (kinNumber - 1) % 20;
    const toneIndex = (kinNumber - 1) % 13;
    const colorIndex = sealIndex % 4;

    return {
        seal: seals[sealIndex],
        tone: tones[toneIndex],
        color: colors[colorIndex],
        sealIndex,
        toneIndex
    };
}

// Audit function
function auditKin(kinNumber) {
    const data = dailyData[kinNumber];
    const expected = getKinComponents(kinNumber);
    const errors = [];

    if (!data) {
        errors.push(`❌ Kin ${kinNumber}: NO DATA FOUND`);
        return errors;
    }

    const shortDesc = data.short_description || "";
    const longDesc = data.long_description || "";
    const fullText = (shortDesc + " " + longDesc).toLowerCase();

    // Check if correct seal is mentioned
    const correctSealMentioned = fullText.includes(expected.seal.toLowerCase());

    // Check if wrong seals are mentioned
    const wrongSeals = seals.filter((seal, idx) => {
        if (idx === expected.sealIndex) return false; // Skip correct seal
        return fullText.includes(seal.toLowerCase());
    });

    // Check if wrong tones are mentioned
    const wrongTones = tones.filter((tone, idx) => {
        if (idx === expected.toneIndex) return false; // Skip correct tone
        return fullText.includes(tone.toLowerCase());
    });

    // Report errors
    if (!correctSealMentioned) {
        errors.push(`⚠️  Kin ${kinNumber}: Seal "${expected.seal}" NOT mentioned in text`);
    }

    if (wrongSeals.length > 0) {
        errors.push(`❌ Kin ${kinNumber} (${expected.tone} ${expected.seal} ${expected.color}): Mentions WRONG seals: ${wrongSeals.join(", ")}`);
    }

    if (wrongTones.length > 0) {
        errors.push(`❌ Kin ${kinNumber} (${expected.tone} ${expected.seal} ${expected.color}): Mentions WRONG tones: ${wrongTones.join(", ")}`);
    }

    return errors;
}

// Main audit
console.log("🔍 AUDITING ALL 260 KINES...\n");

let totalErrors = 0;
const errorsByKin = {};

for (let kin = 1; kin <= 260; kin++) {
    const errors = auditKin(kin);
    if (errors.length > 0) {
        totalErrors += errors.length;
        errorsByKin[kin] = errors;
        errors.forEach(err => console.log(err));
    }
}

console.log("\n" + "=".repeat(80));
console.log(`\n📊 AUDIT SUMMARY:`);
console.log(`Total Kines Audited: 260`);
console.log(`Kines with Errors: ${Object.keys(errorsByKin).length}`);
console.log(`Total Errors Found: ${totalErrors}`);

if (totalErrors === 0) {
    console.log("\n✅ ALL KINES ARE CORRECT!");
} else {
    console.log("\n❌ ERRORS DETECTED - Review needed\n");
    console.log("Kines with errors:", Object.keys(errorsByKin).join(", "));

    // Save error report
    const report = {
        timestamp: new Date().toISOString(),
        totalKines: 260,
        kinesWithErrors: Object.keys(errorsByKin).length,
        totalErrors: totalErrors,
        errorsByKin: errorsByKin
    };

    fs.writeFileSync('audit_report.json', JSON.stringify(report, null, 2));
    console.log("\n📄 Full report saved to: audit_report.json");
}
