const express = require('express');
const mongodb = require('mongodb').MongoClient;
var bookRouter = express.Router();

var router = () => {
    bookRouter.route('/')
        .get((req, res) => {
            var url =
                'mongodb://localhost:27017/books';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');

                collection.find({}).toArray(
                    function (err, results) {
                        res.render('bookListView', {
                            books: results
                        });
                    }
                );
            });
        })
    return bookRouter;
}

module.exports = router;
