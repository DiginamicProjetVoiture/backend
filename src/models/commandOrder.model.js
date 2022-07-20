const sql = require('./db.js');

// constructor
const CommandOrder = function (commandOrder) {
  this.id_quotation = commandOrder.id_quotation;
  this.id_priority = commandOrder.id_priority;
  this.closed_at = commandOrder.closed_at;
  this.is_delivered = commandOrder.is_delivered;
};

CommandOrder.create = (newCommandOrder, result) => {
  sql.query('INSERT INTO command_order SET ?', newCommandOrder, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created commandOrder: ', { id: res.insertId, ...newCommandOrder });
    result(null, { id: res.insertId, ...newCommandOrder });
  });
};

CommandOrder.findById = (commandOrderId, result) => {
  sql.query(
`SELECT ` +
  `command_order.id AS id_command_order, ` +
  `command_order.id_quotation AS id_quotation_command_order, ` +
  `command_order.id_priority AS id_priority_command_order, ` +
  `command_order.closed_at AS closed_at_command_order, ` +
  `command_order.is_delivered AS is_delivered_command_order, ` +
  'priority.id AS id_priority, ' +
  'priority.name AS name_priority, ' +  
  `quotation_command_order.id_quotation, ` +
  `quotation_command_order.id_vehicle_quotation, ` +
  `quotation_command_order.id_customer_quotation, ` + 
  `quotation_command_order.is_validquotation, ` +
  `quotation_command_order.created_at_quotation, ` +
  `quotation_command_order.id_user_quotation, ` +
  `quotation_command_order.id_user, ` +
  // `quotation_command_order.id_type_user_user, ` +
  `quotation_command_order.lastname_user, ` +
  `quotation_command_order.firstname_user, ` +
  `quotation_command_order.email_user, ` +
  `quotation_command_order.password_user, ` +
  `quotation_command_order.is_activated_user, ` +
  `quotation_command_order.id_type_user_user, ` +
  `quotation_command_order.name_type_user_user, ` +
  `quotation_command_order.id_vehicle, ` +
  `quotation_command_order.price_vehicle, ` +
  `quotation_command_order.name_vehicle, ` +
  `quotation_command_order.brand_vehicle, ` +
  `quotation_command_order.id_customer, ` +
  `quotation_command_order.id_user_customer, ` +
  `quotation_command_order.lastname_customer, ` +
  `quotation_command_order.firstname_customer, ` +
  `quotation_command_order.city_code_customer, ` +
  `quotation_command_order.address_customer, ` +
  `quotation_command_order.phone_customer, ` +
  `quotation_command_order.mobile_customer, ` +
  `quotation_command_order.email_customer, ` +
  `quotation_command_order.created_at_customer, ` +
  `quotation_command_order.id_user_custo, ` +
  `quotation_command_order.id_type_user_user_custo, ` +
  `quotation_command_order.lastname_user_custo, ` +
  `quotation_command_order.firstname_user_custo, ` +
  `quotation_command_order.email_user_custo, ` +
  `quotation_command_order.password_user_custo, ` +
  `quotation_command_order.is_activated_user_custo, ` +
  `quotation_command_order.id_type_user_user_custo, ` +
  `quotation_command_order.name_type_user_user_custo ` +
`FROM ` +
  `command_order ` +
`LEFT JOIN( ` +
  `SELECT DISTINCT ` +
      `quotation.id AS id_quotation, ` +
      `quotation.id_vehicle AS id_vehicle_quotation, ` +
      `quotation.id_customer AS id_customer_quotation, ` +
      `quotation.is_valid AS is_validquotation, ` +
      `quotation.created_at AS created_at_quotation, ` +
      `quotation.id_user AS id_user_quotation, ` +
      `USER.id AS id_user, ` +
      // `USER.id_type_user AS id_type_user_user, ` +
      `USER.lastname AS lastname_user, ` +
      `USER.firstname AS firstname_user, ` +
      `USER.email AS email_user, ` +
      `USER.password AS password_user, ` +
      `USER.is_activated AS is_activated_user, ` +
      'type_user.id id_type_user_user, ' +
      'type_user.name AS name_type_user_user, ' +
      `vehicle.id AS id_vehicle, ` +
      `vehicle.price AS price_vehicle, ` +
      `vehicle.name AS name_vehicle, ` +
      `vehicle.brand AS brand_vehicle, ` +
      `customer.id AS id_customer, ` +
      `customer.id_user AS id_user_customer, ` +
      `customer.lastname AS lastname_customer, ` +
      `customer.firstname AS firstname_customer, ` +
      `customer.city_code AS city_code_customer, ` +
      `customer.address AS address_customer, ` +
      `customer.phone AS phone_customer, ` +
      `customer.mobile AS mobile_customer, ` +
      `customer.email AS email_customer, ` +
      `customer.created_at AS created_at_customer, ` +
      `user_custo.id_user_custo, ` +
      `user_custo.lastname_user_custo, ` +
      `user_custo.firstname_user_custo, ` +
      `user_custo.email_user_custo, ` +
      `user_custo.password_user_custo, ` +
      `user_custo.is_activated_user_custo, ` +
      'user_custo.id_type_user_user_custo , ' +
      'user_custo.name_type_user_user_custo ' +
  `FROM ` +
      `quotation ` +
  `LEFT JOIN USER ON quotation.id_user = USER.id ` +
  `LEFT JOIN vehicle ON quotation.id_vehicle = vehicle.id ` +
  `LEFT JOIN customer ON quotation.id_customer = customer.id ` +
  `LEFT JOIN( ` +
      `SELECT ` +
          `USER.id AS id_user_custo, ` +
          // `USER.id_type_user AS id_type_user_user_custo, ` +
          `USER.lastname AS lastname_user_custo, ` +
          `USER.firstname AS firstname_user_custo, ` +
          `USER.email AS email_user_custo, ` +
          `USER.password AS password_user_custo, ` +
          `USER.is_activated AS is_activated_user_custo, ` +
          'type_user.id AS id_type_user_user_custo, ' +
          'type_user.name AS name_type_user_user_custo ' +
      `FROM ` +
          `USER, ` +
          `customer, ` +
          'type_user  ' +
      `WHERE ` +
          `USER.id = customer.id_user ` +
          'AND type_user.id = USER.id_type_user ' +
  `) user_custo ` +
`ON ` +
  `user_custo.id_user_custo = customer.id_user ` +
`LEFT JOIN type_user ON type_user.id = user_custo.id_type_user_user_custo ` +
`) quotation_command_order ` +
`ON ` +
  `quotation_command_order.id_quotation = command_order.id_quotation ` +
  `LEFT JOIN priority ON priority.id = command_order.id_priority `+
  `WHERE command_order.id = ${commandOrderId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      setCommandOrder(res);
      console.log('found commandOrder: ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found CommandOrder with the id
    result({ kind: 'not_found' }, null);
  });
};

CommandOrder.getAll = (result) => {
  sql.query(`SELECT ` +
  `command_order.id AS id_command_order, ` +
  `command_order.id_quotation AS id_quotation_command_order, ` +
  `command_order.id_priority AS id_priority_command_order, ` +
  `command_order.closed_at AS closed_at_command_order, ` +
  `command_order.is_delivered AS is_delivered_command_order, ` +
  'priority.id AS id_priority, ' +
  'priority.name AS name_priority, ' +  
  `quotation_command_order.id_quotation, ` +
  `quotation_command_order.id_vehicle_quotation, ` +
  `quotation_command_order.id_customer_quotation, ` + 
  `quotation_command_order.is_validquotation, ` +
  `quotation_command_order.created_at_quotation, ` +
  `quotation_command_order.id_user_quotation, ` +
  `quotation_command_order.id_user, ` +
  // `quotation_command_order.id_type_user_user, ` +
  `quotation_command_order.lastname_user, ` +
  `quotation_command_order.firstname_user, ` +
  `quotation_command_order.email_user, ` +
  `quotation_command_order.password_user, ` +
  `quotation_command_order.is_activated_user, ` +
  `quotation_command_order.id_type_user_user, ` +
  `quotation_command_order.name_type_user_user, ` +
  `quotation_command_order.id_vehicle, ` +
  `quotation_command_order.price_vehicle, ` +
  `quotation_command_order.name_vehicle, ` +
  `quotation_command_order.brand_vehicle, ` +
  `quotation_command_order.id_customer, ` +
  `quotation_command_order.id_user_customer, ` +
  `quotation_command_order.lastname_customer, ` +
  `quotation_command_order.firstname_customer, ` +
  `quotation_command_order.city_code_customer, ` +
  `quotation_command_order.address_customer, ` +
  `quotation_command_order.phone_customer, ` +
  `quotation_command_order.mobile_customer, ` +
  `quotation_command_order.email_customer, ` +
  `quotation_command_order.created_at_customer, ` +
  `quotation_command_order.id_user_custo, ` +
  `quotation_command_order.id_type_user_user_custo, ` +
  `quotation_command_order.lastname_user_custo, ` +
  `quotation_command_order.firstname_user_custo, ` +
  `quotation_command_order.email_user_custo, ` +
  `quotation_command_order.password_user_custo, ` +
  `quotation_command_order.is_activated_user_custo, ` +
  `quotation_command_order.id_type_user_user_custo, ` +
  `quotation_command_order.name_type_user_user_custo ` +
`FROM ` +
  `command_order ` +
`LEFT JOIN( ` +
  `SELECT DISTINCT ` +
      `quotation.id AS id_quotation, ` +
      `quotation.id_vehicle AS id_vehicle_quotation, ` +
      `quotation.id_customer AS id_customer_quotation, ` +
      `quotation.is_valid AS is_validquotation, ` +
      `quotation.created_at AS created_at_quotation, ` +
      `quotation.id_user AS id_user_quotation, ` +
      `USER.id AS id_user, ` +
      // `USER.id_type_user AS id_type_user_user, ` +
      `USER.lastname AS lastname_user, ` +
      `USER.firstname AS firstname_user, ` +
      `USER.email AS email_user, ` +
      `USER.password AS password_user, ` +
      `USER.is_activated AS is_activated_user, ` +
      'type_user.id id_type_user_user, ' +
      'type_user.name AS name_type_user_user, ' +
      `vehicle.id AS id_vehicle, ` +
      `vehicle.price AS price_vehicle, ` +
      `vehicle.name AS name_vehicle, ` +
      `vehicle.brand AS brand_vehicle, ` +
      `customer.id AS id_customer, ` +
      `customer.id_user AS id_user_customer, ` +
      `customer.lastname AS lastname_customer, ` +
      `customer.firstname AS firstname_customer, ` +
      `customer.city_code AS city_code_customer, ` +
      `customer.address AS address_customer, ` +
      `customer.phone AS phone_customer, ` +
      `customer.mobile AS mobile_customer, ` +
      `customer.email AS email_customer, ` +
      `customer.created_at AS created_at_customer, ` +
      `user_custo.id_user_custo, ` +
      `user_custo.lastname_user_custo, ` +
      `user_custo.firstname_user_custo, ` +
      `user_custo.email_user_custo, ` +
      `user_custo.password_user_custo, ` +
      `user_custo.is_activated_user_custo, ` +
      'user_custo.id_type_user_user_custo , ' +
      'user_custo.name_type_user_user_custo ' +
  `FROM ` +
      `quotation ` +
  `LEFT JOIN USER ON quotation.id_user = USER.id ` +
  `LEFT JOIN vehicle ON quotation.id_vehicle = vehicle.id ` +
  `LEFT JOIN customer ON quotation.id_customer = customer.id ` +
  `LEFT JOIN( ` +
      `SELECT ` +
          `USER.id AS id_user_custo, ` +
          // `USER.id_type_user AS id_type_user_user_custo, ` +
          `USER.lastname AS lastname_user_custo, ` +
          `USER.firstname AS firstname_user_custo, ` +
          `USER.email AS email_user_custo, ` +
          `USER.password AS password_user_custo, ` +
          `USER.is_activated AS is_activated_user_custo, ` +
          'type_user.id AS id_type_user_user_custo, ' +
          'type_user.name AS name_type_user_user_custo ' +
      `FROM ` +
          `USER, ` +
          `customer, ` +
          'type_user  ' +
      `WHERE ` +
          `USER.id = customer.id_user ` +
          'AND type_user.id = USER.id_type_user ' +
  `) user_custo ` +
`ON ` +
  `user_custo.id_user_custo = customer.id_user ` +
`LEFT JOIN type_user ON type_user.id = user_custo.id_type_user_user_custo ` +
`) quotation_command_order ` +
`ON ` +
  `quotation_command_order.id_quotation = command_order.id_quotation ` +
  `LEFT JOIN priority ON priority.id = command_order.id_priority `, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    setCommandOrder(res);
    console.log('commandOrder: ', res);
    result(null, res);
  });
};

CommandOrder.updateById = (id, /*olderCommandOrder,*/ commandOrder, result) => {
// console.log(`olderCommandOrder`,olderCommandOrder);
// console.log(`commandOrder`,commandOrder);
//   if(olderCommandOrder.is_delivered == 0 && commandOrder.is_delivered == 1){
//     console.log(`is_delivered `, "changed");
//     // commandOrder.closed_at = new Date().toISOString().slice(0, 19).replace('T', ' '); 
//   }
  sql.query(
    'UPDATE command_order SET id_quotation = ?, id_priority = ?, closed_at = ?, is_delivered = ? WHERE id = ?',
    [
      commandOrder.id_quotation,
      commandOrder.id_priority,
      commandOrder.closed_at,
      commandOrder.is_delivered,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found commandOrder with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated commandOrder: ', { id: id, ...commandOrder });
      result(null, { id: id, ...commandOrder });
    }
  );
};

CommandOrder.remove = (id, result) => {
  sql.query('DELETE FROM commandOrder WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found commandOrder with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted commandOrder with id: ', id);
    result(null, res);
  });
};

CommandOrder.removeAll = (result) => {
  sql.query('DELETE FROM commandOrder', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} commandOrder`);
    result(null, res);
  });
};
module.exports = CommandOrder;


function setCommandOrder(res) {
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

    const vehicule = {
      id: obj.id_vehicle,
      price: obj.price_vehicle,
      name: obj.name_vehicle,
      brand: obj.brand_vehicle,
    };

    const quotation = {
      id: obj.id_quotation,
      user: userCustomerQuotation,
      vehicule: vehicule,
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
      is_delivered : obj.is_delivered_command_order
    };

    res[index] = commandOrder;
  });
}
