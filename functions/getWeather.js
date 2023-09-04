const axios = require('axios');

exports.handler = async function(event, context) {
  const { city } = JSON.parse(event.body);
  const OPENWEATHER_API_KEY = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`;

  try {
    const response = await axios.get(url);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    };
  }
};
