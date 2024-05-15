const express = require("express");
const bodyParser = require("body-parser");
const fishSpeciesRoutes = require("./src/routes/fishSpeciesRoutes");

const app = express();

app.use(bodyParser.json());

app.use('/fish-species', fishSpeciesRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});