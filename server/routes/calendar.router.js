const express = require('express');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool.js');
const router = express.Router();
const moment = require('moment');

router.get('/coach/:day', (request, response) => {
    if (request.isAuthenticated()){
        let dateOne = request.params.day;
        let date = moment(dateOne).format('L');
        let coachID = request.user.id;
        const sqlText = 'SELECT available_time, property, selected FROM calendar WHERE date=$1 AND coach_id=$2;';
        pool.query(sqlText, [date, coachID])
        .then(result => {
            response.send(result.rows);
        })
        .catch(error => {
            response.sendStatus(500); 
        })
    } else {
        response.sendStatus(403);
    }
})

router.post('/calendar', (request, response) => {
    if (request.isAuthenticated()) {
        let coachAvailability = request.body;
        let availabilityArray = [];
        const date = request.body.day;
        const coachID = request.user.id;
        for (let value in coachAvailability) {
            if (value != 'date' && value != 'coach_id' && value != 'day' && value != 'weeklyAppointments' && value != 'weekly') {
                let property = value;
                let available_time = coachAvailability[value];
                let notes_status = 'Notes Needed';
                const sqlText = `INSERT INTO calendar (available_time, date, coach_id, property, selected, notes_status) VALUES ($1, $2, $3, $4, false, $5);`;
                pool.query(sqlText, [available_time, date, coachID, property, notes_status])
                    .then((result) => {
                        response.sendStatus(201);
                    })
                    .catch((error) => {
                        response.sendStatus(500);
                     //   console.log('post calendar error', error);
                    })
            }
        }
    } else {
        response.sendStatus(403);
    }
})

router.post('/weekly', (request, response) => {
    if (request.isAuthenticated()){
        const coachAvailability = request.body;
        const availabilityArray = [];
        const coachID = request.user.id;
        let appointmentArray = request.body.weeklyAppointments;
        let weeklyAppointments = []; 
        for (let appointment of appointmentArray){
            weeklyAppointments.push(moment(appointment).format('L'));
        }
        const SQLtext = 'SELECT * FROM calendar WHERE date=$1;';
        for( let appointment of weeklyAppointments){
            pool.query(SQLtext, [appointment])
            .then((result) => {
                let weekly = {};
                    weekly.a = "8:00 AM";
                    weekly.b = "9:00 AM";
                    weekly.c = "10:00 AM";
                    weekly.d = "11:00 AM";
                    weekly.e = "12:00 PM";
                    weekly.f = "1:00 PM";
                    weekly.g = "2:00 PM";
                    weekly.h = "3:00 PM";
                    weekly.i = "4:00 PM";
                    weekly.j = "5:00 PM";
                    weekly.k = "6:00 PM";
                if(result.rows.length < 1){
                    sqlText = `INSERT INTO calendar (available_time, date, coach_id, property, selected, notes_status) VALUES ($1, $2, $3, $4, false, $5);`
                    for (let input in weekly){
                        let property = input;
                        let available_time = weekly[input];
                        let notes_status = 'Notes Needed';
                    pool.query(sqlText, [available_time, appointment, coachID, property, notes_status])
                    .then((result) => {
                        response.sendStatus(201);
                    })
                    .catch((error) => {
                        response.sendStatus(500);
                      //  console.log('post weekly error', error);
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
                    for(let time of availabilityArray){
                        const sqltext = `UPDATE calendar SET selected=true WHERE available_time=$1 AND date=$2 AND coach_id=$3;`;
                        pool.query(sqltext, [time, appointment, coachID])
                        .then((result) => {
                            response.sendStatus(201);
                        })
                        .catch((error) => {
                            response.sendStatus(500);
                         //   console.log('put new times', error);
                        })
            }
        })
        })
            .catch((error) => {
             //   console.log('post weekly times', error);
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
        const date = request.body.day;
        const coachID = request.user.id;
        const SQLtext = 'UPDATE calendar SET selected=false WHERE date=$1 and coach_id=$2;';
        pool.query(SQLtext, [date, coachID])
            .then((result) => {
                for (let value in coachAvailability) {
                    if (value != 'date' && value != 'coach_id' && value != 'day' && value != 'weeklyAppointments' && value != 'weekly') {
                        availabilityArray.push(coachAvailability[value])
                    };
                }
                for (let time of availabilityArray) {
                    const sqlText = `UPDATE calendar SET selected=true WHERE available_time=$1 AND date=$2 AND coach_id=$3;`;
                    pool.query(sqlText, [time, date, coachID])
                        .then((result) => {
                            response.sendStatus(201);
                        })
                        .catch((error) => {
                            response.sendStatus(500);
                           // console.log('put new times', error);
                        })
                }
            })
            .catch((error) => {
                response.sendStatus(500);
              //  console.log('put new times', error);
            })
    } else {
        response.sendStatus(403);
    }
})

router.get('/availability/:date', (request, response) => {
    if (request.isAuthenticated()) {
        let dateOne = request.params.date;
        let date = moment(dateOne).format('L');
        const SQLtext = `SELECT users.id FROM users
        JOIN coach_bio ON coach_bio.id=users.id
        JOIN student_bio ON student_bio.coach_id=coach_bio.coach_id
        WHERE student_bio.id=$1`;
        const studentID = request.user.id;
        pool.query(SQLtext, [studentID])
            .then(result => {
                let coachID = result.rows[0].id;
                let sqlText = "SELECT available_time, selected, coach_id, student_id, date, property FROM calendar WHERE coach_id = $1 AND date=$2 ORDER BY property;";
                pool.query(sqlText, [coachID, date])
                    .then(res => {
                        response.send(res.rows);
                    })
                    .catch(error => {
                        response.sendStatus(500);
                      //  console.log('get error', error);
                    })
            })
            .catch(error => {
                response.sendStatus(500);
              //  console.log('get error', error);
            })
    } else {
        response.sendStatus(403);
    }
})

router.get('/appointments', (request, response) => {
    if (request.isAuthenticated()) {
        const sqlText = `SELECT calendar.available_time, calendar.date, calendar.student_id, calendar.property, student_bio.first_name, student_bio.last_name FROM calendar 
        JOIN student_bio ON calendar.student_id=student_bio.id
        WHERE calendar.coach_id = $1 ORDER BY calendar.date ASC, calendar.property`;
        const coachID = request.user.id;
        pool.query(sqlText, [coachID])
            .then(result => {
                response.send(result.rows);
                cosole.log('availability', result.rows)
            })
            .catch(error => {
                response.sendStatus(500);
              //  console.log('get error', error);
            })
    } else {
        response.sendStatus(403);
    }
})

router.put('/student', (request, response) => {
    if (request.isAuthenticated()) {
        let appointmentTime = request.body.time;
        let appointmentDate = request.body.day;
        let studentID = request.user.id;
        const SQLtext = `SELECT users.id FROM users
        JOIN coach_bio ON coach_bio.id=users.id
        JOIN student_bio ON student_bio.coach_id=coach_bio.coach_id
        WHERE student_bio.id=$1;`;
        pool.query(SQLtext, [studentID])
            .then(result => {
                let coachID = result.rows[0].id;
                const sqlText = "UPDATE calendar SET student_id=$1 WHERE property=$2 AND coach_id=$3 AND date=$4;";
                pool.query(sqlText, [studentID, appointmentTime, coachID, appointmentDate])
                    .then((result) => {
                        response.sendStatus(201);
                    })
                    .catch((error) => {
                        response.sendStatus(500);
                      //  console.log('post fail', error);
                    })
            })
            .catch(error => {
                response.sendStatus(500);
              //  console.log('get error', error);
            })
    } else {
        response.sendStatus(403);
    }
})

module.exports = router;