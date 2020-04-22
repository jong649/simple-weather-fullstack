const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_KEY}&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      const forecastString = `
        ${body.current.weather_descriptions[0]}.
        It is currently ${body.current.temperature} degrees out.
        It feels like ${body.current.feelslike} degrees out.
        The wind speed is ${body.current.wind_speed}mph.
        The wind direction is ${body.current.wind_dir}.
        `;
      callback(undefined, forecastString);
    }
  });
};

module.exports = forecast;
