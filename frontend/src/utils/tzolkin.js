
const sealsData = [
    {
        name: 'Dragón', slug: 'dragon', color: 'Rojo', gender: 'm', v1: 'Nutro', v2: 'Nutriendo', v3: 'Nacimiento', essence: 'el ser', power: 'el nacimiento',
        description: "La Energía Madre: Inicio y Nutrición.",
        advice: {
            ideal: ["Iniciar nuevos proyectos.", "Nutrir tu cuerpo y descansar.", "Conectar con tu origen."],
            avoid: ["Descuidar tu salud.", "Aislarte demasiado.", "Quedarte en el pasado."]
        }
    },
    {
        name: 'Viento', slug: 'wind', color: 'Blanco', gender: 'm', v1: 'Comunico', v2: 'Comunicando', v3: 'Aliento', essence: 'el espíritu', power: 'el aliento',
        description: "El Aliento Divino: Comunicación y Espíritu.",
        advice: {
            ideal: ["Comunicar tu verdad.", "Escribir o hablar en público.", "Practicar respiración consciente."],
            avoid: ["Los chismorreos inútiles.", "Callar lo que sientes.", "Dispersarte mentalmente."]
        }
    },
    {
        name: 'Noche', slug: 'night', color: 'Azul', gender: 'f', v1: 'Sueño', v2: 'Soñando', v3: 'Intuición', essence: 'la abundancia', power: 'la intuición',
        description: "El Santuario Interior: Sueños e Intuición.",
        advice: {
            ideal: ["Seguir tu intuición.", "Meditar en silencio.", "Soñar en grande."],
            avoid: ["Dudar de ti mismo.", "El miedo a la escasez.", "Rodearte de ruido excesivo."]
        }
    },
    {
        name: 'Semilla', slug: 'seed', color: 'Amarillo', gender: 'f', v1: 'Focalizo', v2: 'Focalizando', v3: 'Atino', essence: 'el florecimiento', power: 'el atino',
        description: "El Potencial Latente: Sembrar y Florecer.",
        advice: {
            ideal: ["Sembrar intenciones claras.", "Planificar a largo plazo.", "Estudiar o aprender algo."],
            avoid: ["La impaciencia por resultados.", "Dejar las cosas a medias.", "Hacerlo todo con prisa."]
        }
    },
    {
        name: 'Serpiente', slug: 'serpent', color: 'Rojo', gender: 'f', v1: 'Sobrevivo', v2: 'Sobreviviendo', v3: 'Instinto', essence: 'la fuerza vital', power: 'el instinto',
        description: "La Fuerza Vital: Instinto y Pasión.",
        advice: {
            ideal: ["Mover el cuerpo (deporte).", "Despertar tu pasión.", "Escuchar tus instintos."],
            avoid: ["El sedentarismo total.", "Reprimir tu energía vital.", "Ignorar señales físicas."]
        }
    },
    {
        name: 'Enlazador de Mundos', slug: 'worldbridger', color: 'Blanco', gender: 'm', v1: 'Igualo', v2: 'Igualando', v3: 'Oportunidad', essence: 'la muerte', power: 'la oportunidad',
        description: "El Puente de Mundos: Muerte y Oportunidad.",
        advice: {
            ideal: ["Cerrar ciclos pendientes.", "Perdonar y soltar.", "Limpiar y ordenar tu espacio."],
            avoid: ["Aferrarte a lo viejo.", "El control excesivo.", "Miedo a los cambios."]
        }
    },
    {
        name: 'Mano', slug: 'hand', color: 'Azul', gender: 'f', v1: 'Conozco', v2: 'Conociendo', v3: 'Realización', essence: 'la curación', power: 'la realización',
        description: "La Sanación Realizadora: Conocer y Curar.",
        advice: {
            ideal: ["Sanar heridas emocionales.", "Trabajar con las manos.", "Concretar tareas pendientes."],
            avoid: ["Posponer lo necesario.", "La autocrítica destructiva.", "Exigirte perfección."]
        }
    },
    {
        name: 'Estrella', slug: 'star', color: 'Amarillo', gender: 'f', v1: 'Embellezco', v2: 'Embelleciendo', v3: 'Arte', essence: 'la elegancia', power: 'el arte',
        description: "El Arte Elegante: Belleza y Armonía.",
        advice: {
            ideal: ["Crear arte o belleza.", "Buscar la armonía social.", "Brillar con luz propia."],
            avoid: ["El drama innecesario.", "La superficialidad.", "Compararte con otros."]
        }
    },
    {
        name: 'Luna', slug: 'moon', color: 'Rojo', gender: 'f', v1: 'Purifico', v2: 'Purificando', v3: 'Flujo', essence: 'el agua universal', power: 'el flujo',
        description: "El Flujo Universal: Purificar emociones.",
        advice: {
            ideal: ["Dejar fluir tus emociones.", "Llorar si lo necesitas.", "Conectar con el agua."],
            avoid: ["Reprimir lo que sientes.", "La rigidez mental.", "Olvidar tu sensibilidad."]
        }
    },
    {
        name: 'Perro', slug: 'dog', color: 'Blanco', gender: 'm', v1: 'Amo', v2: 'Amando', v3: 'Lealtad', essence: 'el corazón', power: 'la lealtad',
        description: "El Amor Leal: Corazón y Compañerismo.",
        advice: {
            ideal: ["Compartir con amigos.", "Amar incondicionalmente.", "Ser leal a tu corazón."],
            avoid: ["Los celos o posesividad.", "Depender de otros.", "Traicionarte a ti mismo."]
        }
    },
    {
        name: 'Mono', slug: 'monkey', color: 'Azul', gender: 'm', v1: 'Juego', v2: 'Jugando', v3: 'Ilusión', essence: 'la magia', power: 'la ilusión',
        description: "El Niño Divino: Juego, Magia y Humor.",
        advice: {
            ideal: ["Jugar y reír mucho.", "Romper la rutina seria.", "Ver la magia en todo."],
            avoid: ["La amargura o seriedad.", "Tomarte todo personal.", "La burla hiriente."]
        }
    },
    {
        name: 'Humano', slug: 'human', color: 'Amarillo', gender: 'm', v1: 'Influencio', v2: 'Influenciando', v3: 'Sabiduría', essence: 'el libre albedrío', power: 'la sabiduría',
        description: "El Libre Albedrío: Sabiduría y Elección.",
        advice: {
            ideal: ["Ejercer tu libertad.", "Tomar decisiones propias.", "Influenciar positivamente."],
            avoid: ["Culpar a los demás.", "La indecisión eterna.", "Seguir al rebaño ciegas."]
        }
    },
    {
        name: 'Caminante del Cielo', slug: 'skywalker', color: 'Rojo', gender: 'm', v1: 'Exploro', v2: 'Explorando', v3: 'Vigilancia', essence: 'el espacio', power: 'la vigilancia',
        description: "El Explorador Cósmico: Espacio y Vigilancia.",
        advice: {
            ideal: ["Explorar lugares nuevos.", "Salir de tu zona confort.", "Vigilar tu espacio."],
            avoid: ["El miedo a lo desconocido.", "Encerrarte en casa.", "La inercia."]
        }
    },
    {
        name: 'Mago', slug: 'wizard', color: 'Blanco', gender: 'm', v1: 'Encanto', v2: 'Encantando', v3: 'Receptividad', essence: 'la atemporalidad', power: 'la receptividad',
        description: "El Jaguar Místico: Atemporalidad y Encanto.",
        advice: {
            ideal: ["Vivir el aquí y ahora.", "Encantar el momento.", "Conectar con lo sutil."],
            avoid: ["Ansiedad por el futuro.", "Vivir en el pasado.", "La manipulación."]
        }
    },
    {
        name: 'Águila', slug: 'eagle', color: 'Azul', gender: 'f', v1: 'Creo', v2: 'Creando', v3: 'Mente', essence: 'la visión', power: 'la mente',
        description: "La Visión Superior: Mente y Creación.",
        advice: {
            ideal: ["Ver el panorama completo.", "Crear una visión clara.", "Elevar tu perspectiva."],
            avoid: ["Perderte en detalles.", "Obsesionarte con pequeñeces.", "La miopía mental."]
        }
    },
    {
        name: 'Guerrero', slug: 'warrior', color: 'Amarillo', gender: 'm', v1: 'Cuestiono', v2: 'Cuestionando', v3: 'Intrepidez', essence: 'la inteligencia', power: 'la intrepidez',
        description: "La Inteligencia Valiente: Cuestionar sin miedo.",
        advice: {
            ideal: ["Cuestionar con inteligencia.", "Perder el miedo a actuar.", "Planear estrategias."],
            avoid: ["La duda paralizante.", "Pelear sin sentido.", "La cobardía."]
        }
    },
    {
        name: 'Tierra', slug: 'earth', color: 'Rojo', gender: 'f', v1: 'Evoluciono', v2: 'Evolucionando', v3: 'Sincronía', essence: 'la navegación', power: 'la sincronía',
        description: "La Navegación Sincrónica: Evolución y Tierra.",
        advice: {
            ideal: ["Conectar con la naturaleza.", "Seguir las señales.", "Evolucionar paso a paso."],
            avoid: ["Desconectarte de la tierra.", "Forzar los ritmos.", "La prisa."]
        }
    },
    {
        name: 'Espejo', slug: 'mirror', color: 'Blanco', gender: 'm', v1: 'Reflejo', v2: 'Reflejando', v3: 'Orden', essence: 'el sinfín', power: 'el orden',
        description: "El Reflejo de Verdad: Orden y Claridad.",
        advice: {
            ideal: ["Mirarte en el espejo.", "Decir siempre la verdad.", "Poner orden y claridad."],
            avoid: ["El autoengaño.", "Juzgar a los demás.", "El desorden y caos."]
        }
    },
    {
        name: 'Tormenta', slug: 'storm', color: 'Azul', gender: 'f', v1: 'Catalizo', v2: 'Catalizando', v3: 'Energía', essence: 'la autogeneración', power: 'la energía',
        description: "La Catalización: Transformación total.",
        advice: {
            ideal: ["Hacer cambios radicales.", "Reinventarte hoy.", "Permitir la catarsis."],
            avoid: ["Resistirse al cambio.", "Aferrarte a la estabilidad.", "El estancamiento."]
        }
    },
    {
        name: 'Sol', slug: 'sun', color: 'Amarillo', gender: 'm', v1: 'Ilumino', v2: 'Iluminando', v3: 'Vida', essence: 'el fuego universal', power: 'la vida',
        description: "El Fuego Universal: Iluminación y Vida.",
        advice: {
            ideal: ["Iluminar a los demás.", "Amar la vida plenamente.", "Liderar con el ejemplo."],
            avoid: ["Apagar tu luz interna.", "El egoísmo o arrogancia.", "Esconderte."]
        }
    }
];

const tonesData = [
    { name: 'Magnético', v: 'Unifico', power: 'propósito', action: 'atrayendo', number: 1, description: "Atrae el propósito y unifica la meta." },
    { name: 'Lunar', v: 'Estabilizo', power: 'desafío', action: 'polarizando', number: 2, description: "Identifica desafíos y estabiliza polos." },
    { name: 'Eléctrico', v: 'Vinculo', power: 'servicio', action: 'activando', number: 3, description: "Activa el servicio y une a las partes." },
    { name: 'Auto-existente', v: 'Mido', power: 'forma', action: 'definiendo', number: 4, description: "Define la forma y mide la acción." },
    { name: 'Entonado', v: 'Comando', power: 'esplendor', action: 'confiriendo', number: 5, description: "Toma el mando y empodera el brillo." },
    { name: 'Rítmico', v: 'Organizo', power: 'igualdad', action: 'equilibrando', number: 6, description: "Organiza el equilibrio y encuentra ritmo." },
    { name: 'Resonante', v: 'Canalizo', power: 'sintonización', action: 'inspirando', number: 7, description: "Sintoniza con la fuente e inspira." },
    { name: 'Galáctico', v: 'Armonizo', power: 'integridad', action: 'modelando', number: 8, description: "Armoniza la realidad con integridad." },
    { name: 'Solar', v: 'Pulso', power: 'intención', action: 'realizando', number: 9, description: "Pulsa la intención para realizarla." },
    { name: 'Planetario', v: 'Perfecciono', power: 'manifestación', action: 'produciendo', number: 10, description: "Perfecciona y manifiesta el resultado." },
    { name: 'Espectral', v: 'Disuelvo', power: 'liberación', action: 'divulgando', number: 11, description: "Libera, disuelve y deja ir lo viejo." },
    { name: 'Cristal', v: 'Dedico', power: 'cooperación', action: 'universalizando', number: 12, description: "Coopera y universaliza la conciencia." },
    { name: 'Cósmico', v: 'Perduro', power: 'presencia', action: 'trascendiendo', number: 13, description: "Trasciende y da el vuelo mágico final." }
];

// Helper for Oracle calculation
const mod = (n, m) => ((n % m) + m) % m;
const ANALOG_PAIRS = { 0: 17, 17: 0, 1: 16, 16: 1, 2: 15, 15: 2, 3: 14, 14: 3, 4: 13, 13: 4, 5: 12, 12: 5, 6: 11, 11: 6, 7: 10, 10: 7, 8: 9, 9: 8, 18: 19, 19: 18 };

const calculateOracle = (sealIdx, toneVal) => {
    // 1. Analog (Support)
    let analogIdx = ANALOG_PAIRS[sealIdx];
    if (analogIdx === undefined) analogIdx = mod(17 - sealIdx, 20);

    // 2. Antipode (Challenge)
    const antipodeIdx = mod(sealIdx + 10, 20);

    // 3. Occult (Hidden Power)
    const occultIdx = mod(19 - sealIdx, 20);

    // 4. Guide (Power)
    let guideIdx;
    switch (toneVal) {
        case 1: case 6: case 11: guideIdx = sealIdx; break;
        case 2: case 7: case 12: guideIdx = mod(sealIdx - 8, 20); break;
        case 3: case 8: case 13: guideIdx = mod(sealIdx + 4, 20); break; // or -16
        case 4: case 9: guideIdx = mod(sealIdx + 16, 20); break; // or -4
        case 5: case 10: guideIdx = mod(sealIdx + 8, 20); break;
        default: guideIdx = sealIdx; // Fallback
    }

    return {
        guide: sealsData[guideIdx],
        antipode: sealsData[antipodeIdx],
        analog: sealsData[analogIdx],
        occult: sealsData[occultIdx]
    };
};

// Gender adjustment helper
const adjustGender = (text, gender) => {
    if (gender !== 'f') return text;

    // Direct mappings for tones
    const toneMap = {
        'Magnético': 'Magnética',
        'Eléctrico': 'Eléctrica',
        'Entonado': 'Entonada',
        'Rítmico': 'Rítmica',
        'Galáctico': 'Galáctica',
        'Planetario': 'Planetaria',
        'Cósmico': 'Cósmica'
    };

    // Direct mapping for colors
    const colorMap = {
        'Rojo': 'Roja',
        'Blanco': 'Blanca',
        'Amarillo': 'Amarilla'
    };

    return toneMap[text] || colorMap[text] || text;
};


const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

// Helper to normalize a date to UTC Noon
// This avoids timezone issues where midnight might fall into the previous day
const getNoonUTC = (dateInput) => {
    const date = new Date(dateInput);
    // CRITICAL: We use .getFullYear(), .getMonth(), and .getDate() (Local Time)
    // instead of .getUTCFullYear() etc. to ensure that the Kin calculation
    // aligns with the user's local calendar day. This means the Kin changes
    // exactly at local midnight.
    return new Date(Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        12, 0, 0, 0
    ));
};

const countLeapDays = (startUTC, endUTC) => {
    let count = 0;

    // Determine direction and sorted dates for year extraction
    const start = startUTC < endUTC ? startUTC : endUTC;
    const end = startUTC < endUTC ? endUTC : startUTC;
    const isForward = endUTC >= startUTC;

    // Ensure we work with years from the sorted dates to guarantee correct loop range
    const year1 = start.getUTCFullYear();
    const year2 = end.getUTCFullYear();

    for (let year = year1; year <= year2; year++) {
        if (isLeapYear(year)) {
            // Feb 29 at Noon UTC for that year
            const feb29 = new Date(Date.UTC(year, 1, 29, 12, 0, 0));
            // Check if Feb 29 sits strictly between the start and end interval
            if (feb29 > start && feb29 <= end) {
                count++;
            }
        }
    }
    return isForward ? count : -count;
};

export const calculateKin = (date) => {
    // Reference: Jan 22, 2026 (Kin 44) - Stable version from commit 33bc48e
    // Verified against 13lunas.net (Official user source)
    // Feb 18, 2026 = Kin 71 (Blue Rhythmic Monkey) ✓
    const refDate = new Date(Date.UTC(2026, 0, 22, 12, 0, 0, 0));
    const refKin = 44;

    // Target Date - Normalized from input to UTC Noon
    // We use local components to ensure the Kin changes at local midnight
    const targetDate = getNoonUTC(date);

    const diffTime = targetDate.getTime() - refDate.getTime();
    let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    // Dreamspell Rule: Leap days (Feb 29) do not count in the Tzolkin.
    const leapDaysToSubtract = countLeapDays(refDate, targetDate);
    diffDays -= leapDaysToSubtract;

    // Modulo arithmetic for Kin (1-260)
    let kin = (refKin + diffDays) % 260;
    while (kin <= 0) kin += 260;

    return kin;
};

export const getKinConfig = (kinNumber) => {
    const toneIdx = ((kinNumber - 1) % 13);
    const sealIdx = ((kinNumber - 1) % 20);
    const seal = sealsData[sealIdx];
    const tone = tonesData[toneIdx];

    // Calculate Oracle
    const oracle = calculateOracle(sealIdx, tone.number);

    const adjustedColor = adjustGender(seal.color, seal.gender);
    const adjustedToneName = adjustGender(tone.name, seal.gender);

    // Build Dreamspell Affirmation
    const affirmation = `Yo ${tone.v.toLowerCase()} con el fin de ${seal.v1.toLowerCase()}, ${tone.action.toLowerCase()} ${seal.essence}. Sello la entrada de ${seal.power} con el tono ${adjustedToneName.toLowerCase()} de ${tone.power}. Me guía el poder de ${oracle.guide.power}.`;

    return {
        number: kinNumber,
        seal_name: seal.name,
        tone_name: adjustedToneName,
        color: adjustedColor,
        slug: seal.slug,
        affirmation: affirmation,
        // Short/Long desc placeholders (will be overridden by dailyData usually)
        short_description: `Hoy es un gran día para ${tone.v.toLowerCase()} tu ${seal.power} al ${tone.action} ${seal.essence}.`,
        long_description: `${seal.name} ${adjustedColor.toLowerCase()} nos invita a ${seal.v1.toLowerCase()} con el ${adjustedToneName.toLowerCase()} de la ${tone.power}.`,

        // Expanded Data for Infographic
        seal_desc: seal.description,
        tone_desc: tone.description,
        advice: seal.advice,
        oracle: oracle
    };
};

export const generateMysticalMessage = (kinNumber) => {
    const kin = getKinConfig(kinNumber);
    const { seal_name, tone_name, advice, seal_desc, affirmation, oracle } = kin;

    const intros = [
        "Desde el corazón del cielo,",
        "En la espiral del tiempo,",
        "Los abuelos galácticos susurran:",
        "La vibración de hoy revela:"
    ];
    const intro = intros[kinNumber % intros.length];

    const message = `
**${intro}**

Hoy la energía del **${seal_name}** te envuelve. 
${seal_desc}

**Tu Onda Encantada te guía:**
Es un momento sagrado para **${advice.ideal[0].toLowerCase()}** y **${advice.ideal[1].toLowerCase()}**. 
Ten cuidado con **${advice.avoid[0].toLowerCase()}**, pues podría nublar tu visión.

**Oráculo de Poder:**
Guía: ${oracle.guide.name}
Análogo: ${oracle.analog.name}
Antípoda: ${oracle.antipode.name}
Oculto: ${oracle.occult.name}

"${affirmation}"

*In Lak'ech - Yo soy otro tú.*
    `;
    return message.trim();
};
