const Datastore = require('nedb');
var express = require('express');
var app = express();
var cors = require('cors')
var ip = require('ip')
const bodyParser = require('body-parser');
const { PosPrinter } = require("electron-pos-printer");

var db = {};

db.product = new Datastore({ filename: './database/product.db', autoload: true });
db.category = new Datastore({ filename: './database/category.db', autoload: true });
db.orderkey = new Datastore({ filename: './database/orderkey.db', autoload: true });
db.printersettings = new Datastore({ filename: './database/printersettings.db', autoload: true });
db.user = new Datastore({ filename: './database/user.db', autoload: true });
db.loginfo = new Datastore({ filename: './database/loginfo.db', autoload: true });
db.storeusers = new Datastore({ filename: './database/storeusers.db', autoload: true });
db.preferences = new Datastore({ filename: './database/preferences.db', autoload: true });
db.taxgroups = new Datastore({ filename: './database/taxgroups.db', autoload: true });
db.diningarea = new Datastore({ filename: './database/diningarea.db', autoload: true });
db.diningtable = new Datastore({ filename: './database/diningtable.db', autoload: true });
db.discountrule = new Datastore({ filename: './database/discountrule.db', autoload: true });
db.additionalcharges = new Datastore({ filename: './database/additionalcharges.db', autoload: true });
db.ordertype = new Datastore({ filename: './database/ordertype.db', autoload: true });
db.customers = new Datastore({ filename: './database/customers.db', autoload: true });
db.paymenttypes = new Datastore({ filename: './database/paymenttypes.db', autoload: true });
db.kotgroups = new Datastore({ filename: './database/kotgroups.db', autoload: true });
db.orderstatus = new Datastore({ filename: './database/orderstatus.db', autoload: true });
db.preorders = new Datastore({ filename: './database/preorders.db', autoload: true });
db.pendingorders = new Datastore({ filename: './database/pendingorders.db', autoload: true });

Object.keys(db).forEach(key => {
    db[key].loadDatabase((data, error) => {
        if (error) console.log("Error loading database!")
        else console.log("Database loaded successfully!")
    });
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(cors());

app.get('/products', function (req, res) {
    db.product.find({}, function (err, docs) {
        res.send(docs)
    });
});

app.get('/categories', function (req, res) {
    db.category.find({}, function (err, docs) {
        res.send(docs)
    });
});
app.post('/addproducts', function (req, res) {
    db.product.insert(req.body, function (err, docs) {
        res.send(docs)
    });
});
app.post('/addcats', function (req, res) {
    db.category.insert(req.body, function (err, docs) {
        res.send(docs)
    });
});

app.post('/setorderkey', function (req, res) {
    db.orderkey.update({ _id: req.body._id }, req.body, { upsert: true }, function (err, docs) {
        var obj = { status: 200, msg: "data added succesfully" }
        res.send(obj)
    });
});

app.post('/getorderkey', function (req, res) {
    db.category.insert(req.body, function (err, docs) {
        res.send(docs)
    });
});

app.get('/unlock', function (req, res) {
    var response = {
        data: null,
        status: 0
    }
    db.storeusers.findOne({ "Pin": +req.query.pin }, function (err, docs) {
        if (docs) {
            db.user.remove({}, { multi: true }, function (err, numRemoved) {
                db.user.insert(docs, function (err, docs1) {
                    response.data = "Pin Matched"
                    response.status = 200
                    res.send(response)
                });
            })
        } else {
            response.data = "Pin Doesn't Matched"
            response.status = 0
            res.send(response)
        }
    });
});

app.post('/getdbdata', function (req, res) {
    var data = {}
    var i = 0
    var j = req.body.length
    req.body.forEach(dbname => {
        db[dbname].find({}, function (err, docs) {
            data[dbname] = docs
            i++
            if (i == j) res.send(data)
        });
    })
});

app.post('/storeselect', function (req, res) {
    console.log(req.ip, req.hostname)
    var i = 0;
    var j = Object.keys(req.body).length
    var response = { msg: "data set" }
    Object.keys(req.body).forEach(key => {
        db[key].remove({}, { multi: true }, function (err, numRemoved) {
            db[key].insert(req.body[key], function (err1, newDoc) {   // Callback is optional
                i++
                if (i == j) res.send(response)
            })
        })
    })
});

function startServer() {
    var server = app.listen(8081, function () {
        var host = server.address().address
        var port = server.address().port
        console.log("Example app listening at http://%s:%s", host, port)
        app.emit('appstarted', server.address())
    });
}

startServer();
