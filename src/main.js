/**
 * Composition root: main.js
 * -------------------------
 * Solo cableado: construye las pestañas, enruta por hash y conecta
 * unit-view con los seams de progreso y audio. Sin lógica de negocio.
 */

import { UNITS } from "./data/units.js";
import { renderUnit } from "./features/unit-view.js";
import { isAudioAvailable, speak } from "./features/audio.js";
import { loadScores, recordResult } from "./features/progress.js";

const unitContainer = document.getElementById("unidad");
const tabsTrack = document.getElementById("tabs");
const progressFill = document.getElementById("progress-fill");
const progressLabel = document.getElementById("progress-label");

const audio = {
  available: isAudioAvailable(),
  speak: (text) => speak(text),
};

let scores = loadScores();

buildTabs();
window.addEventListener("hashchange", route);
route();

function buildTabs() {
  tabsTrack.replaceChildren();
  for (const unit of UNITS) {
    const a = document.createElement("a");
    a.className = "tab";
    a.href = `#/unidad-${unit.num}`;
    const num = document.createElement("span");
    num.className = "tab__num";
    num.textContent = String(unit.num);
    const name = document.createElement("span");
    name.className = "tab__name";
    name.textContent = unit.title;
    const done = document.createElement("span");
    done.className = "tab__done";
    a.append(num, name, done);
    a.addEventListener("click", () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
    tabsTrack.append(a);
  }
  refreshTabs();
}

function refreshTabs() {
  const current = currentUnitId();
  tabsTrack.querySelectorAll(".tab").forEach((tab) => {
    const id = tab.href.split("#/")[1];
    const unit = UNITS.find((u) => unitKey(u) === id);
    if (unit && unit.id === current) tab.setAttribute("aria-current", "page");
    else tab.removeAttribute("aria-current");
    const saved = scores[unit?.id];
    const label = tab.querySelector(".tab__done");
    if (!saved) {
      label.textContent = "";
    } else if (saved.done >= saved.total) {
      label.textContent = "✓";
      label.setAttribute("aria-label", "Unidad completada");
    } else {
      label.textContent = `${saved.done}/${saved.total}`;
      label.setAttribute("aria-label", `Hechas ${saved.done} de ${saved.total}`);
    }
  });
}

function refreshProgress() {
  const completed = UNITS.filter((u) => {
    const s = scores[u.id];
    return s && s.total > 0 && s.done >= s.total;
  }).length;
  const percent = Math.round((completed / UNITS.length) * 100);
  progressFill.style.transform = `scaleX(${percent / 100})`;
  progressLabel.textContent = `${completed} de ${UNITS.length} unidades completadas`;
}

function onResult(unitId, done, total) {
  scores = recordResult(unitId, done, total);
  refreshTabs();
  refreshProgress();
}

function route() {
  const match = window.location.hash.match(/#\/unidad-(\d+)/);
  const num = match ? Number(match[1]) : 1;
  const unit = UNITS.find((u) => u.num === num) ?? UNITS[0];
  renderUnit(unitContainer, unit, {
    audio,
    scores,
    onResult,
  });
  refreshTabs();
  refreshProgress();
}

function currentUnitId() {
  const match = window.location.hash.match(/#\/unidad-(\d+)/);
  const num = match ? Number(match[1]) : 1;
  return (UNITS.find((u) => u.num === num) ?? UNITS[0]).id;
}

function unitKey(u) {
  return `unidad-${u.num}`;
}

if (!audio.available) {
  // Nota discreta cuando el navegador no tiene Web Speech API
  const note = document.createElement("p");
  note.className = "visually-hidden";
  note.textContent =
    "Tu navegador no soporta la lectura en voz alta; los botones de audio están deshabilitados.";
  document.body.append(note);
}
