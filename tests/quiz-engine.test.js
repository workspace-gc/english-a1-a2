import test from "node:test";
import assert from "node:assert/strict";

import { normalize, check, gradeUnit } from "../src/core/quiz-engine.js";

// ---------------------------------------------------------------
// normalize
// ---------------------------------------------------------------

test("normalize: minúsculas y espacios colapsados", () => {
  assert.equal(normalize("  THESE   Workbooks ARE  cheap. "), "these workbooks are cheap");
});

test("normalize: elimina la puntuación final", () => {
  assert.equal(normalize("Was he studying?"), "was he studying");
  assert.equal(normalize("I was running!"), "i was running");
});

test("normalize: unifica comillas curvas en apóstrofe recto", () => {
  assert.equal(normalize("they don\u2019t drive"), "they don't drive");
});

test("normalize: valores nulos devuelven cadena vacía", () => {
  assert.equal(normalize(null), "");
  assert.equal(normalize(undefined), "");
});

// ---------------------------------------------------------------
// check: choice
// ---------------------------------------------------------------

test("check: choice reconoce la opción correcta y rechaza la otra", () => {
  const exercise = { type: "choice", answer: 0, options: ["Does / catch", "Do / catches"] };
  assert.deepEqual(check(exercise, { selected: 0 }), { correct: true });
  assert.deepEqual(check(exercise, { selected: 1 }), { correct: false });
});

// ---------------------------------------------------------------
// check: fill (un y varios huecos)
// ---------------------------------------------------------------

test("check: fill con un solo hueco", () => {
  const exercise = { type: "fill", blanks: [{ accepts: ["studies"] }] };
  assert.equal(check(exercise, { values: ["Studies." ] }).correct, true);
  assert.equal(check(exercise, { values: ["study"] }).correct, false);
  assert.equal(check(exercise, { values: [] }).correct, false);
});

test("check: fill con dos huecos exige ambos", () => {
  const exercise = {
    type: "fill",
    blanks: [
      { accepts: ["read"] },
      { accepts: ["am watching"] },
    ],
  };
  assert.equal(check(exercise, { values: ["read", "am watching"] }).correct, true);
  assert.equal(check(exercise, { values: ["am reading", "am watching"] }).correct, false);
});

// ---------------------------------------------------------------
// check: transform
// ---------------------------------------------------------------

test("check: transform admite variantes separadas en accepts", () => {
  const exercise = {
    type: "transform",
    accepts: ["he doesn't eat pizza", "he does not eat pizza"],
  };
  assert.equal(check(exercise, { value: "He doesn't eat pizza." }).correct, true);
  assert.equal(check(exercise, { value: "he does not eat pizza" }).correct, true);
  assert.equal(check(exercise, { value: "he don't eats pizza" }).correct, false);
});

// ---------------------------------------------------------------
// check: order
// ---------------------------------------------------------------

test("check: order compara la frase completa", () => {
  const exercise = {
    type: "order",
    accepts: ["he is always late"],
  };
  assert.equal(check(exercise, { words: ["He", "is", "always", "late"] }).correct, true);
  assert.equal(check(exercise, { words: ["He", "always", "is", "late"] }).correct, false);
});

// ---------------------------------------------------------------
// check: cloze
// ---------------------------------------------------------------

test("check: cloze exige todas las selecciones correctas", () => {
  const exercise = {
    type: "cloze",
    blanks: [
      { index: 0, answer: 1 },
      { index: 1, answer: 0 },
    ],
  };
  assert.equal(check(exercise, { selections: [1, 0] }).correct, true);
  assert.equal(check(exercise, { selections: [0, 0] }).correct, false);
  assert.equal(check(exercise, { selections: [1] }).correct, false);
});

// ---------------------------------------------------------------
// check: defensa ante entradas inesperadas
// ---------------------------------------------------------------

test("check: sin submission o tipo desconocido → incorrecto", () => {
  assert.deepEqual(check({ type: "choice", answer: 0 }, undefined), { correct: false });
  assert.deepEqual(check({ type: "misterioso" }, {}), { correct: false });
});

// ---------------------------------------------------------------
// gradeUnit
// ---------------------------------------------------------------

test("gradeUnit: suma ejercicios normales", () => {
  const exercises = [
    { id: "a", type: "choice", answer: 0 },
    { id: "b", type: "fill", blanks: [{ accepts: ["went"] }] },
    { id: "c", type: "fill", blanks: [{ accepts: ["were"] }] },
  ];
  const result = gradeUnit(exercises, {
    a: { selected: 0 },
    b: { values: ["went"] },
    // c sin responder
  });
  assert.deepEqual(result, { correct: 2, total: 3, percent: 67 });
});

test("gradeUnit: cada hueco de un cloze cuenta como un ítem", () => {
  const exercises = [
    {
      id: "final",
      type: "cloze",
      blanks: [
        { index: 0, answer: 1 },
        { index: 1, answer: 0 },
        { index: 2, answer: 1 },
      ],
    },
  ];
  const result = gradeUnit(exercises, { final: { selections: [1, 0, 0] } });
  assert.deepEqual(result, { correct: 2, total: 3, percent: 67 });
});

test("gradeUnit: sin ejercicios evita división por cero", () => {
  assert.deepEqual(gradeUnit([], {}), { correct: 0, total: 0, percent: 0 });
});
