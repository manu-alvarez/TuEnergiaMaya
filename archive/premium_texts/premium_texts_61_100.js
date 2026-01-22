const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'frontend/src/data/dailyData.json');

const premiumTexts = {
    "61": {
        short_description: "Nutre tu intención solar: hoy el pulso de la creación te pide que des vida a tus visiones más elevadas.",
        long_description: "El Dragón Solar Rojo te invita a realizar la abundancia del ser a través de la intención pura. El Tono Solar (9) pulsa con la fuerza de la realización: de nada sirve la idea si no se nutre con acción. Hoy es un día para poner tu energía en aquello que quieres ver nacer. Honra tus necesidades básicas, pero hazlo desde la consciencia de que eres un canal de la vida misma. Al nutrirte a ti mismo, nutres el propósito del universo."
    },
    "62": {
        short_description: "Manifiesta el aliento del espíritu: hoy tus palabras tienen el poder de perfeccionar la realidad que te rodea.",
        long_description: "El Viento Planetario Blanco llega para producir la manifestación del espíritu a través de la palabra. El Tono Planetario (10) te pide resultados concretos: ¿Cómo estás comunicando tu verdad? No te quedes en el pensamiento, exprésalo. La comunicación hoy es medicina que sana y ordena el entorno. Sé impecable con tu palabra, deja que el aliento divino pase a través de ti sin filtros y observa cómo tu realidad se ajusta a la frecuencia de tu esencia más pura."
    },
    "63": {
        short_description: "Libera la abundancia de tus sueños: hoy la noche espiritual disuelve los límites de lo posible.",
        long_description: "La Noche Espectral Azul nos trae la medicina de la liberación a través de la intuición profunda. El Tono Espectral (11) te invita a soltar el control y permitir que el misterio te guíe. ¿Qué miedos te impiden soñar en grande? Hoy es el día para disolverlos. Entra en el santuario de tu silencio interior, allí donde la abundancia es infinita, y permite que la magia de lo desconocido te renueve. No busques respuestas lógicas; busca la paz en el misterio."
    },
    "64": {
        short_description: "Coopera con el florecimiento: tu consciencia es una semilla que busca universalizarse en la red de la vida.",
        long_description: "La Semilla Cristal Amarilla convoca a la cooperación para el crecimiento colectivo. El Tono Cristal (12) nos recuerda que el florecimiento no es un acto solitario, sino un tejido compartido. ¿Cómo puedes dedicar tu talento al servicio de la comunidad? Hoy es un día excelente para compartir ideas, colaborar en proyectos y sembrar intenciones que beneficien a todos. Tu sabiduría individual se potencia cuando se une a la consciencia del grupo. Florecemos juntos."
    },
    "65": {
        short_description: "Trasciende a través de la vida: hoy tu instinto se eleva para conectar con la presencia del infinito.",
        long_description: "La Serpiente Cósmica Roja cierra el ciclo de la fuerza vital con una invitación a la trascendencia. El Tono Cósmico (13) te eleva más allá de los instintos básicos hacia una comprensión corporal de la divinidad. Tu cuerpo es un templo sagrado; hónralo hoy. Siente la energía circulando por tu columna, activa tu pasión y permite que esa vitalidad te lleve a un estado de presencia absoluta. No hay nada que buscar fuera; la vida está ocurriendo, vibrante y poderosa, dentro de cada una de tus células."
    },
    "66": {
        short_description: "Inicia el puente hacia lo nuevo: hoy atraer la oportunidad requiere dejar ir lo que ya no te pertenece.",
        long_description: "El Enlazador de Mundos Magnético Blanco abre una nueva Onda Encantada con la misión de unificar la muerte y el renacimiento. El Tono Magnético (1) te atrae hacia la oportunidad de cerrar ciclos pendientes. ¿Qué te impide avanzar? Hoy el universo te da la fuerza para soltar, perdonar y cruzar el puente hacia una versión más ligera de ti mismo. No temas al vacío; es el espacio donde nacerán tus nuevas posibilidades. Sé el puente entre tus mundos."
    },
    "67": {
        short_description: "Identifica el desafío de sanar: hoy el conocimiento requiere equilibrio para transformarse en medicina.",
        long_description: "La Mano Lunar Azul presenta el desafío de la realización frente a la duda. El Tono Lunar (2) nos muestra las dos caras de nuestra capacidad de hacer: la labor que agota y la acción que sana. ¿Dónde estás forzando tus manos? Identifica qué necesita ser reparado en tu vida personal hoy. La sanación no es un destino, es un proceso de equilibrio constante. Toca tu realidad con suavidad, conoce tus límites y permite que tu conocimiento sea un bálsamo, no una carga."
    },
    "68": {
        short_description: "Activa la belleza del servicio: hoy tu arte es la mejor forma de inspirar armonía en los demás.",
        long_description: "La Estrella Eléctrica Amarilla activa la frecuencia del arte como un acto de servicio. El Tono Eléctrico (3) vincula tu capacidad de embellecer con la necesidad del entorno. ¿Cómo puedes usar tu elegancia natural para mejorar el día de alguien? No se trata de decoración, sino de ética estética: crear armonía allí donde hay caos. Tu brillo hoy tiene un propósito social; úsalo para elevar la vibración de quienes te rodean a través de la creatividad y la gracia."
    },
    "69": {
        short_description: "Define la forma del flujo: hoy tus emociones necesitan un cauce claro para purificar tu esencia.",
        long_description: "La Luna Autoexistente Roja nos pide dar estructura a nuestra sensibilidad. El Tono Autoexistente (4) mide la intensidad emocional para que no nos desborde, sino que nos limpie. ¿Qué sentimientos necesitan un nombre hoy? Al definir lo que sientes, dejas de ser víctima de tus estados de ánimo y te convietes en el navegante de tus propias aguas. Crea rituales sencillos que te den paz: un baño, un momento junto al agua, o simplemente respirar tu sentir presente."
    },
    "70": {
        short_description: "Comanda con el corazón: hoy el esplendor de la lealtad te da el mando sobre tu propia vida.",
        long_description: "El Perro Entonado Blanco te confiere el poder de liderar desde el amor incondicional. El Tono Entonado (5) te empodera para tomar el mando de tus afectos: ¿Eres leal a ti mismo? Hoy el universo te recuerda que el verdadero líder no manda por fuerza, sino por la autoridad que da un corazón íntegro. Protege tus límites con ternura, cuida a quienes amas y, sobre todo, sé tu mejor compañero. Tu fuerza emana de la paz que sientes al estar en coherencia con tus sentimientos."
    },
    "71": {
        short_description: "Organiza la magia del ritmo: hoy el equilibrio se encuentra en el juego constante de la vida.",
        long_description: "El Mono Rítmico Azul te invita a estructurar tu día con espacio para la improvisación y la risa. El Tono Rítmico (6) organiza el equilibrio: ni demasiada seriedad, ni caos total. Encuentra el ritmo de tu propia magia. ¿Cómo puedes hacer que tus responsabilidades se sientan como un juego? Cuando dejas de luchar contra la realidad y empiezas a jugar con ella, el estrés se disuelve. Sé flexible, sé ingenioso y permite que el niño interior organice tu agenda hoy."
    },
    "72": {
        short_description: "Sintoniza tu sabiduría interna: hoy eres el canal donde el libre albedrío se encuentra con la fuente divina.",
        long_description: "El Humano Resonante Amarillo sintoniza tu capacidad de elegir con la inspiración del espíritu. El Tono Resonante (7) te pide ser un canal limpio para la sabiduría. ¿Estás decidiendo desde el miedo o desde tu verdad más alta? Hoy el universo te inspira a ejercer tu libertad con consciencia. Escucha los consejos que vienen del silencio, sintoniza tu mente con frecuencias de luz y permite que tu presencia sea una influencia positiva para todos. Tú eres el arquitecto de tu destino."
    },
    "73": {
        short_description: "Armoniza tu espacio vital: hoy la exploración requiere integridad para expandir tus horizontes.",
        long_description: "El Caminante del Cielo Galáctico Rojo nos invita a modelar la armonía entre nuestra vida cotidiana y nuestros anhelos de exploración. El Tono Galáctico (8) pregunta: ¿Vives con la misma libertad con la que sueñas? Hoy integra tus aventuras interiores con tus acciones externas. Vigila tu espacio personal, asegúrate de que sea un reflejo de tu búsqueda espiritual. Cuando hay integridad en tu caminar, cada paso te lleva a un nuevo nivel de consciencia. Explora tu hogar como si fuera un templo."
    },
    "74": {
        short_description: "Realiza el hechizo de hoy: tu intención tiene el poder de encantar el momento presente con atemporalidad.",
        long_description: "El Mago Solar Blanco pulsa con la intención de realizar el aquí y el ahora. El Tono Solar (9) enfoca tu poder en la presencia: no hay mañana que planear ni ayer que lamentar. ¿Cómo puedes embellecer este instante único? Tu capacidad de encantar la realidad nace de tu capacidad de estar plenamente presente. Deja que tu receptividad sea el imán que atraiga la magia. Realiza tus tareas con la consciencia de un místico: con atención total y amor infinito."
    },
    "75": {
        short_description: "Manifiesta la visión elevada: hoy tu mente se perfecciona para crear realidades desde las alturas.",
        long_description: "El Águila Planetario Azul llega para producir la manifestación de una visión superior. El Tono Planetario (10) te pide resultados visibles de tu claridad mental. ¿Qué gran sueño quieres ver materializado? No te pierdas en los detalles del suelo; levanta el vuelo y observa el mapa completo. Hoy es un día para planificar con estrategia y ejecutar con precisión. Tu mente es una herramienta de creación poderosa; úsala para manifestar un futuro donde la libertad y la visión sean posibles."
    },
    "76": {
        short_description: "Libera el miedo a cuestionar: hoy la inteligencia del guerrero disuelve las dudas que frenan tu avance.",
        long_description: "El Guerrero Espectral Amarillo nos trae la medicina de la liberación a través de la intrepidez. El Tono Espectral (11) te invita a soltar las seguridades falsas y cuestionar todo aquello que te limita. ¿A qué le tienes miedo realmente? Hoy disuelve esas sombras con la luz de tu inteligencia. No necesitas pelear, solo necesitas ser lo suficientemente valiente para preguntar la verdad. Al liberar el juicio y el temor, recuperas tu poder guerrero para caminar con paso firme hacia tu propia luz."
    },
    "77": {
        short_description: "Coopera con la evolución: la Tierra te llama a sincronizar tu camino con el ritmo universal.",
        long_description: "La Tierra Cristal Roja convoca a la cooperación con los ritmos del planeta. El Tono Cristal (12) nos recuerda que somos parte de un cuerpo mayor llamado Gaia. ¿Cómo puedes dedicar tus acciones a la sanación de la Tierra? Hoy presta atención a las sincronicidades; son el lenguaje de la cooperación cósmica. Únete a otros en propósitos de evolución, comparte tus visiones de un mundo mejor y permite que la navegación colectiva te lleve a buen puerto. Todos estamos navegando el mismo barco estelar."
    },
    "78": {
        short_description: "Trasciende a través del orden: hoy el espejo de la verdad te eleva hacia la claridad absoluta de tu ser.",
        long_description: "El Espejo Cósmico Blanco cierra el ciclo de la verdad con una invitación a la presencia infinita. El Tono Cósmico (13) te eleva más allá de las imágenes reflejadas hacia la esencia pura que no cambia. ¿Qué queda de ti cuando se acaban las etiquetas? Hoy trasciende el juicio y el autoengaño. Mira a tu alrededor y reconoce que todo es un reflejo de tu propia consciencia. En ese orden sin fin, encuentras la paz de saber que eres uno con el todo. La verdad te hace libre, y hoy esa libertad es tu hogar."
    },
    "79": {
        short_description: "Inicia tu autogeneración: hoy atraer la transformación requiere que seas el epicentro de tu propio cambio.",
        long_description: "La Tormenta Magnética Azul abre la Onda Encantada de la Autogeneración. El Tono Magnético (1) unifica tu propósito de renovarte por completo. No esperes a que la vida te cambie; sé tú el rayo que inicie la catarsis. ¿Qué estructuras de tu personalidad están listas para ser demolidas? Atrae la energía necesaria para reconstruirte desde cero. Es un día de gran potencia: permite que la lluvia limpie tu pasado y que el trueno despierte tu poder dormido. Tú eres la fuente de tu propia energía."
    },
    "80": {
        short_description: "Identifica el desafío de iluminar: hoy la vida te pide equilibrar tu fuego interior para no quemar, sino dar calor.",
        long_description: "El Sol Lunar Amarillo presenta el desafío de la iluminación frente a la ceguera del ego. El Tono Lunar (2) nos muestra los polos de nuestra luz: ¿brillas para alimentar tu importancia personal o para dar vida a los demás? Estabiliza tu fuego interno. Identifica qué sombras intentan apagar tu entusiasmo y dales luz con compasión. Hoy es un día para aprender que el calor más genuino es el que nace de un amor incondicional por la vida, aceptando tanto el día como la noche."
    },
    "81": {
        short_description: "Activa el servicio a la vida: hoy tu nutrición es la chispa que enciende el bienestar ajeno.",
        long_description: "El Dragón Eléctrico Rojo activa la frecuencia del cuidado primordial como un acto de servicio. El Tono Eléctrico (3) vincula tu necesidad de ser nutrido con la labor de nutrir a tu entorno. ¿Cómo puedes ser la madre o el padre que alguien necesita hoy? No se trata solo de comida, sino de contención, de presencia, de dar nacimiento a nuevas ideas. Al activar tu propia energía vital, sirves al nacimiento de un mundo más tierno y consciente. Tu cuidado es la medicina del hoy."
    },
    "82": {
        short_description: "Define la forma del aliento: hoy tu comunicación necesita un marco claro para dar espíritu a tus actos.",
        long_description: "El Viento Autoexistente Blanco nos pide estructurar nuestro diálogo interno y externo. El Tono Autoexistente (4) da forma a tus palabras para que no se las lleve el aire, sino que dejen huella. ¿Qué principios definen tu comunicación hoy? Sé preciso, sé honesto y utiliza el lenguaje para construir una realidad con alma. Al definir lo que dices, también defines quién eres. Respira con consciencia y deja que cada palabra sea un reflejo de tu espíritu arquitecto."
    },
    "83": {
        short_description: "Comanda tu intuición: hoy el esplendor de tus sueños te da el poder para navegar en la abundancia.",
        long_description: "La Noche Entonada Azul te confiere el poder de tomar el mando de tu mundo onírico. El Tono Entonado (5) te empodera para confiar plenamente en tus corazonadas. ¿Hacia dónde te guía tu voz interior? No permitas que el ruido externo opaque tu visión profunda. Hoy tienes el esplendor necesario para entrar en el silencio y reclamar los tesoros de tu psique. Tu abundancia es un derecho de nacimiento; manda sobre ella con confianza y deja que la magia de la noche te dé el mando de tu destino."
    },
    "84": {
        short_description: "Organiza el florecimiento rítmico: hoy el equilibrio se encuentra en permitir que cada intención madure a su tiempo.",
        long_description: "La Semilla Rítmica Amarilla te invita a encontrar el paso perfecto para tu crecimiento personal. El Tono Rítmico (6) organiza el flujo: ni un crecimiento acelerado que agote, ni un estancamiento que marchite. Encuentra tu ritmo natural de expansión. ¿Cómo puedes cuidar tus proyectos hoy sin estresarte? Dale a cada cosa su tiempo, respeta tus procesos de aprendizaje y permite que el equilibrio sea la tierra fértil donde florezca tu consciencia. La paciencia es el ritmo del universo."
    },
    "85": {
        short_description: "Sintoniza tu fuerza vital: hoy eres el canal donde el instinto se encuentra con la pasión inspirada.",
        long_description: "La Serpiente Resonante Roja sintoniza tu vitalidad con la sintonización del espíritu. El Tono Resonante (7) te pide ser un canal para la energía vital. ¿Sientes el pulso de la vida en tus venas? Hoy no luches contra tus deseos o instintos; sintonízalos con un propósito elevado. Deja que la pasión te inspire, permite que tu cuerpo se convierta en una antena que capte la fuerza vital del cosmos. Cuando vibras en armonía con tu naturaleza, la fatiga desaparece y eres pura vitalidad en movimiento."
    },
    "86": {
        short_description: "Armoniza el cierre de ciclos: hoy la muerte simbólica requiere integridad para abrir nuevos puentes.",
        long_description: "El Enlazador de Mundos Galáctico Blanco nos invita a modelar la armonía en nuestros procesos de desapego. El Tono Galáctico (8) pregunta: ¿Sueltas con la misma paz con la que abrazas? Hoy integra tus duelos o finales con la integridad de saber que todo es impermanente. No retengas lo que ya murió. Al armonizar tus cierres, te conviertes en una persona íntegra que sabe habitar ambos lados del puente. La oportunidad nace de la limpieza absoluta de tu espacio interior."
    },
    "87": {
        short_description: "Realiza la sanación solar: hoy tu intención focalizada tiene el poder de concretar la curación emocional.",
        long_description: "La Mano Solar Azul pulsa con la intención de realizar la obra de sanación. El Tono Solar (9) enfoca tu voluntad en el acto de conocer y curar. No lo postergues más: hoy es el día para realizar esa tarea pendiente, para concretar ese conocimiento o para finalizar ese proceso de sanación personal. Tu intención es el bisturí que corta el dolor y tu presencia es la venda que sana. Realiza tus actos con la certeza de que tus manos están guiadas por una sabiduría superior."
    },
    "88": {
        short_description: "Manifiesta el arte estelar: hoy tu belleza interior busca formas concretas para embellecer el mundo.",
        long_description: "La Estrella Planetaria Amarilla llega para producir la manifestación de la elegancia divina. El Tono Planetario (10) te pide resultados estéticos: ¿En qué belleza has trabajado hoy? No te quedes solo en la intención de ser armonioso; crea algo hermoso. Decora tu entorno, mejora una relación con elegancia, produce una obra creativa. Tu arte tiene peso hoy; debe verse, tocarse y sentirse. Al manifestar armonía fuera, consolidas la paz en tu interior. Eres el pincel del cosmos."
    },
    "89": {
        short_description: "Libera tus sentimientos retenidos: hoy el agua universal disuelve las amarras que estancan tu flujo.",
        long_description: "La Luna Espectral Roja nos trae la medicina de la liberación emocional total. El Tono Espectral (11) te invita a soltar las represas de tu corazón. ¿Qué contenías por miedo al juicio? Hoy suéltalo. Llora, fluye, deja que la corriente se lleve la pesadez. Al liberar tus emociones, purificas tu canal y recuperas la fluidez natural de la vida. No temas a la tormenta emocional; después de ella, el agua queda mansa y cristalina, lista para reflejar de nuevo el sol."
    },
    "90": {
        short_description: "Coopera con la lealtad: hoy el amor incondicional busca universalizarse a través de tus vínculos.",
        long_description: "El Perro Cristal Blanco convoca a la cooperación desde el corazón. El Tono Cristal (12) nos recuerda que somos una familia humana unida por el amor. ¿Cómo puedes dedicar hoy tus afectos al bienestar del grupo? Comparte tu lealtad, sé el amigo que todos necesitan, practica la amabilidad universal. Cuando cooperamos desde el amor genuino, sin condiciones, transformamos nuestro entorno en un lugar seguro. Tu ternura hoy es la pegamento que une a la comunidad en un propósito de paz."
    },
    "91": {
        short_description: "Trasciende a través de la magia: hoy tu juego interior se eleva para conectar con la magia atemporal de la vida.",
        long_description: "El Mono Cósmico Azul cierra el ciclo de la magia con una invitación a la presencia lúdica absoluta. El Tono Cósmico (13) te eleva más allá de las ilusiones cotidianas hacia la comprensión de que todo es una gran obra divina. ¿Puedes reírte de tus propios dramas hoy? Trasciende la seriedad, abraza la espontaneidad y permite que la magia te transporte a un estado de asombro constante. Cuando dejas de intentar controlar la función, empiezas a disfrutar del baile cósmico. La vida es corta; juega como si fuera la primera vez."
    },
    "92": {
        short_description: "Inicia tu camino de sabiduría: hoy atraer tu libertad requiere que elijas con la fuerza de tu libre albedrío.",
        long_description: "El Humano Magnético Amarillo abre la Onda Encantada de la Sabiduría. El Tono Magnético (1) unifica tu propósito de ser auténticamente libre. No permitas que otros elijan por ti; hoy atrae la soberanía sobre tus decisiones. ¿Qué camino dicta tu sabiduría interior? Es un día para reclamar tu poder de influenciar positivamente tu entorno a través de tu ejemplo. Atrae los recursos, las personas y las situaciones que te permitan vivir bajo tus propios principios sagrados. Eres libre por diseño divino."
    },
    "93": {
        short_description: "Identifica el desafío de explorar: hoy aventurarse requiere equilibrar tu espacio conocido con lo desconocido.",
        long_description: "El Caminante del Cielo Lunar Rojo presenta el desafío de la exploración frente al miedo a la inseguridad. El Tono Lunar (2) nos muestra los polos de nuestra búsqueda: ¿exploras para escapar o para crecer? Estabiliza tu necesidad de aventura. Identifica qué fronteras internas necesitas cruzar hoy sin perder tu centro. La vigilancia es clave: observa tus pensamientos mientras te adentras en lo nuevo. La libertad tiene un precio: el coraje de soltar la orilla para descubrir nuevos mares."
    },
    "94": {
        short_description: "Activa el servicio de la atemporalidad: hoy tu presencia mágica es el regalo que el momento presente necesita.",
        long_description: "El Mago Eléctrico Blanco activa la frecuencia del encanto como un acto de servicio. El Tono Eléctrico (3) vincula tu capacidad de estar presente con la sanación de tu entorno. ¿Cómo puedes embellecer el 'ahora' de quienes te rodean? No hables del pasado ni del futuro; sé el pilar de paz en este instante. Tu receptividad ante las necesidades del otro se convierte en una herramienta mágica que disuelve el tiempo y el estrés. Estar plenamente aquí es tu mayor servicio hoy."
    },
    "95": {
        short_description: "Define la forma de tu visión: hoy tu mente necesita una estructura clara para crear horizontes nuevos.",
        long_description: "El Águila Autoexistente Azul nos pide dar forma a nuestros grandes sueños. El Tono Autoexistente (4) provee la arquitectura necesaria para que tu visión no sea solo un espejismo, sino un plano ejecutable. ¿Hacia dónde se dirige tu mirada hoy? Define tus metas, establece prioridades y da estructura a tus pensamientos. Al medir el alcance de tus alas, aseguras un vuelo estable hacia tus propósitos más elevados. La mente creativa necesita el orden del arquitecto para construir realidades."
    },
    "96": {
        short_description: "Comanda tu valentía: hoy el esplendor de tu inteligencia te da el mando para cuestionar sin miedo.",
        long_description: "El Guerrero Entonado Amarillo te confiere el poder de liderar desde la intrepidez. El Tono Entonado (5) te empodera para enfrentar tus dudas con el mando de un estratega espiritual. ¿A qué verdad le has estado rehuyendo? Hoy el esplendor de tu inteligencia brilla para disipar las nubes de la ignorancia. Toma el mando de tu vida, haz las preguntas difíciles y avanza con confianza. Tu fuerza emana de tu capacidad de cuestionar con integridad y de tu valor para ser tú mismo en cualquier batalla."
    },
    "97": {
        short_description: "Organiza la evolución rítmica: hoy el equilibrio se encuentra en navegar las señales que la Tierra te da.",
        long_description: "La Tierra Rítmica Roja te invita a encontrar el ritmo perfecto en tu proceso de cambio. El Tono Rítmico (6) organiza el flujo de las sincronicidades cotidianas. ¿Sientes que la vida te empuja o que te frena? Busca el punto medio. Organiza tu día prestando atención a los mensajes que el entorno te envía. El equilibrio no es estatismo, es navegación fluida. Permite que la Tierra sea tu brújula rítmica hoy, ajustando tu paso a la música de la evolución natural."
    },
    "98": {
        short_description: "Sintoniza tu verdad interna: hoy eres el canal donde el orden divino se encuentra con la claridad inspirada.",
        long_description: "El Espejo Resonante Blanco sintoniza tu consciencia con la fuente de la verdad absoluta. El Tono Resonante (7) te pide ser un canal limpio donde el universo pueda reflejarse sin distorsión. ¿Hay desorden en tu interior? Sintoniza hoy con el silencio para que las aguas de tu mente se calmen y puedas ver la verdad. No juzgues lo que ves reflejado; simplemente obsérvalo. Al ser un canal de claridad, inspiras a otros a poner orden en sus propias vidas a través de la honestidad radical."
    },
    "99": {
        short_description: "Armoniza tu autogeneración: hoy la transformación requiere integridad para que el cambio sea constructivo.",
        long_description: "La Tormenta Galáctica Azul nos invita a modelar la armonía en medio de la intensidad de la transformación. El Tono Galáctico (8) pregunta: ¿Vives tu renovación con la misma integridad con la que la deseas? Hoy integra tus procesos de cambio con la consciencia de no dañar, sino de reconstruir. El caos es solo el preludio de un nuevo orden. Armoniza tus impulsos, canaliza tus rayos emocionales hacia fines constructivos y sé íntegro en cada paso de tu reinvención personal."
    },
    "100": {
        short_description: "Realiza la iluminación solar: hoy tu intención focalizada tiene el poder de dar vida a tu propia consciencia.",
        long_description: "El Sol Solar Amarillo pulsa con la intención de realizar la plenitud del ser. El Tono Solar (9) enfoca tu voluntad en el acto de brillar y dar calor. No esperes a que otros te iluminen; realiza hoy tus actos desde tu propio fuego divino. ¿Cómo puedes amar la vida con mayor intensidad hoy? Tu intención es el motor que mueve el fuego universal dentro de ti. Produce luz, ofrece calor incondicional y realiza tu destino como un ser solar que ha venido a este mundo a iluminar cada rincón de su realidad."
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
console.log("✨ Premium texts updated for Kines 61-100!");
