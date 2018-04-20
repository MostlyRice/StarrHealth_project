const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool.js');
const router = express.Router();

router.post('/school', (request, response) => {
  const entry = request.body.entry;
  const school_code = entry.school_code;
  const saveSchool = {
    school_name: entry.school_name,
    school_code: entry.school_code,
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
    .then(function (result) {
      //  console.log('Get result:', result);
      response.send(result.rows);
    })
    .catch(function (error) {
      //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
});

router.post('/school/:school_id', (request, response) => {
  const school_id = request.params.school_id;
  const secret = request.body.secret.secret;
  const sqlText = `SELECT * FROM schools WHERE school_id=$1`;
  pool.query(sqlText, [school_id])
    .then(function (result) {
      user = result.rows[0];
      console.log(user);
      if (secret === user.school_code) {
        // all good!
        response.send(result.rows);
      } else {
        response.sendStatus(500);
      }
    }).catch(function (error) {
      //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
});

router.get('/finduser/:name', (request, response) => {
  const name = request.params.name;
  console.log('my name is', name);
  const sqlText = `SELECT id, username FROM users WHERE username=$1`;
  pool.query(sqlText, [name])
    .then(function (result) {
      //  console.log('Get result:', result);
      response.send(result.rows);
    })
    .catch(function (error) {
      //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
});

router.get('/findcoach/:id', (request, response) => {
  const id = request.params.id;
  console.log('my ID is', id);
  const sqlText = `SELECT id, coach_id FROM coach_bio WHERE id=$1`;
  pool.query(sqlText, [id])
    .then(function (result) {
      //  console.log('Get result:', result);
      response.send(result.rows);
    })
    .catch(function (error) {
      //  console.log('Error on Get:', error);
      response.sendStatus(500);
    })
}); // end findCoach by ID

router.post('/academic', (request, response) => {
  const entry = request.body.entry;
  let sqlText = `INSERT INTO coach_specialties
  (coach_id, specialty_id)
  VALUES ($1, $2)`;
  pool.query(sqlText, [entry.coach_id, entry.specialty_id])
    .then((result) => {
      // console.log('Added entry:', result);
      response.sendStatus(201);
    }).catch((error) => {
      //  console.log('Error posting entry:', error);
      response.sendStatus(500);
    })
}); // end academic post

router.post('/social', (request, response) => {
  const entry = request.body.entry;
  let sqlText = `INSERT INTO coach_specialties
  (coach_id, specialty_id)
  VALUES ($1, $2)`;
  pool.query(sqlText, [entry.coach_id, entry.specialty_id])
    .then((result) => {
      // console.log('Added entry:', result);
      response.sendStatus(201);
    }).catch((error) => {
      //  console.log('Error posting entry:', error);
      response.sendStatus(500);
    })
}); // end social post

router.post('/health', (request, response) => {
  const entry = request.body.entry;
  let sqlText = `INSERT INTO coach_specialties
  (coach_id, specialty_id)
  VALUES ($1, $2)`;
  pool.query(sqlText, [entry.coach_id, entry.specialty_id])
    .then((result) => {
      // console.log('Added entry:', result);
      response.sendStatus(201);
    }).catch((error) => {
      //  console.log('Error posting entry:', error);
      response.sendStatus(500);
    })
}); // end health post

router.post('/professional', (request, response) => {
  const entry = request.body.entry;
  let sqlText = `INSERT INTO coach_specialties
  (coach_id, specialty_id)
  VALUES ($1, $2)`;
  pool.query(sqlText, [entry.coach_id, entry.specialty_id])
    .then((result) => {
      // console.log('Added entry:', result);
      response.sendStatus(201);
    }).catch((error) => {
      //  console.log('Error posting entry:', error);
      response.sendStatus(500);
    })
}); // end professional post

router.post('/relationships', (request, response) => {
  const entry = request.body.entry;
  let sqlText = `INSERT INTO coach_specialties
  (coach_id, specialty_id)
  VALUES ($1, $2)`;
  pool.query(sqlText, [entry.coach_id, entry.specialty_id])
    .then((result) => {
      // console.log('Added entry:', result);
      response.sendStatus(201);
    }).catch((error) => {
      //  console.log('Error posting entry:', error);
      response.sendStatus(500);
    })
}); // end relationships post

router.get('/specialties', (request, response) => {
  const sqlText = `SELECT * FROM specialties`;
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

router.get('/jobs', (request, response) => {
  const sqlText = `SELECT * FROM jobs`;
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

router.get('/schools', (request, response) => {
  const sqlText = `SELECT * FROM schools`;
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

router.get('/coaches', (request, response) => {
  const sqlText = `SELECT * FROM coach_bio`;
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

router.get('/students', (request, response) => {
  const sqlText = `SELECT * FROM student_bio
  JOIN schools ON schools.school_id=student_bio.school_id`;
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

router.delete('/remove/student/:id', (req, res) => {
  const id = req.params.id;
  let queryText = `DELETE FROM users WHERE id=$1`;
  pool.query(queryText, [id])
  .then((result) => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('Error on delete', error);
    res.sendStatus(500);
  }) 
});

router.delete('/remove/coach/:id', (req, res) => {
  const id = req.params.id;
  let queryText = `DELETE FROM users WHERE id=$1`;
  pool.query(queryText, [id])
  .then((result) => {
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log('Error on delete', error);
    res.sendStatus(500);
  }) 
});

module.exports = router;