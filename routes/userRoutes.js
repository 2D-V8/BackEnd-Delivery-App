const userController = require('../controllers/usersController');

module.exports = (app) => {
    app.post   ('/api/users/create', userController.register);
    app.post   ('/api/users/login', userController.login);
    app.get    ('/api/users/AllUsers', userController.AllUsers)
    app.delete ('/api/users/deleteUser', userController.deleteUser)
}   