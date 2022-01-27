var express = require("express");
var fromageService = require("../src/services/fromageService.js");
var router = express.Router();

function jsonResponse(res, subject){
    const result = []
    subject.subscribe({
        next: data => result.push(data),
        complete: () => res.send(result),
        error: () => res.send({})
    });
}

router.get("/", function(req, res, next) {
    res.send("API is working");
});

router.get("/fromage/get", function(req, res, next) {
    const cheeseName = req.query.name.toLowerCase()
    jsonResponse( res, fromageService.getByName(cheeseName) )
});


router.get("/fromage/search", function(req, res, next) {
    const cheeseName = req.query.name.toLowerCase()
    jsonResponse( res, fromageService.searchByName(cheeseName))
});

router.get("/fromage/pairing", function(req, res, next) {
    const cheeseId = parseInt(req.query.id)
    jsonResponse( res, fromageService.pairing(cheeseId))
});



module.exports = router;
