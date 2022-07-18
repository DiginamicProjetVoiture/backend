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
  sql.query(`SELECT DISTINCT `+
  `quotation.id AS id_quotation, `+
  `quotation.id_vehicle AS id_vehicle_quotation, `+
  `quotation.id_customer AS id_customer_quotation, `+
  `quotation.is_valid AS _is_validquotation, `+
  `quotation.date_creation AS date_creation_quotation, `+
  `quotation.id_user AS id_user_quotation, `+
  `USER.id AS id_user, `+
  `USER.id_type_user AS id_type_user_user, `+
  `USER.lastname AS lastname_user, `+
  `USER.firstname AS fristname_user, `+
  `USER.email AS email_user, `+
  `USER.password AS password_user, `+
  `USER.is_activated AS is_activated_user, `+
  `vehicle.id AS id_vehicle, `+
  `vehicle.price AS price_vehicle, `+
  `vehicle.name AS name_vehicle, `+
  `vehicle.brand AS brand_vehicle, `+
  `customer.id AS id_customer, `+
  `customer.id_user AS id_user_customer, `+
  `customer.lastname AS lastname_customer, `+
  `customer.firstname AS firstname_customer, `+
  `customer.city_code AS city_code_customer, `+
  `customer.phone AS phone_customer, `+
  `customer.mobile AS mobile_customer, `+
  `customer.email AS email_customer, `+
  `customer.creation_date AS creation_date_customer, `+
  `type_user.id AS id_type_user, `+
  `type_user.name AS name_type_user `+
`FROM `+
  `quotation `+
`LEFT JOIN USER ON quotation.id_user = USER.id `+
`LEFT JOIN vehicle ON quotation.id_vehicle = vehicle.id `+
`LEFT JOIN customer ON quotation.id_customer = customer.id `+
`LEFT JOIN( `+
  `SELECT `+
      `user_custo.id AS id_user_custo, `+
      `user_custo.id_type_user AS id_type_user_user_custo, `+
      `user_custo.lastname AS lastname_user_custo, `+
      `user_custo.firstname AS fristname_user_custo, `+
      `user_custo.email AS email_user_custo, `+
      `user_custo.password AS password_user_custo, `+
      `user_custo.is_activated AS is_activated_user_custo `+
  `FROM `+
      `USER AS user_custo, `+
      `customer `+
  `WHERE `+
      `user_custo.id = customer.id_user `+
`) user_custo `+
`ON `+
  `user_custo.id_user_custo = customer.id_user `+
  
`LEFT JOIN type_user ON type_user.id = user_custo.id_type_user_user_custo `+
`WHERE quotation.id = ${quotationId}`, (err, res) => {
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
  sql.query('SELECT DISTINCT '+
  'quotation.id AS id_quotation, '+
  'quotation.id_vehicle AS id_vehicle_quotation, '+
  'quotation.id_customer AS id_customer_quotation, '+
  'quotation.is_valid AS is_validquotation, '+
  'quotation.date_creation AS date_creation_quotation, '+
  'quotation.id_user AS id_user_quotation, '+
  'USER.id AS id_user, '+
  'USER.id_type_user AS id_type_user_user, '+
  'USER.lastname AS lastname_user, '+
  'USER.firstname AS fristname_user, '+
  'USER.email AS email_user, '+
  'USER.password AS password_user, '+
  'USER.is_activated AS is_activated_user, '+
  'vehicle.id AS id_vehicle, '+
  'vehicle.price AS price_vehicle, '+
  'vehicle.name AS name_vehicle, '+
  'vehicle.brand AS brand_vehicle, '+
  'customer.id AS id_customer, '+
  'customer.id_user AS id_user_customer, '+
  'customer.lastname AS lastname_customer, '+
  'customer.firstname AS firstname_customer, '+
  'customer.city_code AS city_code_customer, '+
  'customer.phone AS phone_customer, '+
  'customer.mobile AS mobile_customer, '+
  'customer.email AS email_customer, '+
  'customer.creation_date AS creation_date_customer, '+
  'user_custo.id_user_custo, '+
  'user_custo.id_type_user_user_custo, '+
  'user_custo.lastname_user_custo, '+
  'user_custo.fristname_user_custo, '+
  'user_custo.email_user_custo, '+
  'user_custo.password_user_custo, '+
  'user_custo.is_activated_user_custo, '+
  'type_user.id AS id_type_user, '+
  'type_user.name AS name_type_user '+
'FROM '+
  'quotation '+
'LEFT JOIN USER ON quotation.id_user = USER.id '+
'LEFT JOIN vehicle ON quotation.id_vehicle = vehicle.id '+
'LEFT JOIN customer ON quotation.id_customer = customer.id '+
'LEFT JOIN( '+
  'SELECT '+
      'user_custo.id AS id_user_custo, '+
      'user_custo.id_type_user AS id_type_user_user_custo, '+
      'user_custo.lastname AS lastname_user_custo, '+
      'user_custo.firstname AS fristname_user_custo, '+
      'user_custo.email AS email_user_custo, '+
      'user_custo.password AS password_user_custo, '+
      'user_custo.is_activated AS is_activated_user_custo '+
  'FROM '+
      'USER AS user_custo, '+
      'customer '+
  'WHERE '+
      'user_custo.id = customer.id_user '+
') user_custo '+
'ON '+
  'user_custo.id_user_custo = customer.id_user '+
  
'LEFT JOIN type_user ON type_user.id = user_custo.id_type_user_user_custo', (err, res) => {
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
