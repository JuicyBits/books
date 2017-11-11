var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = () => {
    authRouter.route('/login')
    .post((req, res) => {
        if(!req.body.userName || !req.body.passWord){
            return res.sendStatus(403);
        }
        var url = 'mongodb://localhost:27017/books'; //27017 is default Mongo port
        mongodb.connect(url, (err, db) => {
            if(err){
                console.log('Error: ' + err);
                db.close();
            }
            var collection = db.collection('users');
            collection.findOne({
                    user: req.body.userName
                },
                function (err, results) {
                    // if (err) return console.log('error: ' + err);
                    if (!results) {
                        res.redirect('/login');
                        return console.log('User does not exist');
                    }
                    if (results.password === req.body.passWord) {
                        var user = results;
                        console.log(user);
                        res.redirect('/main');
                    } else {
                        console.log('Enter a valid password');
                    }
                }
            );
        });
    });
    authRouter.route('/register')
        .post((req, res) => {
            if(!req.body.userName || !req.body.passWord){
                return res.sendStatus(403);
            }
            var url = 'mongodb://localhost:27017/books'; //27017 is default Mongo port
            mongodb.connect(url, (err, db) => {
                if(err){
                    console.log('Error: ' + err);
                    db.close();
                }
                var collection = db.collection('users');
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
