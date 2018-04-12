myApp.service('ScheduleService', ['$http', 'UserService', function($http, UserService){
    console.log('ScheduleService Loaded');
    let self = this;
    self.coachAppointments = {list: []};
    self.coachTimes = {list: []};
    
    
    self.postAvailability = function(schedule){
        console.log('post availability', schedule);
        schedule.day = moment(schedule.date).format('MMMM Do YYYY');
        console.log('date', schedule.day);
        $http({
            method: 'POST',
            url: '/calendar/coach',
            data: schedule
        })
    .then(function(response) {
        console.log('times added', response);
    }).catch(function(error) {
        console.log('add times error', error);
    })
    }

    self.getCoachAppointments = function(){
        $http.get('/calendar/appointments')
        .then(function(response) {
            console.log('appointments get', response.data);
            let appointmentArray = response.data.filter(function(res){
            return res.student_id != null
            })
            self.coachAppointments.list = appointmentArray.map(res => res.available_time);
        }).catch(function(error){
            console.log('Error getting times', error);
        })
    }

    self.getCoachTimes = function(input){
        let date = moment(input).format('MMMM Do YYYY');
        $http.get(`/calendar/availability/${date}`)
        .then(function(response) {
            console.log('times get', response.data);
            let responseArray = response.data.filter(function(res){ 
            if(res.student_id == null){
                return res.available_time}
            });
            self.coachTimes.list = responseArray.map(res => {
                return {time: res.available_time, date: res.date}
            });
            console.log('available time', self.coachTimes.list);
        }).catch(function(error){
            console.log('Error getting times', error);
        })
    }

        self.postStudentSchedule = function(studentAppointment){
            console.log('student appointment', studentAppointment);
            $http({
                method: 'PUT',
                url: '/calendar/student',
                data: studentAppointment
            })
            .then(function(response) {
                console.log('studend appointment added', response);
            }).catch(function(error) {
                console.log('student appointment error', error);
            })
    }

}]); // end schedule service