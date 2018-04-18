const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool.js');
const router = express.Router();
const moment = require('moment');

router.get('/coach/:day', (request, response) => {
    if (request.isAuthenticated()){
        console.log('GETTING COACH DAY TIMES');
        let dateOne = request.params.day;
        let date = moment(dateOne).format('L');
        console.log('formatted date', date);
        let coachID = request.user.id;
        const sqlText = 'SELECT available_time, property, selected FROM calendar WHERE date=$1 AND coach_id=$2;';
        pool.query(sqlText, [date, coachID])
        .then(result => {
            response.send(result.rows);
            console.log('get coach times', result.rows)
        })
        .catch(error => {
            response.sendStatus(500);
            console.log('get coach times error', error); 
        })
    } else {
        response.sendStatus(403);
    }
})

router.post('/calendar', (request, response) => {
    if (request.isAuthenticated()) {
        let coachAvailability = request.body;
        let availabilityArray = [];
        console.log('coachAvailability', coachAvailability);
        const date = request.body.day;
        const coachID = request.user.id;
        for (let value in coachAvailability) {
            if (value != 'date' && value != 'coach_id' && value != 'day') {
                let property = value;
                let available_time = coachAvailability[value];
                const sqlText = `INSERT INTO calendar (available_time, date, coach_id, property, selected) VALUES ($1, $2, $3, $4, false);`;
                pool.query(sqlText, [available_time, date, coachID, property])
                    .then((result) => {
                        response.sendStatus(201);
                        console.log('post calendar', result);
                    })
                    .catch((error) => {
                        response.sendStatus(500);
                        console.log('post calendar error', error);
                    })
            }
        }
    } else {
        response.sendStatus(403);
    }
})

router.post('/weekly', (request, response) => {
    if (request.isAuthenticated()){
        console.log('getting weekly post', request.body.weeklyAppointments);
        const coachAvailability = request.body;
        const availabilityArray = [];
        const coachID = request.user.id;
        let appointmentArray = request.body.weeklyAppointments;
        let weeklyAppointments = []; 
        for (let appointment of appointmentArray){
            weeklyAppointments.push(moment(appointment).format('L'));
        }
        console.log('weekly appointments', weeklyAppointments);
        const SQLtext = 'SELECT * FROM calendar WHERE date=$1;';
        for( let appointment of weeklyAppointments){
            pool.query(SQLtext, [appointment])
            .then((result) => {
                console.log('post weekly times', result.rows);
                let weekly = {};
                    weekly.timeOne = 8;
                    weekly.timeTwo = 9;
                    weekly.timeThree = 10;
                    weekly.timeFour = 11;
                    weekly.timeFive = 12;
                    weekly.timeSix = 1;
                    weekly.timeSeven = 2;
                    weekly.timeEight = 3;
                    weekly.timeNine = 4;
                    weekly.timeTen = 5;
                    weekly.timeEleven = 6;
                if(result.rows.length < 1){
                    sqlText = `INSERT INTO calendar (available_time, date, coach_id, property, selected) VALUES ($1, $2, $3, $4, false);`
                    for (let input in weekly){
                        let property = input;
                        let available_time = weekly[input];
                    pool.query(sqlText, [available_time, appointment, coachID, property])
                    .then((result) => {
                        response.sendStatus(201);
                        console.log('post weekly', result);
                    })
                    .catch((error) => {
                        response.sendStatus(500);
                        console.log('post weekly error', error);
                    })
                }
            }
            const SQLTEXT = 'UPDATE calendar SET selected=false WHERE date=$1 and coach_id=$2;';
            pool.query(SQLTEXT, [appointment, coachID])
            .then((result) => {
                for(let value in coachAvailability){
                    if(value != 'date' && value != 'coach_id' && value != 'day' && value != 'weeklyAppointments'){
                        availabilityArray.push(coachAvailability[value])};
                    }
                    console.log('availability array', availabilityArray);
                    for(let time of availabilityArray){
                        const sqltext = `UPDATE calendar SET selected=true WHERE available_time=$1 AND date=$2 AND coach_id=$3;`;
                        pool.query(sqltext, [time, appointment, coachID])
                        .then((result) => {
                            response.sendStatus(201);
                            console.log('put new times', result);
                        })
                        .catch((error) => {
                            response.sendStatus(500);
                            console.log('put new times', error);
                        })
            }
        })
        })
            .catch((error) => {
                console.log('post weekly times', error);
            })
        }
    
    } else {
        response.sendStatus(403);
    }
})

router.put('/coach', (request, response) => {
    if (request.isAuthenticated()) {
        let coachAvailability = request.body;
        let availabilityArray = [];
        console.log('coachAvailability', coachAvailability);
        const date = request.body.day;
        const coachID = request.user.id;
        const SQLtext = 'UPDATE calendar SET selected=false WHERE date=$1 and coach_id=$2;';
        pool.query(SQLtext, [date, coachID])
            .then((result) => {
                for (let value in coachAvailability) {
                    if (value != 'date' && value != 'coach_id' && value != 'day') {
                        availabilityArray.push(coachAvailability[value])
                    };
                }
                console.log('availability array', availabilityArray);
                for (let time of availabilityArray) {
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
            })
            .catch((error) => {
                response.sendStatus(500);
                console.log('put new times', error);
            })
    } else {
        response.sendStatus(403);
    }
})

router.get('/availability/:date', (request, response) => {
    if (request.isAuthenticated()) {
        console.log('getting availability');
        let dateOne = request.params.day;
        let date = moment(dateOne).format('L');
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
                let sqlText = "SELECT available_time, selected, coach_id, student_id, date FROM calendar WHERE coach_id = $1 AND date=$2;";
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
    if (request.isAuthenticated()) {
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
    if (request.isAuthenticated()) {
        let appointmentTime = request.body.time;
        let appointmentDate = request.body.day;
        console.log('request body', appointmentDate, appointmentTime);
        let studentID = request.user.id;
        console.log('student id', request.user.id);
        const SQLtext = `SELECT users.id FROM users
        JOIN coach_bio ON coach_bio.id=users.id
        JOIN student_bio ON student_bio.coach_id=coach_bio.coach_id
        WHERE student_bio.id=$1;`;
        pool.query(SQLtext, [studentID])
            .then(result => {
                console.log('GET COACH ID', result.rows[0].id);
                let coachID = result.rows[0].id;
                const sqlText = "UPDATE calendar SET student_id=$1 WHERE available_time=$2 AND coach_id=$3 AND date=$4;";
                pool.query(sqlText, [studentID, appointmentTime, coachID, appointmentDate])
                    .then((result) => {
                        response.sendStatus(201);
                        console.log('student put', result);
                    })
                    .catch((error) => {
                        response.sendStatus(500);
                        console.log('post fail', error);
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

module.exports = router;