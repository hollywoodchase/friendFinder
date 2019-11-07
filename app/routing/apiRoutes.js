let friendsData = require('../data/friends');

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friendsData);
        // res.json(friendsData);
    });
    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware
        friendsData.push(req.body);
        res.json(true);
    });

    app.post("/api/clear", function(req, res) {
        // Empty out the arrays of data
        friendsData.length = 0;
    
        res.json({ ok: true });
      });
}
