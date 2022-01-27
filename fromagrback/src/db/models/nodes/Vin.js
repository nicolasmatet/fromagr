const Label = require("../Label")
const NodeProperty = require("../Property")

class Vin {
    static label = new Label('Vin')
    static name = new NodeProperty('name')
    static tanins = new NodeProperty('tanins')
    static alias = new NodeProperty('alias')
  
    constructor(properties) {
      this.properties = properties
    }

    
  }

  module.exports = Vin