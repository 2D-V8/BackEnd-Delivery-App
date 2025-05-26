const db = require('../config/config');

module.exports = {
  create: async ({ compra_id, producto_id, cantidad }) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO detalle_compras (compra_id, producto_id, cantidad) VALUES (?, ?, ?)',
        [compra_id, producto_id, cantidad],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  }
};
