const NodeProperty = require("../Property")
const Label = require("../Label")

class Fromage {
    static name = new NodeProperty('name')
    static lait = new NodeProperty('lait')

    static label  = new Label("Fromage")
    static properties = [this.name, this.lait]

    constructor(properties) {
      this.properties = properties
    }

    
  }

  module.exports = Fromage