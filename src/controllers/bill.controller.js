const Bill = require('../models/bill.model.js');

// Create and Save a new Bill
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a Bill
  const bill = new Bill({
    id_order: req.body.commandOrder.id_order,
    creation_date: req.body.creation_date,
    price_duty_free: req.body.price_duty_free,
    tva_amount: req.body.tva_amount
  });

  // Save Bill in the database
  Bill.create(bill, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Bill.',
      });
    else res.send(data);
  });
};

// Retrieve all Bill from the database.
exports.findAll = (req, res) => {
  Bill.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Bills.',
      });
    else res.send(data);
    
  });
};

// Find a single Bill with a billId
exports.findOne = (req, res) => {
  Bill.findById(req.params.billId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Bill with id ${req.params.billId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Bill with id ' + req.params.billId,
        });
      }
    } else res.send(data);
  });
};

// Update a Bill identified by the billId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  Bill.updateById(req.params.billId, new Bill(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Bill with id ${req.params.billId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Bill with id ' + req.params.billId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Bill with the specified billId in the request
exports.delete = (req, res) => {
  Bill.remove(req.params.billId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Bill with id ${req.params.billId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Bill with id ' + req.params.billId,
        });
      }
    } else res.send({ message: `Bill was deleted successfully!` });
  });
};

// Delete all Bills from the database.
exports.deleteAll = (req, res) => {
  Bill.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Bill.',
      });
    else res.send({ message: `All Bill were deleted successfully!` });
  });
};
