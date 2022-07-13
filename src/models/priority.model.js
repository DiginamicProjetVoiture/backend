const sql = require('./db.js');

// constructor
const Priority = function (priority) {
  this.name = priority.name;
};

Quotation.create = (newPriority, result) => {
  sql.query('INSERT INTO priority SET ?', newPriority, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    console.log('created priority: ', { id: res.insertId, ...newPriority });
    result(null, { id: res.insertId, ...newPriority });
  });
};

Quotation.findById = (priorityId, result) => {
  sql.query(`SELECT * FROM priority WHERE id = ${priorityId}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('found priority: ', res[0]);
      result(null, res[0]);
      return;
    }
    // not found Priority with the id
    result({ kind: 'not_found' }, null);
  });
};

Quotation.getAll = (result) => {
  sql.query('SELECT * FROM priority', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log('priority: ', res);
    result(null, res);
  });
};

Quotation.updateById = (id, priority, result) => {
  sql.query(
    'UPDATE priority SET name = ?, WHERE id = ?',
    [priority.name, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found priority with the id
        result({ kind: 'not_found' }, null);
        return;
      }
      console.log('updated priority: ', { id: id, ...priority });
      result(null, { id: id, ...priority });
    }
  );
};

Quotation.remove = (id, result) => {
  sql.query('DELETE FROM priority WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found priority with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted priority with id: ', id);
    result(null, res);
  });
};

Quotation.removeAll = (result) => {
  sql.query('DELETE FROM priority', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} priority`);
    result(null, res);
  });
};
module.exports = Quotation;
