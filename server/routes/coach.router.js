const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool.js');
const router = express.Router();
const moment = require('moment');

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
  console.log('ID1', id);
  const sqlText = `SELECT * FROM coach_bio WHERE coach_id=$1`;
  pool.query(sqlText, [id])
    .then(function (result) {
      //  console.log('Get result:', result);
      response.send(result.rows);
    })
    .catch(function (error) {
      //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
}); // end viewCoach GET

router.get('/getspecialties/:id', (request, response) => {
  const id = request.params.id;
  console.log('ID2', id);
  const sqlText = `SELECT specialties.specialty_name FROM specialties 
  JOIN coach_specialties ON coach_specialties.specialty_id=specialties.specialty_id
  WHERE coach_specialties.coach_id=$1`;
  pool.query(sqlText, [id])
    .then(function (result) {
      //  console.log('Get result:', result);
      response.send(result.rows);
    })
    .catch(function (error) {
      //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
}); // end viewCoach GET

router.get('/:id', (request, response) => {
  const id = request.params.id;
  console.log('ID3', id);
  const sqlText = `SELECT * FROM coach_bio WHERE id=$1`;
  pool.query(sqlText, [id])
    .then(function (result) {
      //  console.log('Get result:', result);
      response.send(result.rows);
    })
    .catch(function (error) {
      //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
});

router.get('/today/:id', (request, response) => {
  const id = request.params.id;
  let date = moment().format('L');
  console.log('ID4', id);
  console.log('date', date);
  const sqlText = `SELECT * FROM calendar
  JOIN student_bio ON student_bio.id=calendar.student_id WHERE calendar.coach_id=$1 AND calendar.date=$2 ORDER BY calendar.property`;
  pool.query(sqlText, [id, date])
    .then(function (result) {
      console.log('Get result:', result);
      response.send(result.rows);
    })
    .catch(function (error) {
      //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
});

router.put('/profile/:id', (request, response) => {
  const id = request.params.id;
  const entry = request.body.entry;
  let queryText = `UPDATE coach_bio 
  SET first_name=$2, last_name=$3, email=$4, job_title=$5, certifications=$6, personal_interests=$7, coach_bio=$8 WHERE coach_id=$1`;
  pool.query(queryText, [id, entry.first_name, entry.last_name, entry.email, entry.job_title, entry.certifications, entry.personal_interests, entry.coach_bio])
    .then((result) => {
      response.sendStatus(200);
    })
    .catch((err) => {
      response.sendStatus(500);
    })
}); // end profile update

router.put('/username/:id', (request, response) => {
  const id = request.params.id;
  const entry = request.body.entry;
  let queryText = `UPDATE users 
  SET username=$2 WHERE id=$1`;
  pool.query(queryText, [id, entry.username])
    .then((result) => {
      response.sendStatus(200);
    })
    .catch((err) => {
      response.sendStatus(500);
    })
}); // end username update

router.put('/photo/:id', (request, response) => {
  const id = request.params.id;
  const entry = request.body.entry;
  let queryText = `UPDATE coach_bio 
  SET coach_photo=$2 WHERE id=$1`;
  pool.query(queryText, [id, entry.coach_photo])
    .then((result) => {
      response.sendStatus(200);
    })
    .catch((err) => {
      response.sendStatus(500);
    })
}); // end username update

router.get('/everyone/students', (request, response) => {
  console.log('IN ROUTER!!!!!!');
  const sqlText = `SELECT * FROM student_bio
  JOIN schools ON schools.school_id=student_bio.school_id
  JOIN specialties ON specialties.specialty_id=student_bio.specialty_id`;
  pool.query(sqlText)
    .then(function (result) {
      //  console.log('Get result:', result);
      response.send(result.rows);
    })
    .catch(function (error) {
      //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
});

router.get('/onestudent/:id', (request, response) => {
  const id = request.params.id;
  const sqlText = `SELECT * FROM student_bio
  JOIN schools ON schools.school_id=student_bio.school_id
  JOIN specialties ON specialties.specialty_id=student_bio.specialty_id
  WHERE student_bio.id=$1`;
  pool.query(sqlText, [id])
    .then(function (result) {
      //  console.log('Get result:', result);
      response.send(result.rows);
    })
    .catch(function (error) {
      //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
});

router.get('/thisstudent/appts/:id', (request, response) => {
  const id = request.params.id;
  const sqlText = `SELECT * FROM calendar
  WHERE student_id=$1 ORDER BY date, property`;
  pool.query(sqlText, [id])
    .then(function (result) {
      //  console.log('Get result:', result);
      response.send(result.rows);
    })
    .catch(function (error) {
      //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
});

router.put('/sessionnotes/:id', (request, response) => {
  const id = request.params.id;
  const entry = request.body.entry;
  let queryText = `UPDATE calendar 
  SET session_notes=$2, notes_status=$3 WHERE calendar_id=$1`;
  pool.query(queryText, [id, entry.session_notes, entry.notes_status])
    .then((result) => {
      response.sendStatus(200);
    })
    .catch((err) => {
      response.sendStatus(500);
    })
}); // end username update

module.exports = router;