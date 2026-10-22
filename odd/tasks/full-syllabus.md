# Temario completo A1–A2 (38 unidades)

**Objetivo:** Ampliar el proyecto de 10 a 38 unidades cubriendo el 100% del temario.
**Rama:** feature/full-syllabus
**TDD:** Desactivado — checks funcionales por fase.

## Alcance autorizado
- Enriquecer unidades 1–10 con contenido del cheatsheet
- Añadir 28 unidades nuevas (11–38)
- Acordeón lateral por módulos (rediseño de navegación)
- Nuevo tipo de bloque `tip` (consejo de la teacher)
- Actualizar tests de integridad y smoke

## Módulos de navegación
| Módulo | Unidades |
|--------|----------|
| Gramática básica | 1–10 |
| Fundamentos | 11–17 |
| Vocabulario | 18–27 |
| Gramática avanzada | 28–36 |
| Pronunciación | 37 |
| Habilidades | 38 |

## Tareas

### Infraestructura
- [x] INF-1: Crear `src/data/modules.js` con definición de módulos
- [x] INF-2: Añadir `case "tip"` en `unit-view.js` + estilo `.tip` en `components.css`
- [x] INF-3: Actualizar `index.html` — estructura sidebar + app-layout
- [x] INF-4: Reescribir `layout.css` — acordeón lateral
- [x] INF-5: Reescribir `main.js` — lógica de acordeón + routing

### Fase 1: Enriquecer unidades 1–10
- [x] F1-1: Unidades 1–5 (demostrativos, PS, PC, WH, adverbios)
- [x] F1-2: Unidades 6–10 (fechas, past simple, past continuous, vocabulario, test I)

### Fase 2: Gramática fundamental (unidades 11–17)
- [x] F2: Pronombres, sustantivos, artículos, genitivo, there is/are, preposiciones, orden

### Fase 3: Vocabulario temático (unidades 18–27)
- [x] F3: Saludos, números, días, familia, hogar, comida, transporte, profesiones, indicaciones, navidad

### Fase 4: Gramática avanzada (unidades 28–36)
- [x] F4: Futuro, imperativo, modales, PP, PPC, comparativos, condicionales 0/1/2

### Fases 5–6: Pronunciación y Habilidades (unidades 37–38)
- [x] F5-6: Pronunciación completa + speaking y estrategias

### Tests y cierre
- [x] TST: Actualizar data-integrity.test.js y app-smoke.test.js
- [x] TST: Verificar `npm test` verde

## Progreso
- Rama creada: `feature/full-syllabus`
- Commits:
  - `752103d`: feat(nav): add module accordion sidebar navigation and tip theory block
  - `3be06e1`: feat(content): enrich units 1-10 and add units 11-27 (foundations and thematic vocabulary)
  - `067d89c`: feat(content): add advanced grammar units 28-36 (conditionals, perfect tenses, modals, future)
  - `f81b931`: feat(content): add pronunciation and practical skills units 37-38 and verify 38-unit suite
