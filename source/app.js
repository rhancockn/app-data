const express  = require('express');
const bodyParser = require('body-parser');
const app = express();
const route = require('./route/data-upload');

//Body parser
app.use(bodyParser.json());

//Defining the data upload route
app.use('/', route);

app.listen(5000, function(){
    console.log('Listening on port 5000!');
});
