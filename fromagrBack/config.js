module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 9000,
    DB_USER: 'neo4j',
    DB_PASSWD: 'radKOALA',
    DB_URI:"neo4j://localhost:7687",
    DB_NAME: 'fromagerie'
  }