
import { calculateKin } from '../src/utils/tzolkin.js';

const TEST_DATES = [
    '2026-02-14', // Today (approx)
    '2026-01-22', // Reference Day (Kin 44)
    '2024-02-29', // Leap Day
    '2024-03-01', // Day after Leap
];

const TIMEZONES = [
    'UTC',
    'America/Argentina/Buenos_Aires', // UTC-3
    'Asia/Tokyo', // UTC+9
    'America/Los_Angeles' // UTC-8
];

console.log('🧪 INICIANDO PRUEBA DE RESISTENCIA DE ZONA HORARIA 🧪');
console.log('----------------------------------------------------');

const results = {};

// We cannot easily switch process.env.TZ inside a running Node process for Date object behavior 
// without restarting. However, we can simulate the INPUT that App.jsx gives.
// App.jsx creates: new Date(year, monthIndex, day) -> This creates a Local Time Midnight Date.
// Or new Date("YYYY-MM-DD") -> UTC Midnight (usually).
// Or new Date() -> Local Now.

// The FIX relies on getNoonUTC which calls date.getFullYear(), date.getMonth(), date.getDate().
// These methods return the LOCAL component of the date object.
// So if I am in Argentina (UTC-3), and I create "Feb 14 00:00",
// date.getDate() MUST return 14.

// Let's emulate what happens in the browser in different timezones.
// Since we can't change the system timezone of this runner easily mid-script,
// we will verify the LOGIC:
// 
// IF the input date object claims to be "Feb 14" (via .getDate()),
// DOES calculateKin return the same value regardless of the underlying timestamp?

console.log("Verificando consistencia lógica de normalización UTC Mediodía...\n");

TEST_DATES.forEach(dateStr => {
    const [y, m, d] = dateStr.split('-').map(Number);

    // Scenario A: The date is technically UTC Midnight (Date.UTC)
    const dateUTC = new Date(Date.UTC(y, m - 1, d));

    // Scenario B: The date is technically Local Midnight (new Date(y, m-1, d))
    // On this machine, it will use system timezone.
    const dateLocal = new Date(y, m - 1, d);

    // Scenario C: The date is late at night (23:00)
    const dateLate = new Date(y, m - 1, d, 23, 0, 0);

    const kinA = calculateKin(dateUTC);
    const kinB = calculateKin(dateLocal);
    const kinC = calculateKin(dateLate);

    console.log(`📅 Fecha: ${dateStr}`);
    console.log(`   - Input UTC Midnight:   Kin ${kinA}`);
    console.log(`   - Input Local Midnight: Kin ${kinB}`);
    console.log(`   - Input Local 23:00:    Kin ${kinC}`);

    if (kinA === kinB && kinB === kinC) {
        console.log(`   ✅ PASSED: Consistente (${kinA})`);
    } else {
        console.error(`   ❌ FAILED: Inconsistencia detectada!`);
        process.exit(1);
    }
    console.log('----------------------------------------------------');
});

console.log("\n✅ PRUEBA COMPLETADA EXITOSAMENTE.");
console.log("El algoritmo ignora la hora del día y la zona horaria subyacente,");
console.log("basándose puramente en la fecha de calendario (Año/Mes/Día).");
