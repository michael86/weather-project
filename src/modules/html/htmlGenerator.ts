import { getMeme, invalidLoc, invalidChar } from "./errors.js";
import { createSlider } from "./sliders.js";
import { genCard } from "./card.js";
import { createLocationInfo } from "./static.js";

export function genSlider(html: string, unix: number) {
  return createSlider(html, unix);
}

interface GenCard {
  date: number;
  desc: string;
  feelsLike: number;
  humidity: number;
  icon: string;
  temp: number;
  windDirection: number;
  windStrength: number;
}

interface GenCard extends Array<GenCard> {}

export function genCards(data: GenCard) {
  let cards = "";
  for (const i in data) {
    cards += genCard(data[i]);
  }
  return cards;
}

interface GenHeader {
  coord: { lat: number; lon: number };
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export function genHeader(o: GenHeader) {
  return createLocationInfo(o);
}

export function genMeme(e: string) {
  return getMeme(e);
}

export function genLoader() {
  return `<div class="loader-container align-center"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>`;
}

export function locNotFound() {
  return invalidLoc();
}

export function invalidChars() {
  return invalidChar();
}
