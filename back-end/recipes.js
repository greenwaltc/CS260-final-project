const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();

const users = require("./users.js"); // Gets the user schema and model
const User = users.model;
const collections = require("./collections.js");
const Collection = collections.model;
const validUser = users.valid;

//
// Recipe schema and model
//

const recipeSchema = new mongoose.Schema({
    collectionID: String,
    name: String,
    ingredients: String,
    directions: String,
    created: {
        type: Date,
        default: Date.now
    },
});

// create a Recipe model from the Recipe schema
const Recipe = mongoose.model('Recipe', recipeSchema);

// upload a new recipe
router.post("/", validUser, async (req, res) => {
    // check parameters
    if (!req.body.name || !req.body.ingredients || !req.body.directions) {
        return res.status(400).send({
            message: "Please provide the required fields."
        });
    }

    const recipe = new Recipe({
        collectionID: req.body.collectionID,
        name: req.body.name,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
    });

    try {
        await recipe.save();
        return res.sendStatus(200);
    } catch (e) {
        return res.sendStatus(500);
    }
});

// get the recipes associated with a collection
// :id is the collection id
router.get("/:id", validUser, async (req, res) => {
    // return collections
    try {
        let recipes = await Recipe.find({
            collectionID: req.params.id
        }).sort({
            created: -1
        });
        return res.send(recipes);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
});

// update an existing recipe
router.put('/', async (req, res) => {
    try {
        let recipe = await Recipe.findOne({
            _id: req.body.id
        });

        recipe.name = req.body.name;
        recipe.ingredients = req.body.ingredients;
        recipe.directions = req.body.directions;
        await recipe.save();
        res.send(recipe);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// delete a recipe
router.delete("/:id", async (req, res) => {
    try {
        await Recipe.deleteMany({
            _id: req.params.id
        });
        return res.sendStatus(200);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

module.exports = {
    model: Recipe,
    routes: router,
}