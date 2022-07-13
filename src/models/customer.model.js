const sql = require('./db.js');

// constructor
const Customer = function (customer) {
  this.id_user = customer.id_user;
  this.lastname = customer.lastname;
  this.firstname = customer.firstname;
  this.city_code = customer.city_code;
  this.phone = customer.phone;
  this.mobile = customer.mobile;
  this.email = customer.email;
  this.creation_date = customer.creation_date;
};

Customer.create = (newCustomer, result) => {
  sql.query('INSERT INTO customer SET ?', newCustomer, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created customer: ', { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findById = (customerId, result) => {
  sql.query('SELECT customer.id, customer.lastname, customer.firstname, customer.city_code, customer.phone, customer.mobile, customer.email, customer.creation_date, '+
  'user.id AS user_id, user.lastname AS user_lastname, user.firstname AS user_firstname, user.email AS user_email, user.password AS user_password, user.is_activated AS user_is_activated, type_user.id AS id_type_user, type_user.name AS name_type_user'+
  'FROM customer'+
  'LEFT JOIN user ON customer.id_user = user.id'+
  'LEFT JOIN type_user ON user.id_type_user = type_user.id'+
   `WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('found customer: ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found customer with the id
    result({ kind: 'not_found' }, null);
  });
};

Customer.getAll = (result) => {
  sql.query('SELECT customer.id, customer.lastname, customer.firstname, customer.city_code, customer.phone, customer.mobile, customer.email, customer.creation_date, '+
  'user.id AS user_id, user.lastname AS user_lastname, user.firstname AS user_firstname, user.email AS user_email, user.password AS user_password, user.is_activated AS user_is_activated, type_user.id AS id_type_user, type_user.name AS name_type_user'+
  'FROM customer'+
  'LEFT JOIN user ON customer.id_user = user.id'+
  'LEFT JOIN type_user ON user.id_type_user = type_user.id', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('customer: ', res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  sql.query(
    'UPDATE customer SET id_user = ?, lastname = ?, fristname = ?, city_code = ?, phone = ?, mobile = ?,  creation_date = ?, WHERE id = ?',
    [
      customer.id_user,
      customer.lastname,
      customer.firstname,
      customer.city_code,
      customer.phone,
      customer.mobile,
      customer.creation_date,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found customer with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated customer: ', { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

Customer.remove = (id, result) => {
  sql.query('DELETE FROM customer WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found customer with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted customer with id: ', id);
    result(null, res);
  });
};

Customer.removeAll = (result) => {
  sql.query('DELETE FROM customer', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} customer`);
    result(null, res);
  });
};
module.exports = Customer;
