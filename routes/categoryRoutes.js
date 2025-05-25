const CategoryController = require("../controllers/CategoryController")
const passport = require('passport');

module.exports = (app, upload) => {
    app.post('/api/categorias/create', passport.authenticate('jwt', {session: false}), upload.array('image',1), CategoryController.create);


}