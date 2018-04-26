const Agenda = require('agenda');
const request = require('request');
const mongoConnectionString = 'mongodb://127.0.0.1/agenda';


var agenda = new Agenda({db: {address: mongoConnectionString, collection: 'jobs'}});

module.exports = function(app, db) {
  let database = db.collection('rmo_blog');
  agenda.define('pull_posts', (job, done) => {
    let url = 'https://blog.rankmeonline.com/wp-json/wp/v2/posts'
    request(url, (err, response, body) => {
      let response_data = JSON.parse(body);
      for (i in response_data) {
        database.findOne({'id': response_data[i]['id']}, (err, item) => {
          if (err) throw err;
          else {
            if (item == null) {
              database.insert(response_data)
            }
          }
        });
      }
    });
  });

  agenda.on('ready', function () {
      agenda.every('* */4 * * * *', '');
      agenda.start();
  });
};
