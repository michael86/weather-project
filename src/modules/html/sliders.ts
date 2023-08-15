import { genId, getLocaleDate } from "../utils.js";

export function createSlider(html: string, unix: number) {
  const id = genId();

  const createArrow = (direction: string, path: string) => {
    return `<svg data-id="${id}" data-direction="${direction}" class="${direction}" viewBox="0 0 100 100"><path stroke-width="2" stroke-linecap="round" fill="#fff" stroke="#fff" d="${path}"/></svg>`;
  };

  return `
    <div class="slider-container" id="${id}">
        ${createArrow("scroll-left", "M98 98L2 50 98 2 98 5 8 50 98 95z")}
        <p class="date align-center">${getLocaleDate(unix)}</p>
        <div class="card-container">
          ${html && html}
        </div>
        ${createArrow("scroll-right", "M2 2L98 50 2 98 2 95 92 50 2 5z")}
    </div>`;
}
