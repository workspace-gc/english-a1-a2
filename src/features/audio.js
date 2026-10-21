/**
 * Feature: audio
 * --------------
 * Seam de pronunciación sobre la Web Speech API.
 *
 * Interfaz:
 *   isAudioAvailable() → boolean
 *   speak(text)        → boolean (false si el navegador no lo soporta)
 *
 * Adaptadores: el API real del navegador; si no existe, los llamadores
 * ocultan los botones en vez de romper.
 */

let cachedVoices = null;

export function isAudioAvailable() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickEnglishVoice() {
  if (!isAudioAvailable()) return undefined;
  if (!cachedVoices) cachedVoices = window.speechSynthesis.getVoices();
  return (
    cachedVoices.find((v) => v.lang === "en-GB") ||
    cachedVoices.find((v) => v.lang?.startsWith("en"))
  );
}

export function speak(text) {
  if (!isAudioAvailable()) return false;
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = pickEnglishVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang ?? "en-GB";
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}
