myApp.service('ScheduleService', ['$http', 'UserService', '$location', function ($http, UserService, $location) {
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
        schedule.a = "8:00 AM";
        schedule.b = "9:00 AM";
        schedule.c = "10:00 AM";
        schedule.d = "11:00 AM";
        schedule.e = "12:00 PM";
        schedule.f = "1:00 PM";
        schedule.g = "2:00 PM";
        schedule.h = "3:00 PM";
        schedule.i = "4:00 PM";
        schedule.j = "5:00 PM";
        schedule.k = "6:00 PM";
        // console.log('post calendar', schedule);
        schedule.day = moment(schedule.date).format('L');
        $http({
                method: 'POST',
                url: '/calendar/calendar',
                data: schedule
            })
            .then(function (response) {
                // console.log('calendar added', response);
                schedule.a = '';
                schedule.b = '';
                schedule.c = '';
                schedule.d = '';
                schedule.e = '';
                schedule.f = '';
                schedule.g = '';
                schedule.h = '';
                schedule.i = '';
                schedule.j = '';
                schedule.k = '';
            }).catch(function (error) {
                console.log('add calendar error', error);
            })
    }

    self.getCoachSchedule = function (schedule) {
        day = schedule.date
        console.log('getting coach day schedule', day)
        $http.get(`/calendar/coach/${day}`)
            .then(function (response) {
                console.log('get coach day times', response.data);
                if (response.data.length < 1) {
                    console.log('do the post here');
                    self.postCalendar(schedule);
                } else {
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
                }
            }).catch(function (error) {
                console.log('get coach day times error', error);
            })
    }

    self.postAvailability = function (schedule) {
        schedule.day = moment(schedule.date).format('L');
        console.log('date', schedule.day);
        console.log('post availability', schedule);
        if (schedule.a === 8) {
            schedule.a = "8:00 AM";
        }
        if (schedule.b === 9) {
            schedule.b = "9:00 AM";
        }
        if (schedule.c === 10) {
            schedule.c = "10:00 AM";
        }
        if (schedule.d === 11) {
            schedule.d = "11:00 AM";
        }
        if (schedule.e === 12) {
            schedule.e = "12:00 PM";
        }
        if (schedule.f === 1) {
            schedule.f = "1:00 PM";
        }
        if (schedule.g === 2) {
            schedule.g = "2:00 PM";
        }
        if (schedule.h === 3) {
            schedule.h = "3:00 PM";
        }
        if (schedule.i === 4) {
            schedule.i = "4:00 PM";
        }
        if (schedule.j === 5) {
            schedule.j = "5:00 PM";
        }
        if (schedule.k === 6) {
            schedule.k = "6:00 PM";
        }
        console.log('weekly appointment', schedule.weekly);
        if(schedule.weekly == true){
            let newDate = moment(schedule.date);
            let recurrence = moment().recur({
                start: schedule.day
            }).every(7).days();
            schedule.weeklyAppointments = recurrence.next(24, "L");
            // let recurrence = moment(schedule.date).format('MMMM Do YYYY').recur().every(7).days();
            // schedule.weeklyAppointments = recurrence.next(24);
            console.log('new weekly appointments', schedule);
            $http({

                method: 'POST',
                url: '/calendar/weekly',
                data: schedule
            })
        .then(function(response) {
            // console.log('weekly times added', response);
            swal("Schedule update!", "", "success");
        }).catch(function(error) {
            // console.log('add weekly error', error);
        })
        } else {
        $http({
            method: 'PUT',
            url: '/calendar/coach',
            data: schedule
        })
    .then(function(response) {
        // console.log('times added', response);
        swal("Schedule update!", "", "success");
    }).catch(function(error) {
        // console.log('add times error', error);
    })
    }
    }

    self.getCoachAppointments = function () {
        $http.get('/calendar/appointments')
        .then(function(response) {
            // console.log('appointments get', response.data);
            let appointmentArray = response.data.filter(function(res){
                let date = moment().format('L');
                if(res.student_id != null && moment(res.date).isSameOrAfter(date)){
                return res
                }
            })
            // console.log('appointment array', appointmentArray);
            self.coachAppointments.list = appointmentArray.map(function(res) {
                return {time: res.available_time, firstName: res.first_name, lastName: res.last_name,  date: res.date}
                });
            // console.log('coach appointments', self.coachAppointments.list)
        }).catch(function(error){
            // console.log('Error getting times', error);
        })
    }

    self.getCoachTimes = function (input) {
        let date = input;
        $http.get(`/calendar/availability/${date}`)
        .then(function(response) {
            // console.log('times get', response.data);
            let responseArray = response.data.filter(function(res){ 
            if(res.selected == 'true' && res.student_id == null){
                return res}
            });
            // console.log('times', responseArray);
            self.coachTimes.list = responseArray.map(res => {
                return {time: res.available_time}
            });
            // console.log('available time', self.coachTimes.list);
        }).catch(function(error){
            // console.log('Error getting times', error);
        })
    }

        self.postStudentSchedule = function(studentAppointment){
            studentAppointment.day = moment(studentAppointment.date).format('L');
            // console.log('student appointment', studentAppointment);
            $http({

                method: 'PUT',
                url: '/calendar/student',
                data: studentAppointment
            })
            .then(function (response) {
                // console.log('studend appointment added', response);

                swal("Appointment added!", "", "success");
                $location.path('/student_home');
            }).catch(function (error) {

                // console.log('student appointment error', error);
            })
    }

}]); // end schedule service