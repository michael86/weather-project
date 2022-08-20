import Weather from "./modules/weather.js";
import Location from "./modules/location.js";
import Maps from "./modules/maps.js";

import * as h from "./modules/html/htmlGenerator.js";
import { debounce } from "./modules/utils.js";
import { userSchema } from "./schema/schema.js";

const locationInput = document.getElementById("locationInput");
const locHeader = document.getElementById("locHeaderContainer");
const root = document.getElementById("root");

let _weather, _map;

const showGeoLocation = () => {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    root.innerHTML = h.genLoader();

    _weather = new Weather(pos.coords);
    _map = new Maps(pos.coords);

    manipulateDom(
      { lat: pos.coords.latitude, lon: pos.coords.longitude },
      "united kingdom"
    );
  });
};

const handleInput = async (e) => {
  e.preventDefault();

  genLoading();

  const location = new FormData(document.forms.locationInput)
    .get("location")
    .trim();

  console.log(userSchema.validate({}));

  location.length === 0 && showGeoLocation(); //If input field empty, show current location

  const locationData =
    location.length > 0 && (await Location.convertLocation(location));

  !locationData && genResults(); //Couldn't find location so meme time

  if (locationData) {
    _weather.geo = locationData;
    manipulateDom(locationData, location);
  }
};

const inputHandler = debounce(handleInput, 1000);

locationInput.addEventListener("input", inputHandler);
locationInput.addEventListener("submit", (e) => e.preventDefault()); //because debounce breaks form submission

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
  _map.showMap();
  addEventListeners();
};

const genResults = (data) => {
  if (data) {
    root.innerHTML = "";
    for (const d in data) {
      root.innerHTML += h.genSlider(h.genCards(data[d]), data[d][0].date);
    }
  } else {
    root.innerHTML = h.genMeme();
    locHeader.innerHTML = h.locNotFound();
  }
};

const genLoading = () => {
  locHeader.innerHTML = "";
  _map.hideMap();
  root.innerHTML = h.genLoader();
};

showGeoLocation();
