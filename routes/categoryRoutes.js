const CategoryController = require("../controllers/CategoryController");

module.exports = (app, upload) => {
    // Quita el middleware de autenticación para pruebas
    app.post('/api/categorias/create', CategoryController.create);
};
