const { response } = require('express');
const db = require('../config/config');

const Rol = {};

Rol.create = (id_user, id_rol, result) => {
    const sql =`
        INSERT INTO
            user_hash_roles(
            id_user,
            id_rol,
            created_at,
            updated_at
            )
        VALUES (?, ?, ?, ?)
    `;
    db.query(
        sql,
        [id_user, id_rol, new Date(), new Date()], 
        (err,res) => {
            if (err) {
                console.log('Error:', err);
                result(err,null);
            }
            else{
                console.log(' Usuario Obtenido:', response.insertId);
                result(null, res.insertId);
            }
        } 
    )
}

module.exports = Rol;