var mongoose = require('mongoose')

var schemaImages = new mongoose.Schema({
    Image: String
})

module.exports = mongoose.model('schemaImages', schemaImages)