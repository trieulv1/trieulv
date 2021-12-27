const { profile } = require('console');
var express = require('express');
var path = require('path');
const db = require('./src/config/db');
const Course= require("./src/models/Course");
const Content= require("./src/models/content");
var schemaImages = require('./src/models/images')
const { ObjectId } = require('mongodb');

//connectdb
db.connect();
var app = express();
const route =require('./src/routes')

route(app)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('./public'))
//upload image


      

app.post('/profile', function(req, res){

  upload(req, res, function (err) {
  if (err instanceof multer.MulterError) {
    console.log("A Multer error occurred when uploading."); 
  } else if (err) {
    console.log("An unknown error occurred when uploading." + err);
  }else{
      res.send(req.file.filename)
      }
  })
  })
//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

//multer
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/img" || file.mimetype=="image/jpeg"){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("avatar");




//add

app.get('/profile/add', function(req, res){
  
  res.render('add')
})

app.post('/profile/add', function(req, res){
upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.json({ "kq": 0, "errMsg": "A Multer error occurred when uploading." });
        } else if (err) {
            res.json({ "kq": 0, "errMsg": "An unknown error occurred when uploading." + err });
        } else {

          var newCoures = new Course({
            Image: req.file.filename,
            masv: req.body.masv,

            hovaten: req.body.hovaten,
            tuoi: req.body.tuoi,
            lop: req.body.lop,
            email:req.body.email,
            diachi: req.body.diachi
                })
                newCoures.save((err) =>{
                  if (err) {
                    res.json({ "kq": 0, "errMsg": err });
                } else {
                    res.redirect('/profile');
                }
                })


        }
    });

       
    }) 





//profile
app.set('view engine')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.get('/profile',(req, res)=>{

  Course.find((err, char) => {
  
    if (err) {
        res.json({ "kq": 0, "errMsg": err })
    } else {
      Content.find((err, data) => {
        if (err) {
            res.json({ "kq": 0, "errMsg": err })
        } else {
           
            if(char[0]){
            res.render("index", {data,element:char[0]})
            }else{
              res.render("index", {data,element:char})
            }
            // Cmt.find((err, cmt) => {
            //   if (err) {
            //       res.json({ "kq": 0, "errMsg": err })
            //   } else {
                 
            //       if(char[0]){
            //       res.render("index", {data,element:char[0],cmt})
            //       }else{
            //         res.render("index", {data,element:char,cmt})
          
    
  }
    })
    
  }
})

})

app.delete('/profile/:id', (req, res)=>{
  const email = req.params.id;

  profile.findByIdAndDelete(id)
  .then(result =>{
    res.json({ redirect: '/profile'})
  })
  .catch(err =>{
    console.log(err);

  })
})

//sua
app.get('/profile/edit/:id', function(req, res){
  // ObjectId
  const ID = (req.params.id).trim();

  console.log(req.params.id)
  Course.findById({ _id:ObjectId(ID) }, function(err, char){
    if(err){
      res.json({"kq":0, "errMsg":err})
    }else{
      console.log(char)
      res.render('edit',{sinhvien:char})
    }
  })
})
app.post('/profile/edit', function(req, res){
upload(req, res, function (err) {

  if(err instanceof multer.MulterError){
    res.json({"kq":0, "errMsg":" k loi "});
  }else if (err){
    res.json({"kq":0, "errMsg":"  loi " +err});
  }else{
    //update mongo
    const ID = (req.body.id).trim();
    
    Course.updateOne({_id:ObjectId(ID)},{
        masv: req.body.masv,
        hovaten: req.body.hovaten,
        tuoi: req.body.tuoi,
        email: req.body.email,
        diachi: req.body.diachi,
        lop: req.body.lop
    }, function(err){
      if(err){
        res.json({"kq":0, "errMsg": err})

      }else{
        res.redirect('http://localhost:3000/profile')
      }
    });
  }
  })

  })



//add stt
app.post('/post', function(req, res){
  console.log(req.body.masv)
  
          var newContent = new Content({
      content: req.body.content
          })
          newContent.save((err) =>{
            if (err) {
              res.json({ "kq": 0, "errMsg": err });
          } else {
              res.redirect('/profile');
          }
          })
      }) 

//delete stt
app.get('/delete/:id', function(req, res){

  
  const ID = (req.params.id).trim();

  console.log(req.params.id)
  Content.deleteOne({ _id:ObjectId(ID) }, function(err){
    if(err){
      res.json({"kq":0, "errMsg":err})
    }else{
    
      res.redirect('back')
    }
  })
})










app.listen(3000, () => {
  console.log('server is running...')
});


module.exports = app;

