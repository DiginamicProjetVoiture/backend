const sql = require('./db.js');

// constructor
const Quotation = function (quotation) {
  this.id_user = quotation.id_user;
  this.id_vehicule = quotation.id_vehicule;
  this.id_client = quotation.id_client;
  this.is_valid = quotation.is_valid;
  this.creation_date = quotation.creation_date;
};

Quotation.create = (newQuotation, result) => {
  sql.query('INSERT INTO quotation SET ?', newQuotation, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created quotation: ', { id: res.insertId, ...newQuotation });
    result(null, { id: res.insertId, ...newQuotation });
  });
};

Quotation.findById = (quotationId, result) => {
  sql.query(`SELECT * FROM quotation WHERE id = ${quotationId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('found quotation: ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found Quotation with the id
    result({ kind: 'not_found' }, null);
  });
};

Quotation.getAll = (result) => {
  sql.query('SELECT * FROM quotation', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('quotation: ', res);
    result(null, res);
  });
};

Quotation.updateById = (id, quotation, result) => {
  sql.query(
    'UPDATE quotation SET id_user = ?, id_vehicule = ?, id_client = ?, is_valid = ?, creation_date = ?, WHERE id = ?',
    [
      quotation.id_user,
      quotation.id_vehicule,
      quotation.id_client,
      quotation.is_valid,
      quotation.creation_date,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found quotation with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated quotation: ', { id: id, ...quotation });
      result(null, { id: id, ...quotation });
    }
  );
};

Quotation.remove = (id, result) => {
  sql.query('DELETE FROM quotation WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found quotation with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted quotation with id: ', id);
    result(null, res);
  });
};

Quotation.removeAll = (result) => {
  sql.query('DELETE FROM quotation', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} quotation`);
    result(null, res);
  });
};
module.exports = Quotation;
