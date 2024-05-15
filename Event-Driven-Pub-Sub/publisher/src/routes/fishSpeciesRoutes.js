const express = require("express");
const { getAll, getById, getFishwithRecipes, create, update, remove } = require("../controllers/fishSpeciesController");

// Create router instance
const router = express.Router();

// Route to get all fish species
router.get('/', getAll);

// Route to get a single fish species by ID
router.get('/:id', getById);

// Route to get fish with its recipes
router.get('/recipe/:fishId', getFishwithRecipes);

// Route to create a new fish species
router.post('/', create);

// Route to update an existing fish species
router.put('/:id', update);

// Route to delete a fish species
router.delete('/:id', remove);

// Export router instance
module.exports = router;