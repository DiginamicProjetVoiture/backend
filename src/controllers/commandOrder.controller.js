const CommandOrder = require('../models/commandOrder.model.js');

// Create and Save a new CommandOrder
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create a CommandOrder
  const commandOrder = new CommandOrder({
    id_quotation: req.body.id_quotation,
    id_priority: req.body.id_priority,
    closed_at: req.body.closed_at,
    is_delivered: req.body.is_delivered,
  });

  // Save CommandOrder in the database
  CommandOrder.create(commandOrder, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the CommandOrder.',
      });
    else res.status(201).send(data);
  });
};

// Retrieve all CommandOrder from the database.
exports.findAll = (req, res) => {
  CommandOrder.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving CommandOrders.',
      });
    else res.send(data);
  });
};

// Find a single CommandOrder with a commandOrderId
exports.findOne = (req, res) => {
  CommandOrder.findById(req.params.commandOrderId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found CommandOrder with id ${req.params.commandOrderId}.`,
        });
      } else {
        res.status(500).send({
          message:
            'Error retrieving CommandOrder with id ' +
            req.params.commandOrderId,
        });
      }
    } else {
      console.log(`data`, data);
      res.send(data);
    }
  });
};

// Update a CommandOrder identified by the commandOrderId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  CommandOrder.updateById(
    req.params.commandOrderId,
    // getOlderCommandOrder(req.params.commandOrderId),
    new CommandOrder(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found CommandOrder with id ${req.params.commandOrderId}.`,
          });
        } else {
          res.status(500).send({
            message:
              'Error updating CommandOrder with id ' +
              req.params.commandOrderId,
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a CommandOrder with the specified commandOrderId in the request
exports.delete = (req, res) => {
  CommandOrder.remove(req.params.commandOrderId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found CommandOrder with id ${req.params.commandOrderId}.`,
        });
      } else {
        res.status(500).send({
          message:
            'Could not delete CommandOrder with id ' +
            req.params.commandOrderId,
        });
      }
    } else res.send({ message: `CommandOrder was deleted successfully!` });
  });
};

// Delete all CommandOrders from the database.
exports.deleteAll = (req, res) => {
  CommandOrder.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all CommandOrder.',
      });
    else res.send({ message: `All CommandOrder were deleted successfully!` });
  });
};

// function getOlderCommandOrder(commandOrderId) {
//   let varToReturn = null;
//   await CommandOrder.findById(commandOrderId, (err, data) => {
//     if (!err) {
//       console.log(`data`,data);
//       varToReturn = data;
//     }
//   });
//   console.log(`varToReturn`,varToReturn);
//   return varToReturn
// }
