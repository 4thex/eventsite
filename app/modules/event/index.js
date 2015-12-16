module.exports = function (app, persistence) {
  app.route("/api/events/:id")
    .get(function(req, res) {
      persistence.retrieve(req.params.id)
        .then(function(event) {
          res.json(event);
        })
        .catch(function(error) {
          res.status(500).send(error);
        });
    })
    .delete(function(req, res) {
      persistence.delete(req.params.id)
        .then(function(event) {
          res.json(event);
        })
        .catch(function(error) {
          res.status(500).send(error);
        });
    });
  app.route("/api/events")
    .get(function(req, res) {
      persistence.find()
        .then(function(events) {
          res.status(200).json(events);
        })
        .catch(function(error) {
          res.status(500).send(error);
        });
    })
    .put(function(req, res) {
      var event = req.body;
      persistence.save(event)
        .then(function(event) {
          res.status(201).json(event).send("Created");
        })
        .catch(function(error) {
          res.status(500).send(error);
        });
    });
    return {
        
    };
};