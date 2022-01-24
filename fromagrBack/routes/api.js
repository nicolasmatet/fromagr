var express = require("express");
var Cheese = require("../src/cheese/Cheese.js");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("API is working");
});

router.get("/fromage", async function(req, res, next) {
    let result
    try{
        const cheeseName = req.query.name
        result = await (new Cheese()).get_cheese(cheeseName.toLowerCase())
    }finally{
        console.log("got::")
        console.log(result);
        res.send(result)
    }
});

module.exports = router;
