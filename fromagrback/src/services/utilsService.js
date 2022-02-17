const Fromage = require('../db/models/nodes/Fromage')
const DbConnector = require('../db/Connector.js');
const connector = new DbConnector()
const RxOp = require('rxjs/operators');

function wakeup(){
    const req = `MATCH (f:${Fromage.label}) RETURN f LIMIT 1`;
    return connector.execute(req)
        .pipe(RxOp.map(fromage => {
            return fromage._fields[0];
        }))
}


exports.wakeup = wakeup
