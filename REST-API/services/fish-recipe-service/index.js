const express = require("express");
const bodyParser = require("body-parser")
const fishRecipeRoutes = require("./src/routes/fishRecipeRoutes")

const app = express();

app.use(bodyParser.json());

app.use('/fish-recipe', fishRecipeRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});