export function invalidLatLon() {
  return `
        <img src="./imgs/lat_lon.gif" alt="Lat Lon Invalid" /> 
        <h2>Invalid Latitude and Longitude<h2>
        <p>You provided an invalid set of latitude and longitude, try that again</p>
    `;
}

export function getMeme(error) {
  let meme;

  switch (error) {
    case "location":
      meme = "./imgs/location_not_found.jpg";
      break;
    default:
      break;
  }

  return `<img src="${meme}" alt="location not found" />`;
}

export function invalidLoc() {
  return `<h2>Something went wrong there!</h2>
          <p>We couldn't find the location provided. Try that again.</p>`;
}
