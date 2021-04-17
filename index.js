const express = require('express');
const app = express();
const port = 8000;

// use express router
app.use('/', require("./routes/index"));                // also you can write require("./routes");

app.listen(port, function(err){
    if (err){
        // console.log('Error in running the server: ', err);
        console.log(`Error in running the server: ${port}`);                    // interploation
    } 
    console.log(`Server is up and running on port: ${port}`);
});