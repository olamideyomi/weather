const BASE_URL = '/.netlify/functions/getWeather';// Change this if your server runs on a different port

async function fetchWeather() {
  const city = document.getElementById('cityInput').value;
  try {
    const response = await fetch(`${BASE_URL}?city=${city}`);
    const data = await response.json();

    const currentWeatherDiv = document.getElementById('currentWeather');
    const errorMessage = document.getElementById('error-message');

    if (response.ok) {
      currentWeatherDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${Math.round(((data.main.temp - 273.15) * 9) / 5 + 32)} °F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} mph</p>
      `;
      currentWeatherDiv.style.display = 'block';
      errorMessage.classList.remove('show');
    } else {
      errorMessage.innerText = 'City not found';
      errorMessage.classList.add('show');
      currentWeatherDiv.style.display = 'none';
      setTimeout(() => {
        errorMessage.classList.remove('show');
      }, 3000);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
