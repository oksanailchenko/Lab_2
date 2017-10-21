var express = require('express');
var bodyParser = require("body-parser");
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var app = express();

app.use(express.static(__dirname));

const MONGO_URL = 'mongodb://localhost:27017/tasksdb';  //Change for your mongodb
var mongo;
mongoClient.connect(MONGO_URL).then(function (db) {
    mongo = db;
});

var path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/tasks', function (req, res) {
    mongo.collection('tasks').find().toArray()
        .then(function (tasks) {
            res.send(tasks);
        });
});

app.post('/tasks', function (req, res) {
    var newTask = { name: req.body.name, description: req.body.description };
    mongo.collection("tasks").insert(newTask, function (err, results) {
        if (err) {
            res.send('failed');
            throw err;
        }
        res.send("success");
    });
});

app.delete('/tasks/:id', function (req, res) {
    mongo.collection("tasks").remove({ _id: new mongodb.ObjectID(req.params.id) }, function (err, results) {
        if (err) {
            res.send('failed');
            throw err;
        }
        res.send("success");
    });
});

app.put('/tasks/:id', function (req, res) {
    mongo.collection("tasks").update({ _id: new mongodb.ObjectID(req.params.id) }, { name: req.body.name, description: req.body.description }, function (err, results) {
        if (err) {
            res.send('failed');
            throw err;
        }
        res.send("success");
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});