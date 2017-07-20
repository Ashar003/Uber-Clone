const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

mongoose.Promise = global.Promise; //The mongoose error: Deprecation error.
if( process.env.NODE_ENV !== 'test'){
mongoose.connect('mongodb://localhost/muber');
}

const app = express();

//Watch for incoming requests of method GEt
//to the route to http://localhost:3050/api

app.use(bodyParser.json()); //Assume data coming is in json and convert it to a object.
routes(app);

app.use((err, req, res, next) => { //This is where next leads to if there is an error.
    res.status(422).send({error: err.message});

});

module.exports = app;