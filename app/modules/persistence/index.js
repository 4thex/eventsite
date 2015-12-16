module.exports = function(app) {
  var config = require("./configuration.js"); 
  var impl = require(config.implementation)(config);
  return impl;
};