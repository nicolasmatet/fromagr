var express = require("express");
var fromageService = require("../src/services/fromageService.js");
var router = express.Router();

function jsonResponse(res, subject) {
    const result = []
    subject.subscribe({
        next: data => result.push(data),
        complete: () => res.send(result),
        error: () => res.send({})
    });
}

router.get("/", function (req, res) {
    res.send("API is working");
});

router.get("/fromage/get", function (req, res) {
    const cheeseName = req.query.name.toLowerCase()
    jsonResponse(res, fromageService.getByName(cheeseName))
});


router.get("/fromage/search", function (req, res) {
    const cheeseName = req.query.name.toLowerCase()
    jsonResponse(res, fromageService.searchByName(cheeseName))
});

router.get("/fromage/pairing", function (req, res) {
    const cheeseId = parseInt(req.query.id)
    jsonResponse(res, fromageService.fromagePairing(cheeseId))
});

router.get("/vin/pairing", function (req, res) {
    const vinId = parseInt(req.query.id)
    jsonResponse(res, fromageService.vinPairing(vinId))
});

module.exports = router;
