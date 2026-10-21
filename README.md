# Inglés A1–A2 · Guía interactiva

Web interactiva de estudio de inglés A1–A2 (HTML + CSS + JavaScript vanilla, **sin dependencias** ni build step). Diez unidades con teoría, ejercicios de corrección al instante, tarjetas de vocabulario y autoevaluación final, con progreso guardado en el navegador.

## Unidades

| # | Unidad | Ejercicios |
|---|--------|-----------|
| 1 | Pronombres demostrativos (this/these/that/those) | transformación singular↔plural |
| 2 | Present Simple | fill-the-gap, choice, corrección de errores |
| 3 | Present Continuous | fill-the-gap simple vs. continuo |
| 4 | WH- Questions | completar la partícula interrogativa |
| 5 | Adverbios de frecuencia | ordenar palabras (reorder) |
| 6 | Fechas y años | transcripción hablada (USA vs. UK) |
| 7 | Past Simple | fill-the-gap con irregulares y to be |
| 8 | Past Continuous | transformación was/were |
| 9 | Vocabulario clave | flashcards (4 mazos) + make vs. do |
| 10 | Autoevaluación final | texto integrador con 6 huecos |

## Cómo ejecutarla

Necesita servirse por HTTP (los módulos ES no cargan desde `file://`):

```bash
npm run dev          # python3 -m http.server 8080 → http://localhost:8080
# o cualquier static server: npx serve .
```

Abre `http://localhost:8080`. Las fuentes se cargan de Google Fonts; sin internet la web funciona igual con tipografías de respaldo.

## Tests

El núcleo de corrección es lógica pura, los datos tienen contratos de integridad y la app completa tiene un smoke test de render + interacción. Todo con el runner nativo de Node (sin dependencias):

```bash
npm test             # node --test → 24 tests
```

- `tests/quiz-engine.test.js` — la interfaz del núcleo (`normalize`, `check`, `gradeUnit`).
- `tests/data-integrity.test.js` — el temario de `units.js` cumple los contratos (incluida la comprobación de que el `solution` de cada `order` produce una frase que está en `accepts`).
- `tests/app-smoke.test.js` — ejecuta `main.js` completo sobre un DOM mínimo (`tests/dom-stub.js`): render de las 10 unidades, router por hash, todos los tipos de ejercicio (intento fallido + solución), flashcards y persistencia del progreso.

## Arquitectura

Diseñada con la skill **codebase-design** (módulos profundos: mucha conducta detrás de una interfaz pequeña, testable a través de esa interfaz).

```
index.html               shell de la página (pizarra, pestañas, hoja)
package.json             solo scripts: dev (servidor) y test
src/
├── main.js              composition root: pestañas, router por hash, cableado
├── core/
│   └── quiz-engine.js   ★ módulo profundo PURO: normalize, check, gradeUnit
├── data/
│   └── units.js         todo el temario como datos (10 unidades)
├── features/
│   ├── unit-view.js     renderiza teoría + práctica; delega toda la corrección
│   ├── flashcards.js    mazos de vocabulario (flip 3D, repaso de sesión)
│   ├── audio.js         seam: Web Speech API (adaptador: navegador o inexistente)
│   └── progress.js      seam: localStorage (adaptador de respaldo: memoria)
└── styles/
    ├── base.css         tokens de diseño, reset, tipografías, accesibilidad
    ├── layout.css       pizarra, pestañas de carpeta, hoja del cuaderno
    └── components.css   teoría, ejercicios, feedback, flashcards
tests/
├── quiz-engine.test.js    suite node:test sobre la interfaz del núcleo
├── data-integrity.test.js contratos entre el temario y el núcleo
├── app-smoke.test.js      la app completa (main.js) sobre un DOM stub
└── dom-stub.js            DOM mínimo para el smoke test
```

### Módulos y seams

- **quiz-engine** (núcleo). Interfaz mínima: `normalize`, `check(exercise, submission)`, `gradeUnit(exercises, submissions)`. Sin DOM, sin storage → se testa directamente con `node:test` ("la interfaz es la superficie de prueba").
- **audio** (seam Web Speech). Interfaz: `isAudioAvailable()`, `speak(text)`. Dos adaptadores: el API real o su ausencia (los botones se deshabilitan, nada se rompe).
- **progress** (seam localStorage). Interfaz: `loadScores()`, `recordResult()`, `resetAll()`. Adaptador de respaldo en memoria para modo privado o storage bloqueado. El progreso nunca retrocede (se guarda el máximo).
- **data/units.js** (contenido). Interfaz: `UNITS` — un array documentado. Añadir una unidad = añadir un objeto, sin tocar la UI.
- **unit-view / main** (carnada, deliberadamente delgada). Solo construyen DOM y cablean; toda la regla de corrección vive en el núcleo.

### Tipos de ejercicio (contractos en `quiz-engine.js`)

| tipo | submission |
|------|-----------|
| `choice` | `{ selected: number }` |
| `fill` | `{ values: string[] }` (por hueco) |
| `transform` | `{ value: string }` |
| `order` | `{ words: string[] }` |
| `cloze` | `{ selections: number[] }` (cada hueco cuenta como ítem) |

La normalización unifica mayúsculas, comillas curvas, espacios y la puntuación final, de modo que el alumno puede escribir `He Doesn't Eat Pizza.` o `he doesn't eat pizza`.

## Diseño

Diseñada con la skill **frontend-design**: identidad "pizarra de tiza + cuaderno del alumno" (verde pizarra `#2E4B3C`, tiza `#F3EFE3`, papel `#FAF8F1`, marcador `#F2B70C`, boli rojo `#C93A3A`), tipografías Caveat / Bricolage Grotesque / Atkinson Hyperlegible, y un único momento coreografiado (el subrayado de tiza al cargar). Revisada contra la skill **web-design-guidelines** (HTML semántico, `aria-live` en feedback, foco visible, `prefers-reduced-motion`, `lang` en los ejemplos en inglés, foco en el primer error, `theme-color`, `touch-action`).

## Skills del proyecto

Instaladas en `.opencode/skills/` (ver `LICENSE` en cada carpeta):

- `frontend-design` — (Anthropic, Apache-2.0)
- `web-design-guidelines` — (Vercel)
- `codebase-design` — (Matt Pocock, MIT)
