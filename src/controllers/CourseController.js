const Course = require('./models/Course')

class CourseController{
   show(req, res){
       res.send('COURSE DETAIL')
   }
}
module.exports =new CourseController;