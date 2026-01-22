const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'frontend/src/data/dailyData.json');

const premiumTexts = {
    "141": {
        short_description: "Libera el juego interior: hoy el niño cósmico disuelve todo lo que impide tu expresión más auténtica.",
        long_description: "El Mono Espectral Azul nos trae la medicina de la liberación a través de la inocencia recuperada. El Tono Espectral (11) te invita a soltar la máscara adulta que asfixia tu creatividad. ¿Cuándo fue la última vez que hiciste algo absurdo e improductivo solo por alegría? Hoy libera el niño interior. Al disolver la seriedad que te pesa, recuperas la magia de ver el mundo con ojos nuevos. La vida es más un juego que un problema; recuérdalo."
    },
    "142": {
        short_description: "Coopera con la sabiduría: hoy el libre albedrío busca universalizarse a través de la elección consciente colectiva.",
        long_description: "El Humano Cristal Amarillo convoca a la cooperación desde la perspectiva de la humanidad entera. El Tono Cristal (12) nos recuerda que cada elección individual afecta al tejido colectivo. ¿Cómo puedes usar tu libertad para beneficiar a todos hoy? Dedica tu influencia a causas mayores que tu ego. Cuando elegimos juntos desde la sabiduría, creamos un mundo que ningún individuo podría imaginar solo. Tu voto importa; tu voz transforma."
    },
    "143": {
        short_description: "Trasciende a través de la exploración: hoy el caminante cósmico te eleva hacia la presencia del viajero eterno.",
        long_description: "El Caminante del Cielo Cósmico Rojo cierra el ciclo de la vigilancia con una invitación a la expansión infinita. El Tono Cósmico (13) te eleva más allá de los límites conocidos hacia territorios donde solo la fe puede guiarte. ¿Estás listo para soltar el mapa y confiar en el territorio? Hoy trasciende tu necesidad de saber el destino; el viaje es el tesoro. Cuando te entregas al espacio infinito, descubres que siempre has estado en casa."
    },
    "144": {
        short_description: "Inicia el encantamiento magnético: hoy atraer la magia requiere que seas el hechizo que deseas ver en el mundo.",
        long_description: "El Mago Magnético Blanco abre una nueva Onda Encantada con la misión de unificar la atemporalidad y la receptividad. El Tono Magnético (1) te atrae hacia el propósito de encantar tu realidad. ¿Qué quieres manifestar en los próximos 13 días? Hoy unifica tu intención con la presencia del ahora. La magia no viene del futuro; surge de este instante exacto cuando dejas de buscar y empiezas a ser. Atrae encanto siendo encantador."
    },
    "145": {
        short_description: "Identifica el desafío de la visión: hoy ver claramente requiere equilibrar la perspectiva alta con la realidad del suelo.",
        long_description: "El Águila Lunar Azul presenta el desafío de la creatividad mental frente a los límites prácticos. El Tono Lunar (2) nos muestra los polos de nuestra capacidad de visualizar. ¿Sueñas tan alto que pierdes contacto con la tierra? Estabiliza tu visión. Identifica qué ideas necesitan más estructura hoy y cuáles demasiada planificación las está matando. El águila vuela alto pero sabe aterrizar con precisión. Encuentra ese equilibrio entre el cielo de tus sueños y el suelo de tu realidad."
    },
    "146": {
        short_description: "Activa la inteligencia del servicio: hoy tu valentía se vuelve eléctrica cuando cuestionas para proteger.",
        long_description: "El Guerrero Eléctrico Amarillo activa la frecuencia del coraje como un acto de servicio. El Tono Eléctrico (3) vincula tu capacidad de cuestionar con la necesidad de justicia en tu entorno. ¿Cómo puedes usar tu intrepidez para ayudar a los demás hoy? No pelees por ego; lucha por causas que valgan la pena. Al activar tu inteligencia guerrera en servicio, te conviertes en el defensor que tu comunidad necesita. Tu coraje inspira acción."
    },
    "147": {
        short_description: "Define la forma de tu evolución: hoy la sincronicidad necesita estructura para guiarte con claridad.",
        long_description: "La Tierra Autoexistente Roja nos pide dar forma concreta a nuestra navegación personal. El Tono Autoexistente (4) provee la arquitectura necesaria para que las señales no te abrumen, sino que te orienten. ¿Cómo estructuras tu atención a las sincronicidades hoy? Define qué señales buscas, crea rituales de observación, mide tu evolución. La navegación que perdura es aquella que tiene una brújula calibrada y un destino claro."
    },
    "148": {
        short_description: "Comanda tu verdad: hoy el esplendor del espejo te da el poder de reflejar claridad en tu entorno.",
        long_description: "El Espejo Entonado Blanco te confiere el poder de liderar desde la honestidad absoluta. El Tono Entonado (5) te empodera para tomar el mando de la verdad en tu realidad. ¿Qué distorsión necesita ser corregida hoy? Tu capacidad de ver claramente te convierte en el faro que otros necesitan para encontrar su camino. El esplendor del orden brilla cuando te niegas a participar en mentiras. Hoy comandas con el ejemplo de la transparencia."
    },
    "149": {
        short_description: "Organiza el cambio rítmico: hoy el equilibrio se encuentra en transformarte sin perder tu centro.",
        long_description: "La Tormenta Rítmica Azul te invita a encontrar el paso perfecto entre la destrucción y la reconstrucción. El Tono Rítmico (6) organiza el flujo de la autogeneración para que no te destruyas en el proceso de cambiar. ¿Cómo equilibras la intensidad de tu transformación hoy? Ni resistencia total ni caos absoluto. Encuentra el ritmo de un cambio sostenible que te renueve sin agotarte. La catarsis organizada es más poderosa que la explosión descontrolada."
    },
    "150": {
        short_description: "Sintoniza la iluminación divina: hoy eres el canal donde el fuego universal se encuentra con la inspiración cósmica.",
        long_description: "El Sol Resonante Amarillo sintoniza tu luz interior con la fuente de toda vida. El Tono Resonante (7) te pide ser un canal limpio para el brillo del cosmos. ¿Estás permitiendo que la luz pase a través de ti sin filtros? Sintoniza hoy con todo lo que te hace sentir vivo. Cada fuente de alegría es un recordatorio de tu naturaleza solar. Cuando te conviertes en canal del fuego universal, iluminas sin esfuerzo y calientas sin quemar."
    },
    "151": {
        short_description: "Armoniza tu nutrición con integridad: hoy el cuidado primordial requiere coherencia para ser genuino.",
        long_description: "El Dragón Galáctico Rojo nos invita a modelar la armonía entre dar y recibir nutrición. El Tono Galáctico (8) pregunta: ¿Te cuidas con la misma dedicación con que cuidas a otros? Hoy integra tus necesidades primarias con tus responsabilidades de cuidador. La nutrición verdadera es un flujo equilibrado: das cuando tienes, recibes cuando necesitas. Armoniza tu autocuidado con tu servicio y observa cómo tu energía se vuelve inagotable."
    },
    "152": {
        short_description: "Realiza la comunicación con intención: hoy tus palabras tienen el poder de crear la realidad que describes.",
        long_description: "El Viento Solar Blanco pulsa con la intención de realizar la verdad hablada. El Tono Solar (9) enfoca tu voluntad en el acto de comunicar con propósito. No hables por hablar; cada palabra hoy debe tener dirección. ¿Qué mensaje necesita ser realizado a través de tu voz? Pronuncia bendiciones, articula visiones, declara tu verdad. Tu intención lingüística es el soplo que da forma al barro de la realidad. Realiza tu destino hablándolo a la existencia."
    },
    "153": {
        short_description: "Manifiesta los sueños tangibles: hoy tu abundancia interior busca formas concretas para enriquecer el mundo.",
        long_description: "La Noche Planetaria Azul llega para producir la manifestación de la riqueza onírica. El Tono Planetario (10) te pide resultados visibles de tu intuición profunda. ¿En qué has materializado tu abundancia interior hoy? No basta con soñar; hay que despertar y construir. Tu misterio tiene peso cuando se traduce en recursos que benefician a todos. Hoy perfecciona tu capacidad de traer tesoros del mundo subterráneo a la luz del día."
    },
    "154": {
        short_description: "Libera el potencial atrapado: hoy la semilla interior disuelve todo lo que impide tu florecimiento natural.",
        long_description: "La Semilla Espectral Amarilla nos trae la medicina de la liberación del crecimiento forzado. El Tono Espectral (11) te invita a soltar las expectativas sobre quién deberías ser. ¿Qué ideas sobre tu potencial te están frenando? Hoy libera la necesidad de florecer según el calendario de otros. Al disolver la presión de producir, recuperas el derecho a crecer a tu propio ritmo. Tu florecimiento es inevitable cuando dejas de forzarlo."
    },
    "155": {
        short_description: "Coopera con la vitalidad: hoy la fuerza vital busca universalizarse a través de la pasión compartida.",
        long_description: "La Serpiente Cristal Roja convoca a la cooperación desde la intensidad del instinto colectivo. El Tono Cristal (12) nos recuerda que la energía vital se multiplica cuando circula en grupo. ¿Cómo puedes compartir tu pasión con tu comunidad hoy? Dedica tu fuego a encender el de otros. Cuando vibramos juntos en alta frecuencia, creamos un campo de vitalidad que sana y transforma. Tu instinto hoy es el latido de un corazón mayor."
    },
    "156": {
        short_description: "Trasciende a través de los puentes: hoy el enlazador cósmico te eleva hacia la comprensión de la muerte como regalo.",
        long_description: "El Enlazador de Mundos Cósmico Blanco cierra el ciclo de la oportunidad con una invitación a la paz eterna. El Tono Cósmico (13) te eleva más allá del miedo a los finales hacia la comprensión de que todo cierre es un abrazo. ¿Puedes agradecer lo que termina hoy? Trasciende la resistencia al cambio y reconoce que cada muerte es un nacimiento disfrazado. Cuando sueltas con presencia, te conviertes en el puente que conecta lo que fue con lo que será eternamente."
    },
    "157": {
        short_description: "Inicia tu sanación magnética: hoy atraer la curación requiere reconocer qué necesita ser reparado.",
        long_description: "La Mano Magnética Azul abre una nueva Onda Encantada con la misión de unificar el conocimiento y la realización. El Tono Magnético (1) te atrae hacia el propósito de sanar algo esencial en tu vida. ¿Qué herida está lista para recibir atención? Hoy unifica tu intención con la acción concreta. La curación no es magia pasiva; es el trabajo consciente de reparar lo roto. Atrae los recursos, las personas y las circunstancias que necesitas para completar tu obra sanadora."
    },
    "158": {
        short_description: "Identifica el desafío de embellecer: hoy la armonía requiere equilibrar el ideal con lo posible.",
        long_description: "La Estrella Lunar Amarilla presenta el desafío de la elegancia frente a la imperfección. El Tono Lunar (2) nos muestra los polos de nuestra relación con la belleza. ¿Persigues un ideal imposible que te frustra o aceptas la fealdad sin intentar mejorar? Estabiliza tu estética. Identifica qué aspectos de tu vida necesitan más armonía y cuáles ya son suficientemente bellos. El arte verdadero acepta la sombra como parte de la obra maestra."
    },
    "159": {
        short_description: "Activa la purificación del servicio: hoy tus emociones se vuelven eléctricas cuando fluyen para limpiar.",
        long_description: "La Luna Eléctrica Roja activa la frecuencia de la sensibilidad como un acto de servicio purificador. El Tono Eléctrico (3) vincula tu capacidad de sentir con la necesidad de limpieza emocional en tu entorno. ¿Cómo puedes usar tu sensibilidad para ayudar a otros a fluir hoy? No reprimas tus lágrimas ni las de nadie. Al activar el agua emocional en servicio, te conviertes en el río que limpia y renueva. Tu empatía es la medicina del corazón ajeno."
    },
    "160": {
        short_description: "Define la forma de tu lealtad: hoy el amor incondicional necesita estructura para ser sostenible.",
        long_description: "El Perro Autoexistente Blanco nos pide dar forma concreta a nuestros vínculos afectivos. El Tono Autoexistente (4) provee la arquitectura necesaria para que el amor no sea caótico, sino nutritivo. ¿Cómo estructuras tus relaciones hoy? Define límites sanos, establece rituales de conexión, mide si estás dando y recibiendo en equilibrio. El amor que perdura es aquel que tiene una base sólida de respeto mutuo y comunicación clara."
    },
    "161": {
        short_description: "Comanda tu creatividad: hoy el esplendor de la magia te da el poder de liderar con humor y asombro.",
        long_description: "El Mono Entonado Azul te confiere el poder de liderar desde la alegría irreverente. El Tono Entonado (5) te empodera para tomar el mando de la situación con un giro inesperado. ¿Qué área de tu vida necesita más ligereza? Tu capacidad de jugar te convierte en el líder que nadie espera pero todos necesitan. El esplendor de la magia brilla cuando te niegas a tomarte demasiado en serio. Hoy comandas con el ejemplo de la espontaneidad."
    },
    "162": {
        short_description: "Organiza la libertad rítmica: hoy el equilibrio se encuentra en elegir con sabiduría sin perder tu espontaneidad.",
        long_description: "El Humano Rítmico Amarillo te invita a encontrar el paso perfecto entre la estructura y la improvisación. El Tono Rítmico (6) organiza el flujo de tus decisiones para que ni la rigidez ni el caos dominen. ¿Cómo equilibras tu libertad personal con tus compromisos hoy? Ni esclavitud a las reglas ni libertinaje destructivo. Encuentra el ritmo de una autonomía responsable que honre tanto tu individualidad como tu pertenencia al colectivo."
    },
    "163": {
        short_description: "Sintoniza la vigilancia cósmica: hoy eres el canal donde el espacio infinito se encuentra con la inspiración del explorador.",
        long_description: "El Caminante del Cielo Resonante Rojo sintoniza tu capacidad de explorar con la fuente de toda aventura. El Tono Resonante (7) te pide ser un canal limpio para los mensajes del universo expansivo. ¿A dónde te llama el misterio hoy? Sintoniza con esa voz interior que te invita a ir más allá. Cada corazonada es una señal del cosmos indicándote el siguiente paso. Cuando te conviertes en canal del espacio, los límites se disuelven."
    },
    "164": {
        short_description: "Armoniza tu encantamiento con integridad: hoy la magia requiere coherencia para no ser ilusión vacía.",
        long_description: "El Mago Galáctico Blanco nos invita a modelar la armonía entre nuestra presencia mística y nuestros actos cotidianos. El Tono Galáctico (8) pregunta: ¿Vives tu espiritualidad con integridad? Hoy integra tu práctica interna con tu conducta externa. La atemporalidad verdadera no es escapismo; es presencia total en cada instante. Armoniza tu receptividad con la acción y observa cómo la magia se vuelve real, tangible, incuestionable."
    },
    "165": {
        short_description: "Realiza la visión con intención: hoy tu mente creadora tiene el poder de materializar panoramas nuevos.",
        long_description: "El Águila Solar Azul pulsa con la intención de realizar la creatividad mental superior. El Tono Solar (9) enfoca tu voluntad en el acto de ver y crear. No te quedes en la contemplación; hoy cada visión debe traducirse en acción. ¿Qué panorama quieres hacer realidad? Dirige tu mente hacia la construcción de ese futuro. Tu intención es el ojo que ve más allá del presente y tu presencia es la mano que lo esculpe."
    },
    "166": {
        short_description: "Manifiesta el coraje tangible: hoy tu intrepidez busca formas concretas para cuestionar y transformar.",
        long_description: "El Guerrero Planetario Amarillo llega para producir la manifestación de la valentía práctica. El Tono Planetario (10) te pide resultados visibles de tu inteligencia guerrera. ¿En qué has demostrado coraje hoy? No basta con sentirse valiente; hay que actuar con intrepidez. Tu capacidad de cuestionar tiene peso cuando se traduce en cambios reales. Hoy perfecciona tu habilidad de enfrentar lo difícil con estrategia y determinación."
    },
    "167": {
        short_description: "Libera la navegación forzada: hoy la Tierra interior disuelve todo lo que bloquea tu evolución natural.",
        long_description: "La Tierra Espectral Roja nos trae la medicina de la liberación del control obsesivo sobre el camino. El Tono Espectral (11) te invita a soltar la necesidad de forzar las sincronicidades. ¿Cuánto esfuerzo gastas tratando de manipular el destino? Hoy libera el volante y confía en la navegación natural. Al disolver tu resistencia al flujo, recuperas la capacidad de leer las señales sin ansiedad. La evolución ocurre cuando dejas de empujar."
    },
    "168": {
        short_description: "Coopera con la claridad: hoy la verdad del espejo busca universalizarse a través de la honestidad compartida.",
        long_description: "El Espejo Cristal Blanco convoca a la cooperación desde la transparencia total. El Tono Cristal (12) nos recuerda que la verdad individual se fortalece en la comunidad. ¿Qué reflexiones puedes compartir hoy para beneficio de todos? Dedica tu claridad al servicio del grupo. Cuando nos reflejamos mutuamente con amor, crecemos más rápido que solos. Tu honestidad hoy es el espejo que ayuda a otros a verse con más compasión."
    },
    "169": {
        short_description: "Trasciende a través de la tormenta: hoy la autogeneración te eleva hacia la comprensión de que el caos es creación.",
        long_description: "La Tormenta Cósmica Azul cierra el ciclo de la transformación con una invitación a la reinvención eterna. El Tono Cósmico (13) te eleva más allá del miedo al cambio hacia la comprensión de que siempre estás renaciendo. ¿Puedes agradecer las tormentas que te han forjado? Trasciende la necesidad de estabilidad permanente y abraza tu naturaleza catalizadora. Cuando aceptas que el cambio es tu esencia, la incomodidad se transforma en poder."
    },
    "170": {
        short_description: "Inicia tu iluminación magnética: hoy atraer la luz requiere reconocer que tú eres la fuente del fuego.",
        long_description: "El Sol Magnético Amarillo abre una nueva Onda Encantada con la misión de unificar la vida y la iluminación. El Tono Magnético (1) te atrae hacia el propósito de brillar con todo tu ser. ¿Qué quieres iluminar en los próximos 13 días? Hoy unifica tu intención con el fuego que ya arde en tu interior. No busques la luz afuera; enciende la tuya. Atrae calor siendo cálido; atrae vida amando la vida."
    },
    "171": {
        short_description: "Identifica el desafío de nutrir: hoy el cuidado requiere equilibrar la protección con la libertad.",
        long_description: "El Dragón Lunar Rojo presenta el desafío del cuidado frente al sofocamiento. El Tono Lunar (2) nos muestra los polos de nuestra capacidad de nutrir. ¿Proteges tanto que asfixias o descuidas por miedo a atar? Estabiliza tu forma de cuidar. Identifica qué necesita más atención y qué requiere soltar la rienda. El nacimiento verdadero ocurre cuando la madre sabe cuándo sostener y cuándo dejar volar."
    },
    "172": {
        short_description: "Activa la comunicación del servicio: hoy tu voz se vuelve eléctrica cuando hablas para inspirar.",
        long_description: "El Viento Eléctrico Blanco activa la frecuencia de la expresión como un acto de servicio poderoso. El Tono Eléctrico (3) vincula tu capacidad de comunicar con la necesidad de inspiración en tu entorno. ¿Cómo puedes usar tu palabra para ayudar a otros hoy? No calles lo que puede sanar; no grites lo que puede herir. Al activar tu aliento en servicio, te conviertes en el mensajero que el mundo necesita. Tu voz es viento que aviva fuegos dormidos."
    },
    "173": {
        short_description: "Define la forma de tus sueños: hoy tu intuición necesita estructura para manifestarse en la realidad.",
        long_description: "La Noche Autoexistente Azul nos pide dar forma concreta a nuestro mundo interior. El Tono Autoexistente (4) provee la arquitectura necesaria para que tus sueños no se evaporen al despertar. ¿Cómo estructuras tu práctica onírica hoy? Define rituales de sueño, lleva un diario de visiones, mide qué intuiciones se cumplen. La abundancia que perdura nace de una relación disciplinada con tu misterio interior."
    },
    "174": {
        short_description: "Comanda tu florecimiento: hoy el esplendor de la semilla te da el poder de dirigir tu propio crecimiento.",
        long_description: "La Semilla Entonada Amarilla te confiere el poder de liderar tu propia evolución. El Tono Entonado (5) te empodera para tomar el mando de tu desarrollo personal. ¿Qué aspectos de tu potencial necesitan tu liderazgo hoy? No esperes a que otros te cultiven; siembra tus propias intenciones. El esplendor del florecimiento brilla cuando te niegas a quedarte como semilla. Hoy comandas tu jardín interior con autoridad."
    },
    "175": {
        short_description: "Organiza la vitalidad rítmica: hoy el equilibrio se encuentra en pulsar tu energía sin agotarte.",
        long_description: "La Serpiente Rítmica Roja te invita a encontrar el paso perfecto entre la acción y el descanso. El Tono Rítmico (6) organiza el flujo de tu fuerza vital para que no te quemes ni te estanques. ¿Cómo equilibras tu pasión con tu recuperación hoy? Ni hiperactividad que destruye ni letargo que marchita. Encuentra el ritmo de una vitalidad sostenible que te permita brillar sin consumirte. Tu cuerpo sabe el ritmo; escúchalo."
    },
    "176": {
        short_description: "Sintoniza el cierre de ciclos: hoy eres el canal donde la muerte simbólica se encuentra con la inspiración del renacimiento.",
        long_description: "El Enlazador de Mundos Resonante Blanco sintoniza tu capacidad de soltar con la fuente de la oportunidad infinita. El Tono Resonante (7) te pide ser un canal limpio para la energía de la transformación. ¿Qué finaliza hoy y qué nace de ello? Sintoniza con la sabiduría de que todo cierre es un inicio. Cuando te conviertes en canal de la muerte consciente, atraviesas los puentes sin miedo, sabiendo que algo hermoso espera al otro lado."
    },
    "177": {
        short_description: "Armoniza tu sanación con integridad: hoy la curación requiere coherencia para no dañar mientras reparas.",
        long_description: "La Mano Galáctica Azul nos invita a modelar la armonía entre nuestra intención de sanar y nuestros métodos. El Tono Galáctico (8) pregunta: ¿Curas con la misma delicadeza que exigirías para ti? Hoy integra tu conocimiento con la humildad de no forzar la recuperación ajena. La realización verdadera respeta los tiempos del otro. Armoniza tu deseo de ayudar con la paciencia de esperar, y tus manos se volverán verdaderos instrumentos de paz."
    },
    "178": {
        short_description: "Realiza la belleza con intención: hoy tu arte tiene el poder de producir armonía donde hay disonancia.",
        long_description: "La Estrella Solar Amarilla pulsa con la intención de realizar la elegancia suprema. El Tono Solar (9) enfoca tu voluntad en el acto de embellecer con propósito. No te conformes con la mediocridad estética; hoy cada gesto debe tener gracia. ¿Qué aspecto de tu vida pide más armonía? Dirige tu creatividad hacia ese punto. Tu intención artística es el pincel que transforma lo ordinario en extraordinario."
    },
    "179": {
        short_description: "Manifiesta la purificación tangible: hoy tu sensibilidad busca formas concretas para limpiar y renovar.",
        long_description: "La Luna Planetaria Roja llega para producir la manifestación de la purificación emocional. El Tono Planetario (10) te pide resultados visibles de tu proceso de limpieza interior. ¿En qué has fluido hoy? No basta con sentir; hay que soltar físicamente. Tu capacidad de purificar tiene peso cuando se traduce en espacios más limpios, relaciones más claras, emociones más ligeras. Hoy perfecciona tu habilidad de dejar ir lo que pesa."
    },
    "180": {
        short_description: "Libera el amor condicionado: hoy el perro interior disuelve todo lo que impide tu ternura más pura.",
        long_description: "El Perro Espectral Blanco nos trae la medicina de la liberación afectiva. El Tono Espectral (11) te invita a soltar los patrones de amor que te atan en lugar de nutrirte. ¿Qué condiciones has puesto a tu cariño? Hoy libéralas. Al disolver los muros de protección excesiva, recuperas la capacidad de amar sin miedo. La lealtad verdadera no es posesión; es libertad compartida. Tu corazón es más grande de lo que imaginabas; déjalo expandirse."
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
console.log("✨ Premium texts updated for Kines 141-180!");
