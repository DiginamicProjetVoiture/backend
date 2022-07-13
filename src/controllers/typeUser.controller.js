const TypeUser = require('../models/typeUser.model.js');

// Create and Save a new TypeUser
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a TypeUser
  const typeUser = new TypeUser({
    name: req.body.name,
  });

  // Save TypeUser in the database
  TypeUser.create(typeUser, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the TypeUser.',
      });
    else res.send(data);
  });
};

// Retrieve all TypeUser from the database.
exports.findAll = (req, res) => {
  TypeUser.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving TypeUsers.',
      });
    else res.send(data);
  });
};

// Find a single TypeUser with a typeUserId
exports.findOne = (req, res) => {
  TypeUser.findById(req.params.typeUserId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found TypeUser with id ${req.params.typeUserId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving TypeUser with id ' + req.params.typeUserId,
        });
      }
    } else res.send(data);
  });
};

// Update a TypeUser identified by the typeUserId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  TypeUser.updateById(
    req.params.typeUserId,
    new TypeUser(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found TypeUser with id ${req.params.typeUserId}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error updating TypeUser with id ' + req.params.typeUserId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a TypeUser with the specified typeUserId in the request
exports.delete = (req, res) => {
  TypeUser.remove(req.params.typeUserId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found TypeUser with id ${req.params.typeUserId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete TypeUser with id ' + req.params.typeUserId,
        });
      }
    } else res.send({ message: `TypeUser was deleted successfully!` });
  });
};

// Delete all TypeUsers from the database.
exports.deleteAll = (req, res) => {
  TypeUser.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all TypeUser.',
      });
    else res.send({ message: `All TypeUser were deleted successfully!` });
  });
};
