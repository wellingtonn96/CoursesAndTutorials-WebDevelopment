let express = require('express');
let consign = require('consign');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator')

let app = express()

app.set('view engine', 'ejs');
app.set('views' , './app/views');


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(expressValidator())

consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .into(app)

module.exports = app