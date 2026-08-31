/**
 * colorUtils.js — Utilidades centralizadas para mapeo de colores Maya
 * 
 * Unifica las 10+ duplicaciones de mapeo color→hex, color→gradient
 * que existían en App.jsx, QuintaFuerza.jsx, e Infographic.jsx
 */

// Canonical color mapping: nombre (con variantes de género) → hex
const COLOR_MAP = {
  'Rojo': '#ef4444',
  'Roja': '#ef4444',
  'Blanco': '#ffffff',
  'Blanca': '#ffffff',
  'Azul': '#3b82f6',
  'Amarillo': '#eab308',
  'Amarilla': '#eab308',
};

// Dark variants for backgrounds/shadows
const COLOR_MAP_DARK = {
  'Rojo': '#b71c1c',
  'Roja': '#b71c1c',
  'Blanco': '#f0f0f0',
  'Blanca': '#f0f0f0',
  'Azul': '#0d47a1',
  'Amarillo': '#f57f17',
  'Amarilla': '#f57f17',
};

/**
 * Get hex color from a seal/kin color name string.
 * Handles gender variants (Rojo/Roja, Blanco/Blanca, etc.)
 * @param {string} colorName - Color name (e.g. 'Rojo', 'Roja', 'Azul')
 * @param {string} [fallback='#eab308'] - Fallback color (default: Amarillo)
 * @returns {string} Hex color string
 */
export const getColorHex = (colorName, fallback = '#eab308') => {
  if (!colorName || typeof colorName !== 'string') return fallback;
  return COLOR_MAP[colorName] || fallback;
};

/**
 * Get dark hex variant for backgrounds/deep shadows.
 * @param {string} colorName
 * @param {string} [fallback='#f57f17']
 * @returns {string} Hex color string
 */
export const getColorHexDark = (colorName, fallback = '#f57f17') => {
  if (!colorName || typeof colorName !== 'string') return fallback;
  return COLOR_MAP_DARK[colorName] || fallback;
};

/**
 * Get linear gradient string for a color (used in seal badges, kin card circles).
 * @param {string} colorName
 * @returns {string} CSS linear-gradient string
 */
export const getColorGradient = (colorName) => {
  const hex = getColorHex(colorName);
  const darkHex = getColorHexDark(colorName);
  return `linear-gradient(135deg, ${hex} 0%, ${darkHex} 100%)`;
};

/**
 * Get radial aura/glow gradient (used in QuintaFuerza oracle visualization).
 * @param {string} colorName
 * @returns {string} CSS radial-gradient string
 */
export const getColorAura = (colorName) => {
  const hex = getColorHex(colorName);
  // Convert hex to rgba for opacity control
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.4) 0%, transparent 70%)`;
};

/**
 * Get box-shadow glow string for a color.
 * @param {string} colorName
 * @param {number} [intensity=0.6] - Glow opacity (0-1)
 * @returns {string} CSS box-shadow rgba string
 */
export const getColorGlow = (colorName, intensity = 0.6) => {
  const hex = getColorHex(colorName);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${intensity})`;
};

/**
 * Get filter style for white seal glyphs (add shadow for visibility on light backgrounds).
 * @param {string} colorName
 * @returns {string} CSS filter string
 */
export const getGlyphFilter = (colorName) => {
  const isWhite = colorName === 'Blanco' || colorName === 'Blanca';
  return isWhite
    ? 'drop-shadow(0 0 2px rgba(0,0,0,0.5))'
    : 'drop-shadow(0 0 5px rgba(255,255,255,0.3))';
};

/**
 * Check if a color name refers to white (handles gender variants).
 * @param {string} colorName
 * @returns {boolean}
 */
export const isWhiteColor = (colorName) => {
  return colorName === 'Blanco' || colorName === 'Blanca';
};

/**
 * Check if a color name refers to red (handles gender variants).
 * @param {string} colorName
 * @returns {boolean}
 */
export const isRedColor = (colorName) => {
  return colorName === 'Rojo' || colorName === 'Roja';
};

/**
 * Convert hex to rgba string.
 * @param {string} hex - Hex color (e.g. '#ef4444')
 * @param {number} alpha - Opacity (0-1)
 * @returns {string} rgba string
 */
export const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
