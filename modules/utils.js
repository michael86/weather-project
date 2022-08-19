export function getLocaleTime(unix) {
  const date = new Date(unix);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function getLocaleDate(unix) {
  const date = new Date(unix);
  return `${date.toLocaleDateString([], {
    weekday: "long",
  })} - ${date.toLocaleDateString()}`;
}

export function convertTempToCels(temp) {
  return Math.round(temp - 273.15);
}

export function genId() {
  return Math.floor(Math.random() * 1000);
}

export function commaDelimate(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function debounce(fn, d) {
  let timer;
  return function () {
    let context = this,
      args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, d);
  };
}
