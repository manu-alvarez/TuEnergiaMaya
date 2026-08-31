/**
 * psiChrono.js — Módulo del Banco Psi Cronológico (Psi Chrono)
 * 
 * La Unidad Psi Crono es la "placa reguladora" de la Tierra según el Sincronario Maya.
 * Cada día del año gregoriano tiene asignado un Kin Psi Crono fijo,
 * independiente del Kin del día.
 * 
 * Fuente: "Apertura del Banco Crono Psi, respecto al Gregoriano"
 */

import psiChronoTable from '../data/psiChronoTable.json';
import { getKinConfig } from './tzolkin.js';

/**
 * Obtiene el Kin Psi Crono para una fecha gregoriana.
 * 
 * Reglas especiales:
 * - 29 de Febrero (bisiestos): usa el mismo Psi Crono que el 28 de Febrero
 * - 25 de Julio: "Día Fuera del Tiempo" → Kin 0 (Mago del Infinito)
 * 
 * @param {Date} gregorianDate - Fecha gregoriana
 * @returns {{
 *   psiKinNumber: number,     // Número de Kin Psi Crono (0 = DFT)
 *   psiConfig: object|null,   // Config del Kin (null si es DFT)
 *   isDayOutOfTime: boolean,  // true si es 25 de Julio
 *   isLeapDay: boolean,       // true si es 29 de Febrero
 * }}
 */
export const getPsiChrono = (gregorianDate) => {
  const month = gregorianDate.getMonth() + 1; // 1-12
  const day = gregorianDate.getDate();
  
  const isLeapDay = month === 2 && day === 29;
  const isDayOutOfTime = month === 7 && day === 25;
  
  // Si es bisiesto (29 Feb), usar el Psi Crono del 28 Feb
  const lookupMonth = isLeapDay ? 2 : month;
  const lookupDay = isLeapDay ? 28 : day;
  
  const key = `${String(lookupMonth).padStart(2, '0')}-${String(lookupDay).padStart(2, '0')}`;
  const psiKinNumber = psiChronoTable[key];
  
  if (psiKinNumber === undefined) {
    // Fallback: fecha no encontrada en la tabla
    return {
      psiKinNumber: null,
      psiConfig: null,
      isDayOutOfTime,
      isLeapDay,
    };
  }
  
  // Kin 0 = Día Fuera del Tiempo (Mago del Infinito)
  if (psiKinNumber === 0) {
    return {
      psiKinNumber: 0,
      psiConfig: {
        number: 0,
        seal_name: 'Mago del Infinito',
        tone_name: 'Fuera del Tiempo',
        color: 'Verde',
        slug: 'hunab-ku',
        affirmation: 'Soy un portal Místico y Mágico. Vuelo directo en la Cuarta Dimensión. Reconexión con la Noosfera Planetaria.',
      },
      isDayOutOfTime: true,
      isLeapDay: false,
    };
  }
  
  return {
    psiKinNumber,
    psiConfig: getKinConfig(psiKinNumber),
    isDayOutOfTime,
    isLeapDay,
  };
};

/**
 * Verifica si una fecha es un Portal de Activación Galáctica (PAG).
 * Los PAG son 52 días especiales del Tzolkin con energía amplificada.
 * 
 * @param {number} kinNumber - Número de Kin (1-260)
 * @returns {boolean}
 */
export const isGalacticActivationPortal = (kinNumber) => {
  // Los 52 PAG del Tzolkin (patrón simétrico en la matriz armónica)
  const GAP_KINS = new Set([
    1, 20, 22, 39, 43, 44, 50, 51, 58, 64, 69, 72,
    77, 85, 88, 93, 96, 106, 107, 108, 109, 110, 111, 112, 113,
    148, 149, 150, 151, 152, 153, 154, 155,
    165, 168, 173, 176, 184, 189, 192, 197,
    210, 211, 217, 218, 221, 222, 239, 241, 242, 260
  ]);
  return GAP_KINS.has(kinNumber);
};
