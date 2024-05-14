const express = require("express");
const { getAll, getById, getByFishId, create, update, remove } = require("../controllers/fishRecipeController");
const router = express.Router();

router.get('/', getAll);

router.get('/:id', getById);

router.get('/fish/:fishId', getByFishId);

router.post('/', create);

router.put('/:id', update);

router.delete('/:id', remove);

module.exports = router;