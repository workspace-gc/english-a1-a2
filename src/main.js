/**
 * Composition root: main.js
 * -------------------------
 * Cableado: acordeón lateral de módulos, router por hash y conexión
 * de unit-view con los seams de progreso y audio. Sin lógica de negocio.
 */

import { UNITS } from "./data/units.js";
import { MODULES } from "./data/modules.js";
import { renderUnit } from "./features/unit-view.js";
import { isAudioAvailable, speak } from "./features/audio.js";
import { loadScores, recordResult } from "./features/progress.js";

const unitContainer = document.getElementById("unidad");
const progressFill = document.getElementById("progress-fill");
const progressLabel = document.getElementById("progress-label");
const accordion = document.getElementById("modules-accordion");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebarOverlay = document.getElementById("sidebar-overlay");

const audio = {
  available: isAudioAvailable(),
  speak: (text) => speak(text),
};

let scores = loadScores();

buildAccordion();
window.addEventListener("hashchange", route);
route();

// --- Acordeón -----------------------------------------------------------

function buildAccordion() {
  if (!accordion) return;
  accordion.replaceChildren();
  for (const mod of MODULES) {
    const moduleUnits = UNITS.filter((u) => mod.unitNums.includes(u.num));
    if (moduleUnits.length === 0) continue;

    const section = document.createElement("div");
    section.className = "module";
    section.dataset.moduleId = mod.id;

    // Toggle button
    const toggleId = `module-list-${mod.id}`;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "module__toggle";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", toggleId);

    const icon = document.createElement("span");
    icon.className = "module__icon";
    icon.textContent = mod.icon;
    icon.setAttribute("aria-hidden", "true");

    const titleSpan = document.createElement("span");
    titleSpan.className = "module__title";
    titleSpan.textContent = mod.title;

    const progressSpan = document.createElement("span");
    progressSpan.className = "module__progress";
    progressSpan.dataset.moduleId = mod.id;

    const chevron = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    chevron.setAttribute("viewBox", "0 0 16 16");
    chevron.setAttribute("aria-hidden", "true");
    chevron.setAttribute("focusable", "false");
    chevron.classList.add("module__chevron");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M3 5.5 L8 10.5 L13 5.5");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-linecap", "round");
    chevron.append(path);

    btn.append(icon, titleSpan, progressSpan, chevron);

    // Unit list
    const ul = document.createElement("ul");
    ul.className = "module__list";
    ul.id = toggleId;
    ul.setAttribute("role", "list");

    for (const unit of moduleUnits) {
      const li = document.createElement("li");
      li.className = "module__item";

      const a = document.createElement("a");
      a.className = "module__link";
      a.href = `#/unidad-${unit.num}`;
      a.dataset.unitNum = String(unit.num);

      const numSpan = document.createElement("span");
      numSpan.className = "link__num";
      numSpan.setAttribute("aria-hidden", "true");
      numSpan.textContent = String(unit.num);

      const titleSpanLink = document.createElement("span");
      titleSpanLink.className = "link__title";
      titleSpanLink.textContent = unit.title;

      const badgeSpan = document.createElement("span");
      badgeSpan.className = "link__badge";
      badgeSpan.dataset.unitId = unit.id;

      a.append(numSpan, titleSpanLink, badgeSpan);
      a.addEventListener("click", () => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        // On mobile, close sidebar after navigation
        if (window.innerWidth <= 900) closeSidebar();
      });
      li.append(a);
      ul.append(li);
    }

    btn.addEventListener("click", () => toggleModule(section, btn));
    section.append(btn, ul);
    accordion.append(section);
  }
  refreshAccordion();
}

function toggleModule(section, btn) {
  const isOpen = section.hasAttribute("data-open");
  if (isOpen) {
    section.removeAttribute("data-open");
    btn.setAttribute("aria-expanded", "false");
  } else {
    section.setAttribute("data-open", "");
    btn.setAttribute("aria-expanded", "true");
  }
}

function openModule(moduleId) {
  accordion.querySelectorAll(".module").forEach((section) => {
    if (section.dataset.moduleId === moduleId) {
      section.setAttribute("data-open", "");
      section.querySelector(".module__toggle").setAttribute("aria-expanded", "true");
    }
  });
}

function refreshAccordion() {
  const currentNum = currentUnitNum();
  const currentUnit = UNITS.find((u) => u.num === currentNum) ?? UNITS[0];

  // Update active link
  accordion.querySelectorAll(".module__link").forEach((a) => {
    const isActive = Number(a.dataset.unitNum) === currentUnit.num;
    if (isActive) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });

  // Update badges
  accordion.querySelectorAll(".link__badge").forEach((badge) => {
    const unitId = badge.dataset.unitId;
    const saved = scores[unitId];
    if (!saved) {
      badge.textContent = "";
      badge.setAttribute("aria-label", "");
    } else if (saved.done >= saved.total) {
      badge.textContent = "✓";
      badge.setAttribute("aria-label", "Completada");
    } else {
      badge.textContent = `${saved.done}/${saved.total}`;
      badge.setAttribute("aria-label", `Hechas ${saved.done} de ${saved.total}`);
    }
  });

  // Update module progress badges
  accordion.querySelectorAll(".module__progress").forEach((span) => {
    const modId = span.dataset.moduleId;
    const mod = MODULES.find((m) => m.id === modId);
    if (!mod) return;
    const moduleUnits = UNITS.filter((u) => mod.unitNums.includes(u.num));
    const done = moduleUnits.filter((u) => {
      const s = scores[u.id];
      return s && s.total > 0 && s.done >= s.total;
    }).length;
    span.textContent = done > 0 ? `${done}/${moduleUnits.length}` : "";
  });

  // Auto-open the module that contains the current unit
  const currentMod = MODULES.find((m) => m.unitNums.includes(currentUnit.num));
  if (currentMod) openModule(currentMod.id);

  // Scroll active link into view within sidebar
  const activeLink = accordion.querySelector(".module__link[aria-current='page']");
  activeLink?.scrollIntoView({ block: "nearest", behavior: "smooth" });
}

// --- Progress bar -------------------------------------------------------

function refreshProgress() {
  const total = UNITS.length;
  const completed = UNITS.filter((u) => {
    const s = scores[u.id];
    return s && s.total > 0 && s.done >= s.total;
  }).length;
  const percent = Math.round((completed / total) * 100);
  progressFill.style.transform = `scaleX(${percent / 100})`;
  progressLabel.textContent = `${completed} de ${total} unidades completadas`;
}

// --- Result callback ----------------------------------------------------

function onResult(unitId, done, total) {
  scores = recordResult(unitId, done, total);
  refreshAccordion();
  refreshProgress();
}

// --- Router -------------------------------------------------------------

function route() {
  const num = currentUnitNum();
  const unit = UNITS.find((u) => u.num === num) ?? UNITS[0];
  renderUnit(unitContainer, unit, { audio, scores, onResult });
  refreshAccordion();
  refreshProgress();
}

function currentUnitNum() {
  const match = window.location.hash.match(/#\/unidad-(\d+)/);
  return match ? Number(match[1]) : 1;
}

// --- Mobile sidebar toggle ----------------------------------------------

function openSidebar() {
  sidebar.classList.add("is-open");
  sidebarOverlay.classList.add("is-visible");
  sidebarToggle.setAttribute("aria-expanded", "true");
  sidebarToggle.setAttribute("aria-label", "Cerrar menú de unidades");
  document.body.style.overflow = "hidden";
}

function closeSidebar() {
  sidebar.classList.remove("is-open");
  sidebarOverlay.classList.remove("is-visible");
  sidebarToggle.setAttribute("aria-expanded", "false");
  sidebarToggle.setAttribute("aria-label", "Abrir menú de unidades");
  document.body.style.overflow = "";
}

sidebarToggle?.addEventListener("click", () => {
  if (sidebar?.classList.contains("is-open")) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

sidebarOverlay?.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && sidebar?.classList.contains("is-open")) {
    closeSidebar();
    sidebarToggle?.focus();
  }
});

// --- Audio note ---------------------------------------------------------

if (!audio.available) {
  const note = document.createElement("p");
  note.className = "visually-hidden";
  note.textContent =
    "Tu navegador no soporta la lectura en voz alta; los botones de audio están deshabilitados.";
  document.body.append(note);
}
