module.exports = function() {
  return {
    implementation: "./mongoose.js",
    connection: "mongodb://localhost/events"
  };  
}();