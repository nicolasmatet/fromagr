const DbConnector = require('../db/Connector.js');
const connector = new DbConnector()
const RxOp = require('rxjs/operators');



function getSuggestionOfTheDay() {
    return _getSuggestionOfTheDay(dayNumber())
}

function getRandomSuggestion() {
    return _getSuggestionOfTheDay(Math.floor(Math.random() * 365))
}


function _getSuggestionOfTheDay(day) {
    const req = `MATCH (s:Suggestion)
                WITH count(s) as c
                MATCH (s2:Suggestion)
                WHERE s2.n=$day%c
                RETURN s2
                LIMIT 1`;
    return connector.execute(req, { day })
        .pipe(RxOp.map(suggestion => {
            return suggestion._fields[0];
        }))
}

function dayNumber() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

exports.getRandomSuggestion = getRandomSuggestion
exports.getSuggestionOfTheDay = getSuggestionOfTheDay
