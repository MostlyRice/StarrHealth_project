const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

// Twilio Credentials
const accountSid = 'AC847371d1ae894918b116e747bea9b8c3';
const authToken = 'cb4891f3efbc203c92900ef7128c5355';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);


router.post('/', (request, response) => {
    const entry = request.body.entry;
    const sqlText = `SELECT * FROM schools`;
    pool.query(sqlText)
      .then(function (result) {
        client.messages
  .create({
    to: '+16512807757',
    from: '+16122550400',
    body: entry.newmessage,
  })
  .then(message => console.log(message.sid));
  response.sendStatus(200);
      })
      .catch(function (error) {
        //  console.log('Error on Get:', error);
        response.sendStatus(500);
      })
  });


module.exports = router;