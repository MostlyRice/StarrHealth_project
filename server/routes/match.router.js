const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.get('/student/:id', (request, response) => {
    const id = request.params.id;
    console.log('my id is', id);
    const sqlText = `SELECT id, specialty_id FROM student_bio WHERE id=$1`;
    pool.query(sqlText, [id])
      .then(function(result) {
      //  console.log('Get result:', result);
        response.send(result.rows);
      })
      .catch(function(error){
      //  console.log('Error on Get:', error);
        response.sendStatus(500);
      })
  });

  router.get('/coaches/:thisStudent', (request, response) => {
    const thisStudent = request.params.thisStudent;
    const id = thisStudent;
    console.log('WHO AM I? ', id);
    const sqlText = `SELECT * FROM coach_bio 
    JOIN coach_specialties ON coach_bio.coach_id=coach_specialties.coach_id 
    WHERE coach_specialties.specialty_id=$1`;
    pool.query(sqlText, [id])
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