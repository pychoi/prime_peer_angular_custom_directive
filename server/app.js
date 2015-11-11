var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/zeta_favorite_number');
mongoose.model("Person", new Schema({"name": String, "location": String, "number": Number}, {collection: "people"}));
var Person = mongoose.model('Person');

app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));


app.get('/data', function(req,res){
    //return the people from the database, and send it down to the client

    Person.find({}, function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});

app.post('/data', function(req,res){

    var addedPerson = new Person({
        "name" : req.body.name,
        "location" : req.body.location,
        "number" : req.body.number
    });

    addedPerson.save(function(err, data){
        if(err) console.log(err);
        res.send(data);
    });
});

app.get("/*", function(req,res,next){
    //console.log("Here is the asset I needs: " , req.params);
    var file = req.params[0] || "assets/views/index.html";
    res.sendFile(path.join(__dirname, "./public/", file))
});

app.listen(app.get('port'), function(){
    console.log("Listening to port", app.get('port'));
});

module.exports = app;