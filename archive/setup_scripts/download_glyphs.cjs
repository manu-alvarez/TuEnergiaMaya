const https = require('https');
const fs = require('fs');
const path = require('path');

const glyphsDir = path.join(__dirname, 'frontend/public/assets/glyphs');

if (!fs.existsSync(glyphsDir)) {
    fs.mkdirSync(glyphsDir, { recursive: true });
}

const seals = [
    { id: '01', color: 'red', name: 'dragon' },
    { id: '02', color: 'white', name: 'wind' },
    { id: '03', color: 'blue', name: 'night' },
    { id: '04', color: 'yellow', name: 'seed' },
    { id: '05', color: 'red', name: 'serpent' },
    { id: '06', color: 'white', name: 'worldbridger' },
    { id: '07', color: 'blue', name: 'hand' },
    { id: '08', color: 'yellow', name: 'star' },
    { id: '09', color: 'red', name: 'moon' },
    { id: '10', color: 'white', name: 'dog' },
    { id: '11', color: 'blue', name: 'monkey' },
    { id: '12', color: 'yellow', name: 'human' },
    { id: '13', color: 'red', name: 'skywalker' },
    { id: '14', color: 'white', name: 'wizard' },
    { id: '15', color: 'blue', name: 'eagle' },
    { id: '16', color: 'yellow', name: 'warrior' },
    { id: '17', color: 'red', name: 'earth' },
    { id: '18', color: 'white', name: 'mirror' },
    { id: '19', color: 'blue', name: 'storm' },
    { id: '20', color: 'yellow', name: 'sun' },
];

seals.forEach(seal => {
    const url = `https://mayankin.com/wp-content/uploads/2020/04/${seal.id}-mayankin-marielamaya-bridgingworlds-tzolkin-${seal.color}-${seal.name}-glyph.png`;
    const filePath = path.join(glyphsDir, `${seal.name}.png`);

    const file = fs.createWriteStream(filePath);
    https.get(url, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded: ${seal.name}`);
        });
    }).on('error', (err) => {
        fs.unlink(filePath);
        console.error(`Error downloading ${seal.name}: ${err.message}`);
    });
});
