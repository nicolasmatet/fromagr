var express = require("express");
var fromageService = require("../src/services/fromageService.js");
var utilsService = require("../src/services/utilsService.js");
var suggestionService = require("../src/services/suggestionService.js");
var wikiService = require("../src/services/wikiService.js");
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

router.get("/wakeup", function (req, res) {
    jsonResponse(res, utilsService.wakeup())
});

router.get("/fromage/get", function (req, res) {
    const fromageName = req.query.name.toLowerCase()
    jsonResponse(res, fromageService.getByName(fromageName))
});


router.get("/fromage/search", function (req, res) {
    const fromageId = req.query.name.toLowerCase()
    jsonResponse(res, fromageService.searchByName(fromageId))
});

router.get("/fromage/pairing", function (req, res) {
    const fromageId = parseInt(req.query.id)
    jsonResponse(res, fromageService.fromagePairing(fromageId))
});

router.get("/vin/pairing", function (req, res) {
    const vinId = parseInt(req.query.id)
    jsonResponse(res, fromageService.vinPairing(vinId))
});

router.get("/fromage/related", function (req, res) {
    const fromageId = parseInt(req.query.id)
    jsonResponse(res, fromageService.relatedFromages(fromageId))
});

router.get("/vin/related", function (req, res) {
    const vinId = parseInt(req.query.id)
    jsonResponse(res, fromageService.relatedVins(vinId))
});

router.get("/suggestion", function (req, res) {
    jsonResponse(res, suggestionService.getSuggestionOfTheDay())
});


router.get("/randomsuggestion", function (req, res) {
    jsonResponse(res, suggestionService.getRandomSuggestion())
});

router.get("/imageurl", function (req, res) {
    const id = req.query.id
    console.log('id', id);
    jsonResponse(res, wikiService.getImageUrl(id))
});

module.exports = router;
