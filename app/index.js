var express = require('express');
var app = express();
var event = require('./modules/event')(app);
var swagger = require('./modules/swagger')(app);

app.use('/api/docs', express.static('client/api/swagger/swagger-ui/dist'));
app.use('/', express.static('client/index.html'));
var server = app.listen(process.env.PORT, process.env.IP, function () {
    
});