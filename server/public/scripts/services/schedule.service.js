myApp.service('ScheduleService', ['$http', 'UserService', function ($http, UserService) {
    console.log('ScheduleService Loaded');
    let self = this;

    self.coachAppointments = {
        list: []
    };
    self.coachTimes = {
        list: []
    };
    self.schedule;

    self.postCalendar = function (schedule) {
        schedule.timeOne = 8;
        schedule.timeTwo = 9;
        schedule.timeThree = 10;
        schedule.timeFour = 11;
        schedule.timeFive = 12;
        schedule.timeSix = 1;
        schedule.timeSeven = 2;
        schedule.timeEight = 3;
        schedule.timeNine = 4;
        schedule.timeTen = 5;
        schedule.timeEleven = 6;
        console.log('post calendar', schedule);
        schedule.day = moment(schedule.date).format('MMMM Do YYYY');
        $http({
                method: 'POST',
                url: '/calendar/calendar',
                data: schedule
            })
            .then(function (response) {
                console.log('calendar added', response);
                schedule.timeOne = 0;
                schedule.timeTwo = 0;
                schedule.timeThree = 0;
                schedule.timeFour = 0;
                schedule.timeFive = 0;
                schedule.timeSix = 0;
                schedule.timeSeven = 0;
                schedule.timeEight = 0;
                schedule.timeNine = 0;
                schedule.timeTen = 0;
                schedule.timeEleven = 0;
            }).catch(function (error) {
                console.log('add calendar error', error);
            })
    }

    self.getCoachSchedule = function (schedule) {
        day = moment(schedule.date).format('MMMM Do YYYY');
        console.log('getting coach day schedule')
        $http.get(`/calendar/coach/${day}`)
            .then(function (response) {
                console.log('get coach day times', response.data);
                if (response.data.length < 1) {
                    console.log('do the post here');
                    self.postCalendar(schedule);
                }
                let responseArray = response.data;
                console.log(responseArray);
                for (let response of responseArray) {
                    let key = response.property;
                    schedule[key] = 0;
                }
                for (let response of responseArray) {
                    if (response.selected == 'true') {
                        console.log('getting chosen times', response.available_time);
                        let key = response.property;
                        schedule[key] = response.available_time;
                    }
                }
            }).catch(function (error) {
                console.log('get coach day times error', error);
            })
    }

    self.postAvailability = function (schedule) {
        schedule.day = moment(schedule.date).format('MMMM Do YYYY');
        console.log('date', schedule.day);
        console.log('post availability', schedule);
        $http({

                method: 'PUT',
                url: '/calendar/coach',
                data: schedule
            })
            .then(function (response) {
                console.log('times added', response);
                swal("Schedule update!", "", "success");
            }).catch(function (error) {
                console.log('add times error', error);
            })
    }

    self.getCoachAppointments = function () {
        $http.get('/calendar/appointments')

            .then(function (response) {
                console.log('appointments get', response.data);
                let appointmentArray = response.data.filter(function (res) {
                    if (res.student_id != null) {
                        return res
                    }
                })
                console.log('appointment array', appointmentArray);
                self.coachAppointments.list = appointmentArray.map(function (res) {
                    return {
                        time: res.available_time,
                        student: res.student_id,
                        date: res.date
                    }
                });
                console.log('coach appointments', self.coachAppointments.list)
            }).catch(function (error) {
                console.log('Error getting times', error);
            })
    }

    self.getCoachTimes = function (input) {
        let date = moment(input).format('MMMM Do YYYY');
        $http.get(`/calendar/availability/${date}`)
            .then(function (response) {
                console.log('times get', response.data);
                let responseArray = response.data.filter(function (res) {
                    if (res.selected == 'true' && res.student_id == null) {
                        return res
                    }
                });
                console.log('times', responseArray);
                self.coachTimes.list = responseArray.map(res => {
                    return {
                        time: res.available_time
                    }
                });
                console.log('available time', self.coachTimes.list);
            }).catch(function (error) {
                console.log('Error getting times', error);
            })
    }

    self.postStudentSchedule = function (studentAppointment) {
        studentAppointment.day = moment(studentAppointment.date).format('MMMM Do YYYY');
        console.log('student appointment', studentAppointment);
        $http({

                method: 'PUT',
                url: '/calendar/student',
                data: studentAppointment
            })
            .then(function (response) {
                console.log('studend appointment added', response);

                swal("Appointment added!", "", "success");
            }).catch(function (error) {

                console.log('student appointment error', error);
            })
    }

}]); // end schedule service