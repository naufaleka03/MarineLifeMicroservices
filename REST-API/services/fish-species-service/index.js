// import express from "express";
// import bodyParser from "body-parser";
// import fishSpeciesRoutes from "./src/routes/fishSpeciesRoutes";

const express = require("express");
const bodyParser = require("body-parser")
const fishSpeciesRoutes = require("./src/routes/fishSpeciesRoutes")

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Mount fish species routes
app.use('/fish-species', fishSpeciesRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});