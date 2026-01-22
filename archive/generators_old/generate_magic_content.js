const fs = require('fs');
const path = require('path');

// --- MAGIC DICTIONARY ---

// THE 20 SEALS: Deep, poetic, and varied definitions
const SPELLS_SEALS = [
    {
        name: 'Dragón',
        archetype: 'La Fuente Primordial',
        verbs: ['nutrir', 'gestar', 'iniciar', 'honrar el origen', 'dar nacimiento'],
        qualities: ['ancestral', 'uterino', 'profundo', 'protector', 'memorable'],
        essence_phrase: 'el ser y la memoria antigua',
        advice: [
            "Confía en tu capacidad para sostenerte a ti mismo.",
            "Es tiempo de iniciar algo nuevo con cuidado y amor.",
            "Honra a tus ancestros y agradece tu linaje.",
            "Descansa en la cueva de tu propio ser.",
            "El universo te sostiene; déjate cuidar."
        ]
    },
    {
        name: 'Viento',
        archetype: 'El Sumo Sacerdote',
        verbs: ['comunicar', 'respirar', 'inspirar', 'transmitir', 'escuchar al espíritu'],
        qualities: ['etéreo', 'invisible', 'comunicativo', 'espiritual', 'libre'],
        essence_phrase: 'el aliento divino y la verdad',
        advice: [
            "Deja que tus palabras sean semillas de luz.",
            "Respira profundo y conecta con tu verdad interior.",
            "Escucha el susurro del viento, trae mensajes para ti.",
            "Comunica lo que sientes sin miedo.",
            "Sé libre como el aire y fluye con el cambio."
        ]
    },
    {
        name: 'Noche',
        archetype: 'El Soñador',
        verbs: ['soñar', 'intuitir', 'interiorizar', 'abundar', 'imaginar'],
        qualities: ['místico', 'oscuro', 'abundante', 'intuitivo', 'profundo'],
        essence_phrase: 'el misterio y la abundancia interior',
        advice: [
            "Presta atención a tus sueños, son llaves de realidad.",
            "Cierra los ojos para ver mejor.",
            "La verdadera abundancia nace de tu paz interior.",
            "Tu intuición es tu brújula más exacta hoy.",
            "Abraza el misterio y lo desconocido."
        ]
    },
    {
        name: 'Semilla',
        archetype: 'El Inocente',
        verbs: ['florecer', 'focalizar', 'sembrar', 'atinar', 'germinar'],
        qualities: ['fértil', 'potencial', 'atento', 'paciente', 'vital'],
        essence_phrase: 'el florecimiento de la consciencia',
        advice: [
            "Planta hoy las intenciones de lo que quieres ver crecer.",
            "Ten paciencia, todo florece a su debido tiempo.",
            "Pon atención plena en cada pequeño detalle.",
            "Rompe la cáscara de tus viejas creencias.",
            "Confía en el potencial infinito que vive en ti."
        ]
    },
    {
        name: 'Serpiente',
        archetype: 'El Iniciado',
        verbs: ['sentir', 'sobrevivir', 'mudar', 'instintivizar', 'apasionar'],
        qualities: ['instintivo', 'vital', 'terrenal', 'apasionado', 'físico'],
        essence_phrase: 'la fuerza vital y la pasión',
        advice: [
            "Escucha la sabiduría de tu cuerpo, no miente.",
            "Muda de piel y deja atrás lo que te pesa.",
            "Enciende tu pasión por la vida.",
            "Usa tu instinto para navegar el día.",
            "Conecta con la tierra y recarga tu energía."
        ]
    },
    {
        name: 'Enlazador de Mundos',
        archetype: 'El Hierofante',
        verbs: ['enlazar', 'soltar', 'perdonar', 'igualar', 'trascender'],
        qualities: ['humilde', 'puente', 'desapegado', 'oportuno', 'sereno'],
        essence_phrase: 'la muerte simbólica y la oportunidad',
        advice: [
            "Cierra ciclos para abrir nuevas puertas.",
            "Perdona y libérate de cargas pasadas.",
            "Sé un puente entre personas y realidades.",
            "Acepta los finales como nuevos comienzos.",
            "Ríndete al flujo de la vida sin resistencia."
        ]
    },
    {
        name: 'Mano',
        archetype: 'El Avatar',
        verbs: ['sanar', 'realizar', 'conocer', 'tocar', 'hacer'],
        qualities: ['sanador', 'realizador', 'completo', 'hábil', 'sabio'],
        essence_phrase: 'la curación y el conocimiento',
        advice: [
            "Tus manos tienen el poder de curar y crear.",
            "Termina lo que has empezado; concreta.",
            "Sánate a ti mismo para sanar al mundo.",
            "El conocimiento se convierte en sabiduría al actuar.",
            "Hazlo, no lo pienses tanto."
        ]
    },
    {
        name: 'Estrella',
        archetype: 'El Artista',
        verbs: ['embellecer', 'crear arte', 'armonizar', 'brillar', 'inspirar'],
        qualities: ['bello', 'elegante', 'armonioso', 'brillante', 'estético'],
        essence_phrase: 'la belleza y la elegancia',
        advice: [
            "Haz de tu vida una obra de arte hoy.",
            "Busca la armonía en medio del caos.",
            "Brilla con tu luz propia, sin miedo.",
            "Rodéate de belleza para elevar tu vibración.",
            "Sé elegante en tus palabras y actos."
        ]
    },
    {
        name: 'Luna',
        archetype: 'La Sanadora',
        verbs: ['fluir', 'purificar', 'sentir', 'limpiar', 'emocionar'],
        qualities: ['fluido', 'emocional', 'purificador', 'sensible', 'cíclico'],
        essence_phrase: 'el agua universal y la purificación',
        advice: [
            "Deja que tus emociones fluyan como el agua.",
            "Límpiate de energías densas, date un baño de sal.",
            "No reprimas lo que sientes, déjalo salir.",
            "Recuerda que todo es cíclico, esto también pasará.",
            "Conecta con tu sensibilidad, es tu poder."
        ]
    },
    {
        name: 'Perro',
        archetype: 'El Compasivo',
        verbs: ['amar', 'ser leal', 'acompañar', 'sentir corazón', 'proteger'],
        qualities: ['leal', 'amoroso', 'fiel', 'compañero', 'emotivo'],
        essence_phrase: 'el amor incondicional y la lealtad',
        advice: [
            "Sé leal a tu propio corazón ante todo.",
            "Ama sin condiciones y sin esperar nada.",
            "Rodéate de tu tribu, de quienes te aman.",
            "Escucha los latidos de tu verdad.",
            "Sé el mejor amigo que quisieras tener."
        ]
    },
    {
        name: 'Mono',
        archetype: 'El Magio',
        verbs: ['jugar', 'reír', 'ilusionar', 'desestructurar', 'magiar'],
        qualities: ['lúdico', 'mágico', 'impredecible', 'inocente', 'alegre'],
        essence_phrase: 'la magia y el juego',
        advice: [
            "No te tomes la vida tan en serio.",
            "Ríete de los problemas y perderán peso.",
            "Juega, explora y recupera tu inocencia.",
            "Rompe la rutina con algo inesperado.",
            "La magia ocurre cuando te permites sorprenderte."
        ]
    },
    {
        name: 'Humano',
        archetype: 'El Sabio',
        verbs: ['decidir', 'influenciar', 'ser libre', 'saborear', 'responsabilizar'],
        qualities: ['libre', 'sabio', 'voluntarioso', 'humano', 'responsable'],
        essence_phrase: 'la libre voluntad y la sabiduría',
        advice: [
            "Tus elecciones de hoy crean tu mañana.",
            "Ejerce tu libertad con responsabilidad.",
            "Eres el capitán de tu propio destino.",
            "Respeta el camino y decisiones de los otros.",
            "Usa tu sabiduría para influir positivamente."
        ]
    },
    {
        name: 'Caminante del Cielo',
        archetype: 'El Profeta',
        verbs: ['explorar', 'vigilar', 'aventurar', 'expandir', 'caminares'],
        qualities: ['explorador', 'valiente', 'cósmico', 'curioso', 'expansivo'],
        essence_phrase: 'el espacio y la profecía',
        advice: [
            "Sal de tu zona de confort, explora lo nuevo.",
            "Rompe las barreras mentales que te limitan.",
            "Sé un pilar entre el cielo y la tierra.",
            "La aventura comienza donde termina la certeza.",
            "Vigila tus pensamientos, crean realidades."
        ]
    },
    {
        name: 'Mago',
        archetype: 'El Hechicero',
        verbs: ['encantar', 'estar presente', 'alinear', 'receptar', 'atemporalizar'],
        qualities: ['atemporal', 'mágico', 'receptivo', 'presente', 'alineado'],
        essence_phrase: 'la atemporalidad y el encanto',
        advice: [
            "Tu poder está solo en el momento presente.",
            "Suelta el pasado y no te angusties por el futuro.",
            "Escucha más de lo que hablas hoy.",
            "Conecta con la magia sutil de lo cotidiano.",
            "Sé receptivo a las señales del universo."
        ]
    },
    {
        name: 'Águila',
        archetype: 'El Vidente',
        verbs: ['crear', 'visionar', 'ver', 'elevar', 'mentalizar'],
        qualities: ['visionario', 'elevado', 'mental', 'creativo', 'global'],
        essence_phrase: 'la visión y la mente superior',
        advice: [
            "Eleva el vuelo y mira el panorama completo.",
            "No te pierdas en detalles insignificantes.",
            "Crea la visión de la vida que deseas.",
            "Confía en lo que ves con el ojo de la mente.",
            "Tu mente es una herramienta creadora poderosa."
        ]
    },
    {
        name: 'Guerrero',
        archetype: 'El Descubridor',
        verbs: ['cuestionar', 'luchar', 'intrepidear', 'inteligenciar', 'avanzar'],
        qualities: ['valiente', 'inteligente', 'cuestionador', 'estratega', 'audaz'],
        essence_phrase: 'la inteligencia y la intrepidez',
        advice: [
            "Haz las preguntas correctas y hallarás respuestas.",
            "No tengas miedo de avanzar hacia lo desconocido.",
            "Usa tu inteligencia, no solo tu fuerza.",
            "La verdadera valentía es enfrentar tus sombras.",
            "Cuestiona la autoridad de tus propios miedos."
        ]
    },
    {
        name: 'Tierra',
        archetype: 'El Navegante',
        verbs: ['evolucionar', 'navegar', 'sincronizar', 'centrar', 'alinear'],
        qualities: ['sincrónico', 'evolutivo', 'centrado', 'terrestre', 'holístico'],
        essence_phrase: 'la navegación y la evolución',
        advice: [
            "Presta atención a las coincidencias, son señales.",
            "Sigue el flujo natural de los acontecimientos.",
            "Estás en el lugar correcto, en el momento justo.",
            "Evoluciona paso a paso, sin prisa.",
            "Conecta con los ritmos de la naturaleza."
        ]
    },
    {
        name: 'Espejo',
        archetype: 'El Yogi',
        verbs: ['reflejar', 'ordenar', 'discernir', 'cortar ilusión', 'meditar'],
        qualities: ['claro', 'ordenado', 'infinito', 'verdadero', 'fiel'],
        essence_phrase: 'el orden y la verdad',
        advice: [
            "Lo que ves afuera es un reflejo de adentro.",
            "Corta con las ilusiones y ve la verdad.",
            "Pon orden en tu vida y tendrás paz mental.",
            "Sé honesto contigo mismo, el espejo no miente.",
            "Discierne entre lo real y lo que imaginas."
        ]
    },
    {
        name: 'Tormenta',
        archetype: 'El Cambiador de Mundos',
        verbs: ['catalizar', 'transformar', 'autogenerar', 'energizar', 'revolucionar'],
        qualities: ['transformador', 'intenso', 'potente', 'catalítico', 'renovador'],
        essence_phrase: 'la autogeneración y la energía',
        advice: [
            "Permite que la tormenta limpie lo viejo.",
            "Transfórmate a ti mismo y el mundo cambiará.",
            "Usa esta energía intensa para renovarte.",
            "No resistas el cambio, úsalo a tu favor.",
            "Eres el generador de tu propia energía."
        ]
    },
    {
        name: 'Sol',
        archetype: 'El Iluminado',
        verbs: ['iluminar', 'dar vida', 'brillar', 'universalizar', 'fuego'],
        qualities: ['radiante', 'vital', 'iluminado', 'cálido', 'completo'],
        essence_phrase: 'el fuego universal y la vida',
        advice: [
            "Tú eres la luz del mundo, no te ocultes.",
            "Irradia amor y calidez a quienes te rodean.",
            "La claridad llega cuando enciendes tu fuego.",
            "Celebra la vida, es un regalo sagrado.",
            "Ilumina tus sombras con compasión."
        ]
    }
];

// THE 13 TONES: Action oriented and Mystical
const SPELLS_TONES = [
    { name: 'Magnético', action_desc: 'unificar el propósito', type: 'Propósito', qualities: ['atrayente', 'uno', 'focalizado'] },
    { name: 'Lunar', action_desc: 'identificar el desafío', type: 'Desafío', qualities: ['dual', 'estable', 'polarizado'] },
    { name: 'Eléctrico', action_desc: 'activar el servicio', type: 'Servicio', qualities: ['vinculante', 'activo', 'fluyente'] },
    { name: 'Autoexistente', action_desc: 'definir la forma', type: 'Forma', qualities: ['medible', 'estructurado', 'concreto'] },
    { name: 'Entonado', action_desc: 'tomar el mando', type: 'Esplendor', qualities: ['empoderado', 'radiante', 'líder'] },
    { name: 'Rítmico', action_desc: 'encontrar el equilibrio', type: 'Igualdad', qualities: ['organizado', 'balanceado', 'orgánico'] },
    { name: 'Resonante', action_desc: 'canalizar la inspiración', type: 'Sintonización', qualities: ['místico', 'resonante', 'canal'] },
    { name: 'Galáctico', action_desc: 'vivir con integridad', type: 'Integridad', qualities: ['armónico', 'coherente', 'modelo'] },
    { name: 'Solar', action_desc: 'realizar la intención', type: 'Intención', qualities: ['pulsante', 'voluntarioso', 'solar'] },
    { name: 'Planetario', action_desc: 'manifestar la perfección', type: 'Manifestación', qualities: ['perfecto', 'productivo', 'material'] },
    { name: 'Espectral', action_desc: 'liberar y soltar', type: 'Liberación', qualities: ['disolvente', 'libre', 'transparente'] },
    { name: 'Cristal', action_desc: 'cooperar y compartir', type: 'Cooperación', qualities: ['cristalino', 'dedicado', 'universal'] },
    { name: 'Cósmico', action_desc: 'trascender y estar presente', type: 'Presencia', qualities: ['cósmico', 'presente', 'mágico'] }
];

// DATA FILE PATH
const DATA_FILE = path.join(__dirname, 'frontend/src/data/dailyData.json');

// --- GENERATOR LOGIC ---

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateShortDesc(seal, tone) {
    const templates = [
        `Hoy el ${tone.name} te invita a ${tone.action_desc} para ${getRandom(seal.verbs)} ${seal.essence_phrase}.`,
        `Despierta a ${seal.archetype} en ti: es momento de ${tone.action_desc} y ${getRandom(seal.verbs)}.`,
        `Tu misión es ${tone.action_desc}: usa la energía ${getRandom(seal.qualities)} para ${getRandom(seal.verbs)}.`,
        `Siente la vibración ${getRandom(tone.qualities)}: hoy permite que tu ser logre ${tone.action_desc} al ${getRandom(seal.verbs)}.`,
        `${seal.archetype} te llama: ${tone.action_desc} es la llave para ${getRandom(seal.verbs)} tu realidad.`,
        `Activa tu lado ${getRandom(seal.qualities)} y atrévete a ${tone.action_desc} con todo tu ${seal.essence_phrase}.`
    ];
    return getRandom(templates);
}

function generateLongDesc(seal, tone) {
    const intro = [
        `El ${seal.name} ${tone.name} ${seal.color} llega con la frecuencia de ${seal.essence_phrase}.`,
        `Hoy la energía de ${seal.archetype} se fusiona con el poder ${tone.name.toLowerCase()}.`,
        `Abrimos un espacio sagrado con el ${seal.name} ${tone.name}, portador de ${seal.essence_phrase}.`
    ];

    const challenge = [
        `El desafío y regalo de hoy es ${tone.action_desc} sin perder tu centro ${getRandom(seal.qualities)}.`,
        `Se te pide ${tone.action_desc}, integrando la cualidad ${getRandom(seal.qualities)} en cada paso.`,
        `Es un día potente para ${tone.action_desc}, dejando que tu lado ${getRandom(seal.qualities)} brille.`
    ];

    const connection = [
        `Permite que ${getRandom(seal.verbs)} sea tu medicina hoy.`,
        `Cuando logras ${getRandom(seal.verbs)}, activas una magia profunda en tu realidad.`,
        `Al ${getRandom(seal.verbs)}, te alineas con el flujo cósmico de ${seal.essence_phrase}.`
    ];

    const cta = [
        `Escucha el consejo de ${seal.archetype}: ${getRandom(seal.advice)}`,
        `Recuerda: ${getRandom(seal.advice)}`,
        `Tu mantra hoy: ${getRandom(seal.advice)}`
    ];

    return `${getRandom(intro)} ${getRandom(challenge)} ${getRandom(connection)} ${getRandom(cta)}`;
}

// Manually curated range to PRESERVE
const PRESERVE_START = 36;
const PRESERVE_END = 60;

function regenerateMagic() {
    console.log("✨ Reading ancient scrolls (dailyData.json)...");
    let dailyData = {};
    if (fs.existsSync(DATA_FILE)) {
        dailyData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }

    let count = 0;

    // Process 1-260
    for (let kin = 1; kin <= 260; kin++) {
        // Skip the manually curated "Golden Era" (36-60)
        if (kin >= PRESERVE_START && kin <= PRESERVE_END) continue;

        const key = kin.toString();
        const toneIdx = (kin - 1) % 13;
        const sealIdx = (kin - 1) % 20;

        const seal = SPELLS_SEALS[sealIdx];
        const tone = SPELLS_TONES[toneIdx];

        // Keep affirmation if valid logic (or regenerate if needed, but keeping affirmation consistent with Dreamspell structure is usually safer, 
        // however user said "evitar textos repetidos". The Affirmation is structurally repetitive by design.
        // Let's keep the Affirmation generated by the previous script (which is structurally correct) 
        // BUT update the Descriptions to be MAGIC.

        // If the entry basically didn't exist or we want to overwrite the "robotic" descriptions:
        // We assume anything outside the preserved range is robotic now.

        const existingData = dailyData[key] || {};

        // Generate NEW MAGIC
        const shortMagic = generateShortDesc(seal, tone);
        const longMagic = generateLongDesc(seal, tone);

        dailyData[key] = {
            ...existingData,
            image_url: `assets/infographies/Kin ${kin}.png`, // Ensure path is correct
            short_description: shortMagic,
            long_description: longMagic
            // Affirmation is kept from previous generation (it was standard Dreamspell, which is correct).
            // Usually the user complains about the Description texts being robotic.
        };
        count++;
    }

    console.log(`✨ Infused Magic into ${count} Kins.`);
    fs.writeFileSync(DATA_FILE, JSON.stringify(dailyData, null, 4));
}

regenerateMagic();
