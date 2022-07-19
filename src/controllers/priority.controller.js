const Priority = require('../models/priority.model.js');

// Create and Save a new Priority
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a Priority
  const priority = new Priority({
    name: req.body.name,
  });

  // Save Priority in the database
  Priority.create(priority, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Priority.',
      });
    else res.send(data);
  });
};

// Retrieve all Priority from the database.
exports.findAll = (req, res) => {
  Priority.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Prioritys.',
      });
    else res.send(data);
  });
};

// Find a single Priority with a priorityId
exports.findOne = (req, res) => {
  Priority.findById(req.params.priorityId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Priority with id ${req.params.priorityId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Priority with id ' + req.params.priorityId,
        });
      }
    } else res.send(data);
  });
};

// Update a Priority identified by the priorityId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  Priority.updateById(
    req.params.priorityId,
    new Priority(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Priority with id ${req.params.priorityId}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error updating Priority with id ' + req.params.priorityId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Priority with the specified priorityId in the request
exports.delete = (req, res) => {
  Priority.remove(req.params.priorityId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Priority with id ${req.params.priorityId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Priority with id ' + req.params.priorityId,
        });
      }
    } else res.send({ message: `Priority was deleted successfully!` });
  });
};

// Delete all Prioritys from the database.
exports.deleteAll = (req, res) => {
  Priority.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Priority.',
      });
    else res.send({ message: `All Priority were deleted successfully!` });
  });
};
