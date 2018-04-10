const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool.js');
const router = express.Router();

router.post('/', (request, response) => {
    const entry = request.body.entry;
    let sqlText = `INSERT INTO coach_bio
    (id, first_name, last_name, email, job_title, specialties, personal_interests)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;
    pool.query(sqlText, [entry.id, entry.first_name, entry.last_name, entry.email, entry.job_title, entry.specialties, entry.personal_interests])
    .then((result) => {
   // console.log('Added entry:', result);
    response.sendStatus(201);
  }).catch((error) => {
  //  console.log('Error posting entry:', error);
    response.sendStatus(500);
  })
}); // end POST



module.exports = router;