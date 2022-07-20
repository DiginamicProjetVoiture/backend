const sql = require('./db.js');

// constructor
const Stock = function (stock) {
  this.id_vehicle = stock.id_vehicle;
  this.number_stock = stock.number_stock;
  this.updated_at = stock.updated_at;
};

Stock.create = (newStock, result) => {
  sql.query('INSERT INTO stock SET ?', newStock, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created stock: ', { id: res.insertId, ...newStock });
    result(null, { id: res.insertId, ...newStock });
  });
};

Stock.findById = (stockId, result) => {
  sql.query(
    'SELECT stock.id, stock.number_stock, stock.updated_at, ' +
      'vehicle.id AS id_vehicle, vehicle.name AS vehicle_name, vehicle.brand as vehicle_brand ' +
      'FROM stock ' +
      'LEFT JOIN vehicle ON stock.id_vehicle = vehicle.id' +
      ` WHERE stock.id = ${stockId}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log('found stock: ', res[0]);
        setStock(res);
        result(null, res[0]);
        return;
      }
      // not found Stock with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

Stock.getAll = (result) => {
  sql.query(
    'SELECT stock.id, stock.number_stock, stock.updated_at, ' +
      'vehicle.id AS id_vehicle, vehicle.price AS vehicle_price, vehicle.name AS vehicle_name, vehicle.brand as vehicle_brand ' +
      'FROM stock ' +
      'LEFT JOIN vehicle ON stock.id_vehicle = vehicle.id',
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      setStock(res);
      console.log('stock: ', res);
      result(null, res);
    }
  );
};

Stock.updateById = (id, stock, result) => {
  sql.query(
    'UPDATE stock SET id_vehicle = ?, number_stock = ?, updated_at = ? WHERE id = ?',
    [stock.id_vehicle, stock.number_stock, stock.update_date, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found stock with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated stock: ', { id: id, ...stock });
      result(null, { id: id, ...stock });
    }
  );
};

Stock.remove = (id, result) => {
  sql.query('DELETE FROM stock WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found stock with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted stock with id: ', id);
    result(null, res);
  });
};

Stock.removeAll = (result) => {
  sql.query('DELETE FROM stock', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} stock`);
    result(null, res);
  });
};
module.exports = Stock;
function setStock(res) {
  res.forEach((obj, index) => {
    const vehicule = {
      id: obj.id_vehicle,
      price: obj.vehicle_price,
      name: obj.vehicle_name,
      brand: obj.vehicle_brand,
    };

    const stockG = {
      id: obj.id,
      vehicle: vehicule,
      number_stock: obj.number_stock,
      updated_at: obj.updated_at,
    };

    res[index] = stockG;
  });
}

