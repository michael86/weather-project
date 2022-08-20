import { genHeaderContainer } from "./static.js";

export function getMeme(error) {
  let meme;

  return `
  <div class="meme-container">
    <img src="./imgs/location_not_found.jpg" alt="location not found" />
  </div>
  `;
}

export function invalidLoc() {
  const html = `<h2>Something went wrong there!</h2>
          <p>We couldn't find the location provided. Try that again.</p>`;
  return genHeaderContainer(html);
}
