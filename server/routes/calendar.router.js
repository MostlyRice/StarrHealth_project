const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool.js');
const router = express.Router();

router.post('/coach', (request, response) => {
    if (request.isAuthenticated()){
        let coachAvailability = request.body;
        let availabilityArray = [];
        console.log('coachAvailability', coachAvailability);
        const date = request.body.date;
        const coachID = request.user.id;
        for(let value in coachAvailability){
        if(value != 'date' && value != 'coach_id'){
            availabilityArray.push(coachAvailability[value])};
        }
        console.log('availability array', availabilityArray);
        for(let time of availabilityArray){
            const sqlText = `INSERT INTO calendar (available_time, date, coach_id) VALUES ($1, $2, $3);`;
            pool.query(sqlText, [time, date, coachID])
            .then((result) => {
                response.sendStatus(201);
            })
            .catch((error) => {
                response.sendStatus(500);
            })
        }
    }else {
        response.sendStatus(403);
    }
})

router.get('/availability', (request, response) => {
    if (request.isAuthenticated()){
        const sqlText = "SELECT available_time,, date FROM calendar WHERE coach_id = $1;";
        const studentID = request.user.id;
        pool.query(sqlText, [studentID])
        .then(result => {
            response.send(result.rows);
            cosole.log('availability', result.rows)
        })
        .catch(error => {
            response.sendStatus(500);
            console.log('get error', error); 
        })
    } else {
        response.sendStatus(403);
    }
})

router.get('/appointments', (request, response) => {
    if (request.isAuthenticated()){
        const sqlText = "SELECT available_time, student_id, date FROM calendar WHERE coach_id = $1;";
        const coach_id = request.user.id;
        pool.query(sqlText, [coach_id])
        .then(result => {
            response.send(result.rows);
            cosole.log('availability', result.rows)
        })
        .catch(error => {
            response.sendStatus(500);
            console.log('get error', error); 
        })
    } else {
        response.sendStatus(403);
    }
})

router.put('/student', (request, response) => {
    if (request.isAuthenticated()){
        let studentAvailability = request.body.time;
        let studentID = request.user.id;
        const sqlText = "UPDATE calendar SET student_id=$1 WHERE available_time=$2;";
        pool.query(sqlText, [studentID, studentAvailability])
        .then((result) => {
            response.sendStatus(201);
        })
        .catch((error) => {
            response.sendStatus(500);
            console.log('post fail', error);
        })
    } else {
        response.sendStatus(403);
    }
})

module.exports = router;