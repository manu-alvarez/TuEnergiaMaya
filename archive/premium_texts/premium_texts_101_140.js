const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'frontend/src/data/dailyData.json');

const premiumTexts = {
    "101": {
        short_description: "Manifiesta el cuidado planetario: hoy tus actos de nutrición tienen el poder de producir bienestar tangible.",
        long_description: "El Dragón Planetario Rojo llega para producir la manifestación del cuidado primordial. El Tono Planetario (10) te pide resultados concretos en tu labor de nutrir. ¿Cómo puedes demostrar tu amor a través de acciones tangibles hoy? No basta con sentir ternura; hay que cocinar, abrazar, proteger. Tu capacidad de dar vida se mide por lo que produces para los demás. Hoy tu presencia maternal o paternal es el regalo más valioso que puedes ofrecer al mundo."
    },
    "102": {
        short_description: "Libera la palabra contenida: hoy el espíritu del viento disuelve todo lo que frena tu expresión auténtica.",
        long_description: "El Viento Espectral Blanco nos trae la medicina de la liberación a través de la comunicación genuina. El Tono Espectral (11) te invita a soltar los discursos ensayados y los silencios incómodos. ¿Qué verdad llevas callando demasiado tiempo? Hoy libérala con amor pero sin miedo. Al disolver los bloqueos de tu garganta, recuperas el aliento divino que es tu derecho de nacimiento. No te censures; el aire necesita ser movido para que las ideas fluyan."
    },
    "103": {
        short_description: "Coopera con tus sueños: hoy la abundancia interior busca universalizarse en la red de la consciencia colectiva.",
        long_description: "La Noche Cristal Azul convoca a la cooperación desde la profundidad del misterio interior. El Tono Cristal (12) nos recuerda que los sueños individuales se potencian cuando se tejen juntos. ¿Qué visión puedes compartir hoy con tu comunidad? Dedica tu intuición al servicio de un propósito mayor. La abundancia real no se guarda; circula. Cuando sueñas en compañía, creas realidades que benefician a todos. Hoy tu misterio personal es una pieza del rompecabezas colectivo."
    },
    "104": {
        short_description: "Trasciende a través del florecimiento: hoy tu potencial se eleva para tocar las alturas del infinito.",
        long_description: "La Semilla Cósmica Amarilla cierra el ciclo del florecimiento con una invitación a la trascendencia absoluta. El Tono Cósmico (13) te eleva más allá de las limitaciones de tu semilla original hacia la plena expresión de tu ser. ¿Qué fruto estás listo para entregar al mundo? Hoy culminas un proceso de crecimiento. Lo que sembraste está maduro; recógelo con gratitud y prepárate para un nuevo ciclo de siembra. Eres la flor y también la semilla del mañana."
    },
    "105": {
        short_description: "Inicia el poder de la vitalidad: hoy atraer la fuerza vital requiere reconectarte con el fuego de tu pasión original.",
        long_description: "La Serpiente Magnética Roja abre una nueva Onda Encantada con la misión de unificar el instinto y la pasión. El Tono Magnético (1) te atrae hacia el propósito de despertar tu Kundalini interior. ¿Dónde has dormido tu fuego? Hoy activa tu cuerpo, siente el pulso de la sangre, mueve la energía estancada. No tengas miedo de desear con intensidad. La fuerza vital no es peligrosa cuando está alineada con un propósito consciente. Eres pura vida buscando expresarse."
    },
    "106": {
        short_description: "Identifica el desafío de soltar: hoy cruzar el puente requiere equilibrar el apego con la liberación.",
        long_description: "El Enlazador de Mundos Lunar Blanco presenta el desafío del desapego frente al miedo a la pérdida. El Tono Lunar (2) nos muestra los polos de nuestra relación con los finales. ¿Qué te cuesta soltar? Estabiliza tu perspectiva sobre la muerte simbólica. No todo lo que termina te destruye; la mayoría de las veces te libera. Identifica qué ciclo necesita cerrarse hoy y encuentra el equilibrio entre honrar lo que fue y abrazar lo que vendrá."
    },
    "107": {
        short_description: "Activa el servicio de tus manos: hoy la sanación se vuelve eléctrica cuando tocas el mundo con propósito.",
        long_description: "La Mano Eléctrica Azul activa la frecuencia de la curación como un acto de servicio poderoso. El Tono Eléctrico (3) vincula tu capacidad de sanar con la necesidad urgente del entorno. ¿Cómo puedes usar tus habilidades prácticas para ayudar hoy? No postergues esa reparación, esa llamada, esa acción concreta. Al activar tus manos en servicio, te conviertes en el conducto de una energía mayor. Hoy cada toque consciente es medicina para alguien."
    },
    "108": {
        short_description: "Define la forma de tu elegancia: hoy tu arte necesita estructura para brillar con todo su esplendor.",
        long_description: "La Estrella Autoexistente Amarilla nos pide dar forma concreta a nuestra expresión artística. El Tono Autoexistente (4) provee la arquitectura necesaria para que tu belleza no sea solo un destello, sino una obra duradera. ¿Qué creación quieres consolidar hoy? Define los parámetros de tu elegancia, ordena tu espacio creativo y mide el impacto de tu armonía. La belleza que perdura es aquella que tiene una estructura sólida debajo de su gracia aparente."
    },
    "109": {
        short_description: "Comanda tus emociones: hoy el esplendor de tu sensibilidad te da el poder de purificar tu realidad.",
        long_description: "La Luna Entonada Roja te confiere el poder de liderar desde la profundidad de tu mundo emocional. El Tono Entonado (5) te empodera para tomar el mando de tus sentimientos en lugar de ser su víctima. ¿Qué emoción necesita tu liderazgo hoy? Fluir no significa ahogarse; significa navegar con maestría. Tu sensibilidad es un superpoder cuando la diriges con intención. Hoy eres el capitán de tus aguas internas, guiando el flujo hacia la purificación y la paz."
    },
    "110": {
        short_description: "Organiza el amor rítmico: hoy el equilibrio se encuentra en estructurar la lealtad sin perder la ternura.",
        long_description: "El Perro Rítmico Blanco te invita a encontrar el paso perfecto entre dar y recibir amor. El Tono Rítmico (6) organiza el flujo de tus afectos para que no te desgastes ni te cierres. ¿Estás amando en equilibrio hoy? Ni dependencia excesiva ni frialdad distante. Encuentra el ritmo de una lealtad sana que cuida al otro sin olvidarse de ti mismo. Al organizar tus vínculos con sabiduría, creas relaciones que nutren en lugar de drenar."
    },
    "111": {
        short_description: "Sintoniza la magia del presente: hoy eres el canal donde el juego cósmico se encuentra con la inspiración pura.",
        long_description: "El Mono Resonante Azul sintoniza tu creatividad con la fuente de toda ilusión sagrada. El Tono Resonante (7) te pide ser un canal limpio para la magia del universo. ¿Te has permitido jugar hoy? No se trata de ser infantil, sino de recuperar la capacidad de asombro. Sintoniza con la frecuencia lúdica del cosmos y permite que la inspiración atraviese tu seriedad. Cuando te conviertes en canal del juego divino, el estrés se disuelve y la vida se vuelve una danza alegre."
    },
    "112": {
        short_description: "Armoniza tu libre albedrío: hoy la sabiduría humana requiere integridad para influenciar con amor.",
        long_description: "El Humano Galáctico Amarillo nos invita a modelar la armonía entre nuestra libertad personal y nuestra responsabilidad colectiva. El Tono Galáctico (8) pregunta: ¿Usas tu libertad con integridad? Hoy integra tus decisiones con la consciencia de su impacto en los demás. No se trata de perder autonomía, sino de elegir desde un lugar de amor y no de ego. Cuando armonizas tu voluntad con la del bien común, te conviertes en un líder que influencia positivamente sin imponer."
    },
    "113": {
        short_description: "Realiza la exploración con intención: hoy tu vuelo interno tiene el poder de materializar nuevos horizontes.",
        long_description: "El Caminante del Cielo Solar Rojo pulsa con la intención de realizar la expansión de tu consciencia. El Tono Solar (9) enfoca tu voluntad en el acto de explorar con propósito. No deambules sin rumbo; hoy cada paso que des hacia lo desconocido debe tener una intención clara. ¿Qué territorio interno o externo quieres conquistar? Realiza tu viaje con la certeza de que el espacio infinito te espera con lecciones y regalos. Tu presencia de explorador abre puertas."
    },
    "114": {
        short_description: "Manifiesta el encanto atemporal: hoy tu magia interior busca formas concretas para hechizar la realidad.",
        long_description: "El Mago Planetario Blanco llega para producir la manifestación del encantamiento consciente. El Tono Planetario (10) te pide resultados tangibles de tu presencia mágica. ¿En qué has encantado hoy? No basta con ser receptivo; hay que producir momentos que dejen huella. Crea rituales, embellece instantes, toca la vida de otros con tu presencia atemporal. Tu magia tiene peso hoy; debe verse y sentirse en cada interacción que tengas."
    },
    "115": {
        short_description: "Libera la visión limitada: hoy la mente del águila disuelve los techos que aprisionan tu perspectiva.",
        long_description: "El Águila Espectral Azul nos trae la medicina de la liberación mental. El Tono Espectral (11) te invita a soltar las creencias que limitan tu vuelo. ¿Qué pensamientos te mantienen en el suelo? Hoy disuelve las barreras autoimpuestas y permite que tu mente se eleve hacia horizontes sin límites. Al liberar los patrones mentales obsoletos, recuperas la claridad del águila que ve tanto el detalle como el panorama completo. Tu visión es infinita; recuérdalo."
    },
    "116": {
        short_description: "Coopera con la valentía: hoy la inteligencia guerrera busca universalizarse a través del cuestionamiento colectivo.",
        long_description: "El Guerrero Cristal Amarillo convoca a la cooperación desde la intrepidez compartida. El Tono Cristal (12) nos recuerda que las preguntas más poderosas nacen de la mente colectiva. ¿Qué verdad incómoda necesita ser cuestionada en grupo hoy? Dedica tu valentía a causas que beneficien a todos. Cuando cuestionamos juntos con inteligencia, derribamos estructuras de ignorancia que ninguno podría vencer solo. Tu coraje hoy inspira a otros a ser valientes."
    },
    "117": {
        short_description: "Trasciende a través de la sincronía: hoy la navegación terrestre te eleva hacia la comprensión del orden universal.",
        long_description: "La Tierra Cósmica Roja cierra el ciclo de la evolución con una invitación a la presencia sincrónica total. El Tono Cósmico (13) te eleva más allá de las señales individuales hacia la comprensión del tejido cósmico que une todo. ¿Puedes ver cómo cada evento de hoy es parte de un plan mayor? Trasciende la necesidad de controlar el rumbo y confía en que la Tierra misma te guía. La sincronicidad es el lenguaje del universo confirmándote que nunca estás solo en tu viaje."
    },
    "118": {
        short_description: "Inicia el reflejo de la verdad: hoy atraer la claridad requiere mirarte sin máscaras ni excusas.",
        long_description: "El Espejo Magnético Blanco abre una nueva Onda Encantada con la misión de unificar la verdad y el orden. El Tono Magnético (1) te atrae hacia el propósito de ver con honestidad absoluta. ¿Qué realidad has estado evitando mirar? Hoy atrae la claridad necesaria para poner orden en tu vida. No temas al reflejo; te muestra lo que necesitas ver para evolucionar. Cuando unificas tu propósito con la verdad, construyes una base sólida para todo lo que viene."
    },
    "119": {
        short_description: "Identifica el desafío de la transformación: hoy autogenerarse requiere equilibrar la destrucción con la creación.",
        long_description: "La Tormenta Lunar Azul presenta el desafío del cambio frente a la resistencia interior. El Tono Lunar (2) nos muestra los polos de nuestra capacidad de renovarnos. ¿Qué parte de ti necesita morir para que nazca algo nuevo? Estabiliza tu relación con la incomodidad del cambio. No todo lo que se destruye es una pérdida; a veces es la única manera de hacer espacio para lo genuino. Identifica qué catarsis necesitas hoy y abrázala con consciencia."
    },
    "120": {
        short_description: "Activa el fuego del servicio: hoy tu luz interior se enciende para calentar y dar vida a quienes te rodean.",
        long_description: "El Sol Eléctrico Amarillo activa la frecuencia de la iluminación como un acto de servicio puro. El Tono Eléctrico (3) vincula tu capacidad de brillar con la necesidad de luz en tu entorno. ¿Cómo puedes usar tu fuego interior para servir hoy? No escondas tu brillo por modestia; el mundo necesita tu calor. Al activar tu presencia solar en servicio a otros, te conviertes en el sol que todos necesitan. Ilumina sin reservas; tu luz es inagotable."
    },
    "121": {
        short_description: "Define la forma de tu nutrición: hoy el cuidado primordial necesita una estructura para ser sostenible.",
        long_description: "El Dragón Autoexistente Rojo nos pide dar forma concreta a nuestra capacidad de nutrir. El Tono Autoexistente (4) provee la arquitectura necesaria para que el cuidado no sea caótico, sino organizado. ¿Cómo estructuras tu autocuidado hoy? Define horarios para descansar, rituales para alimentarte bien, espacios para reconectarte con tu origen. La nutrición que perdura es aquella que tiene un sistema. Cuídate con la misma metodología que usarías para cuidar a alguien que amas."
    },
    "122": {
        short_description: "Comanda la expresión del espíritu: hoy el esplendor de tu voz te da el poder de comunicar verdades elevadas.",
        long_description: "El Viento Entonado Blanco te confiere el poder de liderar a través de la palabra inspirada. El Tono Entonado (5) te empodera para tomar el mando de la comunicación en tu entorno. ¿Qué mensaje necesita ser dicho con autoridad hoy? Tu voz tiene peso; úsala con responsabilidad. No grites, pero tampoco susurres cuando la situación requiere firmeza. El esplendor de tu aliento divino brilla cuando hablas desde tu centro más auténtico."
    },
    "123": {
        short_description: "Organiza los sueños con ritmo: hoy el equilibrio se encuentra en alternar entre la visión y la acción.",
        long_description: "La Noche Rítmica Azul te invita a encontrar el paso perfecto entre soñar y materializar. El Tono Rítmico (6) organiza el flujo de tu intuición para que no te pierdas en fantasías ni te ahogues en el pragmatismo. ¿Cómo equilibras tu vida onírica con tus responsabilidades hoy? Ni demasiado escapismo ni demasiada dureza. Encuentra el ritmo que te permite soñar en grande mientras construyes paso a paso. Tu abundancia interior necesita organización para manifestarse."
    },
    "124": {
        short_description: "Sintoniza el florecimiento cósmico: hoy eres el canal donde el potencial infinito se encuentra con la inspiración divina.",
        long_description: "La Semilla Resonante Amarilla sintoniza tu capacidad de crecer con la fuente de toda vida. El Tono Resonante (7) te pide ser un canal limpio para el florecimiento universal. ¿Estás abierto a recibir la inspiración que te hará florecer? Sintoniza hoy con las señales que la naturaleza te envía. Cada brote, cada rayo de sol, es un mensaje codificado para tu evolución. Cuando te conviertes en canal del potencial puro, lo imposible se vuelve posible."
    },
    "125": {
        short_description: "Armoniza tu instinto con integridad: hoy la fuerza vital requiere coherencia para no destruir lo que amas.",
        long_description: "La Serpiente Galáctica Roja nos invita a modelar la armonía entre nuestra pasión y nuestra ética. El Tono Galáctico (8) pregunta: ¿Vives tu sexualidad y tu vitalidad con integridad? Hoy integra tus deseos con la consciencia de no dañar. La pasión sin conciencia puede quemar; la pasión con integridad transforma. Armoniza tu fuego interior con tus valores más elevados y observa cómo tu vitalidad se convierte en una fuerza de creación, no de destrucción."
    },
    "126": {
        short_description: "Realiza los cierres con intención: hoy el puente entre mundos se cruza con el poder de tu voluntad enfocada.",
        long_description: "El Enlazador de Mundos Solar Blanco pulsa con la intención de realizar la transición consciente. El Tono Solar (9) enfoca tu voluntad en el acto de soltar con propósito. No dejes que los finales te ocurran; dirige el cierre con presencia. ¿Qué ciclo necesita tu atención intencional hoy? Realiza tus despedidas con gratitud, tus duelos con dignidad, tus limpiezas con determinación. Tu voluntad transforma la muerte en oportunidad cuando actúas con intención."
    },
    "127": {
        short_description: "Manifiesta la sanación tangible: hoy la curación que ofreces debe verse en resultados concretos.",
        long_description: "La Mano Planetaria Azul llega para producir la manifestación de la obra sanadora. El Tono Planetario (10) te pide resultados visibles de tu capacidad de curar. ¿Qué has reparado hoy? No basta con desear sanar; hay que tocar, construir, completar. Tu conocimiento debe traducirse en acciones que mejoren la vida de alguien. Hoy produce algo que perdure: una conversación sanadora, una reparación física, un proyecto terminado. Tus manos son la herramienta del cosmos."
    },
    "128": {
        short_description: "Libera el arte reprimido: hoy la estrella interior disuelve todo lo que frena tu expresión más bella.",
        long_description: "La Estrella Espectral Amarilla nos trae la medicina de la liberación artística. El Tono Espectral (11) te invita a soltar la autocrítica que paraliza tu creatividad. ¿Qué belleza has estado guardando por miedo al juicio? Hoy libérala. No necesitas ser perfecto para ser hermoso. Al disolver las barreras que contienen tu elegancia, recuperas el derecho a expresarte con arte en todo lo que haces. Tu vida misma es una obra en constante creación; permítete ser el artista."
    },
    "129": {
        short_description: "Coopera con el flujo emocional: hoy el agua universal busca universalizarse a través de la sensibilidad compartida.",
        long_description: "La Luna Cristal Roja convoca a la cooperación desde la profundidad del sentir colectivo. El Tono Cristal (12) nos recuerda que las emociones individuales son gotas de un océano mayor. ¿Qué sentimientos puedes compartir hoy para sanar a tu comunidad? Dedica tu sensibilidad al servicio del grupo. Cuando lloramos juntos, la carga se alivia; cuando celebramos en compañía, la alegría se multiplica. Tu fluidez emocional hoy es medicina para el corazón colectivo."
    },
    "130": {
        short_description: "Trasciende a través del amor: hoy la lealtad del corazón te eleva hacia la presencia del amor cósmico.",
        long_description: "El Perro Cósmico Blanco cierra el ciclo del amor con una invitación a la trascendencia afectiva. El Tono Cósmico (13) te eleva más allá de los vínculos limitados hacia la comprensión del amor universal. ¿Puedes amar sin condiciones hoy? Trasciende los celos, la posesión, el miedo a perder. El amor verdadero no tiene fronteras ni exige reciprocidad. Cuando vibras en la frecuencia del amor cósmico, te conviertes en un ser que irradia ternura hacia todo lo que existe. Eres amor."
    },
    "131": {
        short_description: "Inicia tu creatividad sagrada: hoy atraer la magia requiere reconectar con el niño eterno que habita en ti.",
        long_description: "El Mono Magnético Azul abre una nueva Onda Encantada con la misión de unificar el juego y la ilusión sagrada. El Tono Magnético (1) te atrae hacia el propósito de recuperar tu capacidad de asombro. ¿Cuándo dejaste de jugar? Hoy atrae la magia necesaria para ver la vida como una aventura llena de sorpresas. No te tomes tan en serio; el universo tiene sentido del humor. Cuando unificas tu propósito con la alegría, todo se vuelve más ligero y posible."
    },
    "132": {
        short_description: "Identifica el desafío del libre albedrío: hoy elegir sabiamente requiere equilibrar la libertad con la responsabilidad.",
        long_description: "El Humano Lunar Amarillo presenta el desafío de la elección frente a la indecisión. El Tono Lunar (2) nos muestra los polos de nuestra capacidad de decidir. ¿Eliges desde el miedo o desde la sabiduría? Estabiliza tu relación con las consecuencias de tus actos. La libertad tiene un precio: hacerte responsable de lo que creas. Identifica qué decisión importante necesitas tomar hoy y encuentra el equilibrio entre lo que deseas y lo que es correcto."
    },
    "133": {
        short_description: "Activa la exploración del servicio: hoy tu vigilancia se vuelve eléctrica cuando observas para proteger.",
        long_description: "El Caminante del Cielo Eléctrico Rojo activa la frecuencia de la exploración como un acto de servicio. El Tono Eléctrico (3) vincula tu capacidad de viajar con la necesidad de expandir horizontes para todos. ¿Cómo puede tu espíritu explorador ayudar a otros hoy? No viajes solo para ti; trae de vuelta tesoros de sabiduría para compartir. Al activar tu vigilancia en servicio, te conviertes en el guardián que abre caminos para quienes vienen detrás."
    },
    "134": {
        short_description: "Define la forma de tu magia: hoy la atemporalidad necesita estructura para manifestarse en el mundo.",
        long_description: "El Mago Autoexistente Blanco nos pide dar forma concreta a nuestro encantamiento. El Tono Autoexistente (4) provee la arquitectura necesaria para que tu magia no sea solo un destello, sino una práctica sostenida. ¿Qué rituales definen tu presencia mística hoy? Estructurar tu práctica espiritual no mata la espontaneidad; la potencia. La receptividad que perdura es aquella que tiene un altar, un horario, una forma de veneración. Crea tu templo personal con intención."
    },
    "135": {
        short_description: "Comanda tu visión: hoy el esplendor de tu mente te da el poder de ver y crear realidades elevadas.",
        long_description: "El Águila Entonada Azul te confiere el poder de liderar desde la claridad mental superior. El Tono Entonado (5) te empodera para tomar el mando de tu perspectiva. ¿Desde qué altura estás mirando tu vida hoy? Eleva tu punto de vista hasta que los problemas parezcan pequeños y las soluciones, evidentes. El esplendor de tu visión brilla cuando te niegas a conformarte con la mediocridad. Hoy lideras con la mente de un visionario que crea el mañana."
    },
    "136": {
        short_description: "Organiza la valentía rítmica: hoy el equilibrio se encuentra en cuestionar sin atacar, en avanzar sin atropellar.",
        long_description: "El Guerrero Rítmico Amarillo te invita a encontrar el paso perfecto entre la acción y la reflexión. El Tono Rítmico (6) organiza el flujo de tu intrepidez para que no te desgastes en batallas innecesarias. ¿Cómo equilibras tu coraje con tu prudencia hoy? Ni cobardía ni temeridad. Encuentra el ritmo de un guerrero sabio que sabe cuándo atacar, cuándo retirarse y cuándo simplemente observar. Tu inteligencia es tu mejor arma cuando la usas con ritmo."
    },
    "137": {
        short_description: "Sintoniza la evolución terrestre: hoy eres el canal donde la Tierra se encuentra con la inspiración cósmica.",
        long_description: "La Tierra Resonante Roja sintoniza tu navegación personal con la frecuencia del planeta entero. El Tono Resonante (7) te pide ser un canal limpio para los mensajes de Gaia. ¿Estás escuchando lo que la Tierra te dice hoy? Sintoniza con la naturaleza: el viento, los animales, las plantas. Cada sincronicidad es una nota de la sinfonía universal. Cuando te conviertes en canal del ritmo terrestre, navegas la vida con una brújula que nunca te pierde."
    },
    "138": {
        short_description: "Armoniza tu reflejo con integridad: hoy la verdad requiere coherencia para no herir sino sanar.",
        long_description: "El Espejo Galáctico Blanco nos invita a modelar la armonía entre nuestra honestidad y nuestra compasión. El Tono Galáctico (8) pregunta: ¿Dices la verdad con amor o con crueldad? Hoy integra tu capacidad de ver claramente con la sabiduría de comunicar sin destruir. El orden verdadero no se impone; se modela con el ejemplo. Armoniza tu reflejo interior con tus palabras, y tus palabras con tus acciones. La integridad es la belleza del alma transparente."
    },
    "139": {
        short_description: "Realiza la transformación con intención: hoy tu catarsis tiene el poder de reinventar tu realidad por completo.",
        long_description: "La Tormenta Solar Azul pulsa con la intención de realizar el cambio radical. El Tono Solar (9) enfoca tu voluntad en el acto de autogenerarte con propósito. No dejes que el cambio te atropelle; dirige la tormenta. ¿Qué versión de ti mismo quieres ser mañana? Realiza hoy las acciones que crean ese futuro. Tu intención es el rayo que rompe lo viejo y tu presencia es la lluvia que limpia el terreno. Reinvéntate con la certeza de quien sabe que el cambio es vida."
    },
    "140": {
        short_description: "Manifiesta la luz perfecta: hoy el sol interior busca formas concretas para iluminar cada rincón de tu existencia.",
        long_description: "El Sol Planetario Amarillo llega para producir la manifestación de la iluminación tangible. El Tono Planetario (10) te pide resultados visibles de tu brillo interior. ¿En qué has irradiado luz hoy? No basta con sentirse iluminado; hay que producir calor que otros puedan sentir. Tu presencia solar tiene impacto cuando se traduce en actos de amor, generosidad y vida. Hoy perfecciona tu capacidad de iluminar: hazlo con acción, con presencia, con fuego sagrado."
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
console.log("✨ Premium texts updated for Kines 101-140!");
