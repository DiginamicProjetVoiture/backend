const sql = require('./db.js');

// constructor
const Bill = function (bill) {
  this.id_order = bill.id_order;
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
  sql.query(`SELECT `+
  `bill.id AS id_bill, `+
  `bill.id_order AS id_order_bill, `+
  `bill.creation_date AS creation_date_bill, `+
  `bill.price_duty_free AS price_duty_free_bill, `+
  `bill.tva_amount AS tva_amount_bill, `+
  `command_order_bill.id_command_order, `+
  `command_order_bill.id_quotation_command_order, `+
  `command_order_bill.id_priority_command_order, `+
  `command_order_bill.closure_date_command_order, `+
  `command_order_bill.is_delivered_command_order, `+
  `command_order_bill.id_quotation, `+
  `command_order_bill.id_vehicle_quotation, `+
  `command_order_bill.id_customer_quotation, `+
  `command_order_bill.is_validquotation, `+
  `command_order_bill.date_creation_quotation, `+
  `command_order_bill.id_user_quotation, `+
  `command_order_bill.id_user, `+
  `command_order_bill.id_type_user_user, `+
  `command_order_bill.lastname_user, `+
  `command_order_bill.fristname_user, `+
  `command_order_bill.email_user, `+
  `command_order_bill.password_user, `+
  `command_order_bill.is_activated_user, `+
  `command_order_bill.id_vehicle, `+
  `command_order_bill.price_vehicle, `+
  `command_order_bill.name_vehicle, `+
  `command_order_bill.brand_vehicle, `+
  `command_order_bill.id_customer, `+
  `command_order_bill.id_user_customer, `+
  `command_order_bill.lastname_customer, `+
  `command_order_bill.firstname_customer, `+
  `command_order_bill.city_code_customer, `+
  `command_order_bill.phone_customer, `+
  `command_order_bill.mobile_customer, `+
  `command_order_bill.email_customer, `+
  `command_order_bill.creation_date_customer, `+
  `command_order_bill.id_user_custo, `+
  `command_order_bill.id_type_user_user_custo, `+
  `command_order_bill.lastname_user_custo, `+
  `command_order_bill.fristname_user_custo, `+
  `command_order_bill.email_user_custo, `+
  `command_order_bill.password_user_custo, `+
  `command_order_bill.is_activated_user_custo, `+
  `command_order_bill.id_type_user, `+
  `command_order_bill.name_type_user `+
`FROM `+
  `bill `+
`LEFT JOIN( `+
  `SELECT `+
      `command_order.id AS id_command_order, `+
      `command_order.id_quotation AS id_quotation_command_order, `+
      `command_order.id_priority AS id_priority_command_order, `+
      `command_order.closure_date AS closure_date_command_order, `+
      `command_order.is_delivered AS is_delivered_command_order, `+
      `quotation_command_order.id_quotation, `+
      `quotation_command_order.id_vehicle_quotation, `+
      `quotation_command_order.id_customer_quotation, `+
      `quotation_command_order.is_validquotation, `+
      `quotation_command_order.date_creation_quotation, `+
      `quotation_command_order.id_user_quotation, `+
      `quotation_command_order.id_user, `+
      `quotation_command_order.id_type_user_user, `+
      `quotation_command_order.lastname_user, `+
      `quotation_command_order.fristname_user, `+
      `quotation_command_order.email_user, `+
      `quotation_command_order.password_user, `+
      `quotation_command_order.is_activated_user, `+
      `quotation_command_order.id_vehicle, `+
      `quotation_command_order.price_vehicle, `+
      `quotation_command_order.name_vehicle, `+
      `quotation_command_order.brand_vehicle, `+
      `quotation_command_order.id_customer, `+
      `quotation_command_order.id_user_customer, `+
      `quotation_command_order.lastname_customer, `+
      `quotation_command_order.firstname_customer, `+
      `quotation_command_order.city_code_customer, `+
      `quotation_command_order.phone_customer, `+
      `quotation_command_order.mobile_customer, `+
      `quotation_command_order.email_customer, `+
      `quotation_command_order.creation_date_customer, `+
      `quotation_command_order.id_user_custo, `+
      `quotation_command_order.id_type_user_user_custo, `+
      `quotation_command_order.lastname_user_custo, `+
      `quotation_command_order.fristname_user_custo, `+
      `quotation_command_order.email_user_custo, `+
      `quotation_command_order.password_user_custo, `+
      `quotation_command_order.is_activated_user_custo, `+
      `quotation_command_order.id_type_user, `+
      `quotation_command_order.name_type_user `+
  `FROM `+
      `command_order `+
  `LEFT JOIN( `+
      `SELECT DISTINCT `+
          `quotation.id AS id_quotation, `+
          `quotation.id_vehicle AS id_vehicle_quotation, `+
          `quotation.id_customer AS id_customer_quotation, `+
          `quotation.is_valid AS is_validquotation, `+
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
          `user_custo.id_user_custo, `+
          `user_custo.id_type_user_user_custo, `+
          `user_custo.lastname_user_custo, `+
          `user_custo.fristname_user_custo, `+
          `user_custo.email_user_custo, `+
          `user_custo.password_user_custo, `+
          `user_custo.is_activated_user_custo, `+
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
  `) quotation_command_order `+
`ON `+
  `quotation_command_order.id_quotation = command_order.id_quotation `+
  
  `LEFT JOIN priority ON priority.id = command_order.id_priority `+
`) command_order_bill `+
`ON `+
  `command_order_bill.id_command_order = bill.id_order `+
  `WHERE id = ${billId}`, (err, res) => {
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
  sql.query('SELECT '+
  'bill.id, '+
  'bill.id_order, '+
  'bill.creation_date, '+
  'bill.price_duty_free, '+
  'bill.tva_amount, '+
  'command_order_bill.id_command_order, '+
  'command_order_bill.id_quotation_command_order, '+
  'command_order_bill.id_priority_command_order, '+
  'command_order_bill.closure_date_command_order, '+
  'command_order_bill.is_delivered_command_order, '+
  'command_order_bill.id_quotation, '+
  'command_order_bill.id_vehicle_quotation, '+
  'command_order_bill.id_customer_quotation, '+
  'command_order_bill.is_validquotation, '+
  'command_order_bill.date_creation_quotation, '+
  'command_order_bill.id_user_quotation, '+
  'command_order_bill.id_user, '+
  'command_order_bill.id_type_user_user, '+
  'command_order_bill.lastname_user, '+
  'command_order_bill.fristname_user, '+
  'command_order_bill.email_user, '+
  'command_order_bill.password_user, '+
  'command_order_bill.is_activated_user, '+
  'command_order_bill.id_vehicle, '+
  'command_order_bill.price_vehicle, '+
  'command_order_bill.name_vehicle, '+
  'command_order_bill.brand_vehicle, '+
  'command_order_bill.id_customer, '+
  'command_order_bill.id_user_customer, '+
  'command_order_bill.lastname_customer, '+
  'command_order_bill.firstname_customer, '+
  'command_order_bill.city_code_customer, '+
  'command_order_bill.phone_customer, '+
  'command_order_bill.mobile_customer, '+
  'command_order_bill.email_customer, '+
  'command_order_bill.creation_date_customer, '+
  'command_order_bill.id_user_custo, '+
  'command_order_bill.id_type_user_user_custo, '+
  'command_order_bill.lastname_user_custo, '+
  'command_order_bill.fristname_user_custo, '+
  'command_order_bill.email_user_custo, '+
  'command_order_bill.password_user_custo, '+
  'command_order_bill.is_activated_user_custo, '+
  'command_order_bill.id_type_user, '+
  'command_order_bill.name_type_user '+
'FROM '+
  'bill '+
'LEFT JOIN( '+
  'SELECT '+
      'command_order.id AS id_command_order, '+
      'command_order.id_quotation AS id_quotation_command_order, '+
      'command_order.id_priority AS id_priority_command_order, '+
      'command_order.closure_date AS closure_date_command_order, '+
      'command_order.is_delivered AS is_delivered_command_order, '+
      'quotation_command_order.id_quotation, '+
      'quotation_command_order.id_vehicle_quotation, '+
      'quotation_command_order.id_customer_quotation, '+
      'quotation_command_order.is_validquotation, '+
      'quotation_command_order.date_creation_quotation, '+
      'quotation_command_order.id_user_quotation, '+
      'quotation_command_order.id_user, '+
      'quotation_command_order.id_type_user_user, '+
      'quotation_command_order.lastname_user, '+
      'quotation_command_order.fristname_user, '+
      'quotation_command_order.email_user, '+
      'quotation_command_order.password_user, '+
      'quotation_command_order.is_activated_user, '+
      'quotation_command_order.id_vehicle, '+
      'quotation_command_order.price_vehicle, '+
      'quotation_command_order.name_vehicle, '+
      'quotation_command_order.brand_vehicle, '+
      'quotation_command_order.id_customer, '+
      'quotation_command_order.id_user_customer, '+
      'quotation_command_order.lastname_customer, '+
      'quotation_command_order.firstname_customer, '+
      'quotation_command_order.city_code_customer, '+
      'quotation_command_order.phone_customer, '+
      'quotation_command_order.mobile_customer, '+
      'quotation_command_order.email_customer, '+
      'quotation_command_order.creation_date_customer, '+
      'quotation_command_order.id_user_custo, '+
      'quotation_command_order.id_type_user_user_custo, '+
      'quotation_command_order.lastname_user_custo, '+
      'quotation_command_order.fristname_user_custo, '+
      'quotation_command_order.email_user_custo, '+
      'quotation_command_order.password_user_custo, '+
      'quotation_command_order.is_activated_user_custo, '+
      'quotation_command_order.id_type_user, '+
      'quotation_command_order.name_type_user '+
  'FROM '+
      'command_order '+
  'LEFT JOIN( '+
      'SELECT DISTINCT '+
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
  'LEFT JOIN type_user ON type_user.id = user_custo.id_type_user_user_custo '+
  ') quotation_command_order '+
'ON '+
  'quotation_command_order.id_quotation = command_order.id_quotation '+
') command_order_bill '+
'ON '+
  `command_order_bill.id_command_order = bill.id_order`, (err, res) => {
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
