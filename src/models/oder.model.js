const sql = require('./db.js');

// constructor
const Order = function (order) {
  this.id_quotation = order.id_quotation;
  this.id_priority = order.id_priority;
  this.closure_date = order.closure_date;
  this.is_delivred = order.is_delivred;
};

Order.create = (newOrder, result) => {
  sql.query('INSERT INTO order SET ?', newOrder, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created order: ', { id: res.insertId, ...newOrder });
    result(null, { id: res.insertId, ...newOrder });
  });
};

Order.findById = (orderId, result) => {
  sql.query(`SELECT * FROM order WHERE id = ${orderId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('found order: ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found Order with the id
    result({ kind: 'not_found' }, null);
  });
};

Order.getAll = (result) => {
  sql.query('SELECT * FROM order', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('order: ', res);
    result(null, res);
  });
};

Order.updateById = (id, order, result) => {
  sql.query(
    'UPDATE order SET id_quotation = ?, id_priority = ?, closure_date = ?, is_delivred = ?, WHERE id = ?',
    [
      order.id_quotation,
      order.id_priority,
      order.closure_date,
      order.is_delivred,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found order with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated order: ', { id: id, ...order });
      result(null, { id: id, ...order });
    }
  );
};

Order.remove = (id, result) => {
  sql.query('DELETE FROM order WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found order with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted order with id: ', id);
    result(null, res);
  });
};

Order.removeAll = (result) => {
  sql.query('DELETE FROM order', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} order`);
    result(null, res);
  });
};
module.exports = Order;
