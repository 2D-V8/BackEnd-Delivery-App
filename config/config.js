const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'password',
    database: 'drinknow'

});

db.connect(function(err){
    if(err) throw err;
    console.log('Conexion Exitosa');
});

module.exports = db;