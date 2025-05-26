const db = require('../config/config');

module.exports = {
  create: async (user_id, estanco_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO compras (user_id, estanco_id) VALUES (?, ?)',
        [user_id, estanco_id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.insertId);
        }
      );
    });
  },

  getById: async (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT c.*, 
         JSON_ARRAYAGG(
           JSON_OBJECT(
             'producto_id', d.producto_id,
             'nombre', p.name,
             'cantidad', d.cantidad,
             'precio_unitario', d.precio_unitario
           )
         ) AS productos,
         SUM(d.cantidad * d.precio_unitario) AS total
         FROM compras c
         JOIN detalle_compras d ON c.id = d.compra_id
         JOIN productos p ON d.producto_id = p.id
         WHERE c.id = ?
         GROUP BY c.id`,
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        }
      );
    });
  },

  getAllByUser: async (user_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        // 🔧 CAMBIO: Traer también productos y total por cada compra
        `SELECT c.*, 
         JSON_ARRAYAGG(
           JSON_OBJECT(
             'producto_id', d.producto_id,
             'nombre', p.name,
             'cantidad', d.cantidad,
             'precio_unitario', d.precio_unitario
           )
         ) AS productos,
         SUM(d.cantidad * d.precio_unitario) AS total
         FROM compras c
         JOIN detalle_compras d ON c.id = d.compra_id
         JOIN productos p ON d.producto_id = p.id
         WHERE c.user_id = ?
         GROUP BY c.id
         ORDER BY c.fecha DESC`,
        [user_id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
};
