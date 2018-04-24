const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

router.post('/stress', (request, response) => {
  if (request.isAuthenticated()) {
    const entry = request.body.entry;
    let sqlText = `INSERT INTO user_barriers
      (id, barrier_id)
      VALUES ($1, $2)`;
    pool.query(sqlText, [entry.id, entry.barrier_id])
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
}); // end stress post

router.post('/support', (request, response) => {
  if (request.isAuthenticated()) {
    const entry = request.body.entry;
    let sqlText = `INSERT INTO user_barriers
      (id, barrier_id)
      VALUES ($1, $2)`;
    pool.query(sqlText, [entry.id, entry.barrier_id])
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
}); // end support post

router.post('/confidence', (request, response) => {
  if (request.isAuthenticated()) {
    const entry = request.body.entry;
    let sqlText = `INSERT INTO user_barriers
      (id, barrier_id)
      VALUES ($1, $2)`;
    pool.query(sqlText, [entry.id, entry.barrier_id])
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
}); // end confidence post

router.post('/knowledge', (request, response) => {
  if (request.isAuthenticated()) {
    const entry = request.body.entry;
    let sqlText = `INSERT INTO user_barriers
      (id, barrier_id)
      VALUES ($1, $2)`;
    pool.query(sqlText, [entry.id, entry.barrier_id])
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
}); // end knowledge post

router.post('/resources', (request, response) => {
  if (request.isAuthenticated()) {
    const entry = request.body.entry;
    let sqlText = `INSERT INTO user_barriers
      (id, barrier_id)
      VALUES ($1, $2)`;
    pool.query(sqlText, [entry.id, entry.barrier_id])
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
}); // end resources post

router.post('/health', (request, response) => {
  if (request.isAuthenticated()) {
    const entry = request.body.entry;
    let sqlText = `INSERT INTO user_barriers
      (id, barrier_id)
      VALUES ($1, $2)`;
    pool.query(sqlText, [entry.id, entry.barrier_id])
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

router.post('/time', (request, response) => {
  if (request.isAuthenticated()) {
    const entry = request.body.entry;
    let sqlText = `INSERT INTO user_barriers
      (id, barrier_id)
      VALUES ($1, $2)`;
    pool.query(sqlText, [entry.id, entry.barrier_id])
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
}); // end time post


module.exports = router;