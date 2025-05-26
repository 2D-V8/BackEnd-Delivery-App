const db = require('../config/config');
const compras = require('../models/compras');
const detalleCompras = require('../models/detalleCompras');

module.exports = {
  create: async (req, res) => {
    const { user_id, estanco_id, productos } = req.body;

    if (!user_id || !estanco_id || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ error: 'Faltan datos requeridos o productos vacíos' });
    }

    try {
      // 1. Crear la compra y obtener el ID
      const compraId = await compras.create(user_id, estanco_id);

      // 2. Insertar productos en detalle_compras con precio desde productos
      const insertDetalle = productos.map((item) => {
        return new Promise((resolve, reject) => {
          db.query(
            `INSERT INTO detalle_compras (compra_id, producto_id, cantidad, precio_unitario)
             VALUES (?, ?, ?, (SELECT precio FROM productos WHERE id = ?))`,
            [compraId, item.producto_id, item.cantidad, item.producto_id],
            (err) => {
              if (err) return reject(err);
              resolve();
            }
          );
        });
      });
      await Promise.all(insertDetalle);

      // 3. Obtener compra completa con detalles
      const compraCompleta = await compras.getById(compraId);

      // 4. Responder con toda la info
      res.status(201).json(compraCompleta);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || 'Error al crear la compra' });
    }
  },

  getById: async (req, res) => {
    const { compra_id } = req.params;
    try {
      const compra = await compras.getById(compra_id);
      if (!compra) {
        return res.status(404).json({ message: 'Compra no encontrada' });
      }
      res.status(200).json(compra);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByUser: async (req, res) => {
    const { user_id } = req.params;
    try {
      const comprasUsuario = await compras.getAllByUser(user_id); // 🔧 CAMBIO: traer detalles
      res.status(200).json(comprasUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
