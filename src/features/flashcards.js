/**
 * Feature: flashcards
 * -------------------
 * Mazos de vocabulario con flip 3D. De repaso para la sesión: al marcar
 * "La sé" la tarjeta sale del mazo; al final, se puede repetir.
 *
 * Interfaz:
 *   renderFlashcards(container, flashData, deps)
 *     flashData: { decks: [{ title, items: { en, es, note? }[] }] }
 *     deps: { audio: { speak, available } }
 */

export function renderFlashcards(container, flashData, deps) {
  const { decks } = flashData;
  const audio = deps.audio;

  // Estado por mazo: índice actual y set de tarjetas "conocidas" (sesión)
  const state = decks.map((deck) => ({ index: 0, known: new Set() }));

  const section = el("section", { class: "flash" });
  const h3 = el("h3", { class: "practice__head" });
  h3.textContent = "Vocabulario en tarjetas";
  section.append(h3);

  // Selector de mazos
  const deckTabs = el("div", { class: "flash__decks", role: "tablist" });
  const stage = el("div", { class: "flash__stage" });
  section.append(deckTabs, stage);
  container.append(section);

  let active = 0;

  function renderTabs() {
    deckTabs.replaceChildren();
    decks.forEach((deck, i) => {
      const tab = el("button", {
        class: "deck-tab",
        role: "tab",
        "aria-selected": String(i === active),
      });
      tab.textContent = deck.title;
      tab.addEventListener("click", () => {
        active = i;
        renderTabs();
        renderCard();
      });
      deckTabs.append(tab);
    });
  }

  function remaining(deck) {
    return deck.items
      .map((item, i) => ({ item, i }))
      .filter(({ i }) => !state[active].known.has(i));
  }

  function renderCard() {
    const deck = decks[active];
    const st = state[active];
    stage.replaceChildren();

    const left = remaining(deck);
    if (left.length === 0) {
      const done = el("p", { class: "flash__done" });
      done.textContent = `🎉 Mazo «${deck.title}» completado: ${deck.items.length} tarjetas.`;
      const again = el("button", { class: "btn btn--small" });
      again.textContent = "Repetir mazo";
      again.addEventListener("click", () => {
        st.known.clear();
        st.index = 0;
        renderCard();
      });
      stage.append(done, again);
      return;
    }

    // Buscar el índice real dentro de deck.items del próximo no conocido
    let idx = 0;
    while (st.known.has(idx) && idx < deck.items.length) idx += 1;
    if (idx >= deck.items.length) {
      idx = 0;
      while (st.known.has(idx) && idx < deck.items.length) idx += 1;
    }
    st.index = idx;
    const item = deck.items[idx];

    const counter = el("p", { class: "flash__counter" });
    counter.textContent = `${st.index + 1} / ${deck.items.length} · ${left.length} por repasar`;

    const card = el("button", {
      class: "flashcard",
      "aria-label": `Tarjeta: ${item.en}. Pulsa para voltear.`,
    });
    card.type = "button";
    const inner = el("span", { class: "flashcard__inner" });
    const front = el("span", { class: "flashcard__face flashcard__face--front" });
    const word = el("span", { class: "flashcard__word" });
    word.textContent = item.en;
    word.setAttribute("lang", "en");
    front.append(word);
    if (audio.available) {
      const note = el("span", { class: "flashcard__note" });
      note.textContent = "Pulsa la tarjeta para voltear · usa 🔊 para escuchar";
      front.append(note);
    }
    const back = el("span", { class: "flashcard__face flashcard__face--back" });
    const backWord = el("span", { class: "flashcard__word" });
    backWord.textContent = item.es;
    back.append(backWord);
    inner.append(front, back);
    card.append(inner);
    card.addEventListener("click", () => card.classList.toggle("flashcard--flipped"));

    const controls = el("div", { class: "flash__controls" });
    const prev = el("button", { class: "btn btn--ghost btn--small" });
    prev.textContent = "← Anterior";
    const speakBtn = el("button", { class: "btn btn--ghost btn--small" });
    speakBtn.textContent = "🔊 Escuchar";
    speakBtn.disabled = !audio.available;
    speakBtn.addEventListener("click", () => audio.speak(item.en));
    const know = el("button", { class: "btn btn--small" });
    know.textContent = "La sé ✓";
    const learning = el("button", { class: "btn btn--ghost btn--small" });
    learning.textContent = "Sigo aprendiendo →";

    prev.addEventListener("click", () => {
      let i = (st.index - 1 + deck.items.length) % deck.items.length;
      let guard = 0;
      while (st.known.has(i) && guard < deck.items.length) {
        i = (i - 1 + deck.items.length) % deck.items.length;
        guard += 1;
      }
      st.index = i;
      renderCard();
    });
    learning.addEventListener("click", () => {
      let i = (st.index + 1) % deck.items.length;
      let guard = 0;
      while (st.known.has(i) && guard < deck.items.length) {
        i = (i + 1) % deck.items.length;
        guard += 1;
      }
      st.index = i;
      renderCard();
    });
    know.addEventListener("click", () => {
      st.known.add(st.index);
      renderCard();
    });

    controls.append(prev, speakBtn, know, learning);
    stage.append(counter, card, controls);
  }

  renderTabs();
  renderCard();

  return section;
}

function el(tag, attrs = {}) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  return node;
}
