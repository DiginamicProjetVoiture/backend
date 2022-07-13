const sql = require('./db.js');

// constructor
const User = function (user) {
  this.id_type_user = user.id_type_user;
  this.lastname = user.lastname;
  this.firstname = user.firstname;
  this.email = user.email;
  this.password = user.password;
  this.is_activated = user.is_activated;
};

User.create = (newUser, result) => {
  sql.query('INSERT INTO user SET ?', newUser, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created user: ', { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT user.id, user.lastname, user.firstname, user.email, user.password, user.is_activated, type_user.id AS id_type_user, type_user.name AS name_type_user `+
  `FROM user `+
  `LEFT JOIN type_user ON user.id_type_user = type_user.id ` +
  `WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('found user: ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found User with the id
    result({ kind: 'not_found' }, null);
  });
};

User.getAll = (result) => {
  sql.query(
    'SELECT user.id, user.lastname, user.firstname, user.email, user.password, user.is_activated, '+
    'type_user.id AS id_type_user, type_user.name AS name_type_user ' +
      'FROM user ' +
      'LEFT JOIN type_user ON user.id_type_user = type_user.id',
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      console.log('user: ', res);
      result(null, res);
    }
  );
};

User.updateById = (id, user, result) => {
  sql.query(
    'UPDATE user SET id_type_user = ?, lastname = ?, fristname = ?, email = ?, password = ?, is_activated = ?, WHERE id = ?',
    [
      user.type_user.id,
      user.lastname,
      user.firstname,
      user.email,
      user.password,
      user.is_activated,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated user: ', { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query('DELETE FROM user WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted user with id: ', id);
    result(null, res);
  });
};

User.removeAll = (result) => {
  sql.query('DELETE FROM user', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} user`);
    result(null, res);
  });
};
module.exports = User;
