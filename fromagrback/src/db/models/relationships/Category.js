const Label = require("../Label")
const Property = require("../Property")

class Category{
    static label = Label("CATEGORY")
    static affinage = Property("affinage")
}

module.exports=Category