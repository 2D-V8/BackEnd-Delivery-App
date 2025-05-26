const EstancosController = require('../controllers/EstancosController');

module.exports = (app) => {
  app.get('/api/estancos', EstancosController.getAll);
  app.get('/api/estancos/:id/productos', EstancosController.getProductosByEstanco);
};
