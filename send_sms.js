// Twilio Credentials
const accountSid = 'AC847371d1ae894918b116e747bea9b8c3';
const authToken = 'cb4891f3efbc203c92900ef7128c5355';

// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    to: '+16512807757',
    from: '+16122550400',
    body: 'Running a few min late!!!',
  })
  .then(message => console.log(message.sid));