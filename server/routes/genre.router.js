const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const sqlText = `SELECT * FROM "genres" ORDER BY "name" ASC;`
  pool.query(sqlText)
  .then((result)=>{
    console.log('IN GET/genres', result);
    res.send(result.rows)
  })
  .catch ((dbErr)=>{
    console.log('in GET/genres error', dbErr);
    res.sendStatus(500)
  })
});

module.exports = router;