const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'frontend/src/data/dailyData.json');

const premiumTexts = {
    "181": {
        short_description: "Coopera con la creatividad: hoy la magia del mono busca universalizarse a través del juego colectivo.",
        long_description: "El Mono Cristal Azul convoca a la cooperación desde la perspectiva del niño cósmico. El Tono Cristal (12) nos recuerda que la magia individual se potencia cuando jugamos juntos. ¿Qué travesura constructiva puedes compartir hoy con tu comunidad? Dedica tu creatividad al servicio de la alegría colectiva. Cuando nos permitimos jugar en grupo, las soluciones surgen espontáneamente. Tu humor hoy es el permiso que otros necesitan para soltar sus cargas."
    },
    "182": {
        short_description: "Trasciende a través de la sabiduría: hoy el humano cósmico te eleva hacia la comprensión del libre albedrío infinito.",
        long_description: "El Humano Cósmico Amarillo cierra el ciclo de la elección con una invitación a la libertad trascendente. El Tono Cósmico (13) te eleva más allá de las decisiones cotidianas hacia la comprensión de que eres eternamente libre. ¿Puedes sentir que cada elección que haces resuena en el infinito? Trasciende la duda paralizante y reconoce que tu sabiduría es un regalo del cosmos. Cuando eliges con presencia, no hay errores; solo aprendizajes."
    },
    "183": {
        short_description: "Inicia la exploración magnética: hoy atraer la aventura requiere abrir tu espacio a lo desconocido.",
        long_description: "El Caminante del Cielo Magnético Rojo abre una nueva Onda Encantada con la misión de unificar la vigilancia y la exploración. El Tono Magnético (1) te atrae hacia el propósito de expandir tus horizontes. ¿Qué territorios inexplorados te llaman? Hoy unifica tu intención con el espíritu del explorador. La aventura no es solo física; puede ser mental, espiritual, emocional. Atrae el coraje de ir más allá de lo conocido."
    },
    "184": {
        short_description: "Identifica el desafío de la magia: hoy encantar requiere equilibrar la receptividad con la acción.",
        long_description: "El Mago Lunar Blanco presenta el desafío de la atemporalidad frente a la urgencia del mundo. El Tono Lunar (2) nos muestra los polos de nuestra práctica espiritual. ¿Escapas al 'ahora' para evitar la realidad o estás tan ocupado que nunca te detienes? Estabiliza tu presencia. Identifica qué necesita más pausa contemplativa y qué requiere más acción. El mago verdadero vive en el mundo mientras habita la eternidad."
    },
    "185": {
        short_description: "Activa la visión del servicio: hoy tu mente elevada se vuelve eléctrica cuando crea para el bien común.",
        long_description: "El Águila Eléctrica Azul activa la frecuencia de la perspectiva superior como un acto de servicio. El Tono Eléctrico (3) vincula tu capacidad de ver más allá con la necesidad de orientación en tu entorno. ¿Cómo puedes usar tu visión para ayudar a otros a encontrar su camino hoy? No guardes tu claridad; compártela. Al activar tu mente creadora en servicio, te conviertes en el faro que guía a quienes buscan dirección."
    },
    "186": {
        short_description: "Define la forma de tu valentía: hoy la intrepidez necesita estructura para ser efectiva.",
        long_description: "El Guerrero Autoexistente Amarillo nos pide dar forma concreta a nuestro coraje. El Tono Autoexistente (4) provee la arquitectura necesaria para que la valentía no sea impulso ciego, sino estrategia inteligente. ¿Cómo estructuras tus batallas hoy? Define cuáles valen la pena, mide tus recursos, planifica tu avance. La intrepidez que perdura es aquella que tiene un plan y la flexibilidad de adaptarlo. El guerrero sabio no improvisa; prepara."
    },
    "187": {
        short_description: "Comanda tu evolución: hoy el esplendor de la Tierra te da el poder de navegar tu propio destino.",
        long_description: "La Tierra Entonada Roja te confiere el poder de liderar tu proceso evolutivo. El Tono Entonado (5) te empodera para tomar el mando de tu sincronía personal. ¿Qué señales has estado ignorando? Tu capacidad de navegar la vida te convierte en el capitán de tu propio barco. El esplendor de la evolución brilla cuando te niegas a ser pasajero de tu existencia. Hoy comandas tu rumbo con la autoridad de quien confía en las estrellas."
    },
    "188": {
        short_description: "Organiza la claridad rítmica: hoy el equilibrio se encuentra en reflejar la verdad sin destruir.",
        long_description: "El Espejo Rítmico Blanco te invita a encontrar el paso perfecto entre la honestidad y la compasión. El Tono Rítmico (6) organiza el flujo de tu verdad para que ni la rigidez moral ni la ambigüedad dominen. ¿Cómo equilibras tu transparencia con tu tacto hoy? Ni mentiras piadosas ni verdades crueles. Encuentra el ritmo de una honestidad que sane en lugar de herir. El orden verdadero es amoroso."
    },
    "189": {
        short_description: "Sintoniza la transformación divina: hoy eres el canal donde el caos creativo se encuentra con la inspiración cósmica.",
        long_description: "La Tormenta Resonante Azul sintoniza tu capacidad de cambiar con la fuente de toda renovación. El Tono Resonante (7) te pide ser un canal limpio para la energía transformadora del universo. ¿Estás resistiendo un cambio que necesita ocurrir? Sintoniza hoy con la incomodidad; ahí está la puerta. Cuando te conviertes en canal de la tormenta, el caos deja de asustarte porque reconoces que es el preludio de tu renacimiento."
    },
    "190": {
        short_description: "Armoniza tu brillo con integridad: hoy la iluminación requiere coherencia para no cegar sino guiar.",
        long_description: "El Sol Galáctico Amarillo nos invita a modelar la armonía entre nuestra luz y nuestra humildad. El Tono Galáctico (8) pregunta: ¿Brillas para servir o para deslumbrar? Hoy integra tu fuego interior con la consciencia de que otros también tienen luz propia. La iluminación verdadera no compite; complementa. Armoniza tu entusiasmo con el respeto por el ritmo ajeno y observa cómo tu calor se vuelve bienvenido en lugar de invasivo."
    },
    "191": {
        short_description: "Realiza la nutrición con intención: hoy tu cuidado tiene el poder de producir nacimientos tangibles.",
        long_description: "El Dragón Solar Rojo pulsa con la intención de realizar el nacimiento de lo nuevo. El Tono Solar (9) enfoca tu voluntad en el acto de nutrir con propósito. No cuides por inercia; hoy cada gesto de protección debe tener dirección. ¿Qué proyecto, relación o cualidad necesita tu atención enfocada? Dirige tu energía maternal o paternal hacia la creación consciente. Tu intención amorosa es la fuerza que da vida a lo que amas."
    },
    "192": {
        short_description: "Manifiesta la verdad hablada: hoy tu comunicación busca formas concretas para dar espíritu al mundo.",
        long_description: "El Viento Planetario Blanco llega para producir la manifestación de la palabra con poder. El Tono Planetario (10) te pide resultados visibles de tu capacidad comunicativa. ¿En qué has inspirado hoy con tu voz? No basta con pensar verdades; hay que pronunciarlas. Tu aliento divino tiene peso cuando se traduce en conversaciones que transforman. Hoy perfecciona tu habilidad de hablar con la precisión de quien sabe que las palabras crean mundos."
    },
    "193": {
        short_description: "Libera los sueños reprimidos: hoy la noche interior disuelve todo lo que bloquea tu abundancia natural.",
        long_description: "La Noche Espectral Azul nos trae la medicina de la liberación del misterio contenido. El Tono Espectral (11) te invita a soltar los miedos que te impiden soñar en grande. ¿Qué abundancia has estado negándote por creerla imposible? Hoy libérala de su prisión. Al disolver los límites autoimpuestos a tu imaginación, recuperas el derecho a visualizar una vida extraordinaria. Tu intuición es infinita; déjala expandirse."
    },
    "194": {
        short_description: "Coopera con el florecimiento: hoy la semilla interior busca universalizarse a través del crecimiento compartido.",
        long_description: "La Semilla Cristal Amarilla convoca a la cooperación desde la perspectiva del potencial colectivo. El Tono Cristal (12) nos recuerda que el florecimiento individual se potencia cuando crecemos juntos. ¿Qué talento puedes compartir hoy para ayudar a otros a florecer? Dedica tu evolución al servicio del jardín comunitario. Cuando sembramos juntos, la cosecha beneficia a todos. Tu crecimiento hoy es el abono del éxito ajeno."
    },
    "195": {
        short_description: "Trasciende a través de la vitalidad: hoy la serpiente cósmica te eleva hacia la presencia del instinto divino.",
        long_description: "La Serpiente Cósmica Roja cierra el ciclo de la fuerza vital con una invitación a la trascendencia corporal. El Tono Cósmico (13) te eleva más allá de la supervivencia hacia la comprensión de que tu cuerpo es un templo sagrado. ¿Puedes sentir la divinidad en cada latido de tu corazón? Trasciende la idea de que lo físico es inferior a lo espiritual. Cuando honras tu instinto como voz del cosmos, tu pasión se convierte en oración."
    },
    "196": {
        short_description: "Inicia el puente magnético: hoy atraer la oportunidad requiere estar dispuesto a soltar el pasado.",
        long_description: "El Enlazador de Mundos Magnético Blanco abre una nueva Onda Encantada con la misión de unificar la muerte y el renacimiento. El Tono Magnético (1) te atrae hacia el propósito de cerrar para abrir. ¿Qué final te resistías a iniciar? Hoy unifica tu intención con la energía del puente. Cada cosa que sueltas crea espacio para algo nuevo. Atrae la fuerza necesaria para cruzar hacia tu próximo capítulo con gracia y gratitud."
    },
    "197": {
        short_description: "Identifica el desafío de sanar: hoy la curación requiere equilibrar el conocimiento con la humildad.",
        long_description: "La Mano Lunar Azul presenta el desafío de la realización frente a la impotencia. El Tono Lunar (2) nos muestra los polos de nuestra capacidad sanadora. ¿Crees que puedes curarlo todo o te sientes incapaz de ayudar? Estabiliza tu perspectiva. Identifica qué está en tus manos reparar y qué necesita tiempo o la ayuda de otros. El sanador verdadero conoce sus límites y trabaja dentro de ellos con sabiduría y paciencia."
    },
    "198": {
        short_description: "Activa el arte del servicio: hoy tu belleza se vuelve eléctrica cuando embelleces para inspirar.",
        long_description: "La Estrella Eléctrica Amarilla activa la frecuencia de la elegancia como un acto de servicio estético. El Tono Eléctrico (3) vincula tu capacidad de armonizar con la necesidad de belleza en tu entorno. ¿Cómo puedes usar tu arte para elevar el día de alguien? No guardes tu talento; compártelo. Al activar tu expresión artística en servicio, te conviertes en el artista que embellece la realidad colectiva. Tu gracia es regalo."
    },
    "199": {
        short_description: "Define la forma del flujo emocional: hoy tu sensibilidad necesita estructura para no desbordarte.",
        long_description: "La Luna Autoexistente Roja nos pide dar forma concreta a nuestra vida emocional. El Tono Autoexistente (4) provee la arquitectura necesaria para que tus sentimientos no te abrumen, sino que te nutran. ¿Cómo estructuras tu autocuidado emocional hoy? Define rituales de purificación, crea espacios seguros para sentir, mide qué te agota y qué te recarga. La sensibilidad que perdura es aquella que tiene un cauce claro por donde fluir."
    },
    "200": {
        short_description: "Comanda tu lealtad: hoy el esplendor del amor te da el poder de liderar tus vínculos con el corazón.",
        long_description: "El Perro Entonado Blanco te confiere el poder de liderar desde el amor incondicional pero firme. El Tono Entonado (5) te empodera para tomar el mando de tus relaciones. ¿Qué vínculos necesitan tu liderazgo afectivo hoy? Tu capacidad de amar te convierte en el guardián que protege sin asfixiar. El esplendor de la lealtad brilla cuando te niegas a traicionar tu propio corazón mientras honras el de los demás. Hoy comandas con ternura y límites claros."
    },
    "201": {
        short_description: "Organiza la magia rítmica: hoy el equilibrio se encuentra en jugar con estructura sin perder la espontaneidad.",
        long_description: "El Mono Rítmico Azul te invita a encontrar el paso perfecto entre la disciplina y la improvisación creativa. El Tono Rítmico (6) organiza el flujo de tu creatividad para que ni la rigidez mate la magia ni el caos la disperse. ¿Cómo equilibras tu trabajo serio con tu necesidad de jugar hoy? Ni productividad obsesiva ni escapismo total. Encuentra el ritmo de una creatividad sostenible que te nutra mientras produce."
    },
    "202": {
        short_description: "Sintoniza la sabiduría cósmica: hoy eres el canal donde el libre albedrío se encuentra con la inspiración universal.",
        long_description: "El Humano Resonante Amarillo sintoniza tu capacidad de elegir con la fuente de toda sabiduría. El Tono Resonante (7) te pide ser un canal limpio para la inteligencia del cosmos. ¿Estás decidiendo desde tu ego o desde tu ser más elevado? Sintoniza hoy con la voz interior que conoce el camino. Cuando te conviertes en canal de la sabiduría universal, tus elecciones benefician no solo a ti sino a la red de vida que te rodea."
    },
    "203": {
        short_description: "Armoniza tu exploración con integridad: hoy la aventura requiere coherencia para no perderte en el camino.",
        long_description: "El Caminante del Cielo Galáctico Rojo nos invita a modelar la armonía entre nuestra sed de experiencias y nuestro centro personal. El Tono Galáctico (8) pregunta: ¿Exploras para crecer o para huir? Hoy integra tu espíritu aventurero con la responsabilidad de no abandonar lo que importa. El viajero verdadero lleva su hogar interior a donde quiera que vaya. Armoniza la expansión con el arraigo y cada paso será un regreso a ti mismo."
    },
    "204": {
        short_description: "Realiza el encantamiento con intención: hoy tu presencia mágica tiene el poder de transformar lo ordinario.",
        long_description: "El Mago Solar Blanco pulsa con la intención de realizar la atemporalidad activa. El Tono Solar (9) enfoca tu voluntad en el acto de encantar con propósito. No te quedes solo en la contemplación mística; hoy cada momento presente debe brillar con magia consciente. ¿Qué aspecto de tu vida pide ser encantado? Dirige tu receptividad hacia la creación. Tu intención espiritual es el hechizo que transforma la rutina en ritual sagrado."
    },
    "205": {
        short_description: "Manifiesta la visión tangible: hoy tu creatividad mental busca formas concretas para ver más allá.",
        long_description: "El Águila Planetaria Azul llega para producir la manifestación de la perspectiva superior. El Tono Planetario (10) te pide resultados visibles de tu claridad mental. ¿En qué has creado hoy desde tu visión más alta? No basta con soñar panoramas; hay que dibujarlos. Tu mente tiene peso cuando se traduce en proyectos que materializan tu visión. Hoy perfecciona tu habilidad de traer las ideas del cielo al suelo."
    },
    "206": {
        short_description: "Libera el miedo al conflicto: hoy el guerrero interior disuelve todo lo que te impide cuestionar.",
        long_description: "El Guerrero Espectral Amarillo nos trae la medicina de la liberación del miedo a preguntar. El Tono Espectral (11) te invita a soltar la necesidad de agradar que te silencia. ¿Qué verdad incómoda has evitado enfrentar? Hoy libérala. Al disolver la cobardía que disfrazas de prudencia, recuperas tu poder de cuestionar lo que merece ser cuestionado. La inteligencia sin coraje es solo información; con coraje, se convierte en sabiduría."
    },
    "207": {
        short_description: "Coopera con la evolución: hoy la navegación terrestre busca universalizarse a través de la sincronía compartida.",
        long_description: "La Tierra Cristal Roja convoca a la cooperación desde la perspectiva de la evolución planetaria. El Tono Cristal (12) nos recuerda que la sincronía individual se potencia cuando navegamos juntos. ¿Qué señales puedes compartir hoy para ayudar a otros a encontrar su rumbo? Dedica tu evolución al servicio del viaje colectivo. Cuando leemos las señales en grupo, el mapa se vuelve más claro para todos. Tu navegación es brújula compartida."
    },
    "208": {
        short_description: "Trasciende a través del orden: hoy el espejo cósmico te eleva hacia la comprensión de la verdad infinita.",
        long_description: "El Espejo Cósmico Blanco cierra el ciclo de la claridad con una invitación a la transparencia absoluta. El Tono Cósmico (13) te eleva más allá de los reflejos parciales hacia la comprensión de que eres uno con el todo. ¿Puedes ver tu rostro en cada persona que encuentras? Trasciende el juicio y reconoce que la realidad entera es un espejo de tu consciencia. Cuando aceptas esta verdad, la paz se vuelve tu estado natural."
    },
    "209": {
        short_description: "Inicia tu autogeneración magnética: hoy atraer el cambio requiere que seas el rayo de tu propia tormenta.",
        long_description: "La Tormenta Magnética Azul abre una nueva Onda Encantada con la misión de unificar la catalización y la energía. El Tono Magnético (1) te atrae hacia el propósito de reinventarte por completo. ¿Qué versión de ti mismo está lista para nacer? Hoy unifica tu intención con la fuerza del trueno. No esperes que la vida te cambie; inicia tú la catarsis. Atrae los recursos, las personas y las circunstancias que apoyen tu metamorfosis."
    },
    "210": {
        short_description: "Identifica el desafío de brillar: hoy la iluminación requiere equilibrar el fuego con la humildad.",
        long_description: "El Sol Lunar Amarillo presenta el desafío de la luz frente a la sombra del ego. El Tono Lunar (2) nos muestra los polos de nuestra capacidad de irradiar. ¿Brillas para atraer la atención o para dar calor genuino? Estabiliza tu fuego. Identifica dónde tu luz podría estar encandilando en lugar de iluminar y dónde podrías estar ocultándola por falsa modestia. El sol verdadero no compite con las estrellas; simplemente brilla."
    },
    "211": {
        short_description: "Activa el nacimiento del servicio: hoy tu cuidado se vuelve eléctrico cuando nutres para liberar.",
        long_description: "El Dragón Eléctrico Rojo activa la frecuencia del origen como un acto de servicio primordial. El Tono Eléctrico (3) vincula tu capacidad de nutrir con la necesidad de nuevos comienzos en tu entorno. ¿Cómo puedes usar tu energía maternal o paternal para ayudar a nacer algo hoy? No protejas para atrapar; cuida para liberar. Al activar tu presencia nutritiva en servicio, te conviertes en la partera de los sueños ajenos."
    },
    "212": {
        short_description: "Define la forma del espíritu: hoy tu comunicación necesita estructura para transformar el aire en palabra.",
        long_description: "El Viento Autoexistente Blanco nos pide dar forma concreta a nuestro mensaje espiritual. El Tono Autoexistente (4) provee la arquitectura necesaria para que tu verdad no se disperse en el viento, sino que llegue a donde debe llegar. ¿Cómo estructuras tu expresión hoy? Define qué quieres comunicar, a quién y por qué. El aliento que perdura es aquel que tiene dirección y propósito. Habla con la precisión de quien sabe el peso de cada sílaba."
    },
    "213": {
        short_description: "Comanda tu intuición: hoy el esplendor de la noche te da el poder de soñar tu realidad.",
        long_description: "La Noche Entonada Azul te confiere el poder de liderar desde la profundidad de tu mundo interior. El Tono Entonado (5) te empodera para tomar el mando de tu vida onírica y tu abundancia. ¿Qué sueño necesita tu liderazgo hoy? Tu capacidad de visualizar te convierte en el arquitecto de futuros posibles. El esplendor del misterio brilla cuando te niegas a aceptar la escasez como destino. Hoy comandas tu prosperidad interior."
    },
    "214": {
        short_description: "Organiza el florecimiento rítmico: hoy el equilibrio se encuentra en crecer sin forzar el tiempo de la semilla.",
        long_description: "La Semilla Rítmica Amarilla te invita a encontrar el paso perfecto entre la intención y la paciencia. El Tono Rítmico (6) organiza el flujo de tu crecimiento para que ni la ansiedad lo acelere ni la pereza lo detenga. ¿Cómo equilibras tu deseo de florecer con el respeto por los ciclos naturales hoy? Ni impaciencia destructiva ni estancamiento pasivo. Encuentra el ritmo de una evolución que honre tu temporada."
    },
    "215": {
        short_description: "Sintoniza la pasión divina: hoy eres el canal donde la fuerza vital se encuentra con la inspiración cósmica.",
        long_description: "La Serpiente Resonante Roja sintoniza tu instinto con la fuente de toda energía. El Tono Resonante (7) te pide ser un canal limpio para la vitalidad del universo. ¿Estás reprimiendo tu pasión o dejándola fluir libremente? Sintoniza hoy con el pulso de la vida en tus venas. Cuando te conviertes en canal de la fuerza vital, la fatiga desaparece y eres pura energía en movimiento. Tu cuerpo es el instrumento del cosmos; déjalo sonar."
    },
    "216": {
        short_description: "Armoniza tus cierres con integridad: hoy la transición requiere coherencia para no destruir sino transformar.",
        long_description: "El Enlazador de Mundos Galáctico Blanco nos invita a modelar la armonía en nuestros procesos de finalización. El Tono Galáctico (8) pregunta: ¿Cierras ciclos con la misma gracia con que los inicias? Hoy integra tus despedidas con la consciencia de honrar lo que fue. El puente verdadero no destruye las orillas; las conecta. Armoniza tu desapego con la gratitud y cada final se convertirá en un nuevo comienzo bendecido."
    },
    "217": {
        short_description: "Realiza la curación con intención: hoy tus manos tienen el poder de producir sanación tangible.",
        long_description: "La Mano Solar Azul pulsa con la intención de realizar la obra sanadora completa. El Tono Solar (9) enfoca tu voluntad en el acto de conocer para curar. No postergues el trabajo de sanación; hoy cada gesto debe tener propósito reparador. ¿Qué necesita ser completado o sanado en tu vida? Dirige tus habilidades hacia la realización del bienestar. Tu intención es la medicina y tus manos son el instrumento del cosmos sanador."
    },
    "218": {
        short_description: "Manifiesta la belleza perfecta: hoy tu elegancia busca formas concretas para armonizar lo visible.",
        long_description: "La Estrella Planetaria Amarilla llega para producir la manifestación del arte consumado. El Tono Planetario (10) te pide resultados estéticos visibles. ¿En qué has creado belleza hoy? No basta con apreciar la armonía; hay que producirla. Tu gracia tiene peso cuando se traduce en espacios más bellos, relaciones más elegantes, creaciones más refinadas. Hoy perfecciona tu habilidad de embellecer cada rincón de tu realidad."
    },
    "219": {
        short_description: "Libera las emociones estancadas: hoy la luna interior disuelve todo lo que bloquea tu flujo natural.",
        long_description: "La Luna Espectral Roja nos trae la medicina de la liberación emocional profunda. El Tono Espectral (11) te invita a soltar los sentimientos que has retenido por miedo o vergüenza. ¿Qué lágrimas has guardado demasiado tiempo? Hoy déjalas fluir. Al disolver los diques emocionales, recuperas tu capacidad de sentir plenamente sin ahogarte. El agua que fluye no se estanca; purifica. Tu sensibilidad liberada es un río de vida."
    },
    "220": {
        short_description: "Coopera con el amor: hoy la lealtad del perro busca universalizarse a través de la ternura compartida.",
        long_description: "El Perro Cristal Blanco convoca a la cooperación desde la perspectiva del corazón unificado. El Tono Cristal (12) nos recuerda que el amor individual se potencia cuando amamos juntos. ¿Qué ternura puedes compartir hoy para crear comunidad afectiva? Dedica tu lealtad al servicio del bienestar colectivo. Cuando compartimos nuestro amor sin reservas, creamos redes de apoyo que sostienen a todos. Tu corazón hoy late al ritmo de la familia humana."
    }
};

// Read current data
const currentData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

// Update with premium texts
Object.keys(premiumTexts).forEach(kinNum => {
    if (currentData[kinNum]) {
        currentData[kinNum].short_description = premiumTexts[kinNum].short_description;
        currentData[kinNum].long_description = premiumTexts[kinNum].long_description;
    }
});

// Save
fs.writeFileSync(DATA_FILE, JSON.stringify(currentData, null, 4));
console.log("✨ Premium texts updated for Kines 181-220!");
