const sql = require('./db.js');

// constructor
const Bill = function (bill) {
  this.id_command_order = bill.id_command_order;
  this.created_at = bill.created_at;
  this.tva_amount = bill.tva_amount;
};

Bill.create = (newBill, result) => {
  newBill.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
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
  sql.query('SELECT '+
  'bill.id, '+
  'bill.id_command_order, '+
  'bill.created_at, '+
  'bill.tva_amount, '+
  'command_order_bill.id_command_order, '+
  'command_order_bill.id_quotation_command_order, '+
  'command_order_bill.id_priority_command_order, '+
  'command_order_bill.closed_at_command_order, '+
  'command_order_bill.is_delivered_command_order, '+
  'command_order_bill.id_priority, ' +
  'command_order_bill.name_priority, ' +  

  'command_order_bill.id_quotation, '+
  'command_order_bill.id_vehicle_quotation, '+
  'command_order_bill.id_customer_quotation, '+
  'command_order_bill.is_validquotation, '+
  'command_order_bill.created_at_quotation, '+
  'command_order_bill.id_user_quotation, '+
  'command_order_bill.id_user, '+
  'command_order_bill.id_type_user_user, '+
  'command_order_bill.lastname_user, '+
  'command_order_bill.firstname_user, '+
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
  'command_order_bill.address_customer, '+
  'command_order_bill.phone_customer, '+
  'command_order_bill.mobile_customer, '+
  'command_order_bill.email_customer, '+
  'command_order_bill.created_at_customer, '+
  'command_order_bill.id_user_custo, '+
  'command_order_bill.id_type_user_user_custo, '+
  'command_order_bill.lastname_user_custo, '+
  'command_order_bill.firstname_user_custo, '+
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
      'command_order.closed_at AS closed_at_command_order, '+
      'command_order.is_delivered AS is_delivered_command_order, '+
      'priority.id AS id_priority, ' +
      'priority.name AS name_priority, ' +  

      'quotation_command_order.id_quotation, '+
      'quotation_command_order.id_vehicle_quotation, '+
      'quotation_command_order.id_customer_quotation, '+
      'quotation_command_order.is_validquotation, '+
      'quotation_command_order.created_at_quotation, '+
      'quotation_command_order.id_user_quotation, '+
      'quotation_command_order.id_user, '+
      // 'quotation_command_order.id_type_user_user, '+
      'quotation_command_order.lastname_user, '+
      'quotation_command_order.firstname_user, '+
      'quotation_command_order.email_user, '+
      'quotation_command_order.password_user, '+
      'quotation_command_order.is_activated_user, '+
      `quotation_command_order.id_type_user_user, ` +
      `quotation_command_order.name_type_user_user, ` +

      'quotation_command_order.id_vehicle, '+
      'quotation_command_order.price_vehicle, '+
      'quotation_command_order.name_vehicle, '+
      'quotation_command_order.brand_vehicle, '+
      'quotation_command_order.id_customer, '+
      'quotation_command_order.id_user_customer, '+
      'quotation_command_order.lastname_customer, '+
      'quotation_command_order.firstname_customer, '+
      'quotation_command_order.city_code_customer, '+
      'quotation_command_order.address_customer, '+
      'quotation_command_order.phone_customer, '+
      'quotation_command_order.mobile_customer, '+
      'quotation_command_order.email_customer, '+
      'quotation_command_order.created_at_customer, '+
      'quotation_command_order.id_user_custo, '+
      'quotation_command_order.id_type_user_user_custo, '+
      'quotation_command_order.lastname_user_custo, '+
      'quotation_command_order.firstname_user_custo, '+
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
          'quotation.created_at AS created_at_quotation, '+
          'quotation.id_user AS id_user_quotation, '+
          'user.id AS id_user, '+
          // 'user.id_type_user AS id_type_user_user, '+
          'user.lastname AS lastname_user, '+
          'user.firstname AS firstname_user, '+
          'user.email AS email_user, '+
          'user.password AS password_user, '+
          'user.is_activated AS is_activated_user, '+
          'type_user.id id_type_user_user, ' +
          'type_user.name AS name_type_user_user, ' +

          'vehicle.id AS id_vehicle, '+
          'vehicle.price AS price_vehicle, '+
          'vehicle.name AS name_vehicle, '+
          'vehicle.brand AS brand_vehicle, '+
          'customer.id AS id_customer, '+
          'customer.id_user AS id_user_customer, '+
          'customer.lastname AS lastname_customer, '+
          'customer.firstname AS firstname_customer, '+
          'customer.city_code AS city_code_customer, '+
          'customer.address AS address_customer, '+
          'customer.phone AS phone_customer, '+
          'customer.mobile AS mobile_customer, '+
          'customer.email AS email_customer, '+
          'customer.created_at AS created_at_customer, '+
          'user_custo.id_user_custo, '+
          'user_custo.id_type_user_user_custo, '+
          'user_custo.lastname_user_custo, '+
          'user_custo.firstname_user_custo, '+
          'user_custo.email_user_custo, '+
          'user_custo.password_user_custo, '+
          'user_custo.is_activated_user_custo, '+
          'type_user.id AS id_type_user, '+
          'type_user.name AS name_type_user '+
      'FROM '+
          'quotation '+
      'LEFT JOIN user ON quotation.id_user = user.id '+
      'LEFT JOIN vehicle ON quotation.id_vehicle = vehicle.id '+
      'LEFT JOIN customer ON quotation.id_customer = customer.id '+
      'LEFT JOIN( '+
          'SELECT '+
              'user.id AS id_user_custo, '+
              // 'user_custo.id_type_user AS id_type_user_user_custo, '+
              'user.lastname AS lastname_user_custo, '+
              'user.firstname AS firstname_user_custo, '+
              'user.email AS email_user_custo, '+
              'user.password AS password_user_custo, '+
              'user.is_activated AS is_activated_user_custo, '+
              'type_user.id AS id_type_user_user_custo, ' +
              'type_user.name AS name_type_user_user_custo ' +
          'FROM '+
              'user, '+
              'customer, '+
              'type_user  ' +
          'WHERE '+
              'user.id = customer.id_user '+
              'AND type_user.id = user.id_type_user ' +
      ') user_custo '+
  'ON '+
      'user_custo.id_user_custo = customer.id_user '+
  'LEFT JOIN type_user ON type_user.id = user_custo.id_type_user_user_custo '+
  ') quotation_command_order '+
'ON '+
  'quotation_command_order.id_quotation = command_order.id_quotation '+
  `LEFT JOIN priority ON priority.id = command_order.id_priority `+
') command_order_bill '+
'ON '+
  `command_order_bill.id_command_order = bill.id_command_order `+
  `WHERE id = ${billId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      setBill(res);
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
  'bill.id_command_order, '+
  'bill.created_at, '+
  'bill.tva_amount, '+
  'command_order_bill.id_command_order, '+
  'command_order_bill.id_quotation_command_order, '+
  'command_order_bill.id_priority_command_order, '+
  'command_order_bill.closed_at_command_order, '+
  'command_order_bill.is_delivered_command_order, '+
  'command_order_bill.id_priority, ' +
  'command_order_bill.name_priority, ' +  

  'command_order_bill.id_quotation, '+
  'command_order_bill.id_vehicle_quotation, '+
  'command_order_bill.id_customer_quotation, '+
  'command_order_bill.is_validquotation, '+
  'command_order_bill.created_at_quotation, '+
  'command_order_bill.id_user_quotation, '+
  'command_order_bill.id_user, '+
  'command_order_bill.id_type_user_user, '+
  'command_order_bill.lastname_user, '+
  'command_order_bill.firstname_user, '+
  'command_order_bill.email_user, '+
  'command_order_bill.password_user, '+
  'command_order_bill.is_activated_user, '+
  `command_order_bill.id_type_user_user, ` +
  `command_order_bill.name_type_user_user, ` +

  'command_order_bill.id_vehicle, '+
  'command_order_bill.price_vehicle, '+
  'command_order_bill.name_vehicle, '+
  'command_order_bill.brand_vehicle, '+
  'command_order_bill.id_customer, '+
  'command_order_bill.id_user_customer, '+
  'command_order_bill.lastname_customer, '+
  'command_order_bill.firstname_customer, '+
  'command_order_bill.city_code_customer, '+
  'command_order_bill.address_customer, '+
  'command_order_bill.phone_customer, '+
  'command_order_bill.mobile_customer, '+
  'command_order_bill.email_customer, '+
  'command_order_bill.created_at_customer, '+
  'command_order_bill.id_user_custo, '+
  // 'command_order_bill.id_type_user_user_custo, '+
  'command_order_bill.lastname_user_custo, '+
  'command_order_bill.firstname_user_custo, '+
  'command_order_bill.email_user_custo, '+
  'command_order_bill.password_user_custo, '+
  'command_order_bill.is_activated_user_custo, '+
  'command_order_bill.id_type_user_user_custo, '+
  'command_order_bill.name_type_user_user_custo '+
'FROM '+
  'bill '+
'LEFT JOIN( '+
  'SELECT '+
      'command_order.id AS id_command_order, '+
      'command_order.id_quotation AS id_quotation_command_order, '+
      'command_order.id_priority AS id_priority_command_order, '+
      'command_order.closed_at AS closed_at_command_order, '+
      'command_order.is_delivered AS is_delivered_command_order, '+
      'priority.id AS id_priority, ' +
      'priority.name AS name_priority, ' +  
      
      'quotation_command_order.id_quotation, '+
      'quotation_command_order.id_vehicle_quotation, '+
      'quotation_command_order.id_customer_quotation, '+
      'quotation_command_order.is_validquotation, '+
      'quotation_command_order.created_at_quotation, '+
      'quotation_command_order.id_user_quotation, '+
      'quotation_command_order.id_user, '+
      // 'quotation_command_order.id_type_user_user, '+
      'quotation_command_order.lastname_user, '+
      'quotation_command_order.firstname_user, '+
      'quotation_command_order.email_user, '+
      'quotation_command_order.password_user, '+
      'quotation_command_order.is_activated_user, '+
      `quotation_command_order.id_type_user_user, ` +
      `quotation_command_order.name_type_user_user, ` +

      'quotation_command_order.id_vehicle, '+
      'quotation_command_order.price_vehicle, '+
      'quotation_command_order.name_vehicle, '+
      'quotation_command_order.brand_vehicle, '+
      'quotation_command_order.id_customer, '+
      'quotation_command_order.id_user_customer, '+
      'quotation_command_order.lastname_customer, '+
      'quotation_command_order.firstname_customer, '+
      'quotation_command_order.city_code_customer, '+
      'quotation_command_order.address_customer, '+
      'quotation_command_order.phone_customer, '+
      'quotation_command_order.mobile_customer, '+
      'quotation_command_order.email_customer, '+
      'quotation_command_order.created_at_customer, '+
      'quotation_command_order.id_user_custo, '+
      // 'quotation_command_order.id_type_user_user_custo, '+
      'quotation_command_order.lastname_user_custo, '+
      'quotation_command_order.firstname_user_custo, '+
      'quotation_command_order.email_user_custo, '+
      'quotation_command_order.password_user_custo, '+
      'quotation_command_order.is_activated_user_custo, '+
      'quotation_command_order.id_type_user_user_custo, '+
      'quotation_command_order.name_type_user_user_custo '+
  'FROM '+
      'command_order '+
  'LEFT JOIN( '+
      'SELECT DISTINCT '+
          'quotation.id AS id_quotation, '+
          'quotation.id_vehicle AS id_vehicle_quotation, '+
          'quotation.id_customer AS id_customer_quotation, '+
          'quotation.is_valid AS is_validquotation, '+
          'quotation.created_at AS created_at_quotation, '+
          'quotation.id_user AS id_user_quotation, '+
          'user.id AS id_user, '+
          // 'user.id_type_user AS id_type_user_user, '+
          'user.lastname AS lastname_user, '+
          'user.firstname AS firstname_user, '+
          'user.email AS email_user, '+
          'user.password AS password_user, '+
          'user.is_activated AS is_activated_user, '+
          'type_user.id id_type_user_user, ' +
          'type_user.name AS name_type_user_user, ' +

          'vehicle.id AS id_vehicle, '+
          'vehicle.price AS price_vehicle, '+
          'vehicle.name AS name_vehicle, '+
          'vehicle.brand AS brand_vehicle, '+
          'customer.id AS id_customer, '+
          'customer.id_user AS id_user_customer, '+
          'customer.lastname AS lastname_customer, '+
          'customer.firstname AS firstname_customer, '+
          'customer.city_code AS city_code_customer, '+
          'customer.address AS address_customer, '+
          'customer.phone AS phone_customer, '+
          'customer.mobile AS mobile_customer, '+
          'customer.email AS email_customer, '+
          'customer.created_at AS created_at_customer, '+
          'user_custo.id_user_custo, '+
          // 'user_custo.id_type_user_user_custo, '+
          'user_custo.lastname_user_custo, '+
          'user_custo.firstname_user_custo, '+
          'user_custo.email_user_custo, '+
          'user_custo.password_user_custo, '+
          'user_custo.is_activated_user_custo, '+
          'user_custo.id_type_user_user_custo, '+
          'user_custo.name_type_user_user_custo '+
      'FROM '+
          'quotation '+
      'LEFT JOIN user ON quotation.id_user = user.id '+
      'LEFT JOIN vehicle ON quotation.id_vehicle = vehicle.id '+
      'LEFT JOIN customer ON quotation.id_customer = customer.id '+
      'LEFT JOIN( '+
          'SELECT '+
              'user.id AS id_user_custo, '+
              // 'user_custo.id_type_user AS id_type_user_user_custo, '+
              'user.lastname AS lastname_user_custo, '+
              'user.firstname AS firstname_user_custo, '+
              'user.email AS email_user_custo, '+
              'user.password AS password_user_custo, '+
              'user.is_activated AS is_activated_user_custo, '+
              'type_user.id AS id_type_user_user_custo, ' +
              'type_user.name AS name_type_user_user_custo ' +
          'FROM '+
              'user, '+
              'customer, '+
              'type_user  ' +
          'WHERE '+
              'user.id = customer.id_user '+
              'AND type_user.id = user.id_type_user ' +
      ') user_custo '+
  'ON '+
      'user_custo.id_user_custo = customer.id_user '+
  'LEFT JOIN type_user ON type_user.id = user_custo.id_type_user_user_custo '+
  ') quotation_command_order '+
'ON '+
  'quotation_command_order.id_quotation = command_order.id_quotation '+
  `LEFT JOIN priority ON priority.id = command_order.id_priority `+
') command_order_bill '+
'ON '+
  `command_order_bill.id_command_order = bill.id_command_order`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    setBill(res);
    // console.log('bill: ', res);
    result(null, res);
  });
};

Bill.updateById = (id, bill, result) => {
  sql.query(
    'UPDATE bill SET id_command_order = ?, created_at = ?, tva_amount = ? WHERE id = ?',
    [bill.id_command_order, bill.created_at, bill.tva_amount, id],
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


function setBill(res) {
  res.forEach((obj, index) => {
    const typeUserCustomer = { id: obj.id_type_user_user_custo, name: obj.name_type_user_user_custo };

    const userCustomerCusto = {
      id: obj.id_user_custo,
      type_user: typeUserCustomer,
      lastname: obj.lastname_user_custo,
      firstname: obj.firstname_user_custo,
      email: obj.email_user_custo,
      password: obj.password_user_custo,
      is_activated: obj.is_activated_user_custo,
    };

    const customerG = {
      id: obj.id_customer,
      user: userCustomerCusto,
      lastname: obj.lastname_customer,
      firstname: obj.firstname_customer,
      city_code: obj.city_code_customer,
      address: obj.address_customer,
      phone: obj.phone_customer,
      mobile: obj.mobile_customer,
      email: obj.email_customer,
      created_at: obj.created_at_customer,
    };


    const typeUserCustomerQuotation = { id: obj.id_type_user_user, name: obj.name_type_user_user };

    const userCustomerQuotation = {
      id: obj.id_user,
      type_user: typeUserCustomerQuotation,
      lastname: obj.lastname_user,
      firstname: obj.firstname_user,
      email: obj.email_user,
      password: obj.password_user,
      is_activated: obj.is_activated_user,
    };

    const vehicle = {
      id: obj.id_vehicle,
      price: obj.price_vehicle,
      name: obj.name_vehicle,
      brand: obj.brand_vehicle,
    };

    const quotation = {
      id: obj.id_quotation,
      user: userCustomerQuotation,
      vehicle: vehicle,
      customer: customerG,
      is_valid: obj.is_validquotation,
      created_at: obj.created_at_quotation
    };


    const priority = {
      id: obj.id_priority,
      name: obj.name_priority
    };

    const commandOrder = {
      id: obj.id_command_order,
      quotation: quotation,
      priority : priority,
      closed_at : obj.closed_at_command_order,
      is_delivred : obj.is_delivered_command_order
    };


    const bill = {
      id: obj.id,
      commandOrder : commandOrder,
      created_at : obj.created_at,
      tva_amount : obj.tva_amount
    };

    res[index] = bill;
  });
}