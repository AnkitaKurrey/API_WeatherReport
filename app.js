const express = require("express"); //native express module

const https = require("https"); //using native http express module to make get req from external server

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  //  console.log("post request recieved");
  //  console.log(req.body.cityName);

  const query = req.body.cityName;
  const apikey = "138096ef677701df2d01c1cf4be8485a";
  const units = "metric";
  const weather_url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    apikey +
    "&units=" +
    units;

  https.get(weather_url, function (response) {
    console.log(response); //It gives lots of detail in cmd prompt including statusCode = 200

    console.log(response.statusCode);

    //we can also tap into the response that we get back by calling method on and search for some data
    response.on("data", function (data) {
      // console.log(data); //hexa demical code if we copy it and put it into hexa decimal converter we can convert it to text

      //we want the data in form of javascript object
      const weatherData = JSON.parse(data);
      console.log(weatherData);

      //it turn javascript object into string
      // console.log(JSON.stringify(weatherData));

      const temp = weatherData.main.temp;
      console.log(temp);

      const pressure = weatherData.main.pressure;
      console.log(pressure);

      const humidity = weatherData.main.humidity;
      console.log(humidity);

      const weather_description = weatherData.weather[0].description;
      console.log(weather_description);

      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      // res.write("<h1>The temperature in Your City is " + temp + " degree celcius</h1>");
      // res.write("<h1>The Pressure in Your City is " + pressure + "</h1>");
      // res.write("<h1>The Humidity in Your City is " + humidity + "</h1>");
      // res.write("<h1> City has " + weather_description + "</h1>");
      // res.write("<img src =" + imageUrl + " >");
      // //we can only have one send
      // res.send();
      res.render("about",{the_temperature:temp,the_pressure:pressure,the_humidity:humidity,the_weather_description:weather_description,img:imageUrl});
      
    });
  });
});



app.listen( process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000.");
});
