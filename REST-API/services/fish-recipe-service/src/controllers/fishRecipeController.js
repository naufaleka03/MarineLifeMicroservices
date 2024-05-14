const fs = require("fs");
const path = require("path");

const fishRecipeFilePath = path.resolve(__dirname, "../models/fishRecipeData.json");
const fishRecipeData = JSON.parse(fs.readFileSync(fishRecipeFilePath));

const getAll = (req, res) => {
    try {
        return res.status(200).json(fishRecipeData);
    } catch (error) {
        console.error("Error getting all fish recipes:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const fishRecipe = fishRecipeData.find(recipe => recipe.id === id);
        if (!fishRecipe) {
            return res.status(404).json({ error: 'Fish recipe not found' })
        }
        return res.status(200).json(fishRecipe);
    } catch (error) {
        console.error("Error getting fish recipe by ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    } 
};

const getByFishId = (req, res) => {
    try {
        const { fishId } = req.params
        const fishRecipe = fishRecipeData.filter(recipe => recipe.fishId === parseInt(fishId));
        if(fishRecipe.length === 0) {
            return res.status(404).json({ error: "No recipes found for this fish"})
        }
        return res.status(200).json(fishRecipe);
    } catch (error) {
        console.error("Error getting fish recipe by fish ID:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const create = (req, res) => {
    try {
        const { fishId, recipe } = req.body;
        if ( !fishId || !recipe ) {
            return res.status(400).json({ error: 'Entry are required' });
        }
        const lastId = fishRecipeData.length > 0 ? fishRecipeData[fishRecipeData.length - 1].id : 0;
        const id = lastId + 1;
        const newFishSpecies = { id, fishId, recipe };
        fishRecipeData.push(newFishSpecies);
        return res.status(201).json(newFishSpecies);
    } catch (error) {
        console.error('Error creating fish recipe:', error);
        return res.status(500).json({ error: "Internal server error" })
    }
};

const update = (req, res) => {
    try {
        const { id } = req.params;
        const { fishId, recipe } = req.body;
        const index = fishRecipeData.findIndex(recipe => recipe.id === id);
        if (index === -1) {
            return res.status(404).json({ error: "Fish recipe not found" })
        }
        fishRecipeData[index] = { ...fishRecipeData[index], fishId, recipe };
        return res.status(200).json(fishRecipeData[index]);
    } catch (error) {
        console.error("Error updating fish recipe:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const remove = (req, res) => {
    try {
        const { id } = req.params;
        fishRecipeData = fishRecipeData.filter(recipe => recipe.id !== id);
        return res.status(200).json({ message: "Fish recipe deleted successfully" })
    } catch (error) {
        console.error("Error deleting fish recipe:", error);
        return res.status(500).json({ error: "Internal Server error" })
    }
};

module.exports = {
    getAll,
    getById,
    getByFishId,
    create,
    update,
    remove
}