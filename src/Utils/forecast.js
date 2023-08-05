const request = require("request");

function forecast(lat, lng, callback) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=df7b2bf5d10c452b1a3dc40facd1e5f2&lang=vi&units=metric`;
  request(url, { json: true }, (err, response) => {
    const data = response.body;
    if (err) {
      return callback("Connection fail", undefined);
    }
    if (data.error) {
      return callback(data.error, undefined);
    }

    return callback(undefined, {
      summary: data.weather[0].description,
      temperature: data.main.temp,
    });
  });
}

module.exports = forecast;
