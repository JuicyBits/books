const express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: 'The Pillars of the Earth',
        author: 'Ken Follett',
        genre: 'Historical Fiction'
    }, {
        title: 'A Short History of Nearly Everything',
        author: 'Bill Bryson',
        genre: 'Science and Education'
    }, {
        title: 'Waking Up',
        author: 'Sam Harris',
        genre: 'Meditation & Spirituality'
    }
];

var router = () => {
    adminRouter.route('/addBooks')
        .get((req, res) => {
            var url =
                'mongodb://localhost:27017/books';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books,
                    function (err, results) {
                        res.send(results);
                        db.close();
                    }
                );

            });
        });

    return adminRouter;
}

module.exports = router;
