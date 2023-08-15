interface GenResultsNested {
  date: number;
  desc: string;
  feelsLike: number;
  humidty: number;
  icon: string;
  temp: number;
  windDirection: number;
  windStrength: number;
}

interface GenResults {
  [id: string]: [GenResultsNested];
}
