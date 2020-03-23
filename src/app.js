const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bodyParser = require("body-parser");

const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../public/template");
const partialsDirectory = path.join(__dirname, "../public/template/partials");

const geocoding = require("./Utils/geocoding");
const forecast = require("./Utils/forecast");

hbs.registerPartials(partialsDirectory);

app.use(express.static(publicDirectory));
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//middleware
//serve static file
//Server static file to your server

//setup view engine for express
app.set("view engine", "hbs");

app.set("views", viewsDirectory);

app.get("/", function(request, response) {
  // response.end("Hello NodeJS!");
  response.render("index", {
    title: "HOME",
    username: "Jacker",
    name: "Huỳnh Thanh Cảnh"
  });
});

app.get("/api", (request, response) => {
  //===================
  if (!request.query.search) {
    return response.end("Search query is undefined, please...");
  }
  const { search } = request.query;
  let data = undefined;
  geocoding(search, function(err, data) {
    if (err) {
      return response.send(err);
    }
    const place = data.features[0].place_name;
    const lat = data.features[0].geometry.coordinates[1];
    const lng = data.features[0].geometry.coordinates[0];
    forecast(lat, lng, function(err, dataForecast) {
      if (err) {
        return response.send(err);
      }
      const data = {
        ...dataForecast,
        place: place
      };
      // const dataJSON = JSON.stringify(data);
      response.send(data);
    });
  });
});

//setup for help, about, weather route, return text "PAGE $TITLE";

app.get("/help", (request, response) => {
  response.render("help", {
    title: "HELP!",
    helpText: "Tôi có thể giúp được gì cho bạn ?",
    username: "Jacker",
    name: "Huỳnh Thanh Cảnh"
  });
});

app.get("/about", (request, response) => {
  // response.sendFile(publicDirectory + "about.html");
  response.render("about", {
    title: "ABOUT",
    username: "Jacker",
    name: "Huỳnh Thanh Cảnh"
  });
});

app.get("/weather", (req, res) => {
  res.render("weather", {
    title: "WEATHER",
    username: "Jacker",
    name: "Huỳnh Thanh Cảnh"
  });
});

app.get("/result", (req, res) => {
  const { lat, lng, place_name } = req.query;
  forecast(lat, lng, function(err, dataForecast) {
    if (err) {
      return res.send(err);
    }
    const data = {
      ...dataForecast
    };
    console.log(data);

    res.render("result", { data, place_name, name: "Huỳnh Thanh Cảnh" });
  });
});

app.get("/api/weather", (request, response) => {
  //===================
  if (!request.query.search) {
    return response.end("Search query is undefined, please...");
  }
  const { search } = request.query;
  let data = undefined;
  geocoding(search, function(err, data) {
    if (err) {
      return response.send(err);
    }
    const place = data.features[0].place_name;
    const lat = data.features[0].geometry.coordinates[1];
    const lng = data.features[0].geometry.coordinates[0];
    forecast(lat, lng, function(err, dataForecast) {
      if (err) {
        return response.send(err);
      }
      const data = {
        ...dataForecast,
        place: place
      };
      // const dataJSON = JSON.stringify(data);
      response.send(data);
    });
  });
});

app.post("/autocomplete", urlencodedParser, (req, res) => {
  const { search } = req.body;
  geocoding(search, function(err, data) {
    if (err) {
      const error = err.err;
      console.log(error.err);
      return res.render("autocomplete", {
        dataErr: error,
        name: "Huỳnh Thanh Cảnh"
      });
    }
    const newData = data.features.map(feature => {
      return {
        place_name: feature.place_name,
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0]
      };
    });
    // console.log(newData);
    res.render("autocomplete", {
      ///
      dataAutocomplete: newData,
      name: "Huỳnh Thanh Cảnh"
    });
  });
});

app.get("*", (request, response) => {
  response.render("404", {
    username: "Jacker",
    name: "Huỳnh Thanh Cảnh"
  });
});

console.log("LISTENING PORT 3000");
app.listen(process.env.PORT || 3000);
