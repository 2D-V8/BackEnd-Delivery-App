const db = require('../config/config');

// 1. Primero define el objeto Category
const Category = {};

// 2. Luego añade métodos
Category.create = (category, result) => {
  const sql = `
    INSERT INTO
      categorias(
        name,
        description,
        image,
        estanco_id
      )
    VALUES(?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      category.name,
      category.description,
      category.image,
      category.estanco_id
    ],
    (err, res) => {
      if (err) {
        console.log('Error:', err);
        result(err, null);
      } else {
        console.log('Id de la nueva categoría:', res.insertId);
        result(null, res.insertId);
      }
    } 
  );
};

// 3. Exporta el modelo
module.exports = Category;