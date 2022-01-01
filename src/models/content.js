const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Content = new Schema({
    content:   String,
   
    
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
})

module.exports = mongoose.model('Content', Content);