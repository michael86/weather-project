interface Location {
  latitude: number;
  longitude: number;
}

interface SortWeather {
  city: object[];
  cnt: number;
  cod: number;
  list: [GenObject];
  message: number | string;
}

interface MainContent {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}

interface GenObject {
  clouds: { all: number };
  dt: number;
  dt_text: string;
  main: MainContent;
  pop: number;
  sys: { pod: string };
  rain?: { "3h": number };
  visibility: number;
  weather: [{ id: number; main: string; description: string; icon: string }];
  wind: { speed: number; deg: number; gust: number };
}

interface GenObjectRes {
  date: number;
  desc: string;
  icon: string;
  feelsLike: number;
  humidity: number;
  temp: number;
  windStrength: number;
  windDirection: number;
}

interface SortWeatherRes {
  [id: string]: GenObjectRes[];
}

export { Location, SortWeather, GenObject, SortWeatherRes, GenObjectRes };
