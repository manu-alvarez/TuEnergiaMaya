/**
 * wavespell.js — Módulo de Onda Encantada y Castillos
 * 
 * Proporciona funciones para determinar la Onda Encantada y el Castillo
 * al que pertenece un Kin dado.
 */

/**
 * Los 5 Castillos del Encantamiento del Sueño.
 * Cada castillo contiene 4 Ondas Encantadas (52 Kines).
 */
export const CASTLES = [
  { name: 'Castillo Rojo del Girar', color: 'Rojo', action: 'Girar', kinRange: [1, 52] },
  { name: 'Castillo Blanco del Cruzar', color: 'Blanco', action: 'Cruzar', kinRange: [53, 104] },
  { name: 'Castillo Azul del Quemar', color: 'Azul', action: 'Quemar', kinRange: [105, 156] },
  { name: 'Castillo Amarillo del Dar', color: 'Amarillo', action: 'Dar', kinRange: [157, 208] },
  { name: 'Castillo Verde del Encantar', color: 'Verde', action: 'Encantar', kinRange: [209, 260] },
];

/**
 * Los nombres de los 20 sellos que inician cada Onda Encantada.
 * Las ondas se nombran según el sello del primer Kin (tono Magnético).
 */
const WAVESPELL_SEALS = [
  'Dragón', 'Mago', 'Mano', 'Sol',        // Castillo Rojo
  'Caminante del Cielo', 'Enlazador de Mundos', 'Tormenta', 'Humano',  // Castillo Blanco
  'Serpiente', 'Espejo', 'Mono', 'Semilla', // Castillo Azul
  'Tierra', 'Perro', 'Noche', 'Guerrero',  // Castillo Amarillo
  'Luna', 'Viento', 'Águila', 'Estrella',  // Castillo Verde
];

/**
 * Calcula la Onda Encantada para un Kin dado.
 * 
 * @param {number} kinNumber - Número de Kin (1-260)
 * @returns {{
 *   wavespellNumber: number,       // Número de onda (1-20)
 *   wavespellName: string,         // Nombre del sello que la inicia
 *   wavespellStartKin: number,     // Kin que inicia la onda
 *   dayInWave: number,             // Posición dentro de la onda (1-13)
 *   toneName: string,              // Nombre del tono correspondiente
 * }}
 */
export const getWavespell = (kinNumber) => {
  const toneIndex = (kinNumber - 1) % 13;          // 0-12
  const wavespellStartKin = kinNumber - toneIndex;  // Primer Kin de la onda
  const wavespellNumber = Math.ceil(kinNumber / 13); // 1-20

  return {
    wavespellNumber,
    wavespellName: WAVESPELL_SEALS[wavespellNumber - 1],
    wavespellStartKin,
    dayInWave: toneIndex + 1,  // 1-13 (humano-legible)
  };
};

/**
 * Calcula el Castillo al que pertenece un Kin dado.
 * 
 * @param {number} kinNumber - Número de Kin (1-260)
 * @returns {{
 *   castleIndex: number,   // Índice del castillo (0-4)
 *   castle: object,        // Objeto del castillo con nombre, color, acción, rango
 *   positionInCastle: number, // Posición dentro del castillo (1-52)
 * }}
 */
export const getCastle = (kinNumber) => {
  const castleIndex = Math.ceil(kinNumber / 52) - 1;
  return {
    castleIndex,
    castle: CASTLES[castleIndex],
    positionInCastle: ((kinNumber - 1) % 52) + 1,
  };
};

/**
 * Obtiene las 4 Ondas Encantadas que componen un Castillo dado.
 * 
 * @param {number} castleIndex - Índice del castillo (0-4)
 * @returns {Array<{wavespellNumber: number, wavespellName: string, startKin: number}>}
 */
export const getWavespellsInCastle = (castleIndex) => {
  const startWave = castleIndex * 4;  // 0, 4, 8, 12, 16
  return Array.from({ length: 4 }, (_, i) => {
    const waveNum = startWave + i + 1;
    return {
      wavespellNumber: waveNum,
      wavespellName: WAVESPELL_SEALS[waveNum - 1],
      startKin: (waveNum - 1) * 13 + 1,
    };
  });
};

/**
 * Calcula el Kin del Anillo Solar (Año Galáctico) para una fecha gregoriana.
 * El Anillo Solar comienza el 26 de julio de cada año.
 * 
 * @param {Date} gregorianDate - Fecha gregoriana
 * @param {function} calculateKinFn - Referencia a calculateKin de tzolkin.js
 * @returns {{
 *   yearKin: number,          // Kin del año
 *   ringStartDate: Date,      // Fecha de inicio del anillo (26 Jul)
 *   ringEndDate: Date,        // Fecha de fin del anillo (24 Jul siguiente)
 * }}
 */
export const getSolarRing = (gregorianDate, calculateKinFn) => {
  const year = gregorianDate.getFullYear();
  const month = gregorianDate.getMonth(); // 0-indexed
  const day = gregorianDate.getDate();

  // If before July 26, we're in the previous year's ring
  const isBeforeNewYear = month < 6 || (month === 6 && day < 26);
  const ringYear = isBeforeNewYear ? year - 1 : year;

  const ringStartDate = new Date(ringYear, 6, 26); // July 26
  const ringEndDate = new Date(ringYear + 1, 6, 24); // July 24 next year
  // (July 25 = Día Fuera del Tiempo, not part of any ring)

  const yearKin = calculateKinFn(ringStartDate);

  return { yearKin, ringStartDate, ringEndDate };
};

/**
 * Calcula el Kin de Tránsito: interacción entre Kin natal y Kin del año.
 * Fórmula: (natalKin + yearKin - 1) % 260, ajustado a rango 1-260
 * 
 * @param {number} natalKin - Kin natal del usuario (1-260)
 * @param {number} yearKin - Kin del año actual (1-260)
 * @returns {number} Kin de tránsito (1-260)
 */
export const getTransitKin = (natalKin, yearKin) => {
  let transit = (natalKin + yearKin - 1) % 260;
  if (transit <= 0) transit += 260;
  return transit;
};
