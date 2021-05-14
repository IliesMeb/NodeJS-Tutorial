var Sequelize = require("sequelize");
var sequelize = new Sequelize(null, null, null, {
    dialect: "sqlite",
    storage: __dirname + "/../database.sqlite"
});

var Url = sequelize.define("url", {
    url : {
        type: Sequelize.STRING, //warum groß?
        field: "url"
    },
    desc: {
        type: Sequelize.STRING,
        field: "desc"
    }
});

module.exports = {
    sequelize: sequelize,
    Url: Url
} // sorgt dafür, dass Inhalt dieser Datei außerhalb verfügbar ist -> nachfolgender code ist somit nicht mehr nötig, weil in app.js 

// Url.sync({force: true}).then(function() { //force: löscht und setzte Table in Datenbank neu auf 
//     console.log("Tabelle wurde erstellt");

//     Url.create({
//         url: "http://google.de",
//         desc: "Eine Suchmaschine"
//     })
// });