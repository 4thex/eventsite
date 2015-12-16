var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var persistence = require("./modules/persistence")(app);
var event = require('./modules/event')(app, persistence);
var swagger = require('./modules/swagger')(app);

app.use('/api/docs', express.static('client/api/swagger/swagger-ui/dist'));
app.use('/', express.static('client/index.html'));
var server = app.listen(process.env.PORT, process.env.IP, function () {
    
});