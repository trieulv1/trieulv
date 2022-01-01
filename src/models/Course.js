const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Course = new Schema({
    
    Image: String,
    masv:   String,
    hovaten:   String,
    tuoi:  String,
    lop:  String,
    email:   String,
    diachi:   String,
    
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
})

module.exports = mongoose.model('Course', Course);