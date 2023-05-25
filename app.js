const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

  res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){

  const query = req.body.cityName;
  const appid = "3bd6e6dfa9695dacdc8cbc82ffd20e5c";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+appid+"&units="+unit;
  https.get(url , function(response){
    console.log(response.statusCode);

    response.on("data" , function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const descr = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn" + icon + "@2x.png";

      res.write("<p>The weather currently is "+descr+"</p>");
      res.write("<h1>The temperature in "+ query + " is " + temp + " degree Celcius.</h1>");
      res.write("img<src=" + imageUrl +">");

      res.send();
    })
  });

})






app.listen(3000,function(){
  console.log("Server is running on port 3000.");
})
