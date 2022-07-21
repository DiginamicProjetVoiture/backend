const Quotation = require('../models/quotation.model.js');

// Create and Save a new Quotation
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a Quotation
  const quotation = new Quotation({
    id_user: req.body.id_vehicle,
    id_vehicle: req.body.id_vehicle,
    id_customer: req.body.id_customer,
    is_valid: req.body.is_valid,
    created_at: req.body.created_at
  });

  // Save Quotation in the database
  Quotation.create(quotation, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Quotation.',
      });
    else res.status(201).send(data);
  });
};

// Retrieve all Quotation from the database.
exports.findAll = (req, res) => {
  Quotation.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Quotations.',
      });
    else res.send(data);
    
  });
};

// Find a single Quotation with a quotationId
exports.findOne = (req, res) => {
  Quotation.findById(req.params.quotationId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Quotation with id ${req.params.quotationId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Quotation with id ' + req.params.quotationId,
        });
      }
    } else res.send(data);
  });
};

// Update a Quotation identified by the quotationId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  Quotation.updateById(req.params.quotationId, new Quotation(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Quotation with id ${req.params.quotationId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Quotation with id ' + req.params.quotationId,
        });
      }
    } else res.send(data);
  });
};

// Delete a Quotation with the specified quotationId in the request
exports.delete = (req, res) => {
  Quotation.remove(req.params.quotationId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Quotation with id ${req.params.quotationId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Quotation with id ' + req.params.quotationId,
        });
      }
    } else res.send({ message: `Quotation was deleted successfully!` });
  });
};

// Delete all Quotations from the database.
exports.deleteAll = (req, res) => {
  Quotation.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Quotation.',
      });
    else res.send({ message: `All Quotation were deleted successfully!` });
  });
};
