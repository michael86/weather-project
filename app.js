import Weather from "./modules/weather.js";
import Location from "./modules/location.js";
import Maps from "./modules/maps.js";
import { Unsplash } from "./modules/unsplash.js";
import * as h from "./modules/html/htmlGenerator.js";
import { debounce } from "./modules/utils.js";

const locationInput = document.getElementById("locationInput");
const locHeader = document.getElementById("locHeader");
const root = document.getElementById("root");

let _weather, _map, _unsplash;

navigator.geolocation.getCurrentPosition(async (pos) => {
  root.innerHTML = h.genLoader();

  _weather = new Weather(pos.coords);
  _map = new Maps(pos.coords);
  _unsplash = new Unsplash();

  manipulateDom(
    { lat: pos.coords.latitude, lon: pos.coords.longitude },
    "united kingdom"
  );
});

const handleInput = async (e) => {
  e.preventDefault();

  root.innerHTML = h.genLoader();

  const location = new FormData(document.forms.locationInput)
    .get("location")
    .trim();

  const locationData = await Location.convertLocation(location);

  if (locationData) {
    _weather.geo = locationData;
    manipulateDom(locationData, location);
  } else {
    genResults();
  }
};

const inputHandler = debounce(handleInput, 1000);

locationInput.addEventListener("input", inputHandler);

const addEventListeners = () => {
  const containers = document.getElementsByClassName("slider-container");
  for (const i of containers) {
    i.addEventListener(
      "click",
      (e) => e.target.dataset.direction && scrollSlider(e.target)
    );
  }
};

const scrollSlider = (t) => {
  const { id, direction } = t.dataset;

  //The following 3 lines get all of the elements we require to transition the slider left and right
  //along with the width of a card so we can scroll left or right the required amount of px.
  const slider = document.getElementById(id);
  const cardContainer = slider.querySelector(".card-container");
  const width = cardContainer.querySelector(".card").clientWidth;

  direction.includes("left")
    ? (cardContainer.scrollLeft -= width)
    : (cardContainer.scrollLeft += width);
};

const manipulateDom = async ({ lat, lon }, location) => {
  const o = await _weather.getWeather();
  locHeader.innerHTML = h.genHeader(o.city);
  genResults(_weather.sortWeather(o));
  _map.updateLocation(lat, lon);

  const bgImage = await _unsplash.photo(location);
  root.style.backgroundImage = `url(${
    bgImage[Math.floor(Math.random() * bgImage.length)].urls.full
  })`;
  addEventListeners();
};

const genResults = (data) => {
  if (data) {
    root.innerHTML = "";
    for (const d in data) {
      root.innerHTML += h.genSlider(h.genCards(data[d]), data[d][0].date);
    }
  } else {
    root.innerHTML = h.genMeme("location");
    locHeader.innerHTML = h.locNotFound();
  }
};