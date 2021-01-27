const Datastore = require('nedb');
var express = require('express');
var app = express();
var cors = require('cors')
var ip = require('ip')

var db = {};
db.productdb = new Datastore({ filename: './database/product.db', autoload: true });
db.categorydb = new Datastore({ filename: './database/category.db', autoload: true });

db.productdb.loadDatabase((data, error) => {
    if (error) {
        console.log("Error loading database!")
    } else {
        console.log("Database loaded successfully!")
    }
});

db.categorydb.loadDatabase((data, error) => {
    if (error) {
        console.log("Error loading database!")
    } else {
        console.log("Database loaded successfully!")
    }
});

app.use(cors());

app.get('/products', function (req, res) {
    db.productdb.find({}, function (err, docs) {
        res.send(docs)
    });
});

app.get('/categories', function (req, res) {
    db.categorydb.find({}, function (err, docs) {
        res.send(docs)
    });
});
function startServer() {
    var server = app.listen(8081, ip.address(), function () {
        var host = server.address().address
        var port = server.address().port
        console.log("Example app listening at http://%s:%s", host, port)
        app.emit('appstarted', server.address())
    });
}

startServer();