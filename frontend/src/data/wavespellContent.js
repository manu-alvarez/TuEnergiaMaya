/**
 * wavespellContent.js — Contenido interpretativo para las Ondas Encantadas y Castillos
 * 
 * Cada Onda tiene un propósito, cada posición tonal una función,
 * y cada Castillo una misión mayor.
 * 
 * Tono: místico pero accesible, directo, que llegue.
 */

// 20 Ondas Encantadas — una por cada sello que la lidera
export const WAVE_DESCRIPTIONS = {
  dragon: {
    name: 'Onda Encantada del Dragón Rojo',
    purpose: 'El poder del nacimiento',
    description: 'Esta onda abre el Tzolkin entero. Es el útero cósmico donde todo comienza. Durante estos 13 días, la energía del Dragón te invita a volver al origen, a nutrir lo que amas y a iniciar con la fuerza de quien sabe que cada día es un nuevo nacimiento.',
    invitation: 'Pregúntate: ¿qué quiero traer al mundo en este ciclo?',
  },
  wizard: {
    name: 'Onda Encantada del Mago Blanco',
    purpose: 'El poder de la atemporalidad',
    description: 'La onda del Mago te sumerge en lo atemporal. Aquí la magia no es fantasía: es la capacidad de estar tan presente que el tiempo deja de presionarte. Durante estos 13 días, tu receptividad se amplifica y puedes acceder a conocimientos que normalmente pasan desapercibidos.',
    invitation: '¿Qué sabiduría interior has estado ignorando?',
  },
  hand: {
    name: 'Onda Encantada de la Mano Azul',
    purpose: 'El poder de la realización',
    description: 'La Mano trae el don de crear con tus propias manos. Esta onda es profundamente práctica: lo que tocas, lo transformas. Es tiempo de sanar heridas viejas, de completar lo que dejaste a medias, y de saber que tus manos tienen el poder de cambiar tu realidad.',
    invitation: '¿Qué necesita tu toque sanador hoy?',
  },
  sun: {
    name: 'Onda Encantada del Sol Amarillo',
    purpose: 'El poder del fuego universal',
    description: 'El Sol ilumina sin pedir nada a cambio. Esta onda te conecta con tu luz interior más auténtica. Durante estos 13 días, la vida te pide que brilles, que compartas tu calor y que recuerdes que la iluminación no es un destino lejano: es decidir ser luz aquí y ahora.',
    invitation: '¿Dónde necesitas brillar con más autenticidad?',
  },
  skywalker: {
    name: 'Onda Encantada del Caminante del Cielo Rojo',
    purpose: 'El poder del espacio',
    description: 'El Caminante del Cielo explora lo que hay entre la tierra y las estrellas. Esta onda expande tus horizontes, te invita a explorar territorios desconocidos — tanto físicos como mentales. Es tiempo de atreverte a salir de lo conocido.',
    invitation: '¿Qué frontera estás listo para cruzar?',
  },
  worldbridger: {
    name: 'Onda Encantada del Enlazador de Mundos Blanco',
    purpose: 'El poder de la muerte',
    description: 'No temas al Enlazador: la muerte que trae es la de lo viejo. Esta onda te ayuda a soltar, a cerrar ciclos con gracia y a construir puentes entre lo que fuiste y lo que estás siendo. Cada puerta que cierras abre otra mejor.',
    invitation: '¿Qué necesitas soltar para avanzar?',
  },
  storm: {
    name: 'Onda Encantada de la Tormenta Azul',
    purpose: 'El poder de la auto-generación',
    description: 'La Tormenta no destruye por destruir: purifica. Esta onda trae una energía catalítica intensa que transforma todo lo que toca. Si sientes que algo en tu vida necesita un cambio radical, esta es la onda que te da el impulso para hacerlo.',
    invitation: '¿Qué transformación profunda estás evitando?',
  },
  human: {
    name: 'Onda Encantada del Humano Amarillo',
    purpose: 'El poder de la libre voluntad',
    description: 'El Humano es el único ser del Tzolkin que tiene libre albedrío. Esta onda te recuerda que eres el autor de tu vida. Cada decisión cuenta, cada elección te define. Es tiempo de ejercer tu voluntad con sabiduría y compasión.',
    invitation: '¿Estás eligiendo conscientemente o dejándote llevar?',
  },
  serpent: {
    name: 'Onda Encantada de la Serpiente Roja',
    purpose: 'El poder de la fuerza vital',
    description: 'La Serpiente despierta tu kundalini, esa energía vital que recorre tu cuerpo. Esta onda es visceral, instintiva, poderosa. Te pide que escuches a tu cuerpo, que honres tus instintos y que dejes que la pasión guíe tus pasos.',
    invitation: '¿Qué te pide tu cuerpo que no le estás dando?',
  },
  mirror: {
    name: 'Onda Encantada del Espejo Blanco',
    purpose: 'El poder del sinfín',
    description: 'El Espejo refleja la verdad sin filtros. Esta onda te confronta con lo que eres de verdad — sin máscaras, sin excusas. Puede ser incómoda, pero es profundamente liberadora. Lo que ves en el espejo es exactamente lo que necesitas ver.',
    invitation: '¿Qué verdad sobre ti mismo estás evitando?',
  },
  monkey: {
    name: 'Onda Encantada del Mono Azul',
    purpose: 'El poder de la magia',
    description: 'El Mono trae el juego sagrado. Esta onda te recuerda que la vida no tiene por qué ser tan seria. La creatividad, el humor y la ilusión son herramientas poderosas de transformación. Juega, crea, ríe — ahí está la magia.',
    invitation: '¿Cuándo fue la última vez que jugaste de verdad?',
  },
  seed: {
    name: 'Onda Encantada de la Semilla Amarilla',
    purpose: 'El poder del florecimiento',
    description: 'La Semilla guarda todo el potencial del universo en su interior. Esta onda es para plantar con intención, para enfocarte en lo que quieres que florezca. No fuerces: siembra con fe y deja que la naturaleza haga su trabajo.',
    invitation: '¿Qué semilla necesitas plantar hoy con toda tu intención?',
  },
  earth: {
    name: 'Onda Encantada de la Tierra Roja',
    purpose: 'El poder de la navegación',
    description: 'La Tierra te enseña a leer las señales de la sincronicidad. Esta onda es tu brújula interna. Si prestas atención, la vida te va dejando pistas — en los encuentros casuales, en los números que se repiten, en esa canción que suena justo cuando la necesitas.',
    invitation: '¿Qué señales te está enviando la vida que no estás viendo?',
  },
  dog: {
    name: 'Onda Encantada del Perro Blanco',
    purpose: 'El poder del corazón',
    description: 'El Perro es el amor incondicional hecho energía. Esta onda te pide que abras el corazón sin condiciones, que ames primero y preguntes después. Es tiempo de ser leal — contigo mismo y con los que te rodean.',
    invitation: '¿A quién necesitas amar sin esperar nada a cambio?',
  },
  night: {
    name: 'Onda Encantada de la Noche Azul',
    purpose: 'El poder de la abundancia',
    description: 'La Noche guarda todos los sueños de la creación en su santuario interior. Esta onda te conecta con la abundancia infinita que ya existe dentro de ti. Sueña en grande, visualiza sin límites — tu imaginación es la puerta a tu manifestación.',
    invitation: '¿Qué sueño has dejado de soñar por miedo?',
  },
  warrior: {
    name: 'Onda Encantada del Guerrero Amarillo',
    purpose: 'El poder de la inteligencia',
    description: 'El Guerrero no pelea con espadas: pelea con preguntas. Esta onda te da la valentía de cuestionar lo que siempre diste por hecho. Pregunta sin miedo, investiga con coraje, y descubre que la inteligencia verdadera nace de la curiosidad.',
    invitation: '¿Qué pregunta importante estás evitando hacerte?',
  },
  moon: {
    name: 'Onda Encantada de la Luna Roja',
    purpose: 'El poder del agua universal',
    description: 'La Luna purifica con el agua de las emociones. Esta onda te pide que fluyas, que dejes de resistir y que permitas que tus sentimientos te guíen. No juzgues lo que sientes: siente. En esa honestidad emocional está tu mayor poder.',
    invitation: '¿Qué emoción estás reprimiendo que necesita fluir?',
  },
  wind: {
    name: 'Onda Encantada del Viento Blanco',
    purpose: 'El poder del espíritu',
    description: 'El Viento es el mensajero divino. Esta onda amplifica tu capacidad de comunicar, de inspirar y de ser canal del espíritu. Las palabras tienen poder — elige las tuyas con cuidado, porque durante estos días lo que digas resuena más fuerte.',
    invitation: '¿Qué mensaje necesita escuchar el mundo de ti?',
  },
  eagle: {
    name: 'Onda Encantada del Águila Azul',
    purpose: 'El poder de la visión',
    description: 'El Águila ve desde arriba lo que tú no puedes ver desde el suelo. Esta onda eleva tu perspectiva, te da la visión panorámica de tu vida. Desde las alturas, los problemas se ven más pequeños y las soluciones más claras.',
    invitation: '¿Cómo se vería tu vida si pudieras verla desde arriba?',
  },
  star: {
    name: 'Onda Encantada de la Estrella Amarilla',
    purpose: 'El poder de la elegancia',
    description: 'La Estrella cierra el Tzolkin con belleza. Esta última onda te recuerda que la vida es arte, que cada momento puede ser una obra maestra. La elegancia no es lujo: es hacer las cosas con armonía, con presencia, con amor al detalle.',
    invitation: '¿Dónde puedes añadir más belleza y armonía a tu día?',
  },
};

// 13 posiciones tonales en la onda — cada una con su función
export const TONE_POSITIONS = [
  { position: 1, name: 'Magnético', function: 'Propósito', description: 'Primer día: aquí se define la intención de toda la onda. ¿Qué quieres atraer?' },
  { position: 2, name: 'Lunar', function: 'Desafío', description: 'El reto se presenta. ¿Qué polaridad necesitas equilibrar para avanzar?' },
  { position: 3, name: 'Eléctrico', function: 'Servicio', description: 'Hora de activar. ¿Cómo puedes poner tu energía al servicio de los demás?' },
  { position: 4, name: 'Auto-existente', function: 'Forma', description: 'Dale forma a tu intención. ¿Qué estructura necesitas crear?' },
  { position: 5, name: 'Entonado', function: 'Radiancia', description: 'Empodérate. Es el día para tomar el mando con autoridad natural.' },
  { position: 6, name: 'Rítmico', function: 'Igualdad', description: 'Organiza y equilibra. ¿Qué necesita orden en tu vida para fluir mejor?' },
  { position: 7, name: 'Resonante', function: 'Sintonización', description: 'El corazón de la onda. Día de máxima conexión interior. Escucha tu centro.' },
  { position: 8, name: 'Galáctico', function: 'Integridad', description: '¿Vives lo que predicas? Es día de alinear tus acciones con tus valores.' },
  { position: 9, name: 'Solar', function: 'Intención', description: 'Impulso puro. Muévete con la fuerza del sol hacia lo que deseas.' },
  { position: 10, name: 'Planetario', function: 'Manifestación', description: 'Lo que sembraste comienza a dar frutos. Observa lo que se materializa.' },
  { position: 11, name: 'Espectral', function: 'Liberación', description: 'Suelta lo que sobra. Es día de soltar el control y dejar que fluya.' },
  { position: 12, name: 'Cristal', function: 'Cooperación', description: 'Comparte tu proceso. Es día de comunidad, diálogo y transparencia.' },
  { position: 13, name: 'Cósmico', function: 'Presencia', description: 'Cierre de la onda. Trasciende, celebra lo vivido y prepárate para lo nuevo.' },
];

// 5 Castillos del Tzolkin — cada uno con su corte y misión
export const CASTLE_CONTENT = {
  'Rojo': {
    name: 'Castillo Rojo del Girar',
    subtitle: 'El Castillo del Inicio',
    mission: 'Iniciar el movimiento',
    description: 'El primer castillo enciende la chispa. Aquí todo comienza, todo gira, todo arranca. Es la fuerza primordial que pone en marcha los 260 días del Tzolkin. Si estás en este castillo, la vida te pide acción, movimiento, nacimiento.',
    waves: 'Dragón → Mago → Mano → Sol',
  },
  'Blanco': {
    name: 'Castillo Blanco de la Travesía',
    subtitle: 'El Castillo de la Muerte',
    mission: 'Cruzar y purificar',
    description: 'El segundo castillo es el puente entre mundos. Aquí muere lo viejo para que nazca lo nuevo. No es destrucción: es alquimia. La travesía puede ser intensa, pero al otro lado te espera una versión más auténtica de ti.',
    waves: 'Caminante del Cielo → Enlazador → Tormenta → Humano',
  },
  'Azul': {
    name: 'Castillo Azul del Quemar',
    subtitle: 'El Castillo de la Magia',
    mission: 'Transformar la estrella',
    description: 'El tercer castillo quema la ilusión para revelar la verdad. Aquí la magia se vuelve real y lo imposible se vuelve posible. Es el fuego azul de la transformación interior.',
    waves: 'Serpiente → Espejo → Mono → Semilla',
  },
  'Amarillo': {
    name: 'Castillo Amarillo del Dar',
    subtitle: 'El Castillo de la Inteligencia',
    mission: 'Dar y madurar',
    description: 'El cuarto castillo es la cosecha. Todo lo aprendido se transforma en sabiduría compartida. Aquí el conocimiento fluye hacia afuera: es tiempo de dar, de enseñar, de brillar con lo que sabes.',
    waves: 'Tierra → Perro → Noche → Guerrero',
  },
  'Verde': {
    name: 'Castillo Verde del Encantar',
    subtitle: 'El Castillo de la Sincronización',
    mission: 'Sincronizar el humano',
    description: 'El castillo central y final. Es la matriz donde todo se sincroniza y se prepara para un nuevo comienzo. Aquí la magia y la realidad se funden. Es el cierre que abre.',
    waves: 'Luna → Viento → Águila → Estrella',
  },
};

export default { WAVE_DESCRIPTIONS, TONE_POSITIONS, CASTLE_CONTENT };
