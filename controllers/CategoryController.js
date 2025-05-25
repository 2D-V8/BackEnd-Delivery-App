const Category = require('../models/category');
const storage = require('../utils/cloud_storage');

module.exports = {
  async create(req, res) {

    const category = JSON.parse(req.body.category); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

    const files = req.files;

    if (files.length > 0) {
      const path = `image_${Date.now()}`;
      const url = await storage(files[0], path);

      if (url != undefined && url != null) {
        category.image = url;
      }
    }

    category.create(category, (err, id) => {
        if (err){
            return res.status(501).json({
                succes: false,
                message: "hubo un error con la creacion de la categoria",
                error: err
            });
        }

        return res.status(201).json({
            success: true,
            message: 'la categoria se registro correctamente',
            data: `${id}`
        });   
    });
  },
    
}