const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req, res){
   res.sendFile(__dirname + "/index.html");
   
});


app.post("/", function(req,res){

const query = req.body.cityName;
const apiKey = "7b01683f22fafec965a804ca8ad02dee";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;
https.get(url, function(response){
    
   
    response.on("data", function(data){
        var tdata = JSON.parse(data);
        var temp = tdata.main.temp;
        var wdes = tdata.weather[0].description;
        var icon = tdata.weather[0].icon;
        var urlicon = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        
        res.write("<h1>The weather in " + query + " is " + wdes + ".</h1> ");
        res.write("<img src=" + urlicon + ">");
        res.write("<h2> The temperature in " + query + " is " + temp + "</h2>");
        res.send();



    });

});
});



app.listen(3000, function(){
    console.log("Server is running on port 3000.");

});