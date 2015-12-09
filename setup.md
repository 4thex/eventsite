Create new C9 Node workspace cloned from https://github.com/4thex/eventsite.

Create node application folder, and install express

    mkdir app; cd app
    npm init
    npm install express --save
    npm install
    
Create index.js file

    var express = require('express');
    var app = express();
    
    app.get('/', function (req, res) {
      res.send('Hello World!');
    });
    
    var server = app.listen(process.env.PORT, process.env.IP, function () {
        
    });

Install swagger-express

    npm install express --save

