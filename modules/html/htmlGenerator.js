import { getMeme, invalidLoc } from "./errors.js";
import { createSlider } from "./sliders.js";
import { genCard } from "./card.js";
import { createLocationInfo } from "./static.js";

export function genSlider(html, unix) {
  return createSlider(html, unix);
}

export function genCards(data) {
  let cards = "";
  for (const i in data) {
    cards += genCard(data[i]);
  }
  return cards;
}

export function genHeader(o) {
  return createLocationInfo(o);
}

export function genMeme(meme) {
  return getMeme(meme);
}

export function genLoader() {
  return `<div class="align-center"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>`;
}

export function locNotFound() {
  return invalidLoc();
}

export function showErrLatLon() {
  return invalidLatLon();
}
