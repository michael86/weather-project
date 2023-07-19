"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidChar = exports.invalidLoc = exports.getMeme = void 0;
const static_js_1 = require("./static.js");
const chooseMeme = (e) => {
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
function getMeme(e) {
    return `
  <div class="meme-container">
    <img src="./imgs/${chooseMeme(e)}" alt="location not found" />
  </div>
  `;
}
exports.getMeme = getMeme;
function invalidLoc() {
    const html = `<h2>Something went wrong there!</h2>
          <p>We couldn't find the location provided. Try that again.</p>`;
    return (0, static_js_1.genHeaderContainer)(html);
}
exports.invalidLoc = invalidLoc;
function invalidChar() {
    const html = `<h2>Something went wrong there!</h2>
          <p>You provided invalid characters</p>`;
    return (0, static_js_1.genHeaderContainer)(html);
}
exports.invalidChar = invalidChar;
