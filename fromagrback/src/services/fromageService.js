const Fromage = require('../db/models/nodes/Fromage')
const Vin = require('../db/models/nodes/Vin')
const DbConnector = require('../db/Connector.js');
const connector = new DbConnector()
const RxOp = require('rxjs/operators');

function getByName(cheeseName) {
    const req = `MATCH (f:${Fromage.label}) WHERE f.${Fromage.name}=$name RETURN f`;
    return connector.execute(req, { name: cheeseName })
        .pipe(RxOp.map(cheese => {
            return cheese._fields[0];
        }))
}

function searchByName(cheeseName) {
    const req = `MATCH (f) WHERE f.${Fromage.name} CONTAINS $name RETURN f`;
    return connector.execute(req, { name: cheeseName })
        .pipe(RxOp.map(cheese => {
            return cheese._fields[0];
        }))
}

function fromagePairing(cheeseId) {
    const req = `MATCH (f:${Fromage.label})
    WHERE id(f) = $id
    OPTIONAL MATCH (c:${Fromage.label})-[:CATEGORIE]->(f)
    OPTIONAL MATCH (v:${Vin.label})-[:AVEC]->(f)
    OPTIONAL MATCH (v2:${Vin.label})-[:AVEC]->(c)
    WITH collect(f)+collect(v)+collect(v2) as li
    UNWIND li as vs
    RETURN DISTINCT vs`;    
    return connector.execute(req, { id: cheeseId })
        .pipe(RxOp.map(wines => {
            return wines._fields;
        }))
}

function vinPairing(vinId){
    const req = `MATCH (v:${Vin.label})
    WHERE id(v) = $id
    OPTIONAL MATCH (v:${Vin.label})-[:AVEC]->(f)
    WITH collect(v)+collect(f) as li
    UNWIND li as vs
    RETURN DISTINCT vs`;    
    return connector.execute(req, { id: vinId })
        .pipe(RxOp.map(cheese => {
            return cheese._fields;
        }))
}

function create(cheeseName) {
    const req = `CREATE (f:${Fromage.label}) SET f.${Fromage.name}=$name RETURN f`;
    return connector.executeWrite(req, { name: cheeseName })
}


exports.searchByName = searchByName
exports.getByName = getByName
exports.create = create
exports.fromagePairing = fromagePairing
exports.vinPairing = vinPairing
