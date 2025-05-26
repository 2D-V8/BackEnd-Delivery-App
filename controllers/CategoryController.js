const storage = require('../utils/cloud_storage');
const Category = require('../models/Category');

module.exports = {
  async create(req, res) {
    try {
      const files = req.files;
      const { category } = req.body;

      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'El campo category es obligatorio',
        });
      }

      // Parsear el campo category (viene como string en multipart/form-data)
      let categoryData;
      try {
        categoryData = JSON.parse(category);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'El campo category debe ser un JSON válido',
          error: error.toString()
        });
      }

      console.log('categoryData:', categoryData);
      console.log('req.files:', files);

      // Si hay archivos, subir imagen
      if (files && files.length > 0) {
        const path = `image_${Date.now()}`;
        console.log('Subiendo archivo con path:', path);
        const url = await storage(files[0], path);

        console.log('URL obtenida:', url);

        if (url) {
          categoryData.image = url;
        }
      }

      // Crear categoría
      Category.create(categoryData, (err, id) => {
        if (err) {
          console.error('Error en creación:', err);
          return res.status(501).json({
            success: false,
            message: "Hubo un error con la creación de la categoría",
            error: err
          });
        }

        return res.status(201).json({
          success: true,
          message: 'La categoría se registró correctamente',
          data: `${id}`
        });
      });

    } catch (error) {
      console.error('Error capturado:', error);
      return res.status(400).json({
        success: false,
        message: "Error en los datos enviados",
        error: error.toString()
      });
    }
  }
};
