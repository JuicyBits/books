var express = require('express');
var authRouter = express.Router();
// var mongodb = require('mongodb').MongoClient;

var router = () => {
    authRouter.route('/login').post((req, res) => {
        if(!req.body.username){return res.send('no body');}
        res.redirect('/');
    })
    .get((req, res) => {
        console.log('test');
        res.render('login');
    });
    return authRouter;
}
module.exports = router;
