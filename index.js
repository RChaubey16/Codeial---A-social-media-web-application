const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

// use expressLayouts for layouts of the webpages
app.use(expressLayouts);

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