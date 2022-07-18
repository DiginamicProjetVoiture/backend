const Vehicle = require('../models/vehicle.model.js');

// Create and Save a new Vehicle
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a Vehicle
  const vehicle = new Vehicle({
    price: req.body.price,
    name: req.body.name,
    brand: req.body.brand
  });

  // Save Vehicle in the database
  Vehicle.create(vehicle, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Vehicle.',
      });
    else res.send(data);
  });
};

// Retrieve all Vehicle from the database.
exports.findAll = (req, res) => {
  Vehicle.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Vehicles.',
      });
    else res.send(data);
    
  });
};

// Find a single Vehicle with a vehicleId
exports.findOne = (req, res) => {
  Vehicle.findById(req.params.vehicleId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Vehicle with id ${req.params.vehicleId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Vehicle with id ' + req.params.vehicleId,
        });
      }
    } else res.send(data);
  });
};

// Update a Vehicle identified by the vehicleId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  Vehicle.updateById(req.params.vehicleId, new Vehicle(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Vehicle with id ${req.params.vehicleId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Vehicle with id ' + req.params.vehicleId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Vehicle with the specified vehicleId in the request
exports.delete = (req, res) => {
  Vehicle.remove(req.params.vehicleId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Vehicle with id ${req.params.vehicleId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Vehicle with id ' + req.params.vehicleId,
        });
      }
    } else res.send({ message: `Vehicle was deleted successfully!` });
  });
};

// Delete all Vehicles from the database.
exports.deleteAll = (req, res) => {
  Vehicle.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Vehicle.',
      });
    else res.send({ message: `All Vehicle were deleted successfully!` });
  });
};
