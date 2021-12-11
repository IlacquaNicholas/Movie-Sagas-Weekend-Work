const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  // Add query to get all genres
  const sqlText = `SELECT * FROM "genres" ORDER BY "id";`
  pool.query(sqlText)
  .then((dbRes)=>{
    console.log('IN GET/genres', dbRes);
    res.sendStatus(200)
  })
  .catch ((dbErr)=>{
    console.log('in GET/genres error', dbErr);
    res.sendStatus(500)
  })
});

module.exports = router;