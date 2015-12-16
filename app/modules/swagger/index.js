module.exports = function (app) {
    var path = require('path');
    var fs = require('fs');
    var read = function(file, res) {
      fs.readFile(path.resolve(__dirname, file), 'utf8', function (err,spec) {
        if (err) {
          return console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(spec);
      });
    };
    app.get('/api/docs/swagger.json', function(req, res) {
      read('swagger.json', res);
    });
    app.get('/api/docs/minimal.json', function(req, res) {
      read('minimal.json', res);
    });
};