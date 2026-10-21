/**
 * Feature: progress
 * -----------------
 * Seam de persistencia del progreso del alumno.
 *
 * Interfaz:
 *   loadScores()   → { [unitId]: { done, total } }
 *   recordResult(unitId, done, total)
 *   resetAll()
 *   unitProgress(state, unitId) → { done, total } | null
 *
 * Adaptador principal: localStorage. Adaptador de respaldo: un mapa en
 * memoria (modo privado o storage bloqueado) — la app nunca se rompe.
 */

const STORAGE_KEY = "english-a1a2.progress.v1";

const memory = {};
const memoryAdapter = {
  getItem: (key) => (key in memory ? memory[key] : null),
  setItem: (key, value) => {
    memory[key] = String(value);
  },
  removeItem: (key) => {
    delete memory[key];
  },
};

let adapter = null;

function getAdapter() {
  if (adapter) return adapter;
  try {
    const probe = `${STORAGE_KEY}.probe`;
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    adapter = window.localStorage;
  } catch {
    adapter = memoryAdapter;
  }
  return adapter;
}

export function loadScores() {
  try {
    const raw = getAdapter().getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function recordResult(unitId, done, total) {
  const scores = loadScores();
  const previous = scores[unitId];
  // El progreso nunca retrocede: se guarda el máximo.
  scores[unitId] = {
    done: Math.max(previous?.done ?? 0, done),
    total: total || previous?.total || 0,
  };
  try {
    getAdapter().setItem(STORAGE_KEY, JSON.stringify(scores));
  } catch {
    // sin espacio o storage bloqueado: se conserva en memoria
  }
  return scores;
}

export function resetAll() {
  try {
    getAdapter().removeItem(STORAGE_KEY);
  } catch {
    // ignorar
  }
  return {};
}
