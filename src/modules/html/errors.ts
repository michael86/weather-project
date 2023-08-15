import { genHeaderContainer } from "./static.js";

const chooseMeme = (e: string) => {
  console.log(e);
  switch (e) {
    case "invalid":
      return `../imgs/invalid.jpg`;
    case "not found":
      return `../imgs/lost.jpg`;
    default:
      break;
  }
};

export function getMeme(e: string) {
  return `
  <div class="meme-container">
    <img src="./imgs/${chooseMeme(e)}" alt="location not found" />
  </div>
  `;
}

export function invalidLoc() {
  const html = `<h2>Something went wrong there!</h2>
          <p>We couldn't find the location provided. Try that again.</p>`;
  return genHeaderContainer(html);
}

export function invalidChar() {
  const html = `<h2>Something went wrong there!</h2>
          <p>You provided invalid characters</p>`;
  return genHeaderContainer(html);
}
