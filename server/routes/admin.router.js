const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool.js');
const router = express.Router();

router.post('/school', (request, response) => {
    const entry = request.body.entry;
    const school_code = encryptLib.encryptPassword(entry.school_code);
    const saveSchool = {
      school_name: entry.school_name,
      school_code: encryptLib.encryptPassword(entry.school_code),
      total_accounts: entry.total_accounts,
      student_sessions: entry.student_sessions
    }
    let sqlText = `INSERT INTO schools
    (school_name, school_code, total_accounts, student_sessions)
    VALUES ($1, $2, $3, $4)`;
    pool.query(sqlText, [saveSchool.school_name, saveSchool.school_code, saveSchool.total_accounts, saveSchool.student_sessions])
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

router.post('/school/:school_id', (request, response) => {
  const school_id = request.params.school_id;
  const secret = request.body.secret.secret;
  const sqlText = `SELECT * FROM schools WHERE school_id=$1`;
  pool.query(sqlText, [school_id])
    .then(function(result) {
      user = result.rows[0];
      if(encryptLib.comparePassword(secret, user.school_code)) {
        // all good!
        response.send(result.rows);
      } else {
        response.sendStatus(500);
      }
    }).catch(function(error){
    //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
});




module.exports = router;