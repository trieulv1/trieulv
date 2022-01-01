const express =require('express');
const userModel =require('../models/user')
const app = express();

app.get('/', (req, res)=> {
    res.json("hello nodejs")
})


module.exports = app;