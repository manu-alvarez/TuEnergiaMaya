const fs = require('fs');

const path = '/Users/manu/Desktop/TU ENERGIA MAYA/TuEnergiaMaya/frontend/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');

// Find the parts
const split1 = content.split('{/* INFOGRAFÍA */}');
if (split1.length !== 2) throw new Error("Could not split by INFOGRAFIA");

const beforeInfografia = split1[0];
const fromInfografia = '{/* INFOGRAFÍA */}\n' + split1[1];

const split2 = fromInfografia.split('{/* MINI CARDS */}');
if (split2.length !== 2) throw new Error("Could not split by MINI CARDS");

const infografiaAndOraculo = split2[0];
const fromMiniCards = '{/* MINI CARDS */}\n' + split2[1];

const split3 = fromMiniCards.split('{/* TARJETA PODCAST SPOTIFY */}');
if (split3.length !== 2) throw new Error("Could not split by TARJETA PODCAST");

const miniCards = split3[0];
let fromPodcast = '{/* TARJETA PODCAST SPOTIFY */}\n' + split3[1];

// Update Podcast style
fromPodcast = fromPodcast.replace(
  `<Box sx={{ mt: 4, width: '100%', maxWidth: 800, mx: 'auto' }}>`,
  `<Box className="glass-card" sx={{ mt: 4, width: '100%', maxWidth: 800, mx: 'auto', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid rgba(255, 255, 255, 0.1)' }}>`
);

// Reassemble: beforeInfografia + miniCards + infografiaAndOraculo + fromPodcast
const newContent = beforeInfografia + miniCards + infografiaAndOraculo + fromPodcast;

fs.writeFileSync(path, newContent);
console.log('Successfully reordered and updated Podcast widget style.');
