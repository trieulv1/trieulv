class NewsController {
//get /news
    index() {
        res.render('news')
    }

}
module.exports =new NewsController

const NewsController = require('/.NewsController')