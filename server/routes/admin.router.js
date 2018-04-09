const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool.js');
const router = express.Router();

router.post('/school', (request, response) => {
    const entry = request.body.entry;
    let sqlText = `INSERT INTO schools
    (school_name, school_code, total_accounts, student_sessions)
    VALUES ($1, $2, $3, $4)`;
    pool.query(sqlText, [entry.school_name, entry.school_code, entry.total_accounts, entry.student_sessions])
    .then((result) => {
   // console.log('Added entry:', result);
    response.sendStatus(201);
  }).catch((error) => {
  //  console.log('Error posting entry:', error);
    response.sendStatus(500);
  })
}); // end POST

router.get('/school', (request, response) => {
  const sqlText = `SELECT * FROM schools`;
  pool.query(sqlText)
    .then(function(result) {
    //  console.log('Get result:', result);
      response.send(result.rows);
    })
    .catch(function(error){
    //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
});

router.get('/school/:school_id', (request, response) => {
  const school_id = request.params.school_id;
  const sqlText = `SELECT * FROM schools WHERE school_id=$1`;
  pool.query(sqlText, [school_id])
    .then(function(result) {
    //  console.log('Get result:', result);
      response.send(result.rows);
    })
    .catch(function(error){
    //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
});


module.exports = router;