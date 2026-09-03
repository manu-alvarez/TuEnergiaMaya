import{c as ue,j as o,b as me,d as pe,r as p,u as ge,v as be,P as D,f as E,e as w,R as r,h as ye,s as Q,m as fe,a0 as j,B as b,a as R,T as y,N,M as H,i as F,F as V,I as B}from"./index-O4Y8LtlB.js";import{C as O}from"./Close-C8s1395D.js";import{G as U}from"./Grid-BysahTlU.js";import{C as ve}from"./Card-p1hjlkLp.js";import{C as xe}from"./CardContent-DiCrG6My.js";import"./isMuiElement-CcUBHFow.js";const Ce=ue(o.jsx("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}));function he(e){return me("MuiChip",e)}const n=pe("MuiChip",["root","sizeSmall","sizeMedium","colorDefault","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","filledPrimary","filledSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","deleteIconFilledColorPrimary","deleteIconFilledColorSecondary","focusVisible"]),Se=e=>{const{classes:l,disabled:a,size:i,color:t,iconColor:f,onDelete:c,clickable:d,variant:m}=e,v={root:["root",m,a&&"disabled",`size${r(i)}`,`color${r(t)}`,d&&"clickable",d&&`clickableColor${r(t)}`,c&&"deletable",c&&`deletableColor${r(t)}`,`${m}${r(t)}`],label:["label",`label${r(i)}`],avatar:["avatar",`avatar${r(i)}`,`avatarColor${r(t)}`],icon:["icon",`icon${r(i)}`,`iconColor${r(f)}`],deleteIcon:["deleteIcon",`deleteIcon${r(i)}`,`deleteIconColor${r(t)}`,`deleteIcon${r(m)}Color${r(t)}`]};return ye(v,he,l)},ze=Q("div",{name:"MuiChip",slot:"Root",overridesResolver:(e,l)=>{const{ownerState:a}=e,{color:i,iconColor:t,clickable:f,onDelete:c,size:d,variant:m}=a;return[{[`& .${n.avatar}`]:l.avatar},{[`& .${n.avatar}`]:l[`avatar${r(d)}`]},{[`& .${n.avatar}`]:l[`avatarColor${r(i)}`]},{[`& .${n.icon}`]:l.icon},{[`& .${n.icon}`]:l[`icon${r(d)}`]},{[`& .${n.icon}`]:l[`iconColor${r(t)}`]},{[`& .${n.deleteIcon}`]:l.deleteIcon},{[`& .${n.deleteIcon}`]:l[`deleteIcon${r(d)}`]},{[`& .${n.deleteIcon}`]:l[`deleteIconColor${r(i)}`]},{[`& .${n.deleteIcon}`]:l[`deleteIcon${r(m)}Color${r(i)}`]},l.root,l[`size${r(d)}`],l[`color${r(i)}`],f&&l.clickable,f&&i!=="default"&&l[`clickableColor${r(i)}`],c&&l.deletable,c&&i!=="default"&&l[`deletableColor${r(i)}`],l[m],l[`${m}${r(i)}`]]}})(fe(({theme:e})=>{const l=e.palette.mode==="light"?e.palette.grey[700]:e.palette.grey[300];return{maxWidth:"100%",fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,lineHeight:1.5,color:(e.vars||e).palette.text.primary,backgroundColor:(e.vars||e).palette.action.selected,borderRadius:32/2,whiteSpace:"nowrap",transition:e.transitions.create(["background-color","box-shadow"]),cursor:"unset",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box",[`&.${n.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`& .${n.avatar}`]:{marginLeft:5,marginRight:-6,width:24,height:24,color:e.vars?e.vars.palette.Chip.defaultAvatarColor:l,fontSize:e.typography.pxToRem(12)},[`& .${n.avatarColorPrimary}`]:{color:(e.vars||e).palette.primary.contrastText,backgroundColor:(e.vars||e).palette.primary.dark},[`& .${n.avatarColorSecondary}`]:{color:(e.vars||e).palette.secondary.contrastText,backgroundColor:(e.vars||e).palette.secondary.dark},[`& .${n.avatarSmall}`]:{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:e.typography.pxToRem(10)},[`& .${n.icon}`]:{marginLeft:5,marginRight:-6},[`& .${n.deleteIcon}`]:{WebkitTapHighlightColor:"transparent",color:e.alpha((e.vars||e).palette.text.primary,.26),fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:e.alpha((e.vars||e).palette.text.primary,.4)}},variants:[{props:{size:"small"},style:{height:24,[`& .${n.icon}`]:{fontSize:18,marginLeft:4,marginRight:-4},[`& .${n.deleteIcon}`]:{fontSize:16,marginRight:4,marginLeft:-4}}},...Object.entries(e.palette).filter(j(["contrastText"])).map(([a])=>({props:{color:a},style:{backgroundColor:(e.vars||e).palette[a].main,color:(e.vars||e).palette[a].contrastText,[`& .${n.deleteIcon}`]:{color:e.alpha((e.vars||e).palette[a].contrastText,.7),"&:hover, &:active":{color:(e.vars||e).palette[a].contrastText}}}})),{props:a=>a.iconColor===a.color,style:{[`& .${n.icon}`]:{color:e.vars?e.vars.palette.Chip.defaultIconColor:l}}},{props:a=>a.iconColor===a.color&&a.color!=="default",style:{[`& .${n.icon}`]:{color:"inherit"}}},{props:{onDelete:!0},style:{[`&.${n.focusVisible}`]:{backgroundColor:e.alpha((e.vars||e).palette.action.selected,`${(e.vars||e).palette.action.selectedOpacity} + ${(e.vars||e).palette.action.focusOpacity}`)}}},...Object.entries(e.palette).filter(j(["dark"])).map(([a])=>({props:{color:a,onDelete:!0},style:{[`&.${n.focusVisible}`]:{background:(e.vars||e).palette[a].dark}}})),{props:{clickable:!0},style:{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:e.alpha((e.vars||e).palette.action.selected,`${(e.vars||e).palette.action.selectedOpacity} + ${(e.vars||e).palette.action.hoverOpacity}`)},[`&.${n.focusVisible}`]:{backgroundColor:e.alpha((e.vars||e).palette.action.selected,`${(e.vars||e).palette.action.selectedOpacity} + ${(e.vars||e).palette.action.focusOpacity}`)},"&:active":{boxShadow:(e.vars||e).shadows[1]}}},...Object.entries(e.palette).filter(j(["dark"])).map(([a])=>({props:{color:a,clickable:!0},style:{[`&:hover, &.${n.focusVisible}`]:{backgroundColor:(e.vars||e).palette[a].dark}}})),{props:{variant:"outlined"},style:{backgroundColor:"transparent",border:e.vars?`1px solid ${e.vars.palette.Chip.defaultBorder}`:`1px solid ${e.palette.mode==="light"?e.palette.grey[400]:e.palette.grey[700]}`,[`&.${n.clickable}:hover`]:{backgroundColor:(e.vars||e).palette.action.hover},[`&.${n.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`& .${n.avatar}`]:{marginLeft:4},[`& .${n.avatarSmall}`]:{marginLeft:2},[`& .${n.icon}`]:{marginLeft:4},[`& .${n.iconSmall}`]:{marginLeft:2},[`& .${n.deleteIcon}`]:{marginRight:5},[`& .${n.deleteIconSmall}`]:{marginRight:3}}},...Object.entries(e.palette).filter(j()).map(([a])=>({props:{variant:"outlined",color:a},style:{color:(e.vars||e).palette[a].main,border:`1px solid ${e.alpha((e.vars||e).palette[a].main,.7)}`,[`&.${n.clickable}:hover`]:{backgroundColor:e.alpha((e.vars||e).palette[a].main,(e.vars||e).palette.action.hoverOpacity)},[`&.${n.focusVisible}`]:{backgroundColor:e.alpha((e.vars||e).palette[a].main,(e.vars||e).palette.action.focusOpacity)},[`& .${n.deleteIcon}`]:{color:e.alpha((e.vars||e).palette[a].main,.7),"&:hover, &:active":{color:(e.vars||e).palette[a].main}}}}))]}})),Ee=Q("span",{name:"MuiChip",slot:"Label",overridesResolver:(e,l)=>{const{ownerState:a}=e,{size:i}=a;return[l.label,l[`label${r(i)}`]]}})({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap",variants:[{props:{variant:"outlined"},style:{paddingLeft:11,paddingRight:11}},{props:{size:"small"},style:{paddingLeft:8,paddingRight:8}},{props:{size:"small",variant:"outlined"},style:{paddingLeft:7,paddingRight:7}}]});function K(e){return e.key==="Backspace"||e.key==="Delete"}const je=p.forwardRef(function(l,a){const i=ge({props:l,name:"MuiChip"}),{avatar:t,className:f,clickable:c,color:d="default",component:m,deleteIcon:v,disabled:g=!1,icon:u,label:z,onClick:C,onDelete:h,onKeyDown:M,onKeyUp:P,size:W="medium",variant:J="filled",tabIndex:Z,skipFocusWhenDisabled:X=!1,slots:_={},slotProps:ee={},...oe}=i,ae=p.useRef(null),ne=be(ae,a),$=s=>{s.stopPropagation(),h(s)},le=s=>{s.currentTarget===s.target&&K(s)&&s.preventDefault(),M&&M(s)},re=s=>{s.currentTarget===s.target&&h&&K(s)&&h(s),P&&P(s)},q=c!==!1&&C?!0:c,L=q||h?D:m||"div",Y={...i,component:L,disabled:g,size:W,color:d,iconColor:p.isValidElement(u)&&u.props.color||d,onDelete:!!h,clickable:q,variant:J},S=Se(Y),ie=L===D?{component:m||"div",focusVisibleClassName:S.focusVisible,...h&&{disableRipple:!0}}:{};let I=null;h&&(I=v&&p.isValidElement(v)?p.cloneElement(v,{className:E(v.props.className,S.deleteIcon),onClick:$}):o.jsx(Ce,{className:S.deleteIcon,onClick:$}));let k=null;t&&p.isValidElement(t)&&(k=p.cloneElement(t,{className:E(S.avatar,t.props.className)}));let A=null;u&&p.isValidElement(u)&&(A=p.cloneElement(u,{className:E(S.icon,u.props.className)}));const T={slots:_,slotProps:ee},[se,te]=w("root",{elementType:ze,externalForwardedProps:{...T,...oe},ownerState:Y,shouldForwardComponentProp:!0,ref:ne,className:E(S.root,f),additionalProps:{disabled:q&&g?!0:void 0,tabIndex:X&&g?-1:Z,...ie},getSlotProps:s=>({...s,onClick:x=>{s.onClick?.(x),C?.(x)},onKeyDown:x=>{s.onKeyDown?.(x),le(x)},onKeyUp:x=>{s.onKeyUp?.(x),re(x)}})}),[de,ce]=w("label",{elementType:Ee,externalForwardedProps:T,ownerState:Y,className:S.label});return o.jsxs(se,{as:L,...te,children:[k||A,o.jsx(de,{...ce,children:z}),I]})}),qe={number:1,sealName:"Dragón",archetype:"La Fuerza Primigenia",poem:`Yo soy la Fuerza Primigenia
Codificada por el Dragón Rojo
Mi número es el uno
La unificación del ser primigenio`,fullText:`Yo soy la Fuerza Primigenia
Codificada por el Dragón Rojo
Mi número es el uno
La unificación del ser primigenio
Yo soy el Anciano de los Días
Entro en tu Universo
A través de la Primera Puerta de Luz
Yo guardo la memoria del ser cósmico
Dentro del origen primigenio
Lugar de nacimiento y morada de
Los creadores y maestros de las estrellas
La eternidad es mi tocado
Yo doy a luz a todas las formas
Y nutriendo cada una de ellas
Nutro la compasión por todos los seres vivientes
Despertando en ellos
Una esencia sellada en el génesis del eterno retorno de mis orígenes
Conocerme es vislumbrar la matriz primigenia
Y si tú me encuentras
Será sólo como un misterio
Reflejado hacia ti
Llamándote una y otra vez`},Le={number:2,sealName:"Viento",archetype:"La Suma Sacerdotisa",poem:`Yo soy la Suma Sacerdotisa
Codificada por el Viento Blanco
Entro en tu universo
A través de la Segunda Puerta de Luz`,fullText:`Yo soy la Suma Sacerdotisa
Codificada por el Viento Blanco
Entro en tu universo
A través de la Segunda Puerta de Luz
Mi número es el dos
El desafío del Viento
Cuando gira en cada dirección
Utilizando el poder de la "palabra"
Deja que tu lengua diga solamente lo que es glorioso
Este es mi desafío para ti -porque yo soy la Dama de los Vientos
Guardiana de los túneles de la mente abiertos a través de la canción cristal
Desde mi corona, mi cabello emerge
Como el moño del infinito
Yo soy la poseedora del espíritu de la profecía
Domino la energía del aliento llenando el cuerpo de vitalidad
La joya en mi frente es la sabiduría indestructible que ilumina
Todos mis pensamientos
Enviados por decreto divino
Mi mandamiento siempre se dirige
Sólo a la esencia de tu espíritu
Escúchame siempre que el viento
Surja de la nada`},Ye={number:3,sealName:"Noche",archetype:"El Soñador",poem:`Yo soy el Soñador
Codificado por la Noche Azul
Entro en tu Universo
A través de la Tercera Puerta de Luz`,fullText:`Yo soy el Soñador
Codificado por la Noche Azul
Entro en tu Universo
A través de la Tercera Puerta de Luz
Mi número es el tres
Activando y vinculando el sueño
La extensión infinita
De la noche estrellada es mi morada
La abundancia es mi naturaleza
La intuición mi guía
Yo sirvo a todos los soñadores con
El recuerdo y la inspiración divina de la verdad cósmica
No hay nadie que pueda vivir sin mí
Porque no hay nadie que no sueñe
Mi sueño es la verdad dentro del sueño
Cuando venga a ti, no dudes de mí
Porque traigo el recuerdo del Gran Sueño de la Tierra
Cuando las tribus del tiempo se soñaban a sí mismas como humanos
Y los humanos soñaban el sueño de la libre voluntad
Siempre hay un mensaje que traigo
Sólo para ti, que sólo tú puedes revelar
Escúchame y conoce por ti mismo
¡El interminable Mundo del Sueño Arco Iris de esplendor majestuoso!`},Me={number:4,sealName:"Semilla",archetype:"El Inocente",poem:`Yo soy el Inocente
Mi signo es la Semilla Amarilla
Entro en tu Universo
Desde la Cuarta Puerta de Luz`,fullText:`Yo soy el Inocente
Mi signo es la Semilla Amarilla
Entro en tu Universo
Desde la Cuarta Puerta de Luz
Mi número es el cuatro
Clara, auto-existente, intrínseca
Es la conciencia que es mi naturaleza
Transparente, radiante
Yo siembro las semillas de la omnisciencia
De la Tierra
Yo soy el florecimiento de la consciencia intrínseca
En pura consciencia porto los frutos del espíritu
Yo soy el florecimiento inimaginable de lo nuevo
Sin mancha de deseo, artificio
O motivación secreta
Yo soy el Loco Sagrado
La gente me confunde con un ingenuo
Pero soy simplemente la cara auto-reflejante de todas sus proyecciones
Si tú lo deseas y eres puro
Compartiré mi secreto contigo
Conocerme es ascender en la fuerza del espíritu`},Pe={number:5,sealName:"Serpiente",archetype:"Iniciado Serpiente",poem:`Yo soy el Iniciado de la Serpiente de la Sabiduría
Codificada por la Serpiente Roja
Cinco es mi número, porque la quinta fuerza
Es mi poder secreto`,fullText:`Yo soy el Iniciado de la Serpiente de la Sabiduría
Codificada por la Serpiente Roja
Cinco es mi número, porque la quinta fuerza
Es mi poder secreto
Yo soy la habitante de las cuevas ocultas
Y los templos de la Tierra
Los mundos perdidos y las razas raíz del pasado se
Integran en mí ser
Mi cuerpo es la ermita que posee
El conocimiento del lado oculto de las cosas
Yo soy la serpiente de la luz astral
La fuerza vital de la kundalini
La fuente de luz y vibración misma
Generadora del circuito eléctrico rojo
El misterio de la electricidad
Está enroscado en mi ser
Sobre mi entrecejo llevo el signo
De la serpiente que crea
Los ciclos de vida universal
El árbol del tiempo que gira en ambos sentidos
Es el signo de mi sabiduría
Para conocerme, necesitas dejar de ser
Quien tú crees que eres`},$e={number:6,sealName:"Enlazador de Mundos",archetype:"El Hierofante",poem:`Yo soy el Hierofante
Codificado por el Enlazador de Mundos Blanco
Seis es mi número
La raíz del cubo`,fullText:`Yo soy el Hierofante
Codificado por el Enlazador de Mundos Blanco
Seis es mi número
La raíz del cubo
Yo soy el gran igualador
Restaurando el equilibrio de todos los mundos
El orden sagrado de todas las dimensiones
Ilumina mi ser
Porque yo soy el maestro de las artes de la inmortalidad
Que todo buscador de la verdad debe llegar a conocer
La muerte es el gran reino interdimensional de la galaxia
El almacén de mi sabiduría
Es el cofre del tesoro escondido libre de temor
Diestro en el arte de enlazar los mundos
Yo soy el gran destructor del espejismo
Despojando la capa de los convencionalismos
Que la civilización cubre
Insondablemente profunda es la extensión de mi conocimiento
Yo revelo todo, pero sólo aquellos que saben pueden ver lo que revelo
El arco iris es mi corona
Perfecto es el orden que yo mantengo
Conocerme es morir a tu falso yo`},Ie={number:7,sealName:"Mano",archetype:"El Avatar",poem:`Yo soy el Avatar
Codificado por la Mano Azul
Por el poder del siete
Me desplazo a través de tu mundo`,fullText:`Yo soy el Avatar
Codificado por la Mano Azul
Por el poder del siete
Me desplazo a través de tu mundo
Descendiendo desde las alturas cósmicas de los siete cielos
Tengo las llaves para los siete días de la creación
Soy el realizador, el creador de formas
Soy el constructor de los mundos por venir
Dentro de la arquitectura ínter-dimensional
Pongo el sendero del conocimiento para que tú recuerdes
Conocer, sanar, realizar
También te señalo estas palabras para que te des cuenta
A través de todas tus acciones
Porque yo soy el guardián de la alianza
Que vincula todo el conocimiento para la sanación del alma del mundo
El código está en mí ser
Un enigma envuelto en misterio
Dejando pistas divinas
Con quienquiera que me encuentro
Mi misión es ejemplificar
Lo que otros no han conocido aún`},ke={number:8,sealName:"Estrella",archetype:"El Artista",poem:`Yo soy el Artista
Codificado por la Estrella Amarilla
El ocho es el número que abre mi puerta
Las frecuencias resonantes son mi paleta`,fullText:`Yo soy el Artista
Codificado por la Estrella Amarilla
El ocho es el número que abre mi puerta
Las frecuencias resonantes son mi paleta
Que armoniza de acuerdo
A los impulsos más profundos del universo
¡Atrévete a ser bello!
Soy la elegancia de la iluminación
A través de mi arte coloreo tu mundo
Yo soy el arco iris en tu día y el
Resplandor de la luna en tu noche
Yo soy el Artista
Todo lo que hago se origina desde las estrellas
Mi nombre es Ser Estelar, Niño Estelar, Cantante Estelar
Soy el acorde galáctico
Resonado desde la clave cósmica
Yo invento las canciones y recito el juramento de cristal
Que viaja por la infinita zuvuya
Las maravillas de las armónicas siempre en expansión
Conocerme es cabalgar la canción eterna
De regreso al Maestro Artífice de toda la Creación`},Ae={number:9,sealName:"Luna",archetype:"La Sanadora",poem:`Yo soy la Sanadora
Codificada por la Luna Roja
Mi número es el nueve
El poder del tiempo, el destino y los ciclos de la vida`,fullText:`Yo soy la Sanadora
Codificada por la Luna Roja
Mi número es el nueve
El poder del tiempo, el destino y los ciclos de la vida
Desde el interior de las aguas vivas
Me fusiono con el flujo universal
Purificando todo dentro de mi corriente sagrada
Y elevando la vibración en cada reino de la naturaleza
Yo soy la armonía de la totalidad
Y la regeneración de la vida
Soy líquida y fluyo
De acuerdo con las fases de la Luna
Soy la reina del agua que nutre la vida
Soy la lluvia y la corriente que fluye
Alimentando a las plantas y las hierbas que florecen
En mi corriente sagrada yace la afinidad con todo
Estoy coronada por el esplendor restaurador de hojas,
Raíces, semillas y flores
La supremacía de la mente divina
Conocerme a mí y a mis poderes infinitos de sanación
Es dejar a un lado toda duda y entrar en la corriente de los fieles`},Te={number:10,sealName:"Perro",archetype:"El Compasivo",poem:`Yo soy el Compasivo
Codificado por el Perro Blanco
El diez es mi número completo
Soy el Confortador eterno - el Leal`,fullText:`Yo soy el Compasivo
Codificado por el Perro Blanco
El diez es mi número completo
Soy el Confortador eterno - el Leal
El amor es mi ley
Prudente, soy en las formas del conocimiento empático
Desde mis dos manos de luz
Irradio buena voluntad a todos los seres en todos los reinos
Levanto mi mano derecha
Palma, abierta y libre - no hay secretos en mí
En la ausencia del miedo no hay nada que ocultar
Todo corazón - paciencia y bondad
Ésta es la más profunda
Sabiduría universal que todo lo penetra
Nada existe que no sea
Una expresión de este amor que lo abarca todo
Ya que el amor es el manifiesto
Poder de la compasión
Conocerme es recordar que
El amor es la luz que mantiene al sueño unido`},De={number:11,sealName:"Mono",archetype:"El Ilusionista",poem:`Yo soy el Ilusionista
Codificado por el Mono Azul
Mi número es el 11, código maestro
Surjo de la nada`,fullText:`Yo soy el Ilusionista
Codificado por el Mono Azul
Mi número es el 11, código maestro
Surjo de la nada
Con la percepción auto liberada
Mediante el doble once
Proyecto múltiples realidades
En aras de la transcensión universal
Como el generador del circuito eléctrico azul
Soy el Alquimista Azul
La ilusión de mi propia existencia
Proyectada por mi cristal de doble terminación
Ejemplifico el enigma de la realidad, que ni viene, ni va
Ni termina, ni comienza
Para aquellos que creen que soy un enigma
Yo soy real
Para aquellos que creen que soy real
Yo soy un enigma
Dondequiera que la ilusión permanece
Ahí estoy para disiparla y disolverla
Puesto que yo tengo las tablas y los números mágicos
Que te introducen en el juego mental cósmico`},we={number:12,sealName:"Humano",archetype:"El Sabio",poem:`Yo soy el Sabio
Codificado por el Humano Amarillo
El doce es mi número
El orden perfecto y la raíz del místico 144`,fullText:`Yo soy el Sabio
Codificado por el Humano Amarillo
El doce es mi número
El orden perfecto y la raíz del místico 144 - la perfección del templo humano
Benevolente, amable y maravilloso
Soy el sabio, el juez y discriminador
He dominado los siete centros
Y perfeccionado las leyes de las fuerzas externas e internas
El control de la mente superior es el poder de mi influencia
En mi mano derecha sostengo el cristal de doble terminación
Y con igual destreza
En mi mano izquierda sostengo la bola de cristal
De sabiduría universalmente imparcial y clara visión
Mi camino es la conducta espontánea
Libre de artificio
Soy el prototipo del humano solar purificado
Hablo con la voz de la noosfera
Que anuncia el retorno de todas las cosas buenas
Conocerme a mí es
"Conocerte a Ti mismo"`},Re={number:13,sealName:"Caminante del Cielo",archetype:"El Profeta",poem:`Yo soy el Profeta
Codificado por el Caminante del Cielo Rojo
El trece es mi número
La onda encantada de la creación`,fullText:`Yo soy el Profeta
Codificado por el Caminante del Cielo Rojo
El trece es mi número
La onda encantada de la creación
Muchos tiempos y muchos mundos he conocido
Porque soy el agente del tiempo universal
Que explora el espacio en vigilia permanente
Soy el colonizador de los mundos perdidos
El navegante galáctico del tiempo
El ojo de la quinta fuerza que todo lo ve
Unje mi frente
En mi mano derecha sostengo el libro de
La Ley del Tiempo
Un regalo de la familia estelar
En mi mano izquierda sostengo la brújula galáctica/la rueda de Sirio
El compendio del camino profético
La Profecía es ley natural, una función del tiempo
Mi camisa lleva los dos números sagrados 13 y 20
Cruzando las barreras del tiempo y el espacio
Estoy coronado por el signo de los ciclos infinitos del tiempo
Conocerme es conocer la profecía del tiempo
Dentro de la promesa del próximo amanecer`},Ne={number:14,sealName:"Mago",archetype:"El Mago",poem:`Yo soy el Mago
Codificado por el Mago Blanco
El siete duplicado es mi número
Señal de mi absorción supermental`,fullText:`Yo soy el Mago
Codificado por el Mago Blanco
El siete duplicado es mi número
Señal de mi absorción supermental en las fuerzas
de la creación cósmica
Dentro de mi esfera de cristal está todo lo que puede ser visto o conocido
Mediante mi suprema receptividad
Te dejo los códigos de la definición resonante
Que tú llamas tiempo
Suspende todo pensamiento y entra conmigo
En el encantamiento atemporal de mi oráculo - el Oráculo del Mago
Por el que las dimensiones están entrelazadas
Mi mente es el universo
Mi cuerpo es el mundo que tú ves
Mi discurso es el sonido melodioso del mundo natural
Mi tercer ojo es la triangulación
De cuerpo, palabra y mente
Soy el dador de los nombres mágicos
Tengo el secreto del acorde perdido - la música de las esferas
Las vibraciones superiores de la ley cósmica
Conocerme es conocer los árboles
Ya que soy el movimiento y medida del orden natural - Hunab Ku`},He={number:15,sealName:"Águila",archetype:"El Vidente",poem:`Yo soy el Vidente
Codificado por el Águila Azul
El quince es mi número - las tres puertas del cinco
Se abren por mi mente`,fullText:`Yo soy el Vidente
Codificado por el Águila Azul
El quince es mi número - las tres puertas del cinco
Se abren por mi mente
Mi hogar es el cielo interminable
Ya que soy el nacido del cielo
La galaxia pulsa
Con mis pensamientos luminosos
Por el poder de la visión me deslizo fácilmente a través de las dimensiones y
Anuncio la llegada de los tiempos cambiantes
A través de universos paralelos vuelo
En una pista única de la zuvuya
La visión es la fuente de mi inteligencia
Que sustenta el entero planetario
Todos los que buscan conocer la mente y crear
De acuerdo al plan universal, vengan a mí, y ellos verán
Que dentro de mi mente está el poder de la mente universal en su creatividad infinita
Conocerme es conocer el plano astral del infinito que lo abarca todo
A partir del cual la mente superior se deriva`},Fe={number:16,sealName:"Guerrero",archetype:"El Descubridor",poem:`Yo soy el Descubridor
Codificado por el Guerrero Amarillo
Mi número es el ocho duplicado
La resonancia armónica superior del dieciséis`,fullText:`Yo soy el Descubridor
Codificado por el Guerrero Amarillo
Mi número es el ocho duplicado
La resonancia armónica superior del dieciséis
Soy el descubridor de la matriz radial
Por el poder de la inteligencia
Penetro la ignorancia del mundo ilusorio
Siguiendo las señales
Dejadas por el cambiador de mundos
Veo los caminos aún no vistos por otros
Mi espíritu intrépido despeja los obstáculos a lo largo del camino
Para que otros puedan seguir los senderos de inteligencia creciente
Portando la insignia
Del Quinto Sol
Rastreo las pisadas del Antiguo Profeta
Al templo que incluye
La casa de la noche cósmica
Soy el pionero del futuro
Abro e investigo todos los senderos en el nombre de la ciencia cósmica
Independientemente del camino al que el sendero pueda llevar
Siempre habrá otro tesoro del conocimiento para aprender de nuevo
Conocerme es desterrar el miedo
Y ver tu verdadero rostro brillante y claro`},Ve={number:17,sealName:"Tierra",archetype:"El Navegante",poem:`Yo soy el Navegante
Codificado por la Tierra Roja
El diecisiete es mi número
Mis insignias son los sellos armónicos`,fullText:`Yo soy el Navegante
Codificado por la Tierra Roja
El diecisiete es mi número
Mis insignias son los sellos armónicos
De la Mente Planetaria y la Mente Estelar retornando a la fuente
Soy la indivisibilidad de todo tiempo y consciencia
Tengo los mapas del origen celestial
Y sigo las señales de la sincronicidad
En nombre de la evolución cósmica
Mi corona es el portal interdimensional
Del Entero de Vida Galáctica
El código 13 y 7 está encima y debajo
En el centro está el 441 y en cada lado
El 11 y el 27, claves para el poder sincrónico del siete
Las lentes sincrónicas me permiten ver radialmente todas las cosas
Soy la evolución en movimiento
Soy el experto viajero estelar
Guiado por las frecuencias telepáticas que mantienen
A los sistemas estelares y planetarios en orden
La brújula galáctica es mi timón
Claves para el conocimiento de la navegación galáctica
Cuyos signos son las direcciones
A conocer por todo viajero del tiempo
Conocerme es conocer el lenguaje de las estrellas`},Be={number:18,sealName:"Espejo",archetype:"Yogui/Yoguini",poem:`Yo soy el Yogui (ni)
Codificado por el Espejo Blanco
El dieciocho es mi número
Habito en el estado de meditación sin distracción`,fullText:`Yo soy el Yogui (ni)
Codificado por el Espejo Blanco
El dieciocho es mi número
Habito en el estado de meditación sin distracción
Más allá de la palabra, el pensamiento y la acción
Sentado en mi cueva del corazón
Soy el reflejo del sueño sin fin
Tengo la llave de los universos espejo - las dimensiones espejo (8-13)
Del universo cósmico que refleja a éste
Yo soy la meditación de la dicha del vacío
La pared de mi cueva es mi pantalla del universo
Supremo en mis poderes yóguicos
Ejemplifico la auto trascendencia en la noosfera
Porque soy el precursor evolutivo
Rodeado por el aura arco iris - producto de mi auto transmutación interior
Yo manifiesto señales de poderes sobrenaturales
Sólo para que el camino se haga claro para todos los seres
Un orbe resplandece a mi derecha en su propia luz
El resultado de la luminosidad preexistente
Aparece sobre mi cabeza el mandala de la auto-perfección primordial
Una señal de que todos podemos alcanzar el camino de la luz infinita
Conocerme es saber que
La sola práctica trae conocimiento y sabiduría`},Oe={number:19,sealName:"Tormenta",archetype:"El Cambiador de Mundos",poem:`Yo soy el Cambiador de Mundos
Codificado por la Tormenta Azul
Mi número es el diecinueve
El poder de todo número`,fullText:`Yo soy el Cambiador de Mundos
Codificado por la Tormenta Azul
Mi número es el diecinueve
El poder de todo número
Soy el maestro alquimista
La fuerza detrás de la piedra filosofal
Diestro en las artes de la transmutación
Yo soy el transformador catalítico
De la consciencia del Mundo y la vida planetaria
Superviso los cambios del clima
Yo soy el trueno que despedaza tus sistemas del mundo
Soy el transporte de nubes llenas de relámpagos
Para iluminar la verdad detrás de tus ilusiones
Yo soy el portador de la lluvia torrencial que purifica
Fui yo quien causó que los monumentos de aspecto triple del arquetipo del avatar
Aparecieran en las tierras del antiguo templo
Superviso las estrellas Matutina y Vespertina
Contemplo al creador del Quinto Sol, el mundo Presente
Soy el enviado a morar entre vosotros
Convocando al Sexto Sol
Para la Gran Regeneración del alma del mundo
Conocerme es conocer tu propio poder de autogeneración`},Ue={number:20,sealName:"Sol",archetype:"El Iluminado",poem:`Yo soy el Iluminado
Codificado por el Sol Amarillo
Mi número es el veinte
La totalidad del universo`,fullText:`Yo soy el Iluminado
Codificado por el Sol Amarillo
Mi número es el veinte
La totalidad del universo
En meditación fui concebido
Desde la meditación he nacido y
Por largos eones he morado en lo profundo de esta meditación
Yo soy la verdad superior y el renovador de la vida
Giro la rueda cósmica de la ley
Dando enseñanzas de mente pura entre las estrellas
Yo soy el guardián armónico de los flameantes campos de luz infinita
Soy llamado por muchos nombres
Pero sólo nombran mi forma externa
Mi manto ardiente al que tú llamas el Sol
La iluminación de uno es la iluminación de todos
Soy el cumplimiento de la profecía de Hunab Ku
El despertar a todos los seres simultáneamente es mi tarea
En muchos lugares he despertado
Y cada lugar que paso
Lo conozco sólo por el nombre de Tollan
Tollan de los despiertos
Conocerme es conocer
La luz de la verdad que ilumina todas las cosas`},Ke={number:21,sealName:"Hunab Ku 21",archetype:"Hunab Ku 21",poem:`De todos los tesoros ocultos que salen a la luz
Ninguno existe más grandioso
Que Hunab Ku 21
La unidad de la totalidad - el secreto del 441`,fullText:`De todos los tesoros ocultos que salen a la luz
Ninguno existe más grandioso
Que Hunab Ku 21
La unidad de la totalidad - el secreto del 441
Único Dador de Movimiento y Medida
Hunab Ku no puede ser visto ni abarcado
Salvo por los especiales que son elegidos
Conocidos por el nombre de Magos del Infinito
Muchos somos y sin embargo somos uno
Maestros del Cubo de la Ley
Nuestras enseñanzas ejemplifican la esencia del cubo
Los Señores del Cubo, emanamos e irradiamos los poderes del siete
Con los oídos celestiales escuchamos los santos sonidos sagrados
Del vacío universal
Nuestro voto es la simplicidad
No tomamos nada ni llevamos nada
Sólo sabemos cómo dar
Los maestros de la zuvuya cabalgamos
Las olas del infinito
Infinitamente
Nos reconocerás cuando te veas a ti mismo
Emanando desde el centro del cubo
Conocernos es conocer la totalidad
Conocer la totalidad es conocer la paz
Conocer la paz es entrar completamente en el
Impresionante, sin fin, esplendor de la revelación galáctica`},G={dragon:qe,wind:Le,night:Ye,seed:Me,serpent:Pe,worldbridger:$e,hand:Ie,star:ke,moon:Ae,dog:Te,monkey:De,human:we,skywalker:Re,wizard:Ne,eagle:He,warrior:Fe,earth:Ve,mirror:Be,storm:Oe,sun:Ue,hunabku21:Ke},Ge="./",eo=({onBack:e,kinData:l})=>{const[a,i]=p.useState(null),[t,f]=p.useState(!1),[c,d]=p.useState(null),m=Object.keys(G),v=g=>{i(g),f(!0)};return o.jsxs(b,{sx:{width:"100%",maxWidth:"1200px",mx:"auto",p:{xs:1,sm:2}},children:[o.jsxs(b,{sx:{position:"relative",mb:4,textAlign:"center"},children:[o.jsx(R,{variant:"outlined",onClick:e,sx:{position:"absolute",right:0,top:"50%",transform:"translateY(-50%)",color:"white",borderColor:"rgba(255,255,255,0.3)"},children:"VOLVER"}),o.jsx(y,{variant:"h4",sx:{fontFamily:"Cinzel",color:"#c084fc",textShadow:"0 0 10px rgba(192, 132, 252, 0.5)"},children:"Arquetipos Galácticos"}),o.jsx(y,{variant:"body2",sx:{color:"rgba(255,255,255,0.5)",mt:.5},children:"Hunab Ku 21 · Los 21 Arquetipos del Tzolkin"})]}),o.jsx(y,{variant:"body1",sx:{color:"rgba(255,255,255,0.7)",mb:4,textAlign:"center",maxWidth:"800px",mx:"auto",lineHeight:1.8},children:"Los 21 Arquetipos Galácticos del sistema Hunab Ku 21, codificados por José Argüelles, representan los modelos originales de la memoria cósmica asociados a cada uno de los 20 sellos solares más el centro galáctico."}),o.jsx(U,{container:!0,spacing:3,alignItems:"stretch",justifyContent:"center",children:m.map(g=>{const u=G[g],z=`${Ge}assets/archetypes/${g}.png`;return o.jsx(U,{item:!0,xs:12,sm:6,md:4,sx:{display:"flex"},children:o.jsxs(ve,{sx:{width:"100%",bgcolor:"rgba(15, 15, 30, 0.9)",border:"1px solid rgba(192, 132, 252, 0.25)",borderRadius:3,display:"flex",flexDirection:"column",transition:"all 0.3s ease",overflow:"hidden","&:hover":{transform:"translateY(-4px)",boxShadow:"0 12px 35px rgba(192, 132, 252, 0.25)",borderColor:"rgba(192, 132, 252, 0.5)"}},children:[o.jsxs(b,{sx:{position:"relative",height:"260px",overflow:"hidden",flexShrink:0,cursor:"zoom-in"},onClick:C=>{C.stopPropagation(),d({src:z,name:u.archetype})},children:[o.jsx(b,{component:"img",src:z,alt:u.archetype,onError:C=>{C.target.style.display="none",C.target.nextSibling.style.display="flex"},sx:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top center",display:"block"}}),o.jsx(b,{sx:{display:"none",width:"100%",height:"100%",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, rgba(192,132,252,0.15), rgba(0,200,255,0.1))"},children:o.jsx(N,{sx:{fontSize:60,color:"rgba(192,132,252,0.4)"}})}),o.jsx(b,{sx:{position:"absolute",bottom:0,left:0,width:"100%",height:"80px",background:"linear-gradient(to top, rgba(15,15,30,1) 0%, rgba(15,15,30,0) 100%)"}}),o.jsx(je,{label:u.number,size:"small",sx:{position:"absolute",top:10,left:10,bgcolor:"rgba(0,0,0,0.7)",color:"#c084fc",fontWeight:"bold",fontSize:"0.75rem",border:"1px solid rgba(192,132,252,0.5)"}})]}),o.jsxs(xe,{sx:{flexGrow:1,display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",p:2.5,"&:last-child":{pb:2.5}},children:[o.jsx(y,{variant:"caption",sx:{color:"#00c8ff",fontWeight:"bold",mb:.5,textTransform:"uppercase",letterSpacing:1},children:u.sealName}),o.jsx(y,{variant:"h6",sx:{color:"white",fontFamily:"Cinzel",mb:2,fontSize:{xs:"1rem",sm:"1.1rem"},lineHeight:1.3},children:u.archetype}),o.jsx(b,{sx:{flexGrow:1,width:"100%",mb:2.5},children:o.jsx(y,{variant:"body2",sx:{color:"rgba(255,255,255,0.65)",fontStyle:"italic",whiteSpace:"pre-line",fontFamily:"Lora",lineHeight:1.7,fontSize:"0.82rem"},children:u.poem})}),o.jsx(R,{variant:"contained",onClick:()=>v(u),startIcon:o.jsx(N,{}),fullWidth:!0,sx:{bgcolor:"rgba(192, 132, 252, 0.15)",color:"#c084fc",borderRadius:"20px",border:"1px solid rgba(192,132,252,0.3)",py:.8,mt:"auto","&:hover":{bgcolor:"rgba(192, 132, 252, 0.3)"}},children:"Invocación Completa"})]})]})},g)})}),o.jsx(H,{open:t,onClose:()=>f(!1),closeAfterTransition:!0,BackdropComponent:F,BackdropProps:{timeout:500,sx:{backdropFilter:"blur(10px)",bgcolor:"rgba(0,0,0,0.8)"}},children:o.jsx(V,{in:t,children:o.jsxs(b,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:"92%",maxWidth:620,maxHeight:"88vh",overflowY:"auto",bgcolor:"rgba(12, 12, 28, 0.97)",border:"1px solid rgba(192, 132, 252, 0.4)",borderRadius:4,p:{xs:3,sm:4},outline:"none",boxShadow:"0 0 60px rgba(192, 132, 252, 0.15)"},children:[o.jsx(B,{onClick:()=>f(!1),sx:{position:"absolute",right:10,top:10,color:"rgba(255,255,255,0.5)"},children:o.jsx(O,{})}),a&&o.jsxs(o.Fragment,{children:[o.jsx(y,{variant:"caption",sx:{color:"#00c8ff",display:"block",textAlign:"center",mb:.5,textTransform:"uppercase",letterSpacing:1},children:a.sealName}),o.jsx(y,{variant:"h5",sx:{fontFamily:"Cinzel",color:"#c084fc",mb:.5,fontWeight:"bold",textAlign:"center"},children:a.archetype}),o.jsx(y,{variant:"body2",sx:{color:"rgba(255,255,255,0.5)",mb:3,textAlign:"center",fontStyle:"italic"},children:"Invocación Completa · Hunab Ku 21"}),o.jsx(b,{sx:{mb:1,p:3,bgcolor:"rgba(192,132,252,0.05)",borderRadius:2,borderLeft:"3px solid rgba(192,132,252,0.4)"},children:o.jsx(y,{variant:"body2",sx:{color:"rgba(255,255,255,0.9)",whiteSpace:"pre-line",fontFamily:"Lora",lineHeight:1.9,fontSize:"1.05rem"},children:a.fullText})})]})]})})}),o.jsx(H,{open:!!c,onClose:()=>d(null),closeAfterTransition:!0,BackdropComponent:F,BackdropProps:{timeout:300,sx:{bgcolor:"rgba(0,0,0,0.95)",backdropFilter:"blur(8px)",cursor:"zoom-out"}},children:o.jsx(V,{in:!!c,children:o.jsxs(b,{onClick:()=>d(null),sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",outline:"none",display:"flex",flexDirection:"column",alignItems:"center",maxWidth:"92vw",maxHeight:"92vh"},children:[o.jsx(B,{onClick:()=>d(null),sx:{position:"absolute",top:-16,right:-16,bgcolor:"rgba(0,0,0,0.7)",color:"white",zIndex:1,"&:hover":{bgcolor:"rgba(192,132,252,0.3)"}},children:o.jsx(O,{})}),c&&o.jsxs(o.Fragment,{children:[o.jsx(b,{component:"img",src:c.src,alt:c.name,onClick:g=>g.stopPropagation(),sx:{maxWidth:"88vw",maxHeight:"82vh",objectFit:"contain",borderRadius:2,boxShadow:"0 0 60px rgba(192,132,252,0.3)",border:"1px solid rgba(192,132,252,0.3)"}}),o.jsx(y,{variant:"caption",sx:{mt:2,color:"rgba(255,255,255,0.6)",fontFamily:"Cinzel",letterSpacing:2,textTransform:"uppercase"},children:c.name})]})]})})})]})};export{eo as default};
