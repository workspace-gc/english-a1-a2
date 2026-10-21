/**
 * tests/dom-stub.js
 * -----------------
 * DOM mínimo suficiente para ejecutar main.js (la app completa) en Node
 * y hacer un smoke test de render + interacción, sin navegador.
 *
 * Solo implementa lo que la app usa: createElement/TextNode, getElementById,
 * append/replaceChildren, classList, dataset, addEventListener/dispatch,
 * querySelector(All) para selectores simples (tag, .class, tag.class),
 * closest, y el par window { location, addEventListener, scrollTo, localStorage }.
 */

const TEXT = "#text";

class ClassList {
  constructor(owner) {
    this._owner = owner;
    this._set = new Set();
  }
  add(...cs) {
    cs.forEach((c) => this._set.add(c));
    this._sync();
  }
  remove(...cs) {
    cs.forEach((c) => this._set.delete(c));
    this._sync();
  }
  toggle(c, force) {
    const want = force === undefined ? !this._set.has(c) : Boolean(force);
    if (want) this._set.add(c);
    else this._set.delete(c);
    this._sync();
    return want;
  }
  contains(c) {
    return this._set.has(c);
  }
  _sync() {
    this._owner.className = [...this._set].join(" ");
  }
}

export class FakeNode {
  constructor(tag) {
    this.tagName = String(tag).toUpperCase();
    this.nodeType = this.tagName === TEXT ? 3 : 1;
    this.children = [];
    this.parentElement = null;
    this._listeners = {};
    this.dataset = {};
    this.style = {};
    this.attributes = {};
    this._text = "";
    this._className = "";
    this.value = "";
    this.hidden = false;
    this.disabled = false;
    this.id = "";
    this.type = "";
    this.href = "";
    this.classList = new ClassList(this);
  }

  append(...nodes) {
    for (const n of nodes) {
      const node = typeof n === "string" ? new FakeNode(TEXT) : n;
      if (typeof n === "string") node._text = String(n);
      node.parentElement = this;
      this.children.push(node);
    }
    return this;
  }

  replaceChildren(...nodes) {
    this.children.forEach((c) => (c.parentElement = null));
    this.children = [];
    this.append(...nodes);
  }

  setAttribute(key, value) {
    this.attributes[key] = String(value);
    if (key === "class") this.className = String(value);
    if (key === "id") this.id = String(value);
  }

  getAttribute(key) {
    return key in this.attributes ? this.attributes[key] : null;
  }

  removeAttribute(key) {
    delete this.attributes[key];
    if (key === "id") this.id = "";
    if (key === "class") this.className = "";
  }

  set className(value) {
    this._className = String(value);
    this.classList._set = new Set(value ? String(value).split(/\s+/).filter(Boolean) : []);
  }

  get className() {
    return this._className;
  }

  set textContent(value) {
    this.children.forEach((c) => (c.parentElement = null));
    this.children = [];
    this._text = String(value);
  }

  get textContent() {
    if (this.children.length === 0) return this._text;
    return this._text + this.children.map((c) => c.textContent).join("");
  }

  set innerHTML(value) {
    this._innerHTML = String(value);
  }

  get innerHTML() {
    return this._innerHTML ?? "";
  }

  get offsetWidth() {
    return 0;
  }

  addEventListener(type, fn) {
    (this._listeners[type] ??= []).push(fn);
  }

  removeEventListener(type, fn) {
    this._listeners[type] = (this._listeners[type] ?? []).filter((f) => f !== fn);
  }

  /** Llama a los listeners de este nodo (sin propagación; la app no la usa). */
  dispatch(type, event = {}) {
    for (const fn of this._listeners[type] ?? []) fn(event);
  }

  focus() {}
  blur() {}

  static matches(node, selector) {
    if (!node || node.nodeType === 3) return false;
    const parts = selector.split(".");
    const tag = parts[0]; // "" en selectores de solo clase (".ex")
    const classes = parts.slice(1);
    if (tag && node.tagName !== tag.toUpperCase()) return false;
    return classes.every((c) => node.classList.contains(c));
  }

  closest(selector) {
    let node = this;
    while (node) {
      if (FakeNode.matches(node, selector)) return node;
      node = node.parentElement;
    }
    return null;
  }

  querySelector(selector) {
    return this._collect(selector)[0] ?? null;
  }

  querySelectorAll(selector) {
    return this._collect(selector);
  }

  _collect(selector, out = []) {
    for (const child of this.children) {
      if (FakeNode.matches(child, selector)) out.push(child);
      out.push(...child._collect(selector, []));
    }
    return out;
  }
}

/**
 * Crea document + window con los nodos estáticos que main.js espera
 * (unidad, tabs, progress-fill, progress-label).
 */
export function createDom() {
  const body = new FakeNode("body");
  const staticById = {
    unidad: new FakeNode("div"),
    tabs: new FakeNode("div"),
    "progress-fill": new FakeNode("div"),
    "progress-label": new FakeNode("p"),
  };
  for (const [id, node] of Object.entries(staticById)) node.id = id;

  const document = {
    body,
    createElement: (tag) => new FakeNode(tag),
    createTextNode: (text) => {
      const node = new FakeNode(TEXT);
      node._text = String(text);
      return node;
    },
    getElementById: (id) => staticById[id] ?? null,
  };

  const listeners = {};
  const storage = new Map();
  const window = {
    location: { hash: "" },
    addEventListener(type, fn) {
      (listeners[type] ??= []).push(fn);
    },
    scrollTo() {},
    matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    localStorage: {
      getItem: (k) => (storage.has(k) ? storage.get(k) : null),
      setItem: (k, v) => storage.set(k, String(v)),
      removeItem: (k) => storage.delete(k),
    },
  };

  return {
    document,
    window,
    fire: (type) => {
      for (const fn of listeners[type] ?? []) fn({});
    },
  };
}
