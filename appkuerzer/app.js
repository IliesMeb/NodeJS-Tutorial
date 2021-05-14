var express =  require("express");
var bodyParser = require("body-parser");
var app = express()

var models = require("./models");

models.sequelize.sync({force: true}).then(function() { //durch das Sync wird bei jedem Neustart die Datenbank neu aufgesetzt
    console.log("Tabellen erstellt")

    app.set("view engine", "ejs");
    app.set("views", __dirname + "/views");

    app.use("/public", express.static(__dirname + "public"));
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get("/", function(req, res) {
        var id = parseInt(req.query.q, 10);
        if (isNaN(id)) {
            res.render("pages/landing");
        } else {
            models.Url.findByPk(id).then(function(obj) {
                if (obj == null) {
                    res.end("Fehler");
                } else {
                    res.render("pages/redirect", {
                        url: obj
                    });
                }
            })
        }
    });

    app.post("/create", function(req,res) {
        models.Url.create({
            url: req.body.url, 
            desc: req.body.desc
        }).then(function(obj) {
            console.log(obj.id);
            res.redirect("/created?id=" + obj.id);
        })
    });

    app.get("/created", function(req, res) {
        var id = parseInt(req.query.id, 10);
        models.Url.findByPk(id).then(function(obj) { // findByPk ist das aktuelle findById in sequelize
            if (obj == null) {
                res.end("Fehler");
            } else {
                res.render("pages/created", {
                    url: obj
                });
            }
        })
    });

    app.listen(8080, function() {
        console.log("Webserver gestartet")
    });
}); //alle models die über sequelize geschrieben werden neu schreiben



