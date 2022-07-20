const sql = require('./db.js');

// constructor
const Quotation = function (quotation) {
  this.id_user = quotation.id_user;
  this.id_vehicle = quotation.id_vehicle;
  this.id_customer = quotation.id_customer;
  this.is_valid = quotation.is_valid;
  this.created_at = quotation.created_at;
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
  sql.query(
    'SELECT DISTINCT ' +
      'quotation.id AS id_quotation, ' +
      'quotation.id_vehicle AS id_vehicle_quotation, ' +
      'quotation.id_customer AS id_customer_quotation, ' +
      'quotation.is_valid AS is_validquotation, ' +
      'quotation.created_at AS created_at_quotation, ' +
      'quotation.id_user AS id_user_quotation, ' +
      'USER.id AS id_user, ' +
      'USER.lastname AS lastname_user, ' +
      'USER.firstname AS firstname_user, ' +
      'USER.email AS email_user, ' +
      'USER.password AS password_user, ' +
      'USER.is_activated AS is_activated_user, ' +
      'type_user.id id_type_user_user, ' +
      'type_user.name AS name_type_user_user, ' +
      'vehicle.id AS id_vehicle, ' +
      'vehicle.price AS price_vehicle, ' +
      'vehicle.name AS name_vehicle, ' +
      'vehicle.brand AS brand_vehicle, ' +
      'customer.id AS id_customer, ' +
      'customer.id_user AS id_user_customer, ' +
      'customer.lastname AS lastname_customer, ' +
      'customer.firstname AS firstname_customer, ' +
      'customer.city_code AS city_code_customer, ' +
      'customer.address AS address_customer, ' +
      'customer.phone AS phone_customer, ' +
      'customer.mobile AS mobile_customer, ' +
      'customer.email AS email_customer, ' +
      'customer.created_at AS created_at_customer, ' +
      'user_custo.id_user_custo, ' +
      'user_custo.lastname_user_custo, ' +
      'user_custo.firstname_user_custo, ' +
      'user_custo.email_user_custo, ' +
      'user_custo.password_user_custo, ' +
      'user_custo.is_activated_user_custo, ' +
      'user_custo.id_type_user_user_custo , ' +
      'user_custo.name_type_user_user_custo ' +
      'FROM ' +
      'quotation ' +
      'LEFT JOIN USER ON quotation.id_user = USER.id ' +
      'LEFT JOIN vehicle ON quotation.id_vehicle = vehicle.id ' +
      'LEFT JOIN customer ON quotation.id_customer = customer.id ' +
      'LEFT JOIN( ' +
      'SELECT ' +
      'USER.id AS id_user_custo, ' +
      'USER.lastname AS lastname_user_custo, ' +
      'USER.firstname AS firstname_user_custo, ' +
      'USER.email AS email_user_custo, ' +
      'USER.password AS password_user_custo, ' +
      'USER.is_activated AS is_activated_user_custo, ' +
      'type_user.id AS id_type_user_user_custo, ' +
      'type_user.name AS name_type_user_user_custo ' +
      'FROM ' +
      'USER, ' +
      'customer, ' +
      'type_user  ' +
      'WHERE ' +
      'USER.id = customer.id_user  ' +
      'AND type_user.id = USER.id_type_user ' +
      ') user_custo ' +
      'ON ' +
      'user_custo.id_user_custo = customer.id_user ' +
      'LEFT JOIN type_user ON type_user.id = user.id_type_user ' +
      `WHERE quotation.id = ${quotationId}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log('found quotation: ', res[0]);
        setQuotation(res)
        result(null, res[0]);
        return;
      }
      // not found Quotation with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

Quotation.getAll = (result) => {
  sql.query(
    'SELECT DISTINCT ' +
      'quotation.id AS id_quotation, ' +
      'quotation.id_vehicle AS id_vehicle_quotation, ' +
      'quotation.id_customer AS id_customer_quotation, ' +
      'quotation.is_valid AS is_validquotation, ' +
      'quotation.created_at AS created_at_quotation, ' +
      'quotation.id_user AS id_user_quotation, ' +
      'USER.id AS id_user, ' +
      'USER.lastname AS lastname_user, ' +
      'USER.firstname AS firstname_user, ' +
      'USER.email AS email_user, ' +
      'USER.password AS password_user, ' +
      'USER.is_activated AS is_activated_user, ' +
      'type_user.id AS id_type_user_user, ' +
      'type_user.name AS name_type_user_user, ' +
      'vehicle.id AS id_vehicle, ' +
      'vehicle.price AS price_vehicle, ' +
      'vehicle.name AS name_vehicle, ' +
      'vehicle.brand AS brand_vehicle, ' +
      'customer.id AS id_customer, ' +
      'customer.id_user AS id_user_customer, ' +
      'customer.lastname AS lastname_customer, ' +
      'customer.firstname AS firstname_customer, ' +
      'customer.city_code AS city_code_customer, ' +
      'customer.address AS address_customer, ' +
      'customer.phone AS phone_customer, ' +
      'customer.mobile AS mobile_customer, ' +
      'customer.email AS email_customer, ' +
      'customer.created_at AS created_at_customer, ' +
      'user_custo.id_user_custo, ' +
      'user_custo.lastname_user_custo, ' +
      'user_custo.firstname_user_custo, ' +
      'user_custo.email_user_custo, ' +
      'user_custo.password_user_custo, ' +
      'user_custo.is_activated_user_custo, ' +
      'user_custo.id_type_user_user_custo , ' +
      'user_custo.name_type_user_user_custo ' +
    'FROM ' +
        'quotation ' +
    'LEFT JOIN USER ON quotation.id_user = USER.id ' +
    'LEFT JOIN vehicle ON quotation.id_vehicle = vehicle.id ' +
    'LEFT JOIN customer ON quotation.id_customer = customer.id ' +
    'LEFT JOIN( ' +
      'SELECT ' +
        'USER.id AS id_user_custo, ' +
        'USER.lastname AS lastname_user_custo, ' +
        'USER.firstname AS firstname_user_custo, ' +
        'USER.email AS email_user_custo, ' +
        'USER.password AS password_user_custo, ' +
        'USER.is_activated AS is_activated_user_custo, ' +
        'type_user.id AS id_type_user_user_custo, ' +
        'type_user.name AS name_type_user_user_custo ' +
        'FROM ' +
          'USER, ' +
          'customer, ' +
          'type_user  ' +
        'WHERE ' +
          'USER.id = customer.id_user  ' +
          'AND type_user.id = USER.id_type_user ' +
      ') user_custo ' +
      'ON ' +
      'user_custo.id_user_custo = customer.id_user ' +
    'LEFT JOIN type_user ON type_user.id = user.id_type_user',
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      setQuotation(res);

      console.log('quotation: ', res);
      result(null, res);
    }
  );
};

Quotation.updateById = (id, quotation, result) => {
  sql.query(
    'UPDATE quotation SET id_user = ?, id_vehicle = ?, id_customer = ?, is_valid = ?, created_at = ? WHERE quotation.id = ?',
    [
      quotation.id_user,
      quotation.id_vehicle,
      quotation.id_customer,
      quotation.is_valid,
      quotation.created_at,
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



function setQuotation(res) {
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
    res[index] = quotation;
  });
}

