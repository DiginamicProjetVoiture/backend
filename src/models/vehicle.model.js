const sql = require('./db.js');

// constructor
const Vehicle = function (vehicle) {
  this.price = vehicle.price;
  this.name = vehicle.name;
  this.brand = vehicle.brand;
};

Vehicle.create = (newVehicle, result) => {
  sql.query('INSERT INTO vehicle SET ?', newVehicle, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created vehicle: ', { id: res.insertId, ...newVehicle });
    result(null, { id: res.insertId, ...newVehicle });
  });
};

Vehicle.findById = (vehicleId, result) => {
  sql.query(`SELECT * FROM vehicle WHERE id = ${vehicleId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('found vehicle: ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found vehicle with the id
    result({ kind: 'not_found' }, null);
  });
};

Vehicle.getAll = (result) => {
  sql.query('SELECT * FROM vehicle', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    // console.log('vehicle: ', res);
    result(null, res);
  });
};

Vehicle.updateById = (id, vehicle, result) => {
  sql.query(
    'UPDATE vehicle SET price = ?, name = ?, brand = ? WHERE id = ?',
    [vehicle.price, vehicle.name, vehicle.brand, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found vehicle with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated vehicle: ', { id: id, ...vehicle });
      result(null, { id: id, ...vehicle });
    }
  );
};

Vehicle.remove = (id, result) => {
  sql.query('DELETE FROM vehicle WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found vehicle with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted vehicle with id: ', id);
    result(null, res);
  });
};

Vehicle.removeAll = (result) => {
  sql.query('DELETE FROM vehicle', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} vehicle`);
    result(null, res);
  });
};
module.exports = Vehicle;
