// var hallo = function(who) {
//     console.log("Hallo" + " " + who());
// }

// var getName = function() {
//     return "Welt";
// }

// hallo(getName);
// hallo(function() {
//     return "node.js"
// });

// var hi = function(w) {
//     w("hallo Welt")
// };

// hi(function(xyz){
//     console.log(xyz)
// });

// -----------------------
// console.log("Ich bin die app.js");

// var data = require("./hallo.js");

// console.log(data.name("Hallo "));

// //require("./Unterordner/app.js");

// require("./Unterordner");

// ------------------

//!!!!!!!!! Lektion 12 nochmal anschauen !!!!!!!!
// -> wenn var b.name (also ein Object) = irgendwas -> wert wird überschrieben
// -> wenn var b = irgendwas -> wert wird verändert, aber nicht übeschrieben

// -------------------
// // Lektion 13:
// var os = require("os")

// console.log(os.cpus())
// console.log(os.totalmem())

// --------------

// // Lektion 15
// var a = 5;
// var b = 6;

// console.log(a + b);

// -------------

// // Lektion 16
//  function Person(vorname, nachname) {
//     this.vorname = vorname;
//     this.nachname = nachname;
//  }

// //Person("Hans", "Müller");

// Person.prototype.getName = function() {
//     return this.vorname + " " + this.nachname;
// }

// var hans = new Person("Hans", "Müller");
// var mark = new Person("Mark", "Mustermann");


// Person.prototype.getNameReverse = function() {
//     return this.nachname + ", " + this.vorname;
// }

// console.log(hans.getNameReverse());
// console.log(mark.getNameReverse());

// // console.log(hans.getName());

// // var p = {
// //     vorname: "erik",
// //     nachname: "Müller"
// // };

// // p.__proto__ = Person.prototype;

// // console.log(p.getName());

// -------------------

// // Lektion 17

//  function Person(vorname, nachname) {
//     this.vorname = vorname;
//     this.nachname = nachname;
//  }

// Person.prototype.getName = function() {
//     return this.vorname + " " + this.nachname;
// }

// function Schueler(vorname, nachname, uni) {
//     this.vorname = vorname;
//     this.nachname = nachname;
//     this.uni = uni;
// }

// Schueler.prototype.__proto__ = Person.prototype;

// Schueler.prototype.getName = function() {
//     return this.vorname + " " + this.nachname + " (" + this.uni + ")";
// }

// var erik = new Schueler("Erik", "Müller", "TU München");
// var hans = new Person("Hans", "Mustermann");

// console.log(hans.getName());
// console.log(erik.getName());

// // --------------

// // Lektion 18

// // var logThis = function() {
// //     console.log(this);
// // }

// // var logThisBound = logThis.bind({
// //     vorname: "Max"
// // }); // tauscht this aus, funktion wird aber nicht ausgeführt

// // logThisBound();

// var logMessage = function(a, b) {
//     console.log(this, a, b);
// };

// // logMessage.call({
// //     vorname: "Max"

// // }, 2,4 ); // wenn Paramter fix sein soll

// logMessage.apply({
//     vorname: "Max"
// }, [3,4]); // wenn Parameter variabel sein soll

// --------------

// Lektion 19: 

// var util = require("util");

//  function Person(vorname, nachname) {
//     this.vorname = vorname;
//     this.nachname = nachname;
//  }

// Person.prototype.getName = function() {
//     return this.vorname + " " + this.nachname;
// }

// function Schueler(vorname, nachname, uni) {
//     console.log(arguments);
//     //Person.bind(this)(vorname, nachname);
//     //Person.call(this, vorname, nachname);
//     //Person.apply(this, [vorname, nachname]);
//     Person.apply(this, arguments);
//     this.uni = uni;
// }

// util.inherits(Schueler, Person);

// Schueler.prototype.getName = function() {
//     return this.vorname + " " + this.nachname + " (" + this.uni + ")";
// }

// var erik = new Schueler("Erik", "Müller", "TU München");
// var hans = new Person("Hans", "Mustermann");

// console.log(hans.getName());
// console.log(erik.getName());

//-----------------------

// //Lektion 20:

// var fs = require("fs");

// // var contents = fs.readFileSync("hallo.txt", {
// //     encoding: "utf8"
// // });
// // console.log(contents);

// fs.readFile("Hallo.txt", {encoding: "utf8"}, function(err, data){
//     if (err) {
//     throw err;
//     }
//     console.log(data);
// });

// console.log("---------"); //wird zuerst ausgeführt, danach erst data, weil asynchron

//---------------------

// //Lektion 22:

// var http = require("http");

// var server = http.createServer(function(req, res){
//     res.end("Hallo Welt");
// });

// server.listen(8080);
//----------------------

// //Lektion 23:

// var a = 0;

// (function(a) {
//     a = a + 1;
// })(a);

// //increment(a);
// console.log(a); // =1 wenn ohne Parameter, wenn mit Parameter übergeben dann =0
//---------------------

// //Lektion 24:
// var http = require("http");

// var requestCount = 0;

// var server = http.createServer(function(req, res){
//     requestCount = requestCount + 1;
//     res.end("Zugriff: " + requestCount);
// });

// server.listen(8080);
// ------------------

// // Lektion 27:

// var http = require("http");

// var server = http.createServer(function(req, res) {
//     setTimeout(function(){
//         res.end("Hallo Welt");
//     }, 1000);

//     res.end("hihi");
// });

// server.listen(8080);
// -----------------
// // Lektion 28/29/30:
// var http = require("http");

// var fs = require("fs");

// var server = http.createServer(function(req, res) {
//     if (req.url.indexOf("/public") === 0) {
//         fs.readFile("." + req.url, {}, function(err, data) {
//             if (err) {
//                 res.writeHead(404, {
//                     "Content-Type": "text/plain"
//                 });
//                 res.end("File not found");
//             } else {
//                 var contentType = null;
//                 if (req.url.endsWith(".jpg")) {
//                     contentType = "image/jpeg"
//                 } else {
//                     contentType = "text/plain"
//                 }
//                 res.writeHead(200, {
//                     "Content-Type": contentType
//                 });
//                 res.end(data);
//             }
//         });
//     // if (req.url == "./public/hund.jpg") {
//     //     res.writeHead(200, {
//     //         "Content-Type": "image/jpeg"
//     //     });

//     //     fs.readFile("public/hund.jpg", {}, function(err, data){
//     //         res.end(data);
//     //     });

//     } else if (req.url == "/") {
//         res.writeHead(200, {
//             "Content-Type": "text/html" //MIME-Type
//         });
//         res.end("<html><body><h1>Ich bin die Startseite</h1><img src='/public/hund.jpg'/></html></body>");
//     } else if (req.url == "/about") {
//         res.end("Ich bin die über mich Seite");
//     } else {
//         res.end("Hallo Welt"+ req.url);
//     }
// });

// server.listen(8080);
//-------------
//Lektion 32/33:
// var express = require("express");

// var app = express();

// app.use("/middleware", function(req, res, next) {
//     console.log(req.url);
//     // setTimeout(function() {
//     //     next();
//     // }, 5000);
//     //next(); // Middleware, wir können Dateien ausliefern, Cookies bestimmen, Zugriff verweigern, etc, ohne den Code darunter zu beinflussen
//     res.send("Middleware wurde aufgerufen")
// });

// app.get("/", function(req, res) {
//     res.send("Hallo Welt 123");
// });

// app.get("/middleware/123", function(req, res) {
//     console.log(req.url);
// });

// app.get("/startseite", function(req, res) { 
//     res.send("ich bin die Startseite");
// });



// app.listen(8080);

// ---------------

//Lektion 35/36:

//var express = require("express");

// var app = express();

// app.set("view engine", "ejs");
// app.set("views", __dirname + "/views");

// app.use("/public", express.static("public"));

// app.get("/", function(req, res) {
//     res.render("landing", {
//         title: "NodeJs",
//         items: [
//             "express",
//             "node",
//             "javascript"
//         ]
//     }); //res.render("landing.ejs"); würde auch gehen
// });

// app.get("/startseite", function(req, res) { 
//     res.send("ich bin die Startseite");
// });

// app.listen(8080);
//-------------

// // Lektion 37: xss

// var express = require("express");

// var app = express();

// app.set("view engine", "ejs");
// app.set("views", __dirname + "/views");

// app.use("/public", express.static("public"));

// app.get("/", function(req, res) {
//     res.render("landing", {
//         title: "NodeJs",
//         items: [
//             "express",
//             "node",
//             "javascript"
//         ],
//         desc: "<script type='text/javascript'>alert('hi');</script>"
//     }); //res.render("landing.ejs"); würde auch gehen
// });

// app.get("/startseite", function(req, res) { 
//     res.send("ich bin die Startseite");
// });

// app.listen(8080);
//--------------

//Lektion 48:

//var a = {};

// // a.test = "hallo welt"; // übergibt dem Objekt a key = test mit dem Value = "hallo welt"
// Object.defineProperty(a, "test", {
//     value: "hallo welt",
//     enumerable: true, // lässt objekt auch in der console anzeige
//     writable: true, // lässt Objekt überschreibbar machen
//     configurable: true //delete 
// });

// a.test = "hallo nodejs"

// //delete a.test

// console.log(a);




// var a = {
//     firstname: "Erik",
//     surname: "Müller"
// };

// Object.defineProperty(a, "name", {
//     get: function() {
//         return this.firstname + " " + this.surname;
//     },
//     set: function(name) {
//         var segments = name.split(" ");
//         this.firstname = segments[0];
//         this.surname = segments[1];
//     }
// });

// a.name = "Max Mustermann";

// console.log(a);




// function Student() {

// };

// Object.defineProperty(Student.prototype, "name", {
//         get: function() {
//             return this.firstname + " " + this.surname;
//         },
//         set: function(name) {
//             var segments = name.split(" ");
//             this.firstname = segments[0];
//             this.surname = segments[1];
//         }
//     });

//     var max = new Student();
//     max.name = "Max Mustermann"
//     console.log(max)

//-------------------

// //Lektion 49:

// var l = [
//     "element1",
//     "hallo welt",
//     "attribut"
// ];

// // for(var i = 0; i < l.length; i++) { // solange i kleiner als l.length ist soll i eins mehr werden und dann die funktion (in dem Fall das value an Position i ausspucken) durchgeführt werden. 
// //     var value = l[i];
// //     console.log(value);
// // };

// // l.forEach(function(value, index){
// //     console.log(value, index);
// // });

// // console.log(l.map(function(value, index) {
// //     return value.toUpperCase();
// // }));

// console.log(l.filter(function(value, index) {
//     return (value.indexOf("a") != -1);
// }));
//---------------

// //Lektion 50:

// var a = {
//     firstname: "Max",
//     surname: "Mustermann"
// };

// for(var key in a) {
//     var value = a[key]
//     console.log(key + ": " + value);
// };

//--------

//Lektion 51:

// function Student() {

// };

// Object.defineProperty(Student.prototype, "name", {
//     enumerable: true,
//     get: function() {
//         return this.firstname + " " + this.surname;
//     }
// });

// var max = new Student();
// max.firstname = "Max";
// max.surname = "Mustermann";

// for(var key in max) {
//     if (max.hasOwnProperty(key)) { // braucht man, wenn man einen Prototype hat, diesen aber ignorieren will
//         var value = max[key];
//         console.log(key + ": " + value);
//     }
// };
//-----------------

//Lektion 53: 

var util = require("util");
var EventEmitter = require("events");

function Course() {

}
util.inherits(Course, EventEmitter);

Course.prototype.register = function() {
    this.emit("register");
}

//var course = new EventEmitter();
var course = new Course();


course.on("register", function(data) {
    console.log(data);
    console.log("register wurde ausgeführt");
});
course.on("register", function() {
    console.log("register wurde ausgeführt(2)");
});


course.register();
course.emit("watchLecture"); 

