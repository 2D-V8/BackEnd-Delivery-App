const db = require('../config/config');

module.exports = {
  async getByEstancoId(estancoId) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM productos WHERE estanco_id = ?', [estancoId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }
};
