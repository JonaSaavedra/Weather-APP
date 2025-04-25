const API_KEY = "e36ad5d8190f0d210650372220445101";

let city = document.querySelector(".city");
let country = document.querySelector(".country");

function getValue() {
  let inputValue = document.getElementById("inputValue").value;
  console.log("El valor del input es: " + inputValue); // Verificación
  getCoordinates(inputValue);
}

async function getCoordinates(inputValue) {
  const apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${API_KEY}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json(); // Guardamos el JSON en una variable

    if (data.length > 0) {
      // Si hay resultados
      data.forEach(function (element, index) {
        const cityName = data[index].name; // Nombre de la ciudad
        const countryName = data[index].country; // Nombre del país
        const lat = data[index].lat;
        const lon = data[index].lon;
        const button = document.getElementById("location");


        // Buscar el template y el contenedor donde insertar los datos
        const template = document.querySelector("template");
        const searchDiv = document.querySelector(".locations__container");

        // Clonamos el contenido del template
        const clone = template.content.cloneNode(true); // Clonamos el contenido del template

        // Seleccionamos los elementos dentro del clon para modificar sus contenidos
        const clonedCity = clone.querySelector(".city"); // Buscamos el elemento con la clase .city
        const clonedCountry = clone.querySelector(".country"); // Buscamos el elemento con la clase .country

        // Asignamos los valores obtenidos a los elementos clonados
        clonedCity.textContent = cityName; // Ciudad obtenida de la API
        clonedCountry.textContent = countryName; // País obtenido de la API

        // clonedButton.addEventListener('click', sendCoordinates(lat, lon))

        // Finalmente, agregamos el clon modificado al contenedor
        searchDiv.appendChild(clone); // Añadimos el clon al DOM

        const clonedButton = clone.button;
        clonedButton.onclick = sendCoordinates(lat, lon);
      });
    } else {
      console.warn("No se encontraron datos para ese lugar");
    }
  } catch (error) {
    console.error("Error al obtener datos del lugar", error);
  }
}

function sendCoordinates(lat, lon) {
  const url = `index.html?lat=${lat}&lon=${lon}`;
  window.open(url, "_self");
}
