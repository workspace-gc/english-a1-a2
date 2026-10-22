import test from "node:test";
import assert from "node:assert/strict";

import { UNITS } from "../src/data/units.js";
import { normalize } from "../src/core/quiz-engine.js";

/**
 * Contratos de integridad entre el contenido (units.js) y el núcleo
 * (quiz-engine). Evita que una edición del temario rompa la UI.
 */

function exerciseIds() {
  return UNITS.flatMap((u) => u.practice.exercises.map((e) => e.id));
}

test("las unidades están numeradas consecutivamente de 1 a N", () => {
  assert.ok(UNITS.length >= 10, "debe haber al menos 10 unidades");
  UNITS.forEach((unit, i) => {
    assert.equal(unit.num, i + 1);
  });
});

test("los ids de ejercicio son únicos en toda la app", () => {
  const ids = exerciseIds();
  assert.equal(new Set(ids).size, ids.length);
});

test("cada unidad tiene teoría, práctica y ejercicios", () => {
  for (const unit of UNITS) {
    assert.ok(unit.id, `unidad ${unit.num} sin id`);
    assert.ok(unit.title, `unidad ${unit.num} sin título`);
    assert.ok(Array.isArray(unit.theory) && unit.theory.length > 0, `unidad ${unit.num} sin teoría`);
    assert.ok(Array.isArray(unit.practice.exercises) && unit.practice.exercises.length > 0, `unidad ${unit.num} sin ejercicios`);
    for (const block of unit.theory) {
      assert.ok(block.type, "bloque de teoría sin tipo");
    }
  }
});

test("cada bloque de teoría tiene los campos que necesita", () => {
  for (const unit of UNITS) {
    for (const block of unit.theory) {
      switch (block.type) {
        case "p":
        case "note":
        case "tip":
          assert.ok(typeof block.html === "string" && block.html.length > 0);
          break;
        case "list":
          assert.ok(Array.isArray(block.items) && block.items.length > 0);
          break;
        case "table":
          assert.ok(block.caption && block.head?.length && block.rows?.length > 0);
          block.rows.forEach((row) => assert.equal(row.length, block.head.length));
          break;
        case "examples":
          assert.ok(block.items?.length > 0);
          block.items.forEach((item) => assert.ok(item.en && item.es));
          break;
        default:
          assert.fail(`bloque de teoría con tipo desconocido: ${block.type}`);
      }
    }
  }
});

test("cada ejercicio tiene el contrato que espera el núcleo", () => {
  for (const unit of UNITS) {
    for (const ex of unit.practice.exercises) {
      assert.ok(ex.id, `ejercicio sin id en unidad ${unit.num}`);
      assert.ok(ex.prompt, `ejercicio ${ex.id} sin prompt`);
      // El cloze lleva la explicación por hueco; los demás, por ejercicio.
      if (ex.type !== "cloze") assert.ok(ex.explanation, `ejercicio ${ex.id} sin explicación`);

      switch (ex.type) {
        case "choice":
          assert.ok(Array.isArray(ex.options) && ex.options.length >= 2);
          assert.ok(Number.isInteger(ex.answer) && ex.answer >= 0 && ex.answer < ex.options.length);
          break;
        case "fill":
          assert.ok(ex.blanks?.length >= 1);
          ex.blanks.forEach((b) => assert.ok(b.accepts?.length >= 1));
          if (ex.sentence) {
            const gaps = ex.sentence.split("______").length - 1;
            assert.equal(gaps, ex.blanks.length, `ejercicio ${ex.id}: huecos en la frase ≠ huecos declarados`);
          }
          break;
        case "transform":
          assert.ok(ex.sentence);
          assert.ok(ex.accepts?.length >= 1);
          break;
        case "order":
          assert.ok(ex.words?.length >= 2);
          assert.ok(ex.accepts?.length >= 1);
          assert.ok(Array.isArray(ex.solution) && ex.solution.length === ex.words.length, `ejercicio ${ex.id}: solution incompleta`);
          ex.solution.forEach((i) => assert.ok(i >= 0 && i < ex.words.length));
          // La secuencia de `solution` debe formar una frase válida: si no,
          // el botón «Ver respuesta» mostraría una frase incorrecta.
          {
            const sentence = normalize(ex.solution.map((i) => ex.words[i]).join(" "));
            assert.ok(
              ex.accepts.some((a) => normalize(a) === sentence),
              `ejercicio ${ex.id}: solution produce «${sentence}», que no está en accepts`
            );
          }
          break;
        case "cloze": {
          const maxIndex = Math.max(...ex.sentence.map((part) => (typeof part === "string" ? -1 : part.__blank)));
          assert.equal(ex.blanks.length, maxIndex + 1);
          ex.blanks.forEach((b) => {
            assert.ok(b.options?.length >= 2);
            assert.ok(b.answer >= 0 && b.answer < b.options.length);
            assert.ok(b.explanation, `hueco ${b.index} sin explicación`);
          });
          break;
        }
        default:
          assert.fail(`ejercicio ${ex.id} con tipo desconocido: ${ex.type}`);
      }
    }
  }
});

test("las flashcards de la unidad 9 tienen tarjetas válidas", () => {
  const unit = UNITS.find((u) => u.num === 9);
  assert.ok(unit.flash?.decks?.length >= 1);
  for (const deck of unit.flash.decks) {
    assert.ok(deck.title && deck.items?.length >= 3);
    deck.items.forEach((item) => assert.ok(item.en && item.es));
  }
});
