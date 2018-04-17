const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool.js');
const router = express.Router();

router.post('/', (request, response) => {
    const entry = request.body.entry;
    let sqlText = `INSERT INTO coach_bio
    (id, first_name, last_name, email, job_title, personal_interests)
    VALUES ($1, $2, $3, $4, $5, $6)`;
    pool.query(sqlText, [entry.id, entry.first_name, entry.last_name, entry.email, entry.job_title, entry.personal_interests])
    .then((result) => {
   // console.log('Added entry:', result);
    response.sendStatus(201);
  }).catch((error) => {
  //  console.log('Error posting entry:', error);
    response.sendStatus(500);
  })
}); // end POST

router.get('/viewcoach/:id', (request, response) => {
  const id = request.params.id;
  console.log('ID', id);
  const sqlText = `SELECT * FROM coach_bio WHERE coach_id=$1`;
  pool.query(sqlText, [id])
    .then(function(result) {
    //  console.log('Get result:', result);
      response.send(result.rows);
    })
    .catch(function(error){
    //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
}); // end viewCoach GET

router.get('/getspecialties/:id', (request, response) => {
  const id = request.params.id;
  console.log('ID', id);
  const sqlText = `SELECT specialties.specialty_name FROM specialties 
  JOIN coach_specialties ON coach_specialties.specialty_id=specialties.specialty_id
  WHERE coach_specialties.coach_id=$1`;
  pool.query(sqlText, [id])
    .then(function(result) {
    //  console.log('Get result:', result);
      response.send(result.rows);
    })
    .catch(function(error){
    //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
}); // end viewCoach GET


module.exports = router;