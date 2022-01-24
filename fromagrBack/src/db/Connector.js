const neo4j = require('neo4j-driver');
const config = require('../../config.js');
const driver = neo4j.driver(config.DB_URI, neo4j.auth.basic(config.DB_USER, config.DB_PASSWD))


async function testDB(){
  console.log(config.DB_URI);
  console.log(config.DB_USER, config.DB_PASSWD);

  const session = driver.session(driver.READ, [], config.DB_NAME)
  try{
    await session.run( "MATCH (f:FROMAGE) RETURN f LIMIT 1" )
  }catch(error){
    console.log(error);
    console.log("connection to db failed !")
  } finally {
    console.log("db connected");
    await session.close()
  }   
}
testDB();


class Neo4jConnector{
    
    async execute(request, params){
        const session = driver.session(driver.READ, '', config.DB_NAME)
        let result;
        try {
            result = await session.run(
                request,
                params
            )
          } catch(error){
            console.log(error);
          } finally {
            await session.close()
          }    
          return result      
    }
}
module.exports = Neo4jConnector