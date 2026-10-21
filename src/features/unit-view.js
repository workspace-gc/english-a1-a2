/**
 * Feature: unit-view
 * ------------------
 * Renderiza una unidad (teoría + práctica) a partir de sus datos.
 * Toda la corrección se delega en el núcleo quiz-engine; aquí solo
 * vive la construcción del DOM y el estado de la interacción.
 *
 * Interfaz:
 *   renderUnit(container, unit, deps)
 *     deps: {
 *       audio:   { speak(text), available: boolean },
 *       scores:  { [unitId]: { done, total } } | {},
 *       onResult(unitId, done, total) → void,
 *     }
 */

import { check, normalize } from "../core/quiz-engine.js";
import { renderFlashcards } from "./flashcards.js";

export function renderUnit(container, unit, deps) {
  const { audio, scores, onResult } = deps;
  const total = unitTotal(unit);
  const results = new Map(); // exerciseId → { done?, clozeCorrect? }

  const article = el("article", { class: "unit" });
  article.id = `unidad-${unit.num}`;

  // ---------- Cabecera ----------
  const head = el("header", { class: "unit__head" });
  const num = el("span", { class: "unit__num", "aria-hidden": "true" });
  num.textContent = String(unit.num);
  const titles = el("div");
  const title = el("h2", { class: "unit__title" });
  title.textContent = unit.title;
  const tagline = el("p", { class: "unit__tagline" });
  tagline.textContent = unit.tagline;
  titles.append(title, tagline);
  head.append(num, titles);

  const saved = scores[unit.id];
  if (saved?.done) {
    const badge = el("span", { class: "unit__badge" });
    const doneAll = saved.done >= saved.total;
    if (doneAll) badge.classList.add("unit__badge--done");
    badge.textContent = doneAll ? "✓ Completada" : `${saved.done}/${saved.total} hechas`;
    badge.setAttribute("role", "status");
    head.append(badge);
  }
  article.append(head);

  // ---------- Teoría ----------
  const theory = el("section", { class: "theory" });
  const intro = el("p");
  intro.textContent = unit.intro;
  theory.append(intro);
  for (const block of unit.theory) theory.append(renderBlock(block, audio));
  article.append(theory);

  if (unit.flash) {
    article.append(renderFlashcards(article, unit.flash, { audio }));
  }

  // ---------- Práctica ----------
  const practice = el("section", { class: "practice" });
  const practiceHead = el("h3", { class: "practice__head" });
  practiceHead.textContent = "Práctica";
  const hint = el("p", { class: "practice__hint" });
  hint.textContent = unit.practice.hint ?? "";
  practice.append(practiceHead, hint);

  const list = el("ol", { class: "exercises" });
  let exerciseNumber = 0;
  for (const exercise of unit.practice.exercises) {
    exerciseNumber += 1;
    list.append(renderExercise(exercise, exerciseNumber, audio, (result) => {
      results.set(exercise.id, result);
      report();
    }));
  }
  practice.append(list);
  article.append(practice);

  container.replaceChildren(article);
  report();

  function report() {
    let done = 0;
    for (const exercise of unit.practice.exercises) {
      const r = results.get(exercise.id);
      if (exercise.type === "cloze") done += r?.clozeCorrect ?? 0;
      else if (r?.done) done += 1;
    }
    onResult(unit.id, done, total);
  }
}

// ---------------------------------------------------------------
// Bloques de teoría
// ---------------------------------------------------------------

function renderBlock(block, audio) {
  switch (block.type) {
    case "p":
      return html("p", block.html);

    case "note":
      return html("p", `<span class="note">${block.html}</span>`);

    case "list": {
      const wrap = el("div");
      if (block.title) {
        const h = el("h3");
        h.textContent = block.title;
        wrap.append(h);
      }
      const ul = el("ul", { class: "list" });
      for (const item of block.items) ul.append(html("li", item));
      wrap.append(ul);
      return wrap;
    }

    case "table": {
      const wrap = el("div", { class: "table-wrap" });
      const table = el("table", { class: "table" });
      const caption = el("caption");
      caption.textContent = block.caption;
      const thead = el("thead");
      const headRow = el("tr");
      for (const headCell of block.head) headRow.append(el("th", {}, headCell));
      thead.append(headRow);
      const tbody = el("tbody");
      for (const row of block.rows) {
        const tr = el("tr");
        for (const cell of row) tr.append(el("td", {}, cell));
        tbody.append(tr);
      }
      table.append(caption, thead, tbody);
      wrap.append(table);
      return wrap;
    }

    case "examples": {
      const wrap = el("div");
      if (block.title) {
        const h = el("h3");
        h.textContent = block.title;
        wrap.append(h);
      }
      const ul = el("ul", { class: "examples" });
      for (const item of block.items) {
        const li = el("li");
        const speakBtn = el("button", {
          class: audio.available ? "speak-btn" : "speak-btn speak-btn--disabled",
          title: "Escuchar la pronunciación",
          "aria-label": `Escuchar: ${item.en}`,
        });
        speakBtn.type = "button";
        speakBtn.textContent = "🔊";
        speakBtn.disabled = !audio.available;
        speakBtn.addEventListener("click", () => audio.speak(item.en));
        const en = el("span", { class: "example__en" });
        en.setAttribute("lang", "en");
        en.textContent = item.en;
        const es = el("span", { class: "example__es" });
        es.setAttribute("lang", "es");
        es.textContent = item.es;
        li.append(speakBtn, en, es);
        ul.append(li);
      }
      wrap.append(ul);
      return wrap;
    }

    default:
      return el("p");
  }
}

// ---------------------------------------------------------------
// Ejercicios
// ---------------------------------------------------------------

function renderExercise(ex, number, audio, onResult) {
  const li = el("li", { class: "ex" });
  li.dataset.id = ex.id;

  const head = el("p");
  const num = el("span", { class: "ex__num", "aria-hidden": "true" });
  num.textContent = String(number);
  const prompt = el("span", { class: "ex__prompt" });
  prompt.textContent = ex.prompt;
  head.append(num, prompt);
  li.append(head);

  const feedback = el("p", { class: "ex__feedback", role: "status", "aria-live": "polite" });
  const explanation = el("p", { class: "ex__explanation" });
  explanation.hidden = true;

  const actions = el("div", { class: "ex__actions" });

  let markDone = () => {
    onResult({ done: true });
    setFeedback(li, feedback, "correct", "¡Correcto! ✓");
    showExplanation(explanation, ex);
  };

  switch (ex.type) {
    case "choice": {
      if (ex.sentence) {
        const sentence = el("span", { class: "ex__sentence" });
        sentence.setAttribute("lang", "en");
        sentence.textContent = ex.sentence;
        li.append(sentence);
      }
      const options = el("div", { class: "options" });
      let solved = false;
      ex.options.forEach((optionText, i) => {
        const btn = el("button", { class: "option", type: "button" });
        btn.textContent = optionText;
        btn.addEventListener("click", () => {
          if (solved) return;
          if (Number(i) === ex.answer) {
            solved = true;
            btn.classList.add("option--correct");
            options.querySelectorAll("button").forEach((b) => (b.disabled = true));
            markDone();
          } else {
            btn.classList.add("option--wrong");
            shake(li);
            setFeedback(li, feedback, "wrong", "Aún no. Intenta otra opción.");
          }
        });
        options.append(btn);
      });
      li.append(options);
      break;
    }

    case "fill": {
      const line = el("div", { class: "blank-line" });
      const inputs = ex.blanks.map((blank, i) => {
        const input = el("input", { class: "blank", type: "text", name: `blank-${ex.id}-${i + 1}`, autocomplete: "off", autocapitalize: "off", spellcheck: "false" });
        const longest = Math.max(...blank.accepts.map((a) => a.length));
        input.style.minWidth = `${Math.max(7, longest + 1)}ch`;
        input.setAttribute("aria-label", `Hueco ${i + 1} de ${ex.blanks.length}`);
        input.addEventListener("keydown", (event) => {
          if (event.key === "Enter") event.preventDefault(), doCheck();
        });
        return input;
      });
      if (ex.sentence) {
        const parts = ex.sentence.split("______");
        parts.forEach((part, i) => {
          line.append(document.createTextNode(part));
          if (i < inputs.length) line.append(inputs[i]);
        });
      } else {
        inputs.forEach((input) => line.append(input));
      }
      li.append(line);

      let solved = false;
      const checkBtn = el("button", { class: "btn", type: "button" });
      checkBtn.textContent = "Comprobar";
      const revealBtn = el("button", { class: "btn btn--ghost", type: "button" });
      revealBtn.textContent = "Ver respuesta";
      actions.append(checkBtn, revealBtn);

      function doCheck() {
        if (solved) return;
        const res = check(ex, { values: inputs.map((i) => i.value) });
        if (res.correct) {
          solved = true;
          inputs.forEach((input) => {
            input.classList.add("blank--correct");
            input.disabled = true;
          });
          checkBtn.disabled = true;
          revealBtn.hidden = true;
          markDone();
        } else {
          inputs.forEach((input, i) => {
            const ok = ex.blanks[i].accepts.some((a) =>
              normalize(a) === normalize(input.value)
            );
            input.classList.toggle("blank--correct", ok);
            input.classList.toggle("blank--wrong", !ok);
          });
          shake(li);
          setFeedback(li, feedback, "wrong", "Revisa los huecos marcados en rojo.");
          const firstWrong = inputs.find((input) => input.classList.contains("blank--wrong"));
          firstWrong?.focus();
        }
      }

      function doReveal() {
        if (solved) return;
        solved = true;
        inputs.forEach((input, i) => {
          input.value = ex.blanks[i].accepts[0];
          input.classList.remove("blank--wrong");
          input.classList.add("blank--correct");
          input.disabled = true;
        });
        checkBtn.disabled = true;
        revealBtn.hidden = true;
        setFeedback(li, feedback, "correct", "Aquí tienes la respuesta. ¡Lee la explicación!");
        showExplanation(explanation, ex);
        onResult({ done: true });
      }

      checkBtn.addEventListener("click", doCheck);
      revealBtn.addEventListener("click", doReveal);
      break;
    }

    case "transform": {
      const sentence = el("span", { class: "ex__sentence" });
      sentence.setAttribute("lang", "en");
      sentence.textContent = ex.sentence;
      li.append(sentence);

      const input = el("input", { class: "blank blank--wide", type: "text", name: `transform-${ex.id}`, autocomplete: "off", autocapitalize: "off", spellcheck: "false" });
      input.style.minWidth = "18ch";
      input.setAttribute("aria-label", "Tu respuesta");
      const line = el("div", { class: "blank-line" });
      line.append(input);
      li.append(line);

      let solved = false;
      const checkBtn = el("button", { class: "btn", type: "button" });
      checkBtn.textContent = "Comprobar";
      const revealBtn = el("button", { class: "btn btn--ghost", type: "button" });
      revealBtn.textContent = "Ver respuesta";
      actions.append(checkBtn, revealBtn);

      function doCheck() {
        if (solved) return;
        if (check(ex, { value: input.value }).correct) {
          solved = true;
          input.classList.add("blank--correct");
          input.disabled = true;
          checkBtn.disabled = true;
          revealBtn.hidden = true;
          markDone();
        } else {
          input.classList.add("blank--wrong");
          shake(li);
          setFeedback(li, feedback, "wrong", "Casi. Revisa la regla en la teoría e inténtalo de nuevo.");
          input.focus();
        }
      }

      function doReveal() {
        if (solved) return;
        solved = true;
        input.value = ex.accepts[0];
        input.classList.remove("blank--wrong");
        input.classList.add("blank--correct");
        input.disabled = true;
        checkBtn.disabled = true;
        revealBtn.hidden = true;
        setFeedback(li, feedback, "correct", "Aquí tienes la respuesta. ¡Lee la explicación!");
        showExplanation(explanation, ex);
        onResult({ done: true });
      }

      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") event.preventDefault(), doCheck();
      });
      checkBtn.addEventListener("click", doCheck);
      revealBtn.addEventListener("click", doReveal);
      break;
    }

    case "order": {
      const order = el("div", { class: "order" });
      const pool = el("div", { class: "order__pool" });
      const line = el("div", { class: "order__line" });
      order.append(pool, line);
      li.append(order);

      const chips = ex.words.map((word, i) => {
        const chip = el("button", { class: "chip", type: "button" });
        chip.textContent = word;
        chip.dataset.wordIndex = String(i);
        return chip;
      });
      chips.forEach((chip) => pool.append(chip));

      pool.addEventListener("click", (event) => {
        const chip = event.target.closest(".chip");
        if (chip && chip.parentElement === pool) {
          line.append(chip);
          chip.classList.add("chip--in-line");
        }
      });
      line.addEventListener("click", (event) => {
        const chip = event.target.closest(".chip");
        if (chip && chip.parentElement === line) {
          pool.append(chip);
          chip.classList.remove("chip--in-line");
        }
      });

      let solved = false;
      const checkBtn = el("button", { class: "btn", type: "button" });
      checkBtn.textContent = "Comprobar";
      const resetBtn = el("button", { class: "btn btn--ghost", type: "button" });
      resetBtn.textContent = "Empezar de nuevo";
      const revealBtn = el("button", { class: "btn btn--ghost", type: "button" });
      revealBtn.textContent = "Ver respuesta";
      actions.append(checkBtn, resetBtn, revealBtn);

      function lineWords() {
        return [...line.querySelectorAll(".chip")].map((c) => c.textContent);
      }

      function doCheck() {
        if (solved) return;
        if (check(ex, { words: lineWords() }).correct) {
          solved = true;
          line.querySelectorAll(".chip").forEach((c) => c.classList.add("chip--correct"));
          checkBtn.disabled = true;
          revealBtn.hidden = true;
          resetBtn.hidden = true;
          markDone();
        } else {
          shake(li);
          setFeedback(li, feedback, "wrong", "El orden no es el correcto. Pulsa «Empezar de nuevo» si te atascas.");
          line.querySelector(".chip")?.focus() ?? pool.querySelector(".chip")?.focus();
        }
      }

      function doReset() {
        if (solved) return;
        chips.forEach((chip) => {
          chip.classList.remove("chip--in-line", "chip--correct");
          pool.append(chip);
        });
        feedback.textContent = "";
      }

      function doReveal() {
        if (solved) return;
        solved = true;
        chips.forEach((chip) => {
          chip.classList.remove("chip--in-line");
          pool.append(chip);
        });
        ex.solution.forEach((wordIndex) => {
          const chip = chips[wordIndex];
          line.append(chip);
          chip.classList.add("chip--correct");
        });
        checkBtn.disabled = true;
        revealBtn.hidden = true;
        resetBtn.hidden = true;
        setFeedback(li, feedback, "correct", "Aquí tienes la frase correcta. ¡Lee la explicación!");
        showExplanation(explanation, ex);
        onResult({ done: true });
      }

      checkBtn.addEventListener("click", doCheck);
      resetBtn.addEventListener("click", doReset);
      revealBtn.addEventListener("click", doReveal);
      break;
    }

    case "cloze": {
      const text = el("p", { class: "cloze-text" });
      const selects = [];
      for (const part of ex.sentence) {
        if (typeof part === "string") {
          text.append(document.createTextNode(part));
        } else {
          const blank = ex.blanks[part.__blank];
          const select = el("select", { class: "cloze-select" });
          select.setAttribute("aria-label", `Hueco ${part.__blank + 1}`);
          const placeholder = el("option", { value: "" });
          placeholder.textContent = "…";
          placeholder.disabled = true;
          select.append(placeholder);
          blank.options.forEach((optionText, i) => {
            const option = el("option", { value: String(i) });
            option.textContent = optionText;
            select.append(option);
          });
          text.append(select);
          selects[part.__blank] = select;
        }
      }
      li.append(text);

      let solvedAll = false;
      const checkBtn = el("button", { class: "btn", type: "button" });
      checkBtn.textContent = "Comprobar todo";
      actions.append(checkBtn);

      function doCheck() {
        if (solvedAll) return;
        let allCorrect = true;
        let correctCount = 0;
        const wrongExplanations = [];
        ex.blanks.forEach((blank, i) => {
          const select = selects[i];
          const value = select.value === "" ? -1 : Number(select.value);
          const isCorrect = value === blank.answer;
          select.classList.toggle("cloze-select--correct", isCorrect);
          select.classList.toggle("cloze-select--wrong", !isCorrect);
          select.disabled = isCorrect || solvedAll;
          if (isCorrect) correctCount += 1;
          else {
            allCorrect = false;
            wrongExplanations.push(
              `<strong>Hueco ${i + 1}:</strong> ${blank.explanation}`
            );
          }
        });
        if (allCorrect) {
          solvedAll = true;
          checkBtn.disabled = true;
          setFeedback(li, feedback, "correct", "¡Los seis huecos, correctos! 🎉");
          showExplanation(explanation, {
            explanation: "Has completado el texto integrador con todas las herramientas de la guía.",
          });
          onResult({ clozeCorrect: ex.blanks.length });
        } else {
          shake(li);
          setFeedback(
            li,
            feedback,
            "wrong",
            `${correctCount} de ${ex.blanks.length} correctos. Revisa los huecos marcados.`
          );
          selects.find((s) => s.classList.contains("cloze-select--wrong"))?.focus();
          if (wrongExplanations.length) {
            explanation.hidden = false;
            explanation.innerHTML = `<strong>Claves:</strong><br>${wrongExplanations.join("<br>")}`;
          }
          onResult({ clozeCorrect: correctCount });
        }
      }

      checkBtn.addEventListener("click", doCheck);
      break;
    }

    default:
      break;
  }

  li.append(actions, feedback, explanation);
  return li;
}

// ---------------------------------------------------------------
// Utilidades de DOM
// ---------------------------------------------------------------

function setFeedback(li, feedback, kind, message) {
  feedback.className = `ex__feedback ex__feedback--${kind}`;
  feedback.textContent = message;
  li.classList.remove("ex--wrong");
  void li.offsetWidth; // reinicia la animación del shake
}

function shake(li) {
  li.classList.remove("ex--wrong");
  void li.offsetWidth;
  li.classList.add("ex--wrong");
}

function showExplanation(explanation, ex) {
  explanation.hidden = false;
  explanation.innerHTML = ex.explanation;
}

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  for (const child of children) {
    if (child == null) continue;
    node.append(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return node;
}

function html(tag, innerHtml) {
  const node = document.createElement(tag);
  node.innerHTML = innerHtml;
  return node;
}

function unitTotal(unit) {
  return unit.practice.exercises.reduce(
    (acc, ex) => acc + (ex.type === "cloze" ? ex.blanks.length : 1),
    0
  );
}
