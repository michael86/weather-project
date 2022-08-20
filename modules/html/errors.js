export function getMeme(error) {
  let meme;

  switch (error) {
    case "location":
      meme = "./imgs/location_not_found.jpg";
      break;
    default:
      break;
  }

  return `
  <div class="meme-container">
    <img src="${meme}" alt="location not found" />
  </div>
  `;
}

export function invalidLoc() {
  return `<h2>Something went wrong there!</h2>
          <p>We couldn't find the location provided. Try that again.</p>`;
}
