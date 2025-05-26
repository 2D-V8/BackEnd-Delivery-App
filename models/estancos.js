const db = require('../config/config');

const estancos = {};

estancos.getAll = (result) => {
  const sql = 'SELECT * FROM estancos';

  db.query(sql, (err, res) => {
    if (err) {
      console.log('Error al obtener locales:', err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

module.exports = estancos;
