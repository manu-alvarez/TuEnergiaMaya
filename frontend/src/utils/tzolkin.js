const sealsData = [
    { name: 'Dragón', slug: 'dragon', color: 'Red', v1: 'Nutro', v2: 'Nutriendo', v3: 'Nacimiento', essence: 'el ser', power: 'el nacimiento' },
    { name: 'Viento', slug: 'wind', color: 'White', v1: 'Comunico', v2: 'Comunicando', v3: 'Aliento', essence: 'el espíritu', power: 'el aliento' },
    { name: 'Noche', slug: 'night', color: 'Blue', v1: 'Sueño', v2: 'Soñando', v3: 'Intuición', essence: 'la abundancia', power: 'la intuición' },
    { name: 'Semilla', slug: 'seed', color: 'Yellow', v1: 'Focalizo', v2: 'Focalizando', v3: 'Atino', essence: 'el florecimiento', power: 'el atino' },
    { name: 'Serpiente', slug: 'serpent', color: 'Red', v1: 'Sobrevivo', v2: 'Sobreviviendo', v3: 'Instinto', essence: 'la fuerza vital', power: 'el instinto' },
    { name: 'Enlazador de Mundos', slug: 'worldbridger', color: 'White', v1: 'Igualo', v2: 'Igualando', v3: 'Oportunidad', essence: 'la muerte', power: 'la oportunidad' },
    { name: 'Mano', slug: 'hand', color: 'Blue', v1: 'Conozco', v2: 'Conociendo', v3: 'Realización', essence: 'la curación', power: 'la realización' },
    { name: 'Estrella', slug: 'star', color: 'Yellow', v1: 'Embellezco', v2: 'Embelleciendo', v3: 'Arte', essence: 'la elegancia', power: 'el arte' },
    { name: 'Luna', slug: 'moon', color: 'Red', v1: 'Purifico', v2: 'Purificando', v3: 'Flujo', essence: 'el agua universal', power: 'el flujo' },
    { name: 'Perro', slug: 'dog', color: 'White', v1: 'Amo', v2: 'Amando', v3: 'Lealtad', essence: 'el corazón', power: 'la lealtad' },
    { name: 'Mono', slug: 'monkey', color: 'Blue', v1: 'Juego', v2: 'Jugando', v3: 'Ilusión', essence: 'la magia', power: 'la ilusión' },
    { name: 'Humano', slug: 'human', color: 'Yellow', v1: 'Influencio', v2: 'Influenciando', v3: 'Sabiduría', essence: 'el libre albedrío', power: 'la sabiduría' },
    { name: 'Caminante del Cielo', slug: 'skywalker', color: 'Red', v1: 'Exploro', v2: 'Explorando', v3: 'Vigilancia', essence: 'el espacio', power: 'la vigilancia' },
    { name: 'Mago', slug: 'wizard', color: 'White', v1: 'Encanto', v2: 'Encantando', v3: 'Receptividad', essence: 'la atemporalidad', power: 'la receptividad' },
    { name: 'Águila', slug: 'eagle', color: 'Blue', v1: 'Creo', v2: 'Creando', v3: 'Mente', essence: 'la visión', power: 'la mente' },
    { name: 'Guerrero', slug: 'warrior', color: 'Yellow', v1: 'Cuestiono', v2: 'Cuestionando', v3: 'Intrepidez', essence: 'la inteligencia', power: 'la intrepidez' },
    { name: 'Tierra', slug: 'earth', color: 'Red', v1: 'Evoluciono', v2: 'Evolucionando', v3: 'Sincronía', essence: 'la navegación', power: 'la sincronía' },
    { name: 'Espejo', slug: 'mirror', color: 'White', v1: 'Reflejo', v2: 'Reflejando', v3: 'Orden', essence: 'el sinfín', power: 'el orden' },
    { name: 'Tormenta', slug: 'storm', color: 'Blue', v1: 'Catalizo', v2: 'Catalizando', v3: 'Energía', essence: 'la autogeneración', power: 'la energía' },
    { name: 'Sol', slug: 'sun', color: 'Yellow', v1: 'Ilumino', v2: 'Iluminando', v3: 'Vida', essence: 'el fuego universal', power: 'la vida' }
];

const tonesData = [
    { name: 'Magnético', v: 'Unifico', power: 'propósito', action: 'atrayendo', number: 1 },
    { name: 'Lunar', v: 'Estabilizo', power: 'desafío', action: 'polarizando', number: 2 },
    { name: 'Eléctrico', v: 'Vinculo', power: 'servicio', action: 'activando', number: 3 },
    { name: 'Auto-existente', v: 'Mido', power: 'forma', action: 'definiendo', number: 4 },
    { name: 'Entonado', v: 'Comando', power: 'esplendor', action: 'confiriendo', number: 5 },
    { name: 'Rítmico', v: 'Organizo', power: 'igualdad', action: 'equilibrando', number: 6 },
    { name: 'Resonante', v: 'Canalizo', power: 'sintonización', action: 'inspirando', number: 7 },
    { name: 'Galáctico', v: 'Armonizo', power: 'integridad', action: 'modelando', number: 8 },
    { name: 'Solar', v: 'Pulso', power: 'intención', action: 'realizando', number: 9 },
    { name: 'Planetario', v: 'Perfecciono', power: 'manifestación', action: 'produciendo', number: 10 },
    { name: 'Espectral', v: 'Disuelvo', power: 'liberación', action: 'divulgando', number: 11 },
    { name: 'Cristal', v: 'Dedico', power: 'cooperación', action: 'universalizando', number: 12 },
    { name: 'Cósmico', v: 'Perduro', power: 'presencia', action: 'trascendiendo', number: 13 }
];

const getGuide = (sealIdx, toneIdx) => {
    const toneNum = toneIdx + 1;
    let offset = 0;
    if ([1, 6, 11].includes(toneNum)) offset = 0;
    else if ([2, 7, 12].includes(toneNum)) offset = 12;
    else if ([3, 8, 13].includes(toneNum)) offset = 4;
    else if ([4, 9].includes(toneNum)) offset = 16;
    else if ([5, 10].includes(toneNum)) offset = 8;

    return sealsData[(sealIdx + offset) % 20];
};

/**
 * Check if a year is a leap year in the Gregorian calendar.
 */
const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

/**
 * Count the number of February 29ths between two dates.
 * These days are skipped in the Dreamspell calendar.
 * @param {Date} startDate - Earlier date
 * @param {Date} endDate - Later date
 * @returns {number} The count of Feb 29s (positive if endDate > startDate)
 */
const countLeapDays = (startDate, endDate) => {
    let count = 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    // Determine direction
    const direction = end >= start ? 1 : -1;
    const earlier = direction === 1 ? start : end;
    const later = direction === 1 ? end : start;

    // Get the range of years to check
    const startYear = earlier.getFullYear();
    const endYear = later.getFullYear();

    for (let year = startYear; year <= endYear; year++) {
        if (isLeapYear(year)) {
            const feb29 = new Date(year, 1, 29); // Feb 29 of that year
            // Check if Feb 29 falls strictly between earlier and later (exclusive of start, inclusive of end for forward calc)
            // More precisely: Feb 29 is counted if it is > earlier AND <= later
            if (feb29 > earlier && feb29 <= later) {
                count++;
            }
        }
    }

    return count * direction;
};

export const calculateKin = (date) => {
    // Reference point: A known correct Kin date
    // Using July 26, 1987 (Kin 34 - Mago Galáctico Blanco) - Start of Dreamspell count
    // However, a more practical reference is a recent verified date.
    // User confirmed: 22/01/2026 = Kin 44
    const refDate = new Date('2026-01-22T00:00:00');
    const refKin = 44;

    const current = new Date(date);
    current.setHours(0, 0, 0, 0);
    const refDateNormalized = new Date(refDate);
    refDateNormalized.setHours(0, 0, 0, 0);

    // Calculate raw day difference
    const diffTime = current.getTime() - refDateNormalized.getTime();
    let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    // Subtract the leap days (Feb 29s) that occurred between the dates
    // These are "Días Fuera del Tiempo" in Dreamspell and don't count
    const leapDaysToSubtract = countLeapDays(refDateNormalized, current);
    diffDays -= leapDaysToSubtract;

    // Calculate Kin
    let kin = (refKin + diffDays) % 260;
    if (kin <= 0) kin += 260;

    return kin;
};

export const getKinConfig = (kinNumber) => {
    const toneIdx = ((kinNumber - 1) % 13);
    const sealIdx = ((kinNumber - 1) % 20);
    const seal = sealsData[sealIdx];
    const tone = tonesData[toneIdx];
    const guide = getGuide(sealIdx, toneIdx);

    // Build Dreamspell Affirmation
    const affirmation = `Yo ${tone.v.toLowerCase()} con el fin de ${seal.v1.toLowerCase()}, ${tone.action.toLowerCase()} ${seal.essence}. Sello la entrada de ${seal.power} con el tono ${tone.name.toLowerCase()} de ${tone.power}. Me guía el poder de ${guide.power}.`;

    return {
        number: kinNumber,
        seal_name: seal.name,
        tone_name: tone.name,
        color: seal.color,
        slug: seal.slug,
        affirmation: affirmation,
        short_description: `Hoy es un gran día para ${tone.v.toLowerCase()} tu ${seal.power} al ${tone.action} ${seal.essence}.`,
        long_description: `${seal.name} ${seal.color} nos invita a ${seal.v1.toLowerCase()} con el ${tone.name.toLowerCase()} de la ${tone.power}. Es un momento para ${tone.action} la sabiduría de la ${seal.essence} y avanzar en nuestra evolución espiritual.`
    };
};
