const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
// require the connected db via mongoose file
const db = require('./config/mongoose');
// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


app.use(express.urlencoded());

// Using the cookie-parser lib for cookies
app.use(cookieParser());


// Setting up the static files folder
app.use(express.static('./assets'));

// use expressLayouts for layouts of the webpages
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// setting up the view engine
app.set('view engine' , 'ejs');
app.set('views', './views');


app.use(session({
    name: 'codeial',
    // TO change the secret before deployment
    secret: 'blahsomething',
    saveUninitialized: false, 
    resave: false, 
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

// iniializing passport for usage
app.use(passport.initialize());
// initiializing session for usage
app.use(passport.session());

// use express router
app.use('/', require("./routes/index"));                // also you can write require("./routes");



app.listen(port, function(err){
    if (err){
        // console.log('Error in running the server: ', err);
        console.log(`Error in running the server: ${port}`);                    // interploation
    } 
    console.log(`Server is up and running on port: ${port}`);
});