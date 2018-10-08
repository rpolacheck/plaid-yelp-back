var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'consumer-key',
  consumer_secret: 'consumer-secret',
  token: 'token',
  token_secret: 'token-secret',
});

yelp.search({location: 'naperville'})
.then(function (data) {
   console.log(data); 
});



app.get("/", function(req, res){
   res.render("search"); 
});

app.get("/results", function(req, res){
    var query = (req.query.search);
    console.log(query);
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            res.render("results", {data: data});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Yelp App has started!"); 
});