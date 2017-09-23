const express  = require('express');
const bodyParser = require('body-parser');
const app = express();
const route = require('./route/data-upload');

//Body parser
//app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


//Defining the data upload route
app.use('/', route);

app.listen(5000, function(){
    console.log('Listening on port 5000!');
});
