/* Developers
* Shaked Weis 326403128
* Nikita Chuiko 317661882
* */

const express = require('express');
const router = express.Router();

const developers = [
    {firstname: "Shaked", lastname: "Weis", id: 326403128, email: "shakedwaiss@gmail.com"},
    {firstname: "Nikita", lastname: "Chuiko", id: 317661882, email: "nikita200471@gmail.com"}];
router.get('/', function (req,res)
{
    res.json(JSON.parse(JSON.stringify(developers)));
});

module.exports = router;
