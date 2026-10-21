import test from "node:test";
import assert from "node:assert/strict";

import { createDom } from "./dom-stub.js";
import { UNITS } from "../src/data/units.js";

/**
 * Smoke test de la app completa en Node.
 * Ejecuta main.js (tabs + router + renderUnit + progress) sobre un DOM stub
 * y simula a un alumno que resuelve las 10 unidades: un fallo por intento
 * fallido y la solución correcta en cada tipo de ejercicio, flashcards
 * incluidas. Valida el camino completo de la UI sin navegador.
 */

const { document, window, fire } = createDom();
globalThis.window = window;
globalThis.document = document;

await import("../src/main.js");

const click = (el) => el.dispatch("click", { target: el, preventDefault() {} });
const keyEnter = (el) => el.dispatch("keydown", { key: "Enter", preventDefault() {} });

const unitContainer = document.getElementById("unidad");
const tabsTrack = document.getElementById("tabs");

function currentArticle() {
  return unitContainer.children[0];
}

function findBtn(li, label) {
  const btn = li
    .querySelectorAll("button")
    .find((b) => b.textContent === label);
  assert.ok(btn, `botón «${label}» no encontrado`);
  return btn;
}

function feedbackOf(li) {
  return li.children.find((c) => c.classList.contains("ex__feedback"));
}

function solveExercise(li, ex) {
  switch (ex.type) {
    case "choice": {
      const buttons = li.querySelectorAll("button");
      // Primero un intento incorrecto (siempre existe: hay ≥2 opciones)
      click(ex.answer === 0 ? buttons[1] : buttons[0]);
      assert.match(feedbackOf(li).textContent, /Aún no/);
      click(buttons[ex.answer]);
      assert.match(feedbackOf(li).textContent, /Correcto/);
      break;
    }
    case "fill": {
      const inputs = li.querySelectorAll("input");
      assert.equal(inputs.length, ex.blanks.length);
      // Intento con huecos vacíos → error
      click(findBtn(li, "Comprobar"));
      assert.match(feedbackOf(li).textContent, /Revisa/);
      inputs.forEach((input, i) => (input.value = ex.blanks[i].accepts[0]));
      keyEnter(inputs[0]); // valida el camino de Enter
      assert.match(feedbackOf(li).textContent, /Correcto/);
      break;
    }
    case "transform": {
      const input = li.querySelector("input");
      input.value = ex.accepts[0];
      click(findBtn(li, "Comprobar"));
      assert.match(feedbackOf(li).textContent, /Correcto/);
      break;
    }
    case "order": {
      const orderDiv = li.children.find((c) => c.classList.contains("order"));
      const [pool, line] = orderDiv.children;
      // Comprobar con la línea vacía → error
      click(findBtn(li, "Comprobar"));
      assert.match(feedbackOf(li).textContent, /no es el correcto/);
      for (const wordIndex of ex.solution) {
        const chip = pool.children.find(
          (c) => c.dataset.wordIndex === String(wordIndex)
        );
        assert.ok(chip, `chip ${wordIndex} no está en el pool`);
        pool.dispatch("click", { target: chip, preventDefault() {} });
      }
      click(findBtn(li, "Comprobar"));
      assert.match(feedbackOf(li).textContent, /Correcto/);
      break;
    }
    case "cloze": {
      const selects = li.querySelectorAll("select");
      assert.equal(selects.length, ex.blanks.length);
      selects.forEach((select, i) => (select.value = String(ex.blanks[i].answer)));
      click(findBtn(li, "Comprobar todo"));
      assert.match(feedbackOf(li).textContent, /correctos/);
      break;
    }
  }
}

test("render inicial: 10 pestañas, unidad 1 y progreso 0/10", () => {
  assert.equal(tabsTrack.children.length, UNITS.length);
  const article = currentArticle();
  assert.equal(article.id, "unidad-1");
  assert.equal(
    document.getElementById("progress-label").textContent,
    "0 de 10 unidades completadas"
  );
  assert.equal(document.getElementById("progress-fill").style.transform, "scaleX(0)");
});

test("un alumno resuelve las 10 unidades: ruta completa de la UI", () => {
  for (const unit of UNITS) {
    window.location.hash = `#/unidad-${unit.num}`;
    fire("hashchange");
    const article = currentArticle();
    assert.equal(article.id, `unidad-${unit.num}`);

    for (const ex of unit.practice.exercises) {
      const li = article
        .querySelectorAll(".ex")
        .find((n) => n.dataset.id === ex.id);
      assert.ok(li, `ejercicio ${ex.id} no renderizado en unidad ${unit.num}`);
      solveExercise(li, ex);
      // Al resolver, aparece la explicación
      const explanation = li.children.find((c) => c.classList.contains("ex__explanation"));
      assert.equal(explanation.hidden, false);
    }

    // Progreso acumulado: N unidades completadas tras la unidad N
    assert.equal(
      document.getElementById("progress-label").textContent,
      `${unit.num} de 10 unidades completadas`
    );
  }
});

test("progreso final: barra al 100%, pestañas con ✓ y persistencia", () => {
  assert.equal(document.getElementById("progress-fill").style.transform, "scaleX(1)");
  assert.equal(
    document.getElementById("progress-label").textContent,
    "10 de 10 unidades completadas"
  );
  for (const tab of tabsTrack.querySelectorAll(".tab")) {
    const label = tab.querySelector(".tab__done");
    assert.equal(label.textContent, "✓");
  }
  const stored = JSON.parse(
    window.localStorage.getItem("english-a1a2.progress.v1")
  );
  assert.equal(Object.keys(stored).length, UNITS.length);
});

test("flashcards (unidad 9): completar un mazo, repitarlo y cambiar de mazo", () => {
  window.location.hash = "#/unidad-9";
  fire("hashchange");
  const article = currentArticle();
  const flash = article.querySelector("section.flash");
  assert.ok(flash, "sección de flashcards no renderizada");

  const unit9 = UNITS.find((u) => u.num === 9);
  const tabs = flash.querySelectorAll(".deck-tab");
  assert.equal(tabs.length, unit9.flash.decks.length);

  // Mazo 0: marcar «La sé» hasta completarlo
  tabs[0].dispatch("click", { target: tabs[0], preventDefault() {} });
  let stage = flash.querySelector(".flash__stage");
  for (let i = 0; i < unit9.flash.decks[0].items.length; i += 1) {
    const know = stage.querySelectorAll("button").find((b) => b.textContent === "La sé ✓");
    assert.ok(know, "botón «La sé» no aparece");
    know.dispatch("click", { target: know, preventDefault() {} });
    stage = flash.querySelector(".flash__stage");
  }
  const doneNote = flash.querySelectorAll("p").find((p) => p.textContent.includes("completado"));
  assert.ok(doneNote, "mensaje de mazo completado no aparece");

  // Repetir mazo → vuelve el contador
  const again = stage.querySelectorAll("button").find((b) => b.textContent === "Repetir mazo");
  again.dispatch("click", { target: again, preventDefault() {} });
  assert.ok(flash.querySelector(".flash__counter"), "contador no reaparece tras repetir");

  // Cambiar de mazo (tab 1) sin romperse
  const tabs2 = flash.querySelectorAll(".deck-tab");
  tabs2[1].dispatch("click", { target: tabs2[1], preventDefault() {} });
  assert.ok(flash.querySelector(".flashcard"), "tarjeta del mazo 2 no renderiza");
});
