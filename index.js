const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(express.urlencoded());
// Using the cookie-parser lib for cookies
app.use(cookieParser());

// require the connected db via mongoose file
const db = require('./config/mongoose');


// Setting up the static files folder
app.use(express.static('./assets'));

// use expressLayouts for layouts of the webpages
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router
app.use('/', require("./routes/index"));                // also you can write require("./routes");

// setting up the view engine
app.set('view engine' , 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if (err){
        // console.log('Error in running the server: ', err);
        console.log(`Error in running the server: ${port}`);                    // interploation
    } 
    console.log(`Server is up and running on port: ${port}`);
});