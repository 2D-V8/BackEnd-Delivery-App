const EstancosController = require('../controllers/EstancosController');

module.exports = (app) => {
  app.get('/api/estancos', EstancosController.getAll);
};