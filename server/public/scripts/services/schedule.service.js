myApp.service('ScheduleService', ['$http', 'UserService', '$location', function ($http, UserService, $location) {
//    console.log('ScheduleService Loaded');
    let self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;

    self.coachAppointments = {
        list: []
    };
    self.coachTimes = {
        list: []
    };
    self.schedule = {};
    self.schedule.date = new Date();
    


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
        schedule.day = moment(schedule.date).format('L');
        $http({
                method: 'POST',
                url: '/calendar/calendar',
                data: schedule
            })
            .then(function (response) {
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
            })
    }

    self.getCoachSchedule = function (schedule) {
        day = schedule.date
        $http.get(`/calendar/coach/${day}`)
            .then(function (response) {
                if (response.data.length < 1) {
                    self.postCalendar(schedule);
                } else {
                let responseArray = response.data;
                for (let response of responseArray) {
                    let key = response.property;
                    schedule[key] = 0;
                }
                for (let response of responseArray) {
                    if (response.selected == 'true') {
                        let key = response.property;
                        if (response.available_time === "8:00 AM") {
                            schedule[key] = 8;
                        }
                        if (response.available_time === "9:00 AM") {
                            schedule[key] = 9;
                        }
                        if (response.available_time === "10:00 AM") {
                            schedule[key] = 10;
                        }
                        if (response.available_time === "11:00 AM") {
                            schedule[key] = 11;
                        }
                        if (response.available_time === "12:00 PM") {
                            schedule[key] = 12;
                        }
                        if (response.available_time === "1:00 PM") {
                            schedule[key] = 1;
                        }
                        if (response.available_time === "2:00 PM") {
                            schedule[key] = 2;
                        }
                        if (response.available_time === "3:00 PM") {
                            schedule[key] = 3;
                        } 
                        if (response.available_time === "4:00 PM") {
                            schedule[key] = 4;
                        } 
                        if (response.available_time === "5:00 PM") {
                            schedule[key] = 5;
                        }
                        if (response.available_time === "6:00 PM") {
                            schedule[key] = 6;
                        }
                    }
                }
                }
            }).catch(function (error) {
            })
    }

    self.getCoachSchedule(self.schedule);
    // connects to self.schedule.date 
    // runs function on page load to get coach availability on today's date

    self.postAvailability = function (schedule) {
        schedule.day = moment(schedule.date).format('L');
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
        $http({
            method: 'PUT',
            url: '/calendar/coach',
            data: schedule
        })
    .then(function(response) {
        if(schedule.weekly == true){
            // uses moment recur
            // throws yellow error, not a huge problem
            let newDate = moment(schedule.date);
            let recurrence = moment().recur({
                start: schedule.day
            }).every(7).days();
            schedule.weeklyAppointments = recurrence.next(24, "L");
            $http({

                method: 'POST',
                url: '/calendar/weekly',
                data: schedule
            })
        .then(function(response) {
            schedule.weekly = "";
        }).catch(function(error) {
        })
        }
        swal("Schedule update!", "", "success");
        self.getCoachSchedule(schedule);
    }).catch(function(error) {
    })
    
    }

    self.getCoachAppointments = function () {
        $http.get('/calendar/appointments')
        .then(function(response) {
            let appointmentArray = response.data.filter(function(res){
                let date = moment().format('L');
                if(res.student_id != null && moment(res.date).isSameOrAfter(date)){
                return res
                }
            })
            self.coachAppointments.list = appointmentArray.reduce(function(acc, item) {
                // creates coach appointment objects by date with all the appointments a coach has that day
                return { ...acc, [item.date]: [...acc[item.date] || [], item]}
                },{});
        }).catch(function(error){
        })
    }

    self.getCoachTimes = function (input) {
        // getCoachTimes gets the times that coaches are available for a session
        // as opposed to getCoachAppointments which gets times where students have
        // made appointments
        let date = input;
        $http.get(`/calendar/availability/${date}`)
        .then(function(response) {
            let responseArray = response.data.filter(function(res){ 
            if(res.selected == 'true' && res.student_id == null){
                return res}
            });
            self.coachTimes.list = responseArray.map(res => {
                return {time: res.available_time, property: res.property}
            });
        }).catch(function(error){
        })
    }

        self.postStudentSchedule = function(studentAppointment){
            studentAppointment.day = moment(studentAppointment.date).format('L');
            const id = UserService.userObject.id;
            $http({
                method: 'GET',
                url: `/student/sessions/${id}`
            }).then(function (response) {
                sessions = response.data;
                thing = sessions[0].sessions_used;
                total = sessions[0].total_sessions;
                if(thing >= total) {
                    swal("You have no more sessions!", "", "warning");
                    $location.path('/student_home');
                } else if (thing < total) {
                    $http({

                        method: 'PUT',
                        url: '/calendar/student',
                        data: studentAppointment
                    })
                    .then(function (response) {
                        const id = UserService.userObject.id;
                        $http({
                            method: 'GET',
                            url: `/student/sessions/${id}`
                        }).then(function (response) {
                            sessions = response.data;
                            thing = sessions[0].sessions_used;
                            used = thing + 1;
                            entry = {
                                id: id,
                                sessions_used: used
                            }
                            $http({
                                method: 'PUT',
                                url: `/student/updatesessions/${id}`,
                                data: {
                                    entry: entry
                                }
                            }).then(function (response) {
                                swal("Appointment added!", "", "success");
                                $location.path('/student_home');
                            }).catch(function (error) {
                            })
                            
                        }).catch(function (error) {
                        })
                      
                    }).catch(function (error) {
                    })
                } else {
                    swal("Something went wrong! Please try again", "", "warning");
                }
            }).catch(function (error) {
            })
   
    }

    self.back = function() {
        const id = UserService.userObject.id;
        $http({
            method: 'GET',
            url: `/student/numappt/${id}`
        }).then(function (response) {
            let data = response.data[0].appt_count;
            if (data <= 0) {
                $location.path('/student_coaches');
                $http({
                    method: 'GET',
                    url: `/student/${id}`
                }).then(function (response) {
                    location.reload(true);
            }).catch(function (error) {
            })
            }
            else if (data > 0) {
                $location.path('/student_home');
                $http({
                    method: 'GET',
                    url: `/student/${id}`
                }).then(function (response) {
                    location.reload(true);
            }).catch(function (error) {
            })
            }
    }).catch(function (error) {
    })
}

}]); // end schedule service