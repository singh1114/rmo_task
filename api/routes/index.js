const rmoRoutes = require('./rmo_routes');

module.exports = function(app, db) {
    rmoRoutes(app, db);
};
