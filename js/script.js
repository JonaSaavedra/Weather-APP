//Obetener datos API
const API_KEY = "e36ad5d8190f0d210650372220445101";

let temp = document.getElementById("temp")
let tempMax = document.getElementById("tempmax");
let tempMin = document.getElementById("tempmin");
let weather = document.getElementById("weather");
let humidity = document.getElementById("humidity");
let feelslike = document.getElementById("feelslike");
let icon = document.getElementById("icon");

async function getWeatherElements(lat, lon) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=sp&appid=${API_KEY}`;

  try {
    const response = await fetch(apiURL);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener datos del clima:", error);
  }
}

async function getForecast(lat, lon) {
  const apiURL = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=sp&appid=${API_KEY}`;

  try {
    const response = await fetch(apiURL);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener datos del clima:", error);
  }
}

async function actualizarTiempo(lat, lon) {
  let title = document.getElementById("title");
  let img = document.getElementById("backgroundimg");
  const data = await getWeatherElements(lat, lon);

  if (data) {
    temp.innerHTML = `${Math.round(data.main.temp)}ºC`
    tempMax.innerHTML = `${Math.round(data.main.temp_max)}ºC`;
    tempMin.innerHTML = `${Math.round(data.main.temp_min)}ºC`;
    weather.innerHTML = `${data.weather[0].description}`;
    humidity.innerHTML = `${data.main.humidity}%`;
    feelslike.innerHTML = `${Math.round(data.main.feels_like)}ºC`;
    icon.src = `assets/iconos/${data.weather[0].icon}.png`;

    //Obtener fecha API
    let fechaTimestamp = data.dt * 1000;
    let fecha = new Date(fechaTimestamp);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const optionsHour = {
      hour: "numeric",
      minute: "numeric",
    };

    document.getElementById("date").innerHTML = fecha.toLocaleDateString(
      "es-ES",
      options
    );
    document.getElementById("hour").innerHTML = fecha.toLocaleTimeString(
      "es-ES",
      optionsHour
    );
  }

  //Cambio de clases CSS(ImageBackground) según coordenadas
  if (lat == "42.845" && lon == "-8.578") {
    title.innerHTML = "Milladoiro";
    img.classList.add("milladoiro");
    img.classList.remove("ames", "bertamirans");
  } else if (lat == "42.859" && lon == "-8.650") {
    title.innerHTML = "Bertamiráns";
    img.classList.add("bertamirans");
    img.classList.remove("ames", "milladoiro");
  } else {
    title.innerHTML = "Ames";
    img.classList.add("ames");
    img.classList.remove("milladoiro", "bertamirans");
  }

  //CAMBIO DÍA NOCHE
  let sunrise = data.sys.sunrise * 1000;
  let sunset = data.sys.sunset * 1000;
  let now = Date.now();
  let imageBg = document.body.style.backgroundImage;

  if (sunrise < now && now < sunset) {
    document.body.style.backgroundImage = "url('/assets/bg/day.png')";
  } else {
    document.body.style.backgroundImage = "url('/assets/bg/night.png')";

    if (lat == "42.845" && lon == "-8.578") {
      title.innerHTML = "Milladoiro";
      img.classList.add("milladoironight");
      img.classList.remove("amesnight", "bertamiransnight");
    } else if (lat == "42.859" && lon == "-8.650") {
      title.innerHTML = "Bertamiráns";
      img.classList.add("bertamiransnight");
      img.classList.remove("amesnight", "milladoironight");
    } else {
      title.innerHTML = "Ames";
      img.classList.add("amesnight");
      img.classList.remove("milladoironight", "bertamiransnight");
    }
  }
}

actualizarTiempo(42.859, -8.65);


