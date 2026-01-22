// Premium quality texts for Kines 1-35
// These texts are handcrafted with soul, poetry, and inspiration
// Following the quality standard of Kines 36-60

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'frontend/src/data/dailyData.json');

const premiumTexts = {
    "1": {
        short_description: "Hoy nace un nuevo ciclo: conecta con tu origen sagrado y permite que tu esencia primordial guíe cada paso.",
        long_description: "El Dragón Magnético Rojo inaugura la Onda Encantada del Nacimiento. Hoy la energía primordial te abraza, recordándote que eres hijo/a del universo, nutrido por fuerzas ancestrales. El Tono Magnético (1) te invita a unificar tu propósito: ¿qué deseas gestar en los próximos 13 días? Conecta con la memoria de tus raíces, honra a quienes vinieron antes que tú y confía en que el cosmos te sostiene. Eres el inicio de algo sagrado; déjate cuidar mientras das a luz tu nueva realidad."
    },
    "2": {
        short_description: "Respira profundo: hoy el viento trae mensajes del espíritu que solo el silencio interior puede escuchar.",
        long_description: "El Viento Lunar Blanco sopla con la dualidad del desafío y la comunicación. Hoy puedes sentir tensión entre lo que deseas expresar y lo que callas. El Tono Lunar (2) te pide que identifiques qué polaridades habitan en ti: ¿dónde hay conflicto entre tu verdad interior y tu voz exterior? Escucha más de lo que hablas. Las respuestas llegan cuando te detienes a sentir el aliento divino que circula a través de ti. Sé el canal transparente del espíritu."
    },
    "3": {
        short_description: "Activa tu intuición y sirve desde el corazón: los sueños de hoy son las semillas de tu abundancia futura.",
        long_description: "La Noche Eléctrica Azul enciende la chispa del servicio a través del misterio interior. Hoy tu intuición está amplificada; confía en esos susurros que vienen de lo profundo. El Tono Eléctrico (3) te pregunta: ¿cómo puedes usar tus dones oníricos para servir a otros? La verdadera abundancia nace cuando compartes tu luz interior sin esperar nada a cambio. Cierra los ojos, visualiza tu sueño más grande y permítete creer que ya está en camino."
    },
    "4": {
        short_description: "Da forma a tus intenciones: hoy el universo te pide que plantes semillas conscientes en tierra fértil.",
        long_description: "La Semilla Autoexistente Amarilla te invita a definir con claridad qué deseas cultivar en tu vida. El Tono Autoexistente (4) es el arquitecto: mide, estructura y concreta. ¿Cuál es la forma que quieres darle a tu potencial infinito? No se trata de prisa, sino de precisión. Cada pensamiento es una semilla; cada intención, un jardín futuro. Pon atención plena en los pequeños detalles de hoy, porque en ellos germina la grandeza de mañana."
    },
    "5": {
        short_description: "Despierta tu fuego interior: hoy la fuerza vital pide ser liberada con pasión y propósito.",
        long_description: "La Serpiente Entonada Roja enciende la Kundalini sagrada dentro de ti. El Tono Entonado (5) te confiere poder para tomar el mando de tu energía vital. ¿Dónde has estado reprimiendo tu pasión? ¿Qué instinto has ignorado? Hoy tu cuerpo tiene la sabiduría que necesitas; escúchalo. Mueve tu energía, activa tu fuego interno y recuerda: solo tú puedes encender la llama que ilumina tu camino. Atrévete a vivir con intensidad y propósito."
    },
    "6": {
        short_description: "Cierra ciclos con amor: cada final es un puente sagrado hacia un nuevo comienzo.",
        long_description: "El Enlazador de Mundos Rítmico Blanco te invita a encontrar equilibrio entre el soltar y el recibir. El Tono Rítmico (6) organiza tu mundo interior para que haya espacio para lo nuevo. ¿Qué necesitas dejar morir hoy? No temas a los finales; son portales disfrazados. Perdona, suelta, ordena tu espacio físico y emocional. Cuando igualas las energías de tu vida, te conviertes en el puente entre lo que fue y lo que será. La muerte simbólica es renacimiento."
    },
    "7": {
        short_description: "Tus manos son instrumentos de sanación: hoy el conocimiento se transforma en acción curativa.",
        long_description: "La Mano Resonante Azul canaliza la frecuencia de la curación y la realización. El Tono Resonante (7) te sintoniza con la fuente de toda sanación: tú mismo. Hoy tienes el poder de tocar vidas, empezando por la tuya. ¿Qué necesita ser sanado en ti? El conocimiento sin acción es solo información; la verdadera sabiduría se vive con las manos. Crea, repara, abraza, cocina con amor. Cada gesto consciente hoy es medicina para el alma."
    },
    "8": {
        short_description: "Brilla con integridad: tu belleza interior es el arte más elevado que puedes ofrecer al mundo.",
        long_description: "La Estrella Galáctica Amarilla modela la armonía entre lo que eres y lo que manifiestas. El Tono Galáctico (8) te desafía: ¿vives en coherencia con tu verdad más bella? Hoy no se trata de aparentar, sino de SER arte. Rodéate de belleza, crea desde el corazón, viste tu esencia con elegancia auténtica. Cuando armonizas tu interior con tu exterior, te conviertes en una estrella que ilumina sin esfuerzo. Tu luz inspira a otros a encontrar la suya."
    },
    "9": {
        short_description: "Purifica con intención: deja que el agua emocional fluya y limpie todo lo que ya no te sirve.",
        long_description: "La Luna Solar Roja pulsa con la intención de purificar tu mundo emocional. El Tono Solar (9) te impulsa a realizar tu sensibilidad como superpoder, no como debilidad. ¿Qué emociones has estado reprimiendo? Hoy es el día para dejarlas fluir. Llora si es necesario, ríe sin motivo, siente sin juzgarte. El agua limpia, renueva y da vida. Date permiso para ser vulnerable; en esa apertura reside tu fuerza más profunda."
    },
    "10": {
        short_description: "Manifiesta amor incondicional: hoy tu corazón tiene el poder de crear realidades llenas de lealtad y ternura.",
        long_description: "El Perro Planetario Blanco perfecciona la manifestación del amor en su forma más pura. El Tono Planetario (10) te pide producir resultados tangibles desde el corazón. ¿Cómo puedes demostrar amor hoy de manera concreta? No basta con sentir; hay que actuar. Llama a ese amigo, abraza a tu familia, sé leal contigo mismo. El amor incondicional no es debilidad; es la fuerza más poderosa del universo. Manifiéstalo sin miedo."
    },
    "11": {
        short_description: "Libera tu niño interior: la magia está en soltar la seriedad y permitirte jugar con la vida.",
        long_description: "El Mono Espectral Azul disuelve las estructuras rígidas con la medicina del humor y la creatividad. El Tono Espectral (11) te invita a liberar todo lo que te pesa, especialmente la seriedad excesiva. ¿Cuándo fue la última vez que reíste hasta llorar? Hoy el universo te da permiso para jugar, improvisar y sorprenderte. La magia no vive en el control; habita en la espontaneidad. Rompe la rutina, haz algo inesperado y observa cómo la vida se vuelve más ligera."
    },
    "12": {
        short_description: "Coopera desde la sabiduría: tu libre albedrío es un regalo que se multiplica al compartirlo.",
        long_description: "El Humano Cristal Amarillo universaliza la sabiduría a través de la cooperación consciente. El Tono Cristal (12) te invita a dedicarte a causas mayores que tú mismo. Hoy no eres una isla; eres parte de una red sagrada de conciencias. ¿Cómo puedes usar tu libertad para elevar a otros? Comparte lo que sabes, escucha perspectivas diferentes, celebra la diversidad del pensamiento humano. Juntos, creamos realidades más luminosas que las que podríamos soñar solos."
    },
    "13": {
        short_description: "Trasciende tus límites: hoy el cosmos te invita a explorar dimensiones interiores sin mapas conocidos.",
        long_description: "El Caminante del Cielo Cósmico Rojo cierra el ciclo con la presencia del infinito explorador. El Tono Cósmico (13) te eleva más allá de lo conocido, hacia territorios donde solo la intuición puede guiarte. ¿Qué fronteras internas estás listo para cruzar? No necesitas certezas; necesitas curiosidad y valentía. Hoy culminas un viaje y simultáneamente inicias otro. Estás exactamente donde debes estar en el vasto mapa del universo. Confía en el misterio."
    },
    "14": {
        short_description: "Inicia un nuevo hechizo: el mago interior despierta para encantar tu realidad con presencia atemporal.",
        long_description: "El Mago Magnético Blanco abre una nueva Onda Encantada con el poder de la atemporalidad. El Tono Magnético (1) unifica tu propósito en el eterno ahora. No hay pasado que te defina ni futuro que te angustie; solo existe este momento mágico. ¿Qué quieres atraer a tu vida desde la quietud del presente? Hoy eres el hechicero de tu destino. Sé receptivo a las señales sutiles, mantén tu corazón abierto y recuerda: la verdadera magia ocurre cuando dejas de forzar."
    },
    "15": {
        short_description: "Eleva tu visión: hoy el águila interior te muestra el panorama completo desde las alturas de tu mente.",
        long_description: "El Águila Lunar Azul identifica el desafío de ver más allá de lo evidente. El Tono Lunar (2) polariza tu percepción: ¿qué ves cuando miras con los ojos del cuerpo versus los ojos del espíritu? Hoy te invito a elevarte mentalmente sobre los problemas cotidianos y observar la trama mayor de tu vida. Desde las alturas, los obstáculos parecen diferentes. Confía en tu visión superior; ella te muestra caminos que la lógica ordinaria no puede ver."
    },
    "16": {
        short_description: "Cuestiona con valentía: la inteligencia del guerrero interior te guía a través de la incertidumbre.",
        long_description: "El Guerrero Eléctrico Amarillo activa el servicio a través de la intrepidez inteligente. El Tono Eléctrico (3) vincula tu valor con acciones que benefician a otros. ¿Qué preguntas valientes necesitas hacerte hoy? No aceptes respuestas fáciles ni verdades impuestas. El guerrero espiritual no pelea con espadas, sino con claridad mental y corazón decidido. Avanza hacia lo desconocido con estrategia, pero también con fe. Tu coraje inspira a otros a enfrentar sus propios miedos."
    },
    "17": {
        short_description: "Navega con la Tierra: las sincronicidades de hoy son señales que te guían hacia tu evolución.",
        long_description: "La Tierra Autoexistente Roja define la forma de tu navegación sincrónica. El Tono Autoexistente (4) mide los ritmos naturales que te rodean. ¿Estás escuchando las señales de la naturaleza? Hoy el planeta te habla a través de coincidencias significativas. Presta atención a los números repetidos, las personas que aparecen, los mensajes inesperados. Nada es casualidad. Cada sincronicidad es un guiño del universo confirmándote que vas por buen camino. Confía y avanza."
    },
    "18": {
        short_description: "Refleja tu verdad: hoy el espejo interior corta las ilusiones y te muestra quién realmente eres.",
        long_description: "El Espejo Entonado Blanco toma el mando para revelar la verdad sin adornos. El Tono Entonado (5) te empodera para liderar tu vida desde la honestidad absoluta. ¿Qué ilusiones has estado creyendo sobre ti mismo? El espejo no juzga; simplemente refleja. Hoy tienes la oportunidad de ver con claridad lo que antes evitabas mirar. El orden nace cuando aceptas la realidad tal como es. Desde esa verdad, construyes algo auténtico e inquebrantable."
    },
    "19": {
        short_description: "Transforma con equilibrio: la tormenta interior limpia y renueva cuando la abrazas sin resistencia.",
        long_description: "La Tormenta Rítmica Azul organiza el caos creativo para encontrar un nuevo equilibrio. El Tono Rítmico (6) te ayuda a balancear la intensidad de los cambios que atraviesas. ¿Sientes que todo se sacude a tu alrededor? Bien. Eso significa que estás evolucionando. No resistas la tormenta; baila con ella. La autogeneración requiere romper viejas estructuras para construir nuevas. Hoy tienes la energía para reinventarte. Úsala sabiamente."
    },
    "20": {
        short_description: "Ilumina desde el alma: hoy canalizas la inspiración del sol para dar vida a quienes te rodean.",
        long_description: "El Sol Resonante Amarillo canaliza la luz universal a través de tu ser. El Tono Resonante (7) te sintoniza con la fuente de toda vida: el fuego cósmico que arde en el centro de tu corazón. Hoy no necesitas buscar la luz fuera; tú ERES esa luz. ¿Cómo puedes inspirar y dar calor a quienes te rodean? Tu presencia radiante es un regalo. No te ocultes tras nubes de duda. Brilla con toda tu fuerza y observa cómo el mundo florece a tu alrededor."
    },
    "21": {
        short_description: "Nutre con integridad: honra tu origen mientras modelas la versión más auténtica de ti mismo.",
        long_description: "El Dragón Galáctico Rojo armoniza el cuidado ancestral con la integridad personal. El Tono Galáctico (8) te pregunta: ¿actúas en coherencia con lo que sientes y sabes? Hoy la energía primordial te recuerda que mereces ser nutrido tanto como nutres a otros. No es egoísmo; es equilibrio sagrado. Cuida tu cuerpo, honra tus necesidades, descansa si lo necesitas. Cuando te llenas desde adentro, tienes más para ofrecer al mundo."
    },
    "22": {
        short_description: "Comunica con intención: hoy tus palabras tienen el poder de crear o destruir realidades.",
        long_description: "El Viento Solar Blanco pulsa con la intención de comunicar tu verdad más alta. El Tono Solar (9) realiza la palabra hablada como acto de creación consciente. ¿Qué mensaje necesita salir de ti hoy? No es momento de callar lo importante ni de hablar sin propósito. Cada palabra es una semilla que siembras en el campo de la realidad. Elige conscientemente lo que dices, cómo lo dices y a quién se lo dices. Tu voz es el aliento del espíritu manifestándose."
    },
    "23": {
        short_description: "Sueña en grande: hoy la luna oscura de tu intuición te revela tesoros ocultos de abundancia interior.",
        long_description: "La Noche Planetaria Azul manifiesta la perfección de los sueños hechos realidad. El Tono Planetario (10) produce resultados tangibles desde el misterio interior. ¿Qué sueño estás listo para materializar? La abundancia no viene de fuera; nace de la riqueza inagotable de tu mundo interno. Hoy visualiza con detalle lo que deseas crear. Siéntelo como si ya existiera. La magia del soñador es que sabe, sin duda alguna, que los sueños son la materia prima de la realidad."
    },
    "24": {
        short_description: "Libera tu potencial: suelta las expectativas y permite que tu esencia florezca sin condiciones.",
        long_description: "La Semilla Espectral Amarilla disuelve las limitaciones que aprisionan tu crecimiento. El Tono Espectral (11) te invita a soltar las ideas preconcebidas sobre quién deberías ser. ¿Qué creencias sobre ti mismo necesitas liberar hoy? El potencial infinito vive en ti, pero requiere espacio para germinar. Deja de forzar resultados; confía en tu naturaleza. Cuando sueltas el control, la vida encuentra su propio camino hacia la floración. Eres perfecto en tu evolución constante."
    },
    "25": {
        short_description: "Comparte tu fuerza vital: hoy la serpiente sabia coopera para tejer redes de energía y pasión.",
        long_description: "La Serpiente Cristal Roja universaliza la fuerza vital a través de la cooperación consciente. El Tono Cristal (12) te invita a dedicar tu energía a causas compartidas. ¿Cómo puedes usar tu pasión para elevar a tu comunidad? Hoy no eres solo un individuo; eres parte de un organismo mayor que pulsa y respira contigo. Comparte tu vitalidad, mueve energía en grupo, celebra el cuerpo y la vida junto a otros. La fuerza vital se multiplica cuando circula generosamente."
    },
    "26": {
        short_description: "Trasciende con amor: el puente entre mundos te muestra que cada despedida es un abrazo eterno.",
        long_description: "El Enlazador de Mundos Cósmico Blanco cierra el ciclo con la presencia del amor que trasciende la muerte. El Tono Cósmico (13) te eleva hacia la comprensión de que nada realmente termina; todo se transforma. ¿Qué estás listo para soltar con gratitud? Este es el día para honrar los finales conscientes, para perdonar de corazón y para recordar que los puentes que construyes entre almas permanecen más allá del tiempo. La muerte simbólica hoy es renacimiento mañana."
    },
    "27": {
        short_description: "Sana con propósito: hoy tus manos y tu presencia son instrumentos de curación magnética.",
        long_description: "La Mano Magnética Azul inicia una nueva Onda Encantada de sanación y conocimiento. El Tono Magnético (1) unifica tu propósito: ¿qué área de tu vida o del mundo necesita tus manos sanadoras? Hoy atraes hacia ti todo lo necesario para completar tu misión curativa. No subestimes el poder de un toque consciente, una palabra amable, una acción concreta de ayuda. Eres el avatar de la realización; lo que toques hoy con amor, florece."
    },
    "28": {
        short_description: "Identifica tu brillo: hoy el desafío es reconocer tu belleza entre las sombras de la duda.",
        long_description: "La Estrella Lunar Amarilla presenta el desafío de la armonía enfrentada a la disonancia. El Tono Lunar (2) polariza entre la luz que eres y las sombras que crees ser. ¿Dónde habita la duda sobre tu propia belleza? Hoy te invito a mirarte sin filtros y reconocer la elegancia natural de tu esencia. No necesitas compararte con nadie; tu arte es único e irrepetible. Estabiliza tu brillo interior para que ninguna opinión externa pueda apagarlo."
    },
    "29": {
        short_description: "Purifica con servicio: hoy tus emociones se convierten en el río que limpia y nutre a quienes amas.",
        long_description: "La Luna Eléctrica Roja activa el servicio emocional con toda su intensidad purificadora. El Tono Eléctrico (3) vincula tu sensibilidad con acciones que benefician a otros. ¿Cómo puedes usar tu capacidad de sentir profundamente para servir? Tus lágrimas limpian, tu ternura sana, tu vulnerabilidad inspira. Hoy no escondas tus emociones; canalízalas hacia el bien común. El agua que fluye libremente purifica todo a su paso."
    },
    "30": {
        short_description: "Define tu amor: hoy el corazón pide estructura para que la lealtad se convierta en acción tangible.",
        long_description: "El Perro Autoexistente Blanco da forma concreta al amor incondicional. El Tono Autoexistente (4) mide y estructura lo que sientes para hacerlo real y sostenible. ¿Cómo defines el amor en tu vida? No basta con sentirlo; hay que construirlo día a día con gestos concretos. Sé leal a tu propio corazón primero, luego extiende esa fidelidad hacia quienes amas. El amor verdadero tiene forma; se ve en las acciones cotidianas, no solo en las palabras."
    },
    "31": {
        short_description: "Lidera con alegría: hoy el niño mágico interior toma el mando y transforma la seriedad en creatividad.",
        long_description: "El Mono Entonado Azul toma el mando con la energía juguetona de quien sabe que la vida es un juego sagrado. El Tono Entonado (5) te empodera para liderar desde la creatividad, no desde la rigidez. ¿Cuándo dejaste de jugar? Hoy el universo te corona como rey o reina del esparcimiento consciente. Ríete de tus dramas, sorprende a quienes te rodean, inventa nuevas reglas. La magia brota cuando te permites ser inocentemente impredecible."
    },
    "32": {
        short_description: "Equilibra tu libertad: hoy la sabiduría te pide balancear lo que quieres con lo que necesitas.",
        long_description: "El Humano Rítmico Amarillo organiza el equilibrio entre la voluntad personal y la responsabilidad colectiva. El Tono Rítmico (6) te ayuda a encontrar armonía entre tu libertad individual y tu compromiso con el mundo. ¿Qué decisiones necesitan ser equilibradas hoy? No se trata de elegir entre ti y los otros; se trata de integrar ambas necesidades en una danza fluida. Tu sabiduría innata sabe cómo hacerlo; escúchala."
    },
    "33": {
        short_description: "Canaliza la aventura: hoy el explorador cósmico te inspira a soñar con horizontes sin límites.",
        long_description: "El Caminante del Cielo Resonante Rojo sintoniza con la fuente de toda exploración y profecía. El Tono Resonante (7) te convierte en canal de la inspiración viajera. ¿Qué territorios inexplorados te llaman, física o espiritualmente? Hoy siente la expansión del espacio dentro de ti. No necesitas viajar lejos para explorar; el mayor viaje es hacia las profundidades de tu propia consciencia. Sé el pilar que conecta cielo y tierra mientras caminas entre mundos."
    },
    "34": {
        short_description: "Vive la magia con integridad: hoy el hechicero interior modela la realidad desde la coherencia del corazón.",
        long_description: "El Mago Galáctico Blanco armoniza la atemporalidad con la acción íntegra. El Tono Galáctico (8) te desafía: ¿vives la magia que predicas? Hoy no basta con hablar de espiritualidad; hay que encarnarla en cada gesto. Sé el modelo de presencia consciente que quieres ver en el mundo. Cuando tus acciones reflejan tu verdad interior, el encanto natural de tu ser se despliega sin esfuerzo. Eres atemporal; recuérdalo."
    },
    "35": {
        short_description: "Crea con intención: hoy la visión del águila solar se realiza a través de tu mente enfocada.",
        long_description: "El Águila Solar Azul pulsa con la intención de crear desde la visión más elevada. El Tono Solar (9) realiza tus pensamientos más luminosos en forma tangible. ¿Qué visión estás listo para materializar? Hoy tu mente es una herramienta creadora de enorme poder. Enfoca tu atención en lo que deseas manifestar, no en lo que temes. El águila ve desde alturas que otros no alcanzan; usa esa perspectiva para crear algo verdaderamente significativo."
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
console.log("✨ Premium texts updated for Kines 1-35!");
