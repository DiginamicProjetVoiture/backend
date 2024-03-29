const sql = require('./db.js');

// constructor
const Customer = function (customer) {
  this.id_user = customer.id_user;
  this.lastname = customer.lastname;
  this.firstname = customer.firstname;
  this.city_code = customer.city_code;
  this.address = customer.address;
  this.phone = customer.phone;
  this.mobile = customer.mobile;
  this.email = customer.email;
  this.created_at = customer.created_at;
};

Customer.create = (newCustomer, result) => {
  newCustomer.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
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
  sql.query('SELECT customer.id AS id_customer, customer.lastname AS lastname_customer, customer.firstname AS firstname_customer, customer.city_code AS city_code_customer, customer.address AS address_customer, customer.phone AS phone_customer, customer.mobile AS mobile_customer, customer.email AS email_customer, customer.created_at AS created_at_customer, '+
  'user.id AS user_id, user.lastname AS user_lastname, user.firstname AS user_firstname, user.email AS user_email, user.password AS user_password, user.is_activated AS user_is_activated, type_user.id AS id_type_user, type_user.name AS name_type_user '+
  'FROM customer '+
  'LEFT JOIN user ON customer.id_user = user.id '+
  'LEFT JOIN type_user ON user.id_type_user = type_user.id '+
   `WHERE customer.id = ${customerId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      setCustomer(res);
      console.log('found customer: ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found customer with the id
    result({ kind: 'not_found' }, null);
  });
};

Customer.getAll = (result) => {
  sql.query('SELECT customer.id AS id_customer, customer.lastname AS lastname_customer, customer.firstname AS firstname_customer, customer.city_code AS city_code_customer, customer.address AS address_customer, customer.phone AS phone_customer, customer.mobile AS mobile_customer, customer.email AS email_customer, customer.created_at AS created_at_customer, '+
  'user.id AS user_id, user.lastname AS user_lastname, user.firstname AS user_firstname, user.email AS user_email, user.password AS user_password, user.is_activated AS user_is_activated, type_user.id AS id_type_user, type_user.name AS name_type_user '+
  'FROM customer '+
  'LEFT JOIN user ON customer.id_user = user.id '+
  'LEFT JOIN type_user ON user.id_type_user = type_user.id', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    setCustomer(res);
    // console.log('customer: ', res);
    result(null, res);
  });
};

Customer.updateById = (id, customer, result) => {
  sql.query(
    'UPDATE customer SET id_user = ?, lastname = ?, firstname = ?, city_code = ?, address = ?, phone = ?, mobile = ?,  created_at = ? WHERE id = ?',
    [
      customer.id_user,
      customer.lastname,
      customer.firstname,
      customer.city_code,
      customer.address,
      customer.phone,
      customer.mobile,
      customer.created_at,
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
function setCustomer(res) {
  res.forEach((obj, index) => {
    const typeUser = { id: obj.id_type_user, name: obj.name_type_user };

    const userG = {
      id: obj.user_id,
      type_user: typeUser,
      lastname: obj.user_lastname,
      firstname: obj.user_firstname,
      email: obj.user_email,
      password: obj.user_password,
      is_activated: obj.user_is_activated
    };

    const customerG = {
      id: obj.id_customer,
      user: userG,
      lastname: obj.lastname_customer,
      firstname: obj.firstname_customer,
      city_code: obj.city_code_customer,
      address: obj.address_customer,
      phone: obj.phone_customer,
      mobile: obj.mobile_customer,
      email: obj.email_customer,
      created_at: obj.created_at_customer
    };
    res[index] = customerG;
  });
}

