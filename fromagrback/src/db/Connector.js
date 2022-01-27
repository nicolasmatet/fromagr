const neo4j = require('neo4j-driver');
const config = require('../../config.js');
const driver = neo4j.driver(config.DB_URI, neo4j.auth.basic(config.DB_USER, config.DB_PASSWD))
const RxOp = require('rxjs/operators');





class Neo4jConnector{
    async testConnection(){
      try{
        await this.execute("MATCH (f) RETURN f LIMIT 1")
      }catch{
        return false
      }
      return true;
    }

    execute(request, params){
        const rxSession = driver.rxSession({ defaultAccessMode: neo4j.session.READ, database:config.DB_NAME })
        return rxSession.run( request, params )
        .records()
        .pipe(    
          RxOp.concatWith(rxSession.close())
        )
    }

    executeWrite(request, params){
      const rxSession = driver.rxSession({ defaultAccessMode: neo4j.session.WRITE, database:config.DB_NAME })
      return rxSession.run( request, params )
      .records()
      .pipe(    
        RxOp.concatWith(rxSession.close())
      )
  }
}
module.exports = Neo4jConnector