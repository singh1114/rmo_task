const request = require('request');
const newcontroller = require('../controllers/new');


module.exports = function(app, db) {
    const database = db.collection('rmo_blog');

    app.get('/newit', (req, resp) =>{
        resp.send(newcontroller.index(req, resp));
    });

    app.get('/other', (req, resp) => {
        resp.send(newcontroller.other(req, resp));
    });


    app.get('/posts', (req, resp) => {
        const posts = database.find().limit(5).toArray((err, items) => {
            if (err) {
                resp.send('An error occurred');
            }
            else {
                resp.send(items);
            }
        });
    });
};
