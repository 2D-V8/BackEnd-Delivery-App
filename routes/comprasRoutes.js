const ComprasController = require('../controllers/comprasController');

module.exports = (app) => {
  // Crear nueva compra
  app.post('/api/compras', ComprasController.create);
  
  // Obtener compras por usuario
  app.get('/api/compras/usuario/:user_id', ComprasController.getByUser);
  
  // Obtener detalles de una compra específica (nuevo endpoint opcional)
  app.get('/api/compras/:compra_id', ComprasController.getById);
};