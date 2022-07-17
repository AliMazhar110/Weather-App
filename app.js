const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const apikey = "7d1eba41e5f95fba1e1960e3a8e7641c";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apikey+ "&units="+unit;
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weather_data = JSON.parse(data);
            console.log(weather_data);
            const temp = weather_data.main.temp;
            console.log(temp);
            const weatherDescription = weather_data.weather[0].description;
            console.log(weatherDescription);
            const icon = weather_data.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<html>");
            res.write("<h3>The weather is currently "+weatherDescription+".</h3>");
            res.write("<h1>The temperature in " +query+ " is "+temp+" degrees Celcius.</h1>");
            res.write("<img src=" + imgURL + ">");
            res.write("<\html>");
            res.send();
        })
    });
});




app.listen(3000, function(){
    console.log("Server is running on port 3000");
});