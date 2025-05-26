const estancos = require('../models/estancos');
const productos = require('../models/productos'); // 👈 Nuevo modelo

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await estancos.getAll();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener estancos' });
    }
  },

  getProductosByEstanco: async (req, res) => {
    const estancoId = req.params.id;

    try {
      const data = await productos.getByEstancoId(estancoId);
      if (data.length === 0) {
        return res.status(404).json({ mensaje: 'No hay productos para este estanco' });
      }

      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al obtener productos del estanco' });
    }
  }
};
