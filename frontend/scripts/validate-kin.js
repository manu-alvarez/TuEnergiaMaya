/**
 * validate-kin.js — Script de validación del motor Tzolkin
 * 
 * Compara los resultados de calculateKin() contra una tabla de fechas
 * verificadas en 13lunas.net / Law of Time.
 * 
 * Uso: node scripts/validate-kin.js
 */

// We need to handle ESM imports since the project uses "type": "module"
import { calculateKin, getKinConfig } from '../src/utils/tzolkin.js';

// Reference table: [date, expectedKin, expectedSeal, expectedTone]
// Verified against 13lunas.net, lawoftime.org, and tortuga1320.com
const REFERENCE_TABLE = [
  // Anchor date (verified: commit 3db2fc2 + 13lunas.net)
  ['2026-01-22', 44, 'Semilla', 'Entonada'],
  
  // Verified from commit history (commit 3db2fc2)
  ['2026-02-18', 71, 'Mono', 'Rítmico'],
  
  // Key Dreamspell dates  
  ['2026-07-25', 228, 'Estrella', 'Resonante'],   // Día Fuera del Tiempo 2026
  ['2026-07-26', 229, 'Luna', 'Galáctica'],       // Año Nuevo Maya 2026
  
  // Edge cases: around leap years
  ['2024-02-28', 131, 'Mono', 'Magnético'],       // Día antes de bisiesto 2024
  ['2024-02-29', 131, 'Mono', 'Magnético'],       // Bisiesto: DEBE dar mismo Kin que Feb 28
  ['2024-03-01', 132, 'Humano', 'Lunar'],         // Día después de bisiesto

  // Kin extremos (verified: 12/21/2012 is widely documented as Kin 207)
  ['2012-12-21', 207, 'Mano', 'Cristal'],         // Fin del 13 Baktun

  // Cross-century
  ['2000-01-01', 153, 'Caminante del Cielo', 'Planetario'],
  
  // Future dates
  ['2030-06-15', 88, 'Estrella', 'Planetaria'],
  
  // Dreamspell initiation (verified: tortuga1320.com, Jul 26 1987 = Kin 34)
  ['1987-07-26', 34, 'Mago', 'Galáctico'],        // Convergencia Armónica
];

let passed = 0;
let failed = 0;
const failures = [];

console.log('🔬 Validación del Motor Tzolkin - TuEnergíaMaya');
console.log('================================================\n');

for (const [dateStr, expectedKin, expectedSeal, expectedTone] of REFERENCE_TABLE) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  const actualKin = calculateKin(date);
  const config = getKinConfig(actualKin);
  
  const kinMatch = actualKin === expectedKin;
  const sealMatch = config.seal_name === expectedSeal;
  const toneMatch = config.tone_name === expectedTone || 
    config.tone_name.replace(/a$/, 'o') === expectedTone ||
    expectedTone.replace(/o$/, 'a') === config.tone_name;
  
  const allMatch = kinMatch && sealMatch && toneMatch;
  
  if (allMatch) {
    console.log(`  ✅ ${dateStr} → Kin ${actualKin} (${config.seal_name} ${config.tone_name})`);
    passed++;
  } else {
    const details = [];
    if (!kinMatch) details.push(`Kin: esperado ${expectedKin}, obtenido ${actualKin}`);
    if (!sealMatch) details.push(`Sello: esperado ${expectedSeal}, obtenido ${config.seal_name}`);
    if (!toneMatch) details.push(`Tono: esperado ${expectedTone}, obtenido ${config.tone_name}`);
    
    console.log(`  ❌ ${dateStr} → FALLO: ${details.join(' | ')}`);
    failures.push({ date: dateStr, expected: { kin: expectedKin, seal: expectedSeal, tone: expectedTone }, actual: { kin: actualKin, seal: config.seal_name, tone: config.tone_name } });
    failed++;
  }
}

// Additional structural tests
console.log('\n📐 Tests Estructurales:');

// Test: Kin range is always 1-260
let rangeOk = true;
for (let y = 2020; y <= 2030; y++) {
  for (let m = 0; m < 12; m++) {
    for (let d = 1; d <= 28; d++) {
      const k = calculateKin(new Date(y, m, d));
      if (k < 1 || k > 260) {
        console.log(`  ❌ Rango: ${y}-${m+1}-${d} → Kin ${k} (fuera de 1-260)`);
        rangeOk = false;
        failed++;
      }
    }
  }
}
if (rangeOk) {
  console.log('  ✅ Rango: Todos los Kines 2020-2030 están en 1-260');
  passed++;
}

// Test: Consecutive non-leap days increment by 1
let consecutiveOk = true;
const testStart = new Date(2025, 0, 1);
for (let i = 0; i < 365; i++) {
  const d1 = new Date(testStart);
  d1.setDate(d1.getDate() + i);
  const d2 = new Date(testStart);
  d2.setDate(d2.getDate() + i + 1);
  
  // Skip if d2 is Feb 29 (leap day should not increment)
  if (d2.getMonth() === 1 && d2.getDate() === 29) continue;
  
  const k1 = calculateKin(d1);
  const k2 = calculateKin(d2);
  const expected = k1 === 260 ? 1 : k1 + 1;
  
  if (k2 !== expected) {
    console.log(`  ❌ Consecutivo: ${d1.toISOString().slice(0,10)} (Kin ${k1}) → ${d2.toISOString().slice(0,10)} (Kin ${k2}), esperado ${expected}`);
    consecutiveOk = false;
    failed++;
    break;
  }
}
if (consecutiveOk) {
  console.log('  ✅ Consecutividad: Días no-bisiestos incrementan Kin en +1 (2025)');
  passed++;
}

// Test: Leap day does NOT increment Kin
const feb28_2024 = calculateKin(new Date(2024, 1, 28));
const feb29_2024 = calculateKin(new Date(2024, 1, 29));
if (feb28_2024 === feb29_2024) {
  console.log('  ✅ Bisiesto 2024: Feb 28 y Feb 29 dan el mismo Kin');
  passed++;
} else {
  console.log(`  ❌ Bisiesto 2024: Feb 28 = Kin ${feb28_2024}, Feb 29 = Kin ${feb29_2024} (deberían ser iguales)`);
  failed++;
}

// Test: getKinConfig boundaries
const kin1 = getKinConfig(1);
const kin260 = getKinConfig(260);
if (kin1.seal_name === 'Dragón' && kin1.tone_name === 'Magnético' &&
    kin260.seal_name === 'Sol' && kin260.tone_name === 'Cósmico') {
  console.log('  ✅ Boundaries: Kin 1 = Dragón Magnético, Kin 260 = Sol Cósmico');
  passed++;
} else {
  console.log(`  ❌ Boundaries: Kin 1 = ${kin1.seal_name} ${kin1.tone_name}, Kin 260 = ${kin260.seal_name} ${kin260.tone_name}`);
  failed++;
}

// ── Wavespell & Castle Tests ──
console.log('\n🌀 Tests Onda Encantada y Castillos:');

import { getWavespell, getCastle, getTransitKin } from '../src/utils/wavespell.js';

// Kin 1 should be Wavespell 1 (Dragón), day 1, Castle Rojo
const ws1 = getWavespell(1);
const cs1 = getCastle(1);
if (ws1.wavespellNumber === 1 && ws1.dayInWave === 1 && cs1.castleIndex === 0) {
  console.log('  ✅ Kin 1: Onda 1, Día 1, Castillo Rojo');
  passed++;
} else {
  console.log(`  ❌ Kin 1: Onda ${ws1.wavespellNumber}, Día ${ws1.dayInWave}, Castillo ${cs1.castleIndex}`);
  failed++;
}

// Kin 260 should be Wavespell 20, day 13, Castle Verde
const ws260 = getWavespell(260);
const cs260 = getCastle(260);
if (ws260.wavespellNumber === 20 && ws260.dayInWave === 13 && cs260.castleIndex === 4) {
  console.log('  ✅ Kin 260: Onda 20, Día 13, Castillo Verde');
  passed++;
} else {
  console.log(`  ❌ Kin 260: Onda ${ws260.wavespellNumber}, Día ${ws260.dayInWave}, Castillo ${cs260.castleIndex}`);
  failed++;
}

// Kin 53 should be first Kin of Castle Blanco
const cs53 = getCastle(53);
if (cs53.castleIndex === 1 && cs53.positionInCastle === 1) {
  console.log('  ✅ Kin 53: Inicio Castillo Blanco (pos 1)');
  passed++;
} else {
  console.log(`  ❌ Kin 53: Castillo ${cs53.castleIndex}, pos ${cs53.positionInCastle}`);
  failed++;
}

// Transit Kin should always be 1-260
let transitOk = true;
for (let n = 1; n <= 260; n++) {
  for (let y = 1; y <= 260; y += 50) {
    const t = getTransitKin(n, y);
    if (t < 1 || t > 260) {
      console.log(`  ❌ Tránsito: natal=${n}, año=${y} → ${t} (fuera de rango)`);
      transitOk = false;
      failed++;
      break;
    }
  }
  if (!transitOk) break;
}
if (transitOk) {
  console.log('  ✅ Tránsito: Todos los Kin de tránsito en rango 1-260');
  passed++;
}

// Summary
console.log(`\n${'='.repeat(48)}`);
console.log(`📊 Resultado: ${passed} pasados, ${failed} fallados`);
if (failed > 0) {
  console.log('\n🔴 FALLOS DETECTADOS:');
  failures.forEach(f => {
    console.log(`   ${f.date}: esperado Kin ${f.expected.kin} (${f.expected.seal} ${f.expected.tone}), obtenido Kin ${f.actual.kin} (${f.actual.seal} ${f.actual.tone})`);
  });
  process.exit(1);
} else {
  console.log('🟢 Todos los tests pasaron correctamente.');
  process.exit(0);
}

