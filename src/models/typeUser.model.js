const sql = require('./db.js');

// constructor
const TypeUser = function (typeUser) {
  this.name = typeUser.name;
};

TypeUser.create = (newTypeUser, result) => {
  sql.query('INSERT INTO type_user SET ?', newTypeUser, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created type_user: ', { id: res.insertId, ...newTypeUser });
    result(null, { id: res.insertId, ...newTypeUser });
  });
};

TypeUser.findById = (typeUserId, result) => {
  sql.query(`SELECT * FROM type_user WHERE id = ${typeUserId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('found typeUser: ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found typeUser with the id
    result({ kind: 'not_found' }, null);
  });
};

TypeUser.getAll = (result) => {
  sql.query('SELECT * FROM type_user', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('typeUser: ', res);
    result(null, res);
  });
};

TypeUser.updateById = (id, typeUser, result) => {
  sql.query(
    'UPDATE type_user SET name = ? WHERE id = ?',
    [typeUser.name, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found typeUser with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated typeUser: ', { id: id, ...typeUser });
      result(null, { id: id, ...typeUser });
    }
  );
};

TypeUser.remove = (id, result) => {
  sql.query('DELETE FROM type_user WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found typeUser with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted typeUser with id: ', id);
    result(null, res);
  });
};

TypeUser.removeAll = (result) => {
  sql.query('DELETE FROM type_user', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} typeUser`);
    result(null, res);
  });
};
module.exports = TypeUser;
