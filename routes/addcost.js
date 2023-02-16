/* Developers
* Shaked Weis 326403128
* Nikita Chuiko 317661882
* */

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://Shaked:shaked123@serversidecoursecluster.1hljluk.mongodb.net/Main', {useNewUrlParser: true});

// Define the Cost schema
const costSchema = new mongoose.Schema({
    user_id: {type: Number, required: true},
    year: {type: Number, required: true},
    month: {type: String, required: true},
    day: {type: Number, required: true},
    id: {type: mongoose.Types.ObjectId, required: true, default: mongoose.Types.ObjectId},
    description: {type: String, required: true},
    category: {type: String, required: true},
    sum: {type: Number, required: true}
});

// Create the Cost model
const Cost = mongoose.model('Cost', costSchema);

// POST request to add a new cost item
router.post('/', async (req, res) => {
    try {
        // Check if user with user_id already exists in the users collection
        const user = await mongoose.connection.db.collection('users').findOne({user_id: parseInt(req.query.user_id)});
        if(user){
            // Create a new cost item
            let newCost;
            // check if the category is known by the server if not set the category as other
            if (req.query.category !== "food" && req.query.category !== "health"
                && req.query.category !== "housing" && req.query.category !== "sport"
                && req.query.category !== "education" && req.query.category !== "transportation") {
                newCost = new Cost({
                    user_id: req.query.user_id,
                    year: req.query.year,
                    month: req.query.month,
                    day: req.query.day,
                    sum: req.query.sum,
                    category: "other",
                    description: req.query.description
                });
            }
            else {
                newCost = new Cost({
                    user_id: req.query.user_id,
                    year: req.query.year,
                    month: req.query.month,
                    day: req.query.day,
                    sum: req.query.sum,
                    category: req.query.category,
                    description: req.query.description
                });
            }
            // Save the new cost item to the database
            await newCost.save();
            // Send a response
            res.status(200).json(newCost);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.json({ message: err });
    }
});

// GET request to test the costs router
router.get('', function(req, res) {
    res.send('<h1>This is costs page</h1>');
});

module.exports = router;
