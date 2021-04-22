const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();

const users = require("./users.js"); // Gets the user schema and model
const User = users.model;
const validUser = users.valid;

//
// Collection schema and model
//

const collectionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    name: String,
    description: String,
    created: {
        type: Date,
        default: Date.now
    },
});

// create a Collection model from the Collection schema
const Collection = mongoose.model('Collection', collectionSchema);

// upload a new collection
router.post("/", validUser, async (req, res) => {
    // check parameters
    if (!req.body.name || !req.body.description) {
        return res.status(400).send({
            message: "Please provide the required fields."
        });
    }

    const collection = new Collection({
        user: req.user,
        name: req.body.name,
        description: req.body.description
    });

    try {
        await collection.save();
        return res.sendStatus(200);
    } catch (e) {
        return res.sendStatus(500);
    }
});

// get the collections associated with a user
router.get("/", validUser, async (req, res) => {
    // return collections
    try {
        let collections = await Collection.find({
            user: req.user
        }).sort({
            created: -1
        }).populate('user');
        return res.send(collections);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Collection,
    routes: router,
}