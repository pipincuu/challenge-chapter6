const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require('method-override');
const router = require("./router");
const { User, Biodata, History, Admin } = require("./models");

const PORT = 8888;

const app = express();

//Method override
app.use(methodOverride("_method"));


app.use(express.urlencoded({ extended:false}));
app.use(express.json());


// Static files
app.use(express.static("public"));

// Set templating engine

app.set("view engine", "ejs");

// Middleware to pass `url` to locals variable so we can use it on view
app.use((req, res, next) => {
    res.locals.url = req.originalUrl;
    next();
  });

// Router
app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});