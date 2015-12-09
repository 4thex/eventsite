module.exports = function (app) {
    var path = require('path');
    var fs = require('fs')
    app.get('/api/docs/swagger.json', function(req, res) {
      fs.readFile(path.resolve(__dirname, 'swagger.json'), 'utf8', function (err,spec) {
        if (err) {
          return console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(spec);
      });
    });
};