module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    PORT: process.env.PORT || 9000,
    DB_USER: process.env.DB_USER || 'neo4j',
    DB_PASSWD: process.env.DB_PASSWD || 'radKOALA',
    DB_URI: process.env.DB_PASSWD || "neo4j://localhost:7687",
    DB_NAME: process.env.DB_PASSWD || 'fromagerie'
  }