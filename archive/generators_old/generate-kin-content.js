#!/usr/bin/env node

/**
 * Script to generate daily Kin content automatically
 * Usage: node generate-kin-content.js <kin_number>
 * Example: node generate-kin-content.js 39
 */

const fs = require('fs');
const path = require('path');

// Seal and Tone data for automatic generation
const sealsData = [
    { name: 'Dragón', color: 'Rojo', essence: 'nacimiento', action: 'nutrir' },
    { name: 'Viento', color: 'Blanco', essence: 'espíritu', action: 'comunicar' },
    { name: 'Noche', color: 'Azul', essence: 'abundancia', action: 'soñar' },
    { name: 'Semilla', color: 'Amarillo', essence: 'florecimiento', action: 'focalizar' },
    { name: 'Serpiente', color: 'Rojo', essence: 'fuerza vital', action: 'sobrevivir' },
    { name: 'Enlazador de Mundos', color: 'Blanco', essence: 'muerte/oportunidad', action: 'igualar' },
    { name: 'Mano', color: 'Azul', essence: 'curación', action: 'conocer' },
    { name: 'Estrella', color: 'Amarillo', essence: 'elegancia', action: 'embellecer' },
    { name: 'Luna', color: 'Rojo', essence: 'agua universal', action: 'purificar' },
    { name: 'Perro', color: 'Blanco', essence: 'corazón', action: 'amar' },
    { name: 'Mono', color: 'Azul', essence: 'magia', action: 'jugar' },
    { name: 'Humano', color: 'Amarillo', essence: 'libre albedrío', action: 'influenciar' },
    { name: 'Caminante del Cielo', color: 'Rojo', essence: 'espacio', action: 'explorar' },
    { name: 'Mago', color: 'Blanco', essence: 'atemporalidad', action: 'encantar' },
    { name: 'Águila', color: 'Azul', essence: 'visión', action: 'crear' },
    { name: 'Guerrero', color: 'Amarillo', essence: 'inteligencia', action: 'cuestionar' },
    { name: 'Tierra', color: 'Rojo', essence: 'navegación', action: 'evolucionar' },
    { name: 'Espejo', color: 'Blanco', essence: 'sinfín', action: 'reflejar' },
    { name: 'Tormenta', color: 'Azul', essence: 'autogeneración', action: 'catalizar' },
    { name: 'Sol', color: 'Amarillo', essence: 'fuego universal', action: 'iluminar' }
];

const tonesData = [
    { name: 'Magnético', number: 1, power: 'propósito', quality: 'unificación' },
    { name: 'Lunar', number: 2, power: 'desafío', quality: 'polarización' },
    { name: 'Eléctrico', number: 3, power: 'servicio', quality: 'activación' },
    { name: 'Auto-existente', number: 4, power: 'forma', quality: 'definición' },
    { name: 'Entonado', number: 5, power: 'esplendor', quality: 'empoderamiento' },
    { name: 'Rítmico', number: 6, power: 'igualdad', quality: 'equilibrio' },
    { name: 'Resonante', number: 7, power: 'sintonización', quality: 'canalización' },
    { name: 'Galáctico', number: 8, power: 'integridad', quality: 'armonización' },
    { name: 'Solar', number: 9, power: 'intención', quality: 'realización' },
    { name: 'Planetario', number: 10, power: 'manifestación', quality: 'perfección' },
    { name: 'Espectral', number: 11, power: 'liberación', quality: 'disolución' },
    { name: 'Cristal', number: 12, power: 'cooperación', quality: 'dedicación' },
    { name: 'Cósmico', number: 13, power: 'presencia', quality: 'trascendencia' }
];

function getKinInfo(kinNumber) {
    const toneIdx = ((kinNumber - 1) % 13);
    const sealIdx = ((kinNumber - 1) % 20);
    return {
        seal: sealsData[sealIdx],
        tone: tonesData[toneIdx]
    };
}

function generateTemplate(kinNumber) {
    const { seal, tone } = getKinInfo(kinNumber);

    console.log(`\n=== GENERANDO CONTENIDO PARA KIN ${kinNumber} ===`);
    console.log(`Sello: ${seal.name} ${seal.color}`);
    console.log(`Tono: ${tone.name} (${tone.number})`);
    console.log(`\n📚 FUENTES A CONSULTAR:`);
    console.log(`1. https://mksoto.com/kin-${kinNumber}/`);
    console.log(`2. https://luciagarciaotero.com.ar/ (buscar Kin ${kinNumber})`);
    console.log(`3. https://13lunas.net/tutorial/El_libro_del_kin/ (para afirmación)`);

    console.log(`\n📝 PLANTILLA PARA COMPLETAR:`);
    console.log(`\n"${kinNumber}": {`);
    console.log(`    "affirmation": "\"[BUSCAR EN 13LUNAS.NET]\",`);
    console.log(`    "image_url": "assets/infographies/Kin ${kinNumber}.png",`);
    console.log(`    "short_description": "[CREAR: Frase breve y energética sobre ${seal.name} + ${tone.name}]",`);
    console.log(`    "long_description": "[CREAR: 4-5 líneas explicando ${seal.name} (${seal.essence}) + Tono ${tone.name} (${tone.power})]"`);
    console.log(`}`);

    console.log(`\n💡 GUÍA DE CREACIÓN:`);
    console.log(`\nSabiduría Diaria (short_description):`);
    console.log(`- Enfoque: ${seal.action} + ${tone.quality}`);
    console.log(`- Esencia: ${seal.essence} con ${tone.power}`);
    console.log(`- Máximo 2 líneas, energético y práctico`);

    console.log(`\nDetalle (long_description):`);
    console.log(`- Línea 1: Qué trae el ${seal.name} hoy`);
    console.log(`- Línea 2-3: Cómo el Tono ${tone.name} (${tone.power}) lo potencia`);
    console.log(`- Línea 4: Acción práctica para el día`);
    console.log(`- Total: 4-5 líneas, sin jerga maya, accesible\n`);
}

// Main execution
const kinNumber = process.argv[2];

if (!kinNumber || isNaN(kinNumber) || kinNumber < 1 || kinNumber > 260) {
    console.error('❌ Error: Proporciona un número de Kin válido (1-260)');
    console.log('Uso: node generate-kin-content.js <número>');
    console.log('Ejemplo: node generate-kin-content.js 39');
    process.exit(1);
}

generateTemplate(parseInt(kinNumber));

console.log(`\n✅ Plantilla generada. Ahora:`);
console.log(`1. Investiga las fuentes listadas arriba`);
console.log(`2. Completa la plantilla con contenido original`);
console.log(`3. Añade el JSON a frontend/src/data/dailyData.json`);
console.log(`4. Ejecuta: git add . && git commit -m "Add Kin ${kinNumber}" && git push origin main && npm run --prefix frontend deploy\n`);
