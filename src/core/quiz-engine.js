/**
 * Core: quiz-engine
 * -----------------
 * Módulo profundo de lógica de corrección. Sin DOM, sin almacenamiento,
 * sin efectos secundarios: funciones puras sobre datos.
 *
 * Interfaz (la única superficie que cruzan los llamadores y los tests):
 *   normalize(value)                          → string normalizado
 *   check(exercise, submission)               → { correct: boolean }
 *   gradeUnit(exercises, submissions)         → { correct, total, percent }
 *
 * Formas de `submission` por tipo de ejercicio:
 *   choice:    { selected: number }
 *   fill:      { values: string[] }   (un valor por hueco, en orden)
 *   transform: { value: string }
 *   order:     { words: string[] }    (palabras en el orden elegido)
 *   cloze:     { selections: number[] }(índice de opción por hueco)
 */

const APOSTROPHES = /[\u2018\u2019\u02bb\u02bc]/g;

/**
 * Normaliza una respuesta del alumno: minúsculas, comillas rectas,
 * espacios colapsados, sin puntuación final (".", "?", "!").
 */
export function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(APOSTROPHES, "'")
    .replace(/\s+/g, " ")
    .replace(/[.?!]+\s*$/, "")
    .trim();
}

/**
 * Comprueba un solo ejercicio contra su submission.
 * @returns {{ correct: boolean }}
 */
export function check(exercise, submission) {
  if (!submission) return { correct: false };

  switch (exercise.type) {
    case "choice":
      return { correct: Number(submission.selected) === exercise.answer };

    case "fill": {
      const values = Array.isArray(submission.values) ? submission.values : [];
      const ok = exercise.blanks.every((blank, i) =>
        matchesAny(normalize(values[i]), blank.accepts)
      );
      return { correct: ok };
    }

    case "transform":
      return { correct: matchesAny(normalize(submission.value), exercise.accepts) };

    case "order": {
      const sentence = Array.isArray(submission.words)
        ? submission.words.join(" ")
        : "";
      return { correct: matchesAny(normalize(sentence), exercise.accepts) };
    }

    case "cloze": {
      const selections = Array.isArray(submission.selections)
        ? submission.selections
        : [];
      const ok = exercise.blanks.every(
        (blank, i) => Number(selections[i]) === blank.answer
      );
      return { correct: ok };
    }

    default:
      return { correct: false };
  }
}

/**
 * Califica una unidad completa. En el tipo `cloze` cada hueco cuenta
 * como un ítem independiente (es el test integrador).
 * @param {Array} exercises
 * @param {Object<string, object>} submissions keyed by exercise id
 * @returns {{ correct: number, total: number, percent: number }}
 */
export function gradeUnit(exercises, submissions) {
  let correct = 0;
  let total = 0;

  for (const exercise of exercises) {
    if (exercise.type === "cloze") {
      const selections = submissions?.[exercise.id]?.selections ?? [];
      for (const blank of exercise.blanks) {
        total += 1;
        // `blank.index` es la posición del hueco dentro del texto
        if (Number(selections[blank.index]) === blank.answer) correct += 1;
      }
    } else {
      total += 1;
      if (check(exercise, submissions?.[exercise.id]).correct) correct += 1;
    }
  }

  return {
    correct,
    total,
    percent: total === 0 ? 0 : Math.round((correct / total) * 100),
  };
}

function matchesAny(normalized, accepts) {
  return accepts.some((accepted) => normalize(accepted) === normalized);
}
