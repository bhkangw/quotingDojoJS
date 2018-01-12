var express = require("express");
var app = express();
var port = 8000;
var bp = require("body-parser");
var path = require("path");
var session = require("express-session");
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./views")));
app.use(session({ secret: "boo" }));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var QuoteSchema = new Schema({
    name: String,
    quote: String,
}, {timestamps: true})
mongoose.model("quote", QuoteSchema)
var Quote = mongoose.model('quote')

mongoose.connect("mongodb://localhost/quotingDojo")

// routing
app.get("/", function (req, res) {
    res.render("index")
})

app.post("/quotes", function(req, res){
    Quote.create({
        name: req.body.name,
        quote: req.body.quote}, function(err, quote){
            res.redirect("/")
        })
})

app.get("/quotes", function (req, res) {
    Quote.find({}, function(err, quotes){
        res.render("quotes", {quotes: quotes})
    }).sort([['updatedAt', 'descending']])
})

app.listen(port, function () {
    console.log("listening on port 8000")
});