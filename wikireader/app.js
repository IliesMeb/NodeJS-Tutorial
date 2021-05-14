var https = require("https");
var querystring = require("querystring");

var express = require("express");

var app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/public", express.static("public"));

app.get("/", function(req, res) {
    res.render("pages/landing");
});

app.get("/result", function(req, res) {
    var search = req.query.search;

    var options = {
        "format": "json",
        "action": "query",
        "generator": "search",
        "gsrlimit": "10",
        "pilimit": "10",
        "pithumbsize": "500",
        "prop": "extracts|pageimages",
        "exintro": "1",
        "exsentences": "10",
        "exlimit": "max",
        "gsrsearch": search
    };
    var url = "https://de.wikipedia.org/w/api.php?" + 
    querystring.stringify(options);

    var httpRequest = https.request(url, function(httpResponse) {
        httpResponse.setEncoding("utf8");

        var responseData = "";
        httpResponse.on("data", function(data) {
           responseData = responseData + data; //versteh nicht warum das hier NUR so funktioniert
        });

        httpResponse.on("end", function() {
            var responseObject = JSON.parse(responseData);
            
            res.render("pages/result", {
                search: search,
                response: responseObject
            });
        });

    });
    httpRequest.end();
});

app.listen(8080);