const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();
let env = require('dotenv');
env.config();

// Instantiating dialog with Twilio
// API Keys left blank, please insert your Twilio API Key 
// or Twilio will not function in this application

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

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
    // Must Insert Phone NUmber From Twilio Account On Line 54 between the '+1'
    // i.e. from: '+15555555555',
    from: '+1',
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
