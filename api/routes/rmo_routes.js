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

    app.get('/newdata', (req, resp) => {
        request('https://blog.rankmeonline.com/wp-json/wp/v2/posts', (err, response, body) => {
            if (err) throw err;
            else {
                //console.log(response);
                console.log('-------------###################################-------------');
                //console.log(body);
                //resp.send(body);
                //let json = JSON.parse(body);
                //console.log(body)
                //resp.send(json.count);
                //console.log(json.count);
                //console.log(json.result);
                let z = JSON.parse(body);
                //resp.send(z[0]);
                for (i in z) {
                    console.log(z[i]['id']);
                    console.log('\n----------\n');
                }
                //database.insert(z[0]);
                database.findOne({"id": z[0]['id']}, (err, items) => {
                    if (err) {
                        resp.send('fghjk--------fghjk----');
                    }
                    else {
                        console.log('dfghj');
                        if (items == null) {
                            console.log('cracked it!');
                        }
                        resp.send(items);
                    }
                });
                //resp.send(database.find({"id": z[1]['id']}));
                //if (database.find({"id": z[1]['id']})) {
                //    console.log("Found it!");
                //}


            }
        });
    });

    app.post('/notes', (req, resp) => {
        const note = { body: req.body.body, title: req.body.title };
        database.insert(note, (err, result) => {
            if (err) {
                resp.send({'error': 'An error occured'});
            }
            else resp.send(result.ops[0]);
        });
    });
};
