const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool.js');
const router = express.Router();


router.post('/calendar', (request, response) => {
    if (request.isAuthenticated()){
        let coachAvailability = request.body;
        let availabilityArray = [];
        console.log('coachAvailability', coachAvailability);
        const date = request.body.day;
        const coachID = request.user.id;
        for(let value in coachAvailability){
        if(value != 'date' && value != 'coach_id' && value != 'day'){
            availabilityArray.push(coachAvailability[value])};
        }
        console.log('availability array', availabilityArray);
        for(let time of availabilityArray){
            const sqlText = `INSERT INTO calendar (available_time, date, coach_id, selected) VALUES ($1, $2, $3, false);`;
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

router.put('/coach', (request, response) => {
    if (request.isAuthenticated()){
        let coachAvailability = request.body;
        let availabilityArray = [];
        console.log('coachAvailability', coachAvailability);
        const date = request.body.day;
        const coachID = request.user.id;
        for(let value in coachAvailability){
        if(value != 'date' && value != 'coach_id' && value != 'day'){
            availabilityArray.push(coachAvailability[value])};
        }
        console.log('availability array', availabilityArray);
        for(let time of availabilityArray){
            const sqlText = `UPDATE calendar SET selected=true WHERE available_time=$1 AND date=$2 AND coach_id=$3;`;
            pool.query(sqlText, [time, date, coachID])
            .then((result) => {
                response.sendStatus(201);
                console.log('put new times', result);
            })
            .catch((error) => {
                response.sendStatus(500);
                console.log('put new times', error);
            })
        }
    }else {
        response.sendStatus(403);
    }
})

router.get('/availability/:date', (request, response) => {
    if (request.isAuthenticated()){
        console.log('getting availability');
        const date = request.params.date;
        console.log('appointment date', request.params);
        const SQLtext = `SELECT users.id FROM users
        JOIN coach_bio ON coach_bio.id=users.id
        JOIN student_bio ON student_bio.coach_id=coach_bio.coach_id
        WHERE student_bio.id=$1;`;
        const studentID = request.user.id;
        pool.query(SQLtext, [studentID])
        .then(result => {
            console.log('GET COACH ID', result.rows[0].id);
            let coachID = result.rows[0].id;
            let sqlText = "SELECT available_time, student_id FROM calendar WHERE coach_id = $1 AND date=$2;";
            console.log('date for get from db', date);
            pool.query(sqlText, [coachID, date])
            .then(res => {
                response.send(res.rows);
                console.log('availability', res.rows)
            })
            .catch(error => {
                response.sendStatus(500);
                console.log('get error', error); 
            })
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
        const coachID = request.user.id;
        pool.query(sqlText, [coachID])
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
        console.log('student id', request.user.id);
        const sqlText = "UPDATE calendar SET student_id=$1 WHERE available_time=$2;";
        pool.query(sqlText, [studentID, studentAvailability])
        .then((result) => {
            response.sendStatus(201);
            console.log('student put', result);
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