---
description: Generar contenido automático para un Kin diario
---

# Workflow: Generar Contenido de Kin Diario

Este workflow automatiza la creación de contenido para cada Kin siguiendo el estándar establecido.

## Proceso Automático

### 1. Investigación de Fuentes
Para cada Kin número X:
- Buscar en `https://mksoto.com/kin-X/` para interpretación del sello y tono
- Buscar en `https://luciagarciaotero.com.ar/` para contexto adicional
- Extraer afirmación oficial de `https://13lunas.net/tutorial/El_libro_del_kin/`

### 2. Estructura del Contenido

#### Afirmación Galáctica
- Fuente: 13lunas.net
- Formato: Texto literal entre comillas dobles
- Ejemplo: "Yo me dedico con el fin de reflejar..."

#### Sabiduría Diaria (short_description)
**Requisitos:**
- Máximo 1-2 líneas
- Lenguaje directo y energético
- Mensaje práctico aplicable al día
- Evitar clichés o frases genéricas
- Usar verbos de acción
- Tono personal (tú/te)

**Fórmula:**
`[Acción concreta] + [Resultado/Beneficio]: [Insight clave del sello/tono]`

**Ejemplos:**
- Kin 37: "Permite que las cosas fluyan sin resistencia y observa cómo el camino se abre ante ti de forma natural."
- Kin 38: "Mírate sin filtros y brilla: cuando ordenas tu interior, todo a tu alrededor encuentra su lugar."

#### Detalle Expandido (long_description)
**Requisitos:**
- 4-5 líneas (aproximadamente 400-500 caracteres)
- Estructura en 3 partes:
  1. Apertura: Qué trae el sello hoy
  2. Desarrollo: Cómo el tono modifica/potencia esa energía
  3. Cierre: Acción práctica o invitación

**Elementos a incluir:**
- Nombre del sello y su esencia
- Número y significado del tono
- Metáfora o imagen evocativa
- Lenguaje accesible (sin jerga maya)
- Verbo de acción al final

**Evitar:**
- Explicaciones técnicas del Tzolkin
- Frases copiadas de las fuentes
- Lenguaje abstracto o confuso
- Más de 6 líneas

### 3. Formato JSON

```json
"X": {
    "affirmation": "\"[Afirmación literal de 13lunas.net]\"",
    "image_url": "assets/infographies/Kin X.png",
    "short_description": "[Frase breve y energética]",
    "long_description": "[Párrafo de 4-5 líneas explicando sello + tono de forma accesible]"
}
```

### 4. Checklist de Calidad

Antes de añadir el contenido, verificar:
- [ ] Afirmación es exacta de 13lunas.net
- [ ] Sabiduría diaria tiene máximo 2 líneas
- [ ] Sabiduría usa lenguaje energético y personal
- [ ] Detalle tiene 4-5 líneas
- [ ] Detalle explica sello + tono sin jerga
- [ ] Detalle termina con acción práctica
- [ ] No hay plagio de las fuentes
- [ ] Lenguaje es único y original

### 5. Comando de Despliegue

Después de añadir el Kin:
```bash
git add . && git commit -m "Add Kin X [Nombre Sello Tono Color]" && git push origin main && npm run --prefix frontend deploy
```

## Notas Importantes

- Cada Kin debe tener contenido único y original
- Investigar siempre las fuentes antes de escribir
- Mantener el tono místico pero accesible
- Priorizar claridad sobre complejidad
- El objetivo es inspirar y guiar, no enseñar teoría maya
