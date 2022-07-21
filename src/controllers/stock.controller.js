const Stock = require('../models/stock.model.js');

// Create and Save a new Stock
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a Stock
  const stock = new Stock({
    id_vehicle: req.body.id_vehicle,
    number_stock: req.body.number_stock,
    updated_at: req.body.updated_at ? req.body.updated_at : null
  });

  // Save Stock in the database
  Stock.create(stock, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Stock.',
      });
    else res.status(201).send(data);
  });
};

// Retrieve all Stock from the database.
exports.findAll = (req, res) => {
  Stock.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Stocks.',
      });
    else res.send(data);
    
  });
};

// Find a single Stock with a stockId
exports.findOne = (req, res) => {
  Stock.findById(req.params.stockId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Stock with id ${req.params.stockId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Stock with id ' + req.params.stockId,
        });
      }
    } else res.send(data);
  });
};

// Find a single Stock with a vehicleId
exports.findByVehicle = (req, res) => {
  Stock.findByVehicle(req.params.vehicleId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Stock with id ${req.params.vehicleId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Stock with id ' + req.params.vehicleId,
        });
      }
    } else res.send(data);
  });
};

// Update a Stock identified by the stockId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  Stock.updateById(req.params.stockId, new Stock(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Stock with id ${req.params.stockId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Stock with id ' + req.params.stockId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Stock with the specified stockId in the request
exports.delete = (req, res) => {
  Stock.remove(req.params.stockId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Stock with id ${req.params.stockId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Stock with id ' + req.params.stockId,
        });
      }
    } else res.send({ message: `Stock was deleted successfully!` });
  });
};

// Delete a Stock with the specified stockId in the request
exports.deleteByVehicle = (req, res) => {
  Stock.deleteByVehicle(req.params.stockId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Stock with id ${req.params.stockId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Stock with id ' + req.params.stockId,
        });
      }
    } else res.send({ message: `Stock was deleted successfully!` });
  });
};

// Delete all Stocks from the database.
exports.deleteAll = (req, res) => {
  Stock.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Stock.',
      });
    else res.send({ message: `All Stock were deleted successfully!` });
  });
};
