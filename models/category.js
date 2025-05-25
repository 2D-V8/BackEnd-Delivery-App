const db = require('../config/config');
const Category = {};

Category.create = (category, result) => {
  const sql = `
    INSERT INTO
      categories(
        name,
        description,
        image,
      )
    VALUES(?, ?, ?)
  `;

  db.query(
    sql,
    [
        category.name,
        category.description,
        category.image
    ],
     (err,res) => {
            if (err) {
                console.log('Error:', err);
                result(err,null);
            }
            else{
                console.log('id de la nueva categoria:', response.insertId);
                result(null, res.insertId);
            }
        } 
  )
}