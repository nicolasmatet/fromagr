const DbConnector = require('../db/Connector.js');
const connector = new DbConnector()

class Cheese {

    constructor(){

    }

    get_cheese(cheese_name){
        const req= "MATCH (f:FROMAGE) \
            WHERE f.name=$name \
            RETURN f"
        return connector.execute(req, {name:cheese_name})
    }
}
module.exports = Cheese