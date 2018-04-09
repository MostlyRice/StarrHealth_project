const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.post('/', (request, response) => {
    const entry = request.body.entry;
    let sqlText = `INSERT INTO student_bio
    (id, disclaimer)
    VALUES ($1, $2)`;
    pool.query(sqlText, [entry.id, entry.disclaimer])
    .then((result) => {
   // console.log('Added entry:', result);
    response.sendStatus(201);
  }).catch((error) => {
  //  console.log('Error posting entry:', error);
    response.sendStatus(500);
  })
}); // end POST

router.put('/general/:id', (request, response) => {
    const id = request.params.id;
    const entry = request.body.entry;
    let queryText = `UPDATE student_bio 
    SET first_name=$2, last_name=$3, date_of_birth=$4, relationship_status=$5, skype_id=$6, email=$7, phone_number=$8, school_id=$9, sessions_used=$10 WHERE id=$1`;
    pool.query(queryText, [id, entry.first_name, entry.last_name, entry.date_of_birth, entry.relationship_status, entry.skype_id, entry.email, entry.phone_number, entry.school_id, entry.sessions_used])
      .then((result) => {
        response.sendStatus(200);
      })
      .catch((err) => {
        response.sendStatus(500);
      })
  }); // end general info update

  router.put('/goals/:id', (request, response) => {
    const id = request.params.id;
    const entry = request.body.entry;
    let queryText = `UPDATE student_bio 
    SET primary_goal=$2, other_goals=$3 WHERE id=$1`;
    pool.query(queryText, [id, entry.primary_goal, entry.other_goals])
      .then((result) => {
        response.sendStatus(200);
      })
      .catch((err) => {
        response.sendStatus(500);
      })
  }); // end goals update

  router.put('/barriers/:id', (request, response) => {
    const id = request.params.id;
    const entry = request.body.entry;
    let queryText = `UPDATE student_bio 
    SET other_barriers=$2 WHERE id=$1`;
    pool.query(queryText, [id, entry.other_barriers])
      .then((result) => {
        response.sendStatus(200);
      })
      .catch((err) => {
        response.sendStatus(500);
      })
  }); // end barriers update

  router.put('/sessions/:id', (request, response) => {
    const id = request.params.id;
    const entry = request.body.entry;
    let queryText = `UPDATE student_bio 
    SET total_sessions=$2 WHERE id=$1`;
    pool.query(queryText, [id, entry.total_sessions])
      .then((result) => {
        response.sendStatus(200);
      })
      .catch((err) => {
        response.sendStatus(500);
      })
  }); // end sessions update

  router.put('/extra/:id', (request, response) => {
    const id = request.params.id;
    const entry = request.body.entry;
    let queryText = `UPDATE student_bio 
    SET other_professionals=$2, other_professionals_explanation=$3, other_information=$4, other_information_explanation=$5 WHERE id=$1`;
    pool.query(queryText, [id, entry.other_professionals, entry.other_professionals_explain, entry.other_information, entry.other_information_explain])
      .then((result) => {
        response.sendStatus(200);
      })
      .catch((err) => {
        response.sendStatus(500);
      })
  }); // end extra update


module.exports = router;