const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require('method-override');
const router = require("./router");
const { User } = require("./models");

const PORT = 8888;

const app = express();

//Method override
app.use(methodOverride("_method"));

app.use(express.json());

app.use(express.urlencoded({ extended:false}));

// Static files
app.use(express.static("public"));

app.set("view engine", "ejs");

// Router
app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});