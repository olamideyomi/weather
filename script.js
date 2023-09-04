async function fetchWeather() {
  const city = document.getElementById("cityInput").value;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=839b8ae2e438c0f5856884a5e78d930e`);
  const data = await response.json();

  const currentWeatherDiv = document.getElementById("currentWeather");
  const errorMessage = document.getElementById('error-message');

  if (response.status === 200) {
    // Create and configure the weather widget script
    const weatherScript = document.createElement('script');
    weatherScript.type = 'text/javascript';
    weatherScript.async = true;
    weatherScript.src = 'https://weatherwidget.io/js/widget.min.js';

    // Configure the anchor element for the weather widget
    const weatherWidget = document.createElement("a");
    weatherWidget.className = "weatherwidget-io";
    weatherWidget.href = `https://forecast7.com/en/${encodeURIComponent(data.name)}/`;
    weatherWidget.setAttribute("data-label_1", data.name.toUpperCase());
    weatherWidget.setAttribute("data-label_2", "WEATHER");
    weatherWidget.setAttribute("data-theme", "original");

    // Clear the div and append the new elements
    currentWeatherDiv.innerHTML = "";
    currentWeatherDiv.appendChild(weatherWidget);
    currentWeatherDiv.appendChild(weatherScript);

    // Make the div visible
    currentWeatherDiv.style.visibility = "visible";
    
    // Remove any existing error messages
    errorMessage.classList.remove('show');
  } else {
    // Show the error message and hide the weather div
    errorMessage.innerText = "City not found";
    errorMessage.classList.add('show');
    currentWeatherDiv.style.visibility = "hidden";

    // Remove 'show' from the error message after 3 seconds
    setTimeout(() => {
      errorMessage.classList.remove('show');
    }, 3000);
  }
}
async function fetchWeather() {
  const city = document.getElementById("cityInput").value;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=839b8ae2e438c0f5856884a5e78d930e`);
  const data = await response.json();

  const currentWeatherDiv = document.getElementById("currentWeather");
  const errorMessage = document.getElementById('error-message');

  if (response.status === 200) {
    currentWeatherDiv.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${Math.round((data.main.temp - 273.15) * 9/5 + 32)} °F</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} mph</p>
    `;
    currentWeatherDiv.style.display = "block"; // Make it visible
    errorMessage.classList.remove('show');
  } else {
    errorMessage.innerText = "City not found";
    errorMessage.classList.add('show');
    currentWeatherDiv.style.display = "none"; // Hide it

    // Remove 'show' class after 3 seconds
    setTimeout(() => {
      errorMessage.classList.remove('show');
    }, 3000);
  }
}
