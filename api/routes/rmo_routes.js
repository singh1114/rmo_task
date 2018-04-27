const request = require('request');
const newcontroller = require('../controllers/new');


module.exports = function(app, db) {
    const database = db.collection('rmo_blog');

    app.get('/posts', (req, resp) => {
        const posts = database.find().sort({'date': -1}).limit(5).toArray((err, items) => {
            if (err) {
                resp.send('An error occurred');
            }
            else {
                resp.render('posts', {posts: items});
            }
        });
    });

};
