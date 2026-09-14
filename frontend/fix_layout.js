import fs from 'fs';

const path = '/Users/manu/Desktop/TU ENERGIA MAYA/TuEnergiaMaya/frontend/src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// Fix 1: Mini cards container width
content = content.replace(
  `<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' }, gap: 2, mb: 4 }}>`,
  `<Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' }, gap: 2, mb: 4, width: '100%', maxWidth: 1000, mx: 'auto' }}>`
);

// Fix 2: Wrap Infografia and Oraculo in Grid
// Locate Infografia block
const infografiaRegex = /({\/\* INFOGRAFÍA \*\/\s*<Box className="glass-card" sx={{ width: '100%', p: 3, mb: 4, display: 'flex'.*?<\/Box>)/s;
// Locate Oraculo block
const oraculoRegex = /({\/\* ORÁCULO \*\/\s*<Box className="glass-card" sx={{ width: '100%', p: 3, mb: 4, display: 'flex'.*?<\/Box>)/s;

const matchInfo = content.match(infografiaRegex);
const matchOraculo = content.match(oraculoRegex);

if (!matchInfo || !matchOraculo) {
  throw new Error("Could not find Infografia or Oraculo blocks");
}

const infoBlock = matchInfo[1];
const oraculoBlock = matchOraculo[1];

// Make them fill the Grid items
const newInfoBlock = infoBlock.replace(`sx={{ width: '100%', p: 3, mb: 4,`, `sx={{ height: '100%', width: '100%', p: 3,`);
const newOraculoBlock = oraculoBlock.replace(`sx={{ width: '100%', p: 3, mb: 4,`, `sx={{ height: '100%', width: '100%', p: 3,`);

const wrappedInGrid = `
              <Grid container spacing={4} sx={{ width: '100%', maxWidth: 1200, mx: 'auto', mb: 4 }}>
                <Grid item xs={12} md={6}>
                  ${newInfoBlock}
                </Grid>
                <Grid item xs={12} md={6}>
                  ${newOraculoBlock}
                </Grid>
              </Grid>
`;

// Remove original blocks and insert new grid
content = content.replace(infografiaRegex, '');
content = content.replace(oraculoRegex, wrappedInGrid);

// Ensure Grid is imported
if (!content.includes('import { Grid } from')) {
  content = content.replace(/import {([^}]+)} from '@mui\/material'/, (match, p1) => {
    if (!p1.includes('Grid')) {
       return `import {${p1}, Grid} from '@mui/material'`;
    }
    return match;
  });
}

fs.writeFileSync(path, content);
console.log("Successfully fixed layout");
