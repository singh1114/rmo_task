const bodyParser = require('body-parser');
const config = require('./config/config');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const routes = require('./api/routes');


const app = express();

const port = 4000;

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(config.url, (err, client) => {
    const db = client.db('test')
    if (err) throw err;
    else console.log('Succesfully connected to the database');

    // routes
    routes(app, db)
    app.listen(port, () => {
        console.log('We are live on port: ' + port);
    });
});
