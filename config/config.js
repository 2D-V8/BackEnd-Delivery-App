const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    database: 'drinknow'

});

db.connect(function(err){
    if(err) throw err;
    console.log('Conexion Exitosa');
});

module.exports = db;