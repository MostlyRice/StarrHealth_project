const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool.js');
const router = express.Router();

router.post('/school', (request, response) => {
  if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
}); // end POST

router.get('/school', (request, response) => {
 if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
});

router.post('/school/:school_id', (request, response) => {
  if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
});

router.get('/finduser/:name', (request, response) => {
  if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
});

router.get('/findcoach/:id', (request, response) => {
  if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
}); // end findCoach by ID

router.post('/academic', (request, response) => {
  if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
}); // end academic post

router.post('/social', (request, response) => {
  if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
}); // end social post

router.post('/health', (request, response) => {
  if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
}); // end health post

router.post('/professional', (request, response) => {
  if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
}); // end professional post

router.post('/relationships', (request, response) => {
  if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
}); // end relationships post

router.get('/specialties', (request, response) => {
  if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
});

router.get('/jobs', (request, response) => {
  if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
});

router.get('/schools', (request, response) => {
  if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
});

router.get('/appts', (request, response) => {
  if (request.isAuthenticated()) {
    const sqlText = `SELECT calendar.date, calendar.available_time, student_bio.sessions_used, calendar.property,
    student_bio.first_name as student_first, student_bio.last_name as student_last,
    coach_bio.first_name as coach_first, coach_bio.last_name as coach_last,
    schools.school_name, specialties.specialty_name FROM calendar
    JOIN coach_bio ON calendar.coach_id=coach_bio.id
    JOIN student_bio ON student_bio.id=calendar.student_id
    JOIN schools ON schools.school_id=student_bio.school_id
    JOIN specialties ON specialties.specialty_id=student_bio.specialty_id
    ORDER BY calendar.date ASC, calendar.property`;
    pool.query(sqlText)
      .then(function (result) {
        //  console.log('Get result:', result);
        response.send(result.rows);
      })
      .catch(function (error) {
        //  console.log('Error on Get:', error);
        response.sendStatus(500);
      })
  } else {
      response.sendStatus(403);
  }
});

router.get('/coaches', (request, response) => {
  if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
});

router.get('/students', (request, response) => {
  if (request.isAuthenticated()) {
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
  } else {
      response.sendStatus(403);
  }
});

router.delete('/remove/student/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    console.log('DELETE ME', id)
    let queryText = `DELETE FROM users WHERE id=$1`;
    pool.query(queryText, [id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error on delete', error);
      res.sendStatus(500);
    }) 
  } else {
    response.sendStatus(403);
  }
});

router.delete('/remove/coach/:id', (req, res) => {
  if (req.isAuthenticated()) {
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
  } else {
    response.sendStatus(403);
  } 
});

module.exports = router;