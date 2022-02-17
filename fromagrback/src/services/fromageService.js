const Fromage = require('../db/models/nodes/Fromage')
const Vin = require('../db/models/nodes/Vin')
const DbConnector = require('../db/Connector.js');
const connector = new DbConnector()
const RxOp = require('rxjs/operators');

function getByName(fromageName) {
    const req = `MATCH (f:${Fromage.label}) WHERE f.${Fromage.name}=$name RETURN f`;
    return connector.execute(req, { name: fromageName })
        .pipe(RxOp.map(fromage => {
            return fromage._fields[0];
        }))
}

function searchByName(fromageName) {
    const req = `MATCH (f) WHERE f.${Fromage.name} CONTAINS $name RETURN f`;
    return connector.execute(req, { name: fromageName })
        .pipe(RxOp.map(fromage => {
            return fromage._fields[0];
        }))
}

function fromagePairing(fromageId) {
    const req = `MATCH (f:${Fromage.label})
    WHERE id(f) = $id
    OPTIONAL MATCH (c:${Fromage.label})-[:CATEGORIE]->(f)
    OPTIONAL MATCH (v:${Vin.label})-[:AVEC]->(f)
    OPTIONAL MATCH (v2:${Vin.label})-[:AVEC]->(c)
    WITH collect(f)+collect(v)+collect(v2) as li
    UNWIND li as vs
    RETURN DISTINCT vs`;    
    return connector.execute(req, { id: fromageId })
        .pipe(RxOp.map(vins => {
            return vins._fields;
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
        .pipe(RxOp.map(fromage => {
            return fromage._fields;
        }))
}

function relatedFromages(fromageId){
    const req = `MATCH (f:${Fromage.label})
    WHERE id(f) = $id
    OPTIONAL MATCH (f)-[:CATEGORIE]->(f2:${Fromage.label})
    OPTIONAL MATCH (f)-[:SEMBLABLE]-(f3:${Fromage.label})
    WITH collect(f2)+collect(f3) as li
    UNWIND li as vs
    RETURN vs`;    
    return connector.execute(req, { id: fromageId })
        .pipe(RxOp.map(fromage => {
            return fromage._fields;
        }))
}

function create(fromageName) {
    const req = `CREATE (f:${Fromage.label}) SET f.${Fromage.name}=$name RETURN f`;
    return connector.executeWrite(req, { name: fromageName })
}

exports.searchByName = searchByName
exports.getByName = getByName
exports.create = create
exports.fromagePairing = fromagePairing
exports.vinPairing = vinPairing
exports.relatedFromages = relatedFromages