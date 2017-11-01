var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = () => {
    authRouter.route('/login')
    .post((req, res) => {
            if(!req.body.userName || !req.body.passWord){
                return res.sendStatus(403);
            }
            res.redirect('/');
    });
    authRouter.route('/register')
        .post((req, res) => {
            if(!req.body.userName || !req.body.passWord){
                return res.sendStatus(403);
            }
            var url = 'mongodb://localhost:27017/books'; //27017 is default Mongo port
            mongodb.connect(url, (err, db) => {
                var collection = db.collection('books');
                collection.insert({
                    user: req.body.userName,
                    password: req.body.passWord
                });
                db.close();
            });
            res.redirect('/');
        });

    return authRouter;
}
module.exports = router;
