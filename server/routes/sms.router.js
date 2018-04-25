const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

// Twilio Credentials
const accountSid = 'AC847371d1ae894918b116e747bea9b8c3';
const authToken = 'cb4891f3efbc203c92900ef7128c5355';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);


router.get('/coachphone/:id', (request, response) => {
    const id = request.params.id;
    const sqlText = `SELECT first_name, last_name, coach_phone FROM coach_bio WHERE coach_id=$1`;
    pool.query(sqlText, [id])
      .then(function (result) {
      response.send(result.rows);
      })
      .catch(function (error) {
        //  console.log('Error on Get:', error);
        response.sendStatus(500);
      })
  });

  router.get('/studentphone/:id', (request, response) => {
    const id = request.params.id;
    const sqlText = `SELECT first_name, last_name, phone_number FROM student_bio WHERE student_id=$1`;
    pool.query(sqlText, [id])
      .then(function (result) {
      response.send(result.rows);
      })
      .catch(function (error) {
        //  console.log('Error on Get:', error);
        response.sendStatus(500);
      })
  });

  router.post('/message', (request, response) => {
    const entry = request.body.entry;
    let phone = entry.phone.toString();
    const sqlText = `SELECT phone_number FROM student_bio`;
    pool.query(sqlText)
      .then(function (result) {
        client.messages
        .create({
    to: phone,
    from: '+16122550400',
    body: entry.first_name + ' ' + entry.last_name + ':  ' + entry.newmessage,
  })
  .then(message => console.log(message.sid));
      response.send(result.rows);
      })
      .catch(function (error) {
        //  console.log('Error on Get:', error);
        response.sendStatus(500);
      })
  });


module.exports = router;