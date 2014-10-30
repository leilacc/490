var mongoose = require("mongoose");
var models = require("./models.js");

// Connection URL
var url = "mongodb://loomuser:l00mieforcocoapuffs@ds045970.mongolab.com:45970/loom";

var connect = function(callback) {
    mongoose.connect(url);

    var db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function() {
        console.log("Connected to the database");
    });
}

module.exports.models = models;
module.exports.connect = connect;
