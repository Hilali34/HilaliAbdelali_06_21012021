const express = require("express");
require('dotenv').config({path:"./.env"});
const mongoose = require("mongoose");
const helmet = require("helmet");
const path = require("path");


const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");


mongoose.connect( process.env.DB_CONNECT ,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch(() => console.log("Connexion à MongoDB échouée !"));


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://sopikokco.netlify.app/');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
