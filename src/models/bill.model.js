const sql = require('./db.js');

// constructor
const Bill = function (bill) {
  this.id_quotation = bill.id_quotation;
  this.creation_date = bill.creation_date;
  this.price_duty_free = bill.price_duty_free;
  this.tva_amount = bill.tva_amount;
};

Bill.create = (newBill, result) => {
  sql.query('INSERT INTO bill SET ?', newBill, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created bill: ', { id: res.insertId, ...newBill });
    result(null, { id: res.insertId, ...newBill });
  });
};

Bill.findById = (billId, result) => {
  sql.query(`SELECT * FROM bill WHERE id = ${billId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('found bill: ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found Bill with the id
    result({ kind: 'not_found' }, null);
  });
};

Bill.getAll = (result) => {
  sql.query('SELECT * FROM bill', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('bill: ', res);
    result(null, res);
  });
};

Bill.updateById = (id, bill, result) => {
  sql.query(
    'UPDATE bill SET id_quotation = ?, creation_date = ?, price_duty_free = ?, tva_amount = ?, WHERE id = ?',
    [bill.id_quotation, bill.creation_date, bill.price_duty_free, bill.tva_amount, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found bill with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated bill: ', { id: id, ...bill });
      result(null, { id: id, ...bill });
    }
  );
};

Bill.remove = (id, result) => {
  sql.query('DELETE FROM bill WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found bill with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted bill with id: ', id);
    result(null, res);
  });
};

Bill.removeAll = (result) => {
  sql.query('DELETE FROM bill', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} bill`);
    result(null, res);
  });
};
module.exports = Bill;
