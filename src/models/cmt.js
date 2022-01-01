const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Cmt = new Schema({
    cmt:   String,
   
    
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
})

module.exports = mongoose.model('Cmt', Cmt);