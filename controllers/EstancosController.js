const estancos = require('../models/estancos');

module.exports = {
  getAll(req, res) {
    estancos.getAll((err, data) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error al obtener los estancos',
          error: err,
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Locales obtenidos correctamente',
        data: data,
      });
    });
  }
};
