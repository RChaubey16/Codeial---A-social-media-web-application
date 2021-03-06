const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");

// require the connected db via mongoose file
const db = require("./config/mongoose");
// Used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require("connect-mongo")(session);
// sass middleware
const sassMiddleware = require("node-sass-middleware");
// require the connect-flash library
const flash = require("connect-flash");
// require the custom middleware
const customMware = require("./config/middleware");

// using sass middleware
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
app.use(express.urlencoded());

// Using the cookie-parser lib for cookies
app.use(cookieParser());

// Setting up the static files folder
app.use(express.static("./assets"));

// make the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

// use expressLayouts for layouts of the webpages
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setting up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session cookie in db
app.use(
  session({
    name: "codeial",
    // TO change the secret before deployment
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongo setup ok");
      }
    ),
  })
);

// iniializing passport for usage
app.use(passport.initialize());
// initiializing session for usage
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Setting up the connect-flash library
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use("/", require("./routes")); // also you can write require("./routes");

app.listen(port, function (err) {
  if (err) {
    // console.log('Error in running the server: ', err);
    console.log(`Error in running the server: ${port}`); // interploation
  }
  console.log(`Server is up and running on port: ${port}`);
});
