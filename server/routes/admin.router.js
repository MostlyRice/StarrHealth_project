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


module.exports = router;